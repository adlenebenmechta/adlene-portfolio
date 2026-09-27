#!/usr/bin/env python3
"""Production E2E test for the hidden admin CMS (run against live Railway site).

Covers: auth gates (401s), wrong password, login, content read,
image upload (served via jsDelivr), brand add -> live site reflects,
brand edit -> live site reflects, brand remove -> gone + 404,
upload listing + delete, logout, noindex, hidden from public UI.
"""
import json, time, io, urllib.request, urllib.error, uuid

BASE = "https://adlene-portfolio-production.up.railway.app"
PASSWORD = None  # read from scripts/railway.env (gitignored)
for _line in open(__import__('os').path.join(__import__('os').path.dirname(__file__), 'railway.env')):
    if _line.startswith('ADMIN_PASSWORD='):
        PASSWORD = _line.strip().split('=', 1)[1].strip('"\'')
COOKIE = None
PASS, FAIL = 0, 0

def check(label, ok, extra=""):
    global PASS, FAIL
    mark = "✓" if ok else "✗"
    if ok: PASS += 1
    else: FAIL += 1
    print(f"  {mark} {label}" + (f" — {extra}" if extra and not ok else ""))

def req(method, path, body=None, raw=None, ctype="application/json"):
    global COOKIE
    r = urllib.request.Request(BASE + path, method=method)
    if COOKIE: r.add_header("Cookie", COOKIE)
    data = None
    if body is not None:
        data = json.dumps(body).encode(); r.add_header("Content-Type", ctype)
    if raw is not None:
        data = raw; r.add_header("Content-Type", ctype)
    try:
        with urllib.request.urlopen(r, data=data, timeout=90) as resp:
            sc = resp.headers.get("set-cookie")
            if sc and sc.startswith("cms_auth="):
                COOKIE = sc.split(";")[0]
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()

def jreq(*a, **k):
    s, raw = req(*a, **k)
    try: return s, json.loads(raw)
    except Exception: return s, raw.decode()[:200] if raw else None

# ─── 1. auth gates ─────────────────────────────────────────────
print("[1] unauthenticated access is blocked")
s, _ = jreq("GET", "/api/admin/content")
check("GET /api/admin/content unauthed -> 401", s == 401, f"got {s}")
s, _ = jreq("GET", "/api/admin/files")
check("GET /api/admin/files unauthed -> 401", s == 401, f"got {s}")
s, _ = jreq("PUT", "/api/admin/content", {"projects": []})
check("PUT /api/admin/content unauthed -> 401", s == 401, f"got {s}")
s, _ = jreq("POST", "/api/admin/session", {"password": "wrong-password-xyz"})
check("wrong password -> 401", s == 401, f"got {s}")
s, r = jreq("GET", "/api/admin/session")
check("session check before login -> authed:false", s == 200 and r.get("authed") is False, f"{s} {r}")

# ─── 2. login ──────────────────────────────────────────────────
print("[2] login with the production ADMIN_PASSWORD")
s, r = jreq("POST", "/api/admin/session", {"password": PASSWORD})
check("login -> 200 + cookie", s == 200 and COOKIE, f"{s}")
s, r = jreq("GET", "/api/admin/session")
check("session check after login -> authed:true", s == 200 and r.get("authed") is True, f"{s} {r}")

# ─── 3. content read ────────────────────────────────────────────
print("[3] content read")
s, content = jreq("GET", "/api/admin/content")
check("GET content -> 200", s == 200 and isinstance(content, dict), f"{s}")
check("5 projects present", s == 200 and len(content.get("projects", [])) == 5,
      f"got {len(content.get('projects', [])) if s==200 else s}")
orig_ids = [p["id"] for p in content.get("projects", [])]
print(f"      brands: {', '.join(orig_ids)}")

# ─── 4. image upload ────────────────────────────────────────────
print("[4] image upload via admin API")
# small valid JPEG (1x1 white px)
jpeg = bytes.fromhex(
    "ffd8ffe000104a46494600010100000100010000ffdb004300080606070605080707070909080a0d140e0d0c0c0d1a1517171a1e221c1e1b1c242022272224272525282d2f2c2e303233303232ffc0000b080001000101011100ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffda0008010100003f00fca8ffd9")
fname = f"e2e-prod-{uuid.uuid4().hex[:6]}.jpg"
boundary = "----e2e" + uuid.uuid4().hex[:8]
mp = (f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; "
      f"filename=\"{fname}\"\r\nContent-Type: image/jpeg\r\n\r\n").encode() + jpeg + f"\r\n--{boundary}--\r\n".encode()
s, up = jreq("POST", "/api/admin/upload", raw=mp, ctype=f"multipart/form-data; boundary={boundary}")
check("upload -> 200 with url", s == 200 and isinstance(up, dict) and up.get("url"), f"{s} {up}")
upath = up.get("url", "")
urepo = up.get("repoPath", "")
uname = upath.rsplit("/", 1)[-1]
check("upload url is /gh/media/uploads/...", upath.startswith("/gh/media/uploads/"), upath)
print(f"      uploaded: {upath}")

# serve check via jsDelivr (what mediaUrl() resolves to)
cdn = "https://cdn.jsdelivr.net/gh/adlenebenmechta/adlene-portfolio@main/public" + upath.replace("/gh", "")
ok = False
for _ in range(10):
    try:
        with urllib.request.urlopen(cdn, timeout=20) as resp:
            if resp.status == 200 and resp.read() == jpeg: ok = True; break
    except Exception: pass
    time.sleep(6)
check("uploaded image served byte-exact on jsDelivr CDN", ok, cdn)

# ─── 5. add test brand ───────────────────────────────────────────
print("[5] add a test brand via content PUT")
content["projects"].append({
    "id": "test-brand-e2e", "index": "06", "brand": "Test Brand E2E",
    "shortName": "Test", "logo": upath,
    "tagline": "Temporary E2E verification brand.", "industry": "Testing",
    "location": "Algiers, DZ", "year": "2026",
    "services": ["Testing", "Automation"], "role": "Tester",
    "description": "Exists only to verify the admin panel end-to-end on production.",
    "deliverables": ["A passing test"],
    "preview": {"type": "image", "src": upath, "alt": "Test brand preview"},
    "media": [{"type": "image", "src": upath, "alt": "Test media", "span": "full"}],
})
s, r = jreq("PUT", "/api/admin/content", content)
check("PUT content (add brand) -> 200", s == 200, f"{s} {r}")

print("      waiting for live site to reflect…")
ok_work = ok_case = ok_home = False
t0 = time.time()
while time.time() - t0 < 120 and not (ok_work and ok_case and ok_home):
    time.sleep(6)
    _, h = req("GET", "/work"); h = h.decode() if isinstance(h, bytes) else ""
    ok_work = ok_work or "Test Brand E2E" in h
    s2, h2 = req("GET", "/work/test-brand-e2e"); h2 = h2.decode() if isinstance(h2, bytes) else ""
    ok_case = ok_case or (s2 == 200 and "Test Brand E2E" in h2)
    _, h3 = req("GET", "/"); h3 = h3.decode() if isinstance(h3, bytes) else ""
    ok_home = ok_home or "Test Brand E2E" in h3
    print(f"      poll({int(time.time()-t0)}s): work={ok_work} case={ok_case} home={ok_home}")
check("brand appears on /work", ok_work)
check("case study /work/test-brand-e2e live", ok_case)
check("brand appears on home page grid", ok_home)

# ─── 6. edit test brand ──────────────────────────────────────────
print("[6] edit the test brand (tagline + year)")
s, c2 = jreq("GET", "/api/admin/content")
for p in c2["projects"]:
    if p["id"] == "test-brand-e2e":
        p["tagline"] = "Edited tagline — v2 verified."; p["year"] = "2025"
s, r = jreq("PUT", "/api/admin/content", c2)
check("PUT content (edit brand) -> 200", s == 200, f"{s}")
ok = False; t0 = time.time()
while time.time() - t0 < 90 and not ok:
    time.sleep(6)
    _, h = req("GET", "/work"); h = h.decode() if isinstance(h, bytes) else ""
    ok = "Edited tagline" in h
check("edited tagline visible on /work", ok)

# ─── 7. remove test brand ─────────────────────────────────────────
print("[7] remove the test brand")
s, c3 = jreq("GET", "/api/admin/content")
c3["projects"] = [p for p in c3["projects"] if p["id"] != "test-brand-e2e"]
s, r = jreq("PUT", "/api/admin/content", c3)
check("PUT content (remove brand) -> 200", s == 200, f"{s}")
ok = False; t0 = time.time()
while time.time() - t0 < 90 and not ok:
    time.sleep(6)
    _, h = req("GET", "/work"); h = h.decode() if isinstance(h, bytes) else ""
    ok = "Test Brand E2E" not in h
check("brand gone from /work", ok)
s2, _ = req("GET", "/work/test-brand-e2e")
check("case study now 404", s2 == 404, f"got {s2}")
s, c4 = jreq("GET", "/api/admin/content")
check("content back to exactly the 5 original brands",
      [p["id"] for p in c4.get("projects", [])] == orig_ids)

# ─── 8. upload file manager ─────────────────────────────────────
print("[8] file manager: list + delete upload")
s, files = jreq("GET", "/api/admin/files")
listing = json.dumps(files.get("files", [])) if s == 200 else ""
check("files list -> 200 and contains the e2e upload", s == 200 and uname in listing, f"{s}")
s, r = jreq("DELETE", f"/api/admin/files?path={urllib.request.quote(urepo)}")
check("delete upload -> 200", s == 200, f"{s} {r}")
s, files = jreq("GET", "/api/admin/files")
listing = json.dumps(files.get("files", [])) if s == 200 else ""
check("upload gone from listing", uname not in listing)
# cleanup any stray e2e-prod-* files from earlier runs
for f in (files.get("files", []) if s == 200 else []):
    if str(f.get("name", "")).startswith("e2e-prod-"):
        jreq("DELETE", f"/api/admin/files?path={urllib.request.quote(f['path'])}")
        print(f"      cleaned stray: {f['name']}")
s, files = jreq("GET", "/api/admin/files")
listing = json.dumps(files.get("files", [])) if s == 200 else ""
check("no e2e-prod-* files remain", "e2e-prod-" not in listing)

# ─── 9. logout + hidden-ness ────────────────────────────────────
print("[9] logout, noindex, hidden from public UI")
s, _ = jreq("DELETE", "/api/admin/session")
COOKIE = None
s, r = jreq("GET", "/api/admin/session")
check("after logout session -> authed:false", s == 200 and r.get("authed") is False, f"{r}")
s, h = req("GET", "/admin"); h = h.decode()
check("/admin HTML has robots noindex", "noindex" in h.lower() or "noindex" in h)
for page in ["/", "/work", "/about", "/contact"]:
    _, h = req("GET", page); h = h.decode()
    check(f"{page} has no link to /admin", "/admin" not in h)

print()
print(f"RESULT: {PASS} passed, {FAIL} failed")
exit(1 if FAIL else 0)
