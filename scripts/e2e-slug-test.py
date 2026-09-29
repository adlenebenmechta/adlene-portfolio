#!/usr/bin/env python3
"""Local/production E2E for the URL-slug editing feature.

Verifies: renaming a brand's slug moves its case page to the new URL,
the old URL 404s, all internal links (work index, footer, home grid)
point to the new slug, then restores the original content exactly.
"""
import json, time, urllib.request, urllib.error, os, sys

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
ENVFILE = os.path.join(os.path.dirname(__file__), "railway.env")
if os.path.exists(ENVFILE):
    for _line in open(ENVFILE):
        if _line.startswith("ADMIN_PASSWORD="):
            os.environ["ADMIN_PASSWORD"] = _line.strip().split("=", 1)[1].strip("\"'")
PASSWORD = os.environ.get("ADMIN_PASSWORD", "Adlene@2026")
COOKIE = None
PASS = FAIL = 0

def check(label, ok, extra=""):
    global PASS, FAIL
    print(("  ✓ " if ok else "  ✗ ") + label + ("" if ok else f" — {extra}"))
    PASS, FAIL = PASS + (1 if ok else 0), FAIL + (0 if ok else 1)

def req(method, path, body=None):
    global COOKIE
    r = urllib.request.Request(BASE + path, method=method)
    if COOKIE: r.add_header("Cookie", COOKIE)
    data = json.dumps(body).encode() if body is not None else None
    if data: r.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(r, data=data, timeout=60) as resp:
            sc = resp.headers.get("set-cookie")
            if sc and sc.startswith("cms_auth="): COOKIE = sc.split(";")[0]
            return resp.status, resp.read()
    except urllib.request.HTTPError as e:
        return e.code, e.read()

def jreq(*a):
    s, raw = req(*a)
    try: return s, json.loads(raw)
    except Exception: return s, raw.decode()[:200] if raw else None

print(f"[slug E2E] base = {BASE}")

# ── 1. login + read ───────────────────────────────────────────
s, _ = jreq("POST", "/api/admin/session", {"password": PASSWORD})
check("login", s == 200, s)
s, content = jreq("GET", "/api/admin/content")
check("read content", s == 200 and len(content.get("projects", [])) > 0, s)
ORIG = json.dumps(content, sort_keys=True)

target = next(p for p in content["projects"] if p["id"] == "maison-noire")
OLD, NEW = "maison-noire", "maison-noire-slug-e2e"

# sanity: old page currently live
s, _ = req("GET", f"/work/{OLD}")
check(f"/work/{OLD} live before rename", s == 200, s)

# ── 2. rename via PUT ────────────────────────────────────────
target["id"] = NEW
s, r = jreq("PUT", "/api/admin/content", content)
check("PUT renamed slug", s == 200, r)

# wait for site to reflect (server content cache 20s)
ok_new = ok_old404 = ok_links = False
t0 = time.time()
while time.time() - t0 < 120 and not (ok_new and ok_old404 and ok_links):
    time.sleep(5)
    if not ok_new:
        s, _ = req("GET", f"/work/{NEW}")
        ok_new = s == 200
    if ok_new and not ok_old404:
        s, _ = req("GET", f"/work/{OLD}")
        ok_old404 = s == 404
    if ok_new and not ok_links:
        s, html = req("GET", "/work")
        html = html.decode() if isinstance(html, bytes) else ""
        ok_links = f"/work/{NEW}" in html and f'href="/work/{OLD}"' not in html
check(f"/work/{NEW} live after rename", ok_new)
check(f"/work/{OLD} 404 after rename", ok_old404)
check("work index links point to new slug", ok_links)
s, html = req("GET", "/")
html = html.decode() if isinstance(html, bytes) else ""
check("home links point to new slug", f"/work/{NEW}" in html)

# ── 3. duplicate-slug guard (server validation) ───────────────
dup = json.loads(ORIG)
dup["projects"][0]["id"] = dup["projects"][1]["id"]  # two brands same slug
s, r = jreq("PUT", "/api/admin/content", dup)
check("PUT with duplicate slugs -> 400", s == 400, f"got {s}")

# ── 4. restore ───────────────────────────────────────────────
s, r = jreq("PUT", "/api/admin/content", json.loads(ORIG))
check("PUT restore original", s == 200, r)
ok_back = False
t0 = time.time()
while time.time() - t0 < 120 and not ok_back:
    time.sleep(5)
    s, _ = req("GET", f"/work/{OLD}")
    ok_back = s == 200
check(f"/work/{OLD} restored", ok_back)

s, content2 = jreq("GET", "/api/admin/content")
check("content byte-identical to original",
      json.dumps(content2, sort_keys=True) == ORIG)

print(f"\n{'ALL PASSED' if FAIL == 0 else 'FAILURES: ' + str(FAIL)} ({PASS} passed)")
sys.exit(0 if FAIL == 0 else 1)
