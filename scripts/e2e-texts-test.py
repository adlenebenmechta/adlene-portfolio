#!/usr/bin/env python3
"""Local E2E for the TEXTS feature: edit about headline + hero name via API,
verify the site reflects them, then revert everything.

Invisible-marker edition: instead of writing fake visible text ("Test Name
E2E" etc.) onto the live site, we append a zero-width space (U+200B) to the
REAL values. Visitors never see any difference, while the HTML checks still
prove the edit propagated to every render location (hero, footer, curtain,
about). Revert restores the exact pre-test values captured at start.
"""
import json, time, urllib.request, urllib.error, os, pathlib

import sys as _sys
BASE = _sys.argv[1] if len(_sys.argv) > 1 else "https://adlene-portfolio-production-b8e6.up.railway.app"
PASSWORD = None
for _line in open(os.path.join(os.path.dirname(__file__), "railway.env")):
    if _line.startswith("ADMIN_PASSWORD="):
        PASSWORD = _line.strip().split("=", 1)[1].strip('"\'')
COOKIE = None
PASS = FAIL = 0

# invisible edit marker — survives JSON, JS trim() and HTML rendering,
# but has zero visual width, so the live site never shows fake text
ZWSP = "\u200b"

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

# capture the real values — revert restores exactly these
real_headline = content["pages"]["about"]["headline"]
real_name = content["pages"]["home"]["heroName"]
real_tagline = content["pages"]["footer"]["tagline"]
print(f"      captured: name={real_name!r}")

# edit: append the invisible marker to each REAL value — no visible change
content["pages"]["about"]["headline"] = real_headline + ZWSP
content["pages"]["home"]["heroName"] = real_name + ZWSP
content["pages"]["footer"]["tagline"] = real_tagline + ZWSP
s, r = jreq("PUT", "/api/admin/content", content)
check("PUT with marker-suffixed texts", s == 200, r)

ok_head = ok_name = ok_tag = False
t0 = time.time()
while time.time() - t0 < 90 and not (ok_head and ok_name and ok_tag):
    time.sleep(5)
    _, h = req("GET", "/about"); h = h.decode() if isinstance(h, bytes) else ""
    ok_head = ok_head or (real_headline + ZWSP) in h
    _, h2 = req("GET", "/"); h2 = h2.decode() if isinstance(h2, bytes) else ""
    ok_name = ok_name or (real_name + ZWSP) in h2
    ok_tag = ok_tag or (real_tagline + ZWSP) in h2
    print(f"      poll({int(time.time()-t0)}s): about={ok_head} heroName={ok_name} tagline={ok_tag}")
check("marked About headline live on /about", ok_head)
check("marked hero name live on / (hero + footer)", ok_name)
check("marked footer tagline live", ok_tag)

# no visible fake text ever hit the page
_, h_check = req("GET", "/"); h_check = h_check.decode() if isinstance(h_check, bytes) else ""
check("no fake E2E text visible on /", "Test Name E2E" not in h_check and "Edited tagline" not in h_check)

# signature on curtain uses heroName too (rendered server-side)
_, h3 = req("GET", "/work"); h3 = h3.decode() if isinstance(h3, bytes) else ""
check("curtain signature follows heroName", (real_name + ZWSP) in h3)

# revert — restore the exact captured originals
s, c2 = jreq("GET", "/api/admin/content")
c2["pages"]["about"]["headline"] = real_headline
c2["pages"]["home"]["heroName"] = real_name
c2["pages"]["footer"]["tagline"] = real_tagline
s, r = jreq("PUT", "/api/admin/content", c2)
check("revert PUT", s == 200, r)

ok = False; t0 = time.time()
while time.time() - t0 < 90 and not ok:
    time.sleep(5)
    _, h = req("GET", "/about"); h = h.decode() if isinstance(h, bytes) else ""
    ok = (real_headline + ZWSP) not in h and real_headline in h
check("reverted live", ok)

# final integrity: pages identical to original
s, c3 = jreq("GET", "/api/admin/content")
now = json.dumps(c3.get("pages", {}), sort_keys=True)
check("pages identical to pre-test state", now == orig)

# logout
jreq("DELETE", "/api/admin/session")
print(f"\nRESULT: {PASS} passed, {FAIL} failed")
exit(1 if FAIL else 0)
