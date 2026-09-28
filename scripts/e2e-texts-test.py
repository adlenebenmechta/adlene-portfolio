#!/usr/bin/env python3
"""Local E2E for the TEXTS feature: edit about headline + hero name via API,
verify the site reflects them, then revert everything."""
import json, time, urllib.request, urllib.error, os, pathlib

BASE = "https://adlene-portfolio-production.up.railway.app"
PASSWORD = None
for _line in open(os.path.join(os.path.dirname(__file__), "railway.env")):
    if _line.startswith("ADMIN_PASSWORD="):
        PASSWORD = _line.strip().split("=", 1)[1].strip('"\'')
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
    except urllib.error.HTTPError as e:
        return e.code, e.read()

def jreq(*a):
    s, raw = req(*a)
    try: return s, json.loads(raw)
    except Exception: return s, raw.decode()[:200] if raw else None

# login
s, _ = jreq("POST", "/api/admin/session", {"password": PASSWORD})
check("login", s == 200, s)

# read content
s, content = jreq("GET", "/api/admin/content")
check("content has pages", s == 200 and isinstance(content.get("pages"), dict), s)
orig = json.dumps(content.get("pages", {}), sort_keys=True)
check("about.facts is a list", isinstance(content["pages"]["about"]["facts"], list))

# edit: about headline + home heroName + footer tagline
content["pages"]["about"]["headline"] = "EDITED HEADLINE — texts E2E test."
content["pages"]["home"]["heroName"] = "Test Name E2E"
content["pages"]["footer"]["tagline"] = "Edited tagline for E2E."
s, r = jreq("PUT", "/api/admin/content", content)
check("PUT with edited texts", s == 200, r)

ok_head = ok_name = ok_tag = False
t0 = time.time()
while time.time() - t0 < 90 and not (ok_head and ok_name and ok_tag):
    time.sleep(5)
    _, h = req("GET", "/about"); h = h.decode() if isinstance(h, bytes) else ""
    ok_head = ok_head or "EDITED HEADLINE" in h
    _, h2 = req("GET", "/"); h2 = h2.decode() if isinstance(h2, bytes) else ""
    ok_name = ok_name or "Test Name E2E" in h2
    ok_tag = ok_tag or "Edited tagline for E2E." in h2
    print(f"      poll({int(time.time()-t0)}s): about={ok_head} heroName={ok_name} tagline={ok_tag}")
check("edited About headline live on /about", ok_head)
check("edited hero name live on / (hero + footer)", ok_name)
check("edited footer tagline live", ok_tag)

# signature on curtain uses heroName too (rendered server-side)
_, h3 = req("GET", "/work"); h3 = h3.decode() if isinstance(h3, bytes) else ""
check("curtain signature follows heroName", "Test Name E2E" in h3)

# revert
s, c2 = jreq("GET", "/api/admin/content")
c2["pages"]["about"]["headline"] = "I work at the intersection of strategy, culture and visual storytelling."
c2["pages"]["home"]["heroName"] = "Adlene Benmechta"
c2["pages"]["footer"]["tagline"] = "Campaign films, photography and identities — a portfolio of selected work, made with patience and light."
s, r = jreq("PUT", "/api/admin/content", c2)
check("revert PUT", s == 200, r)

ok = False; t0 = time.time()
while time.time() - t0 < 90 and not ok:
    time.sleep(5)
    _, h = req("GET", "/about"); h = h.decode() if isinstance(h, bytes) else ""
    ok = "EDITED HEADLINE" not in h and "intersection of strategy" in h
check("reverted live", ok)

# final integrity: pages identical to original
s, c3 = jreq("GET", "/api/admin/content")
now = json.dumps(c3.get("pages", {}), sort_keys=True)
check("pages identical to pre-test state", now == orig)

# logout
jreq("DELETE", "/api/admin/session")
print(f"\nRESULT: {PASS} passed, {FAIL} failed")
exit(1 if FAIL else 0)
