#!/usr/bin/env python3
"""Direct CDN propagation test: PUT then watch jsDelivr + raw directly."""
import json, time, urllib.request

BASE = "http://localhost:3000"

def req(method, path, body=None):
    global COOKIE
    r = urllib.request.Request(BASE + path, method=method)
    if COOKIE:
        r.add_header("Cookie", COOKIE)
    data = json.dumps(body).encode() if body is not None else None
    if data:
        r.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(r, data=data, timeout=60) as resp:
            sc = resp.headers.get("set-cookie")
            if sc and sc.startswith("cms_auth="):
                COOKIE = sc.split(";")[0]
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()

COOKIE = None
s, _ = req("POST", "/api/admin/session", {"password": "admin123"})
assert s == 200

s, raw = req("GET", "/api/admin/content")
content = json.loads(raw)
content["settings"]["email"] = "probe-test@adlenebenmechta.com"
s, _ = req("PUT", "/api/admin/content", content)
print("PUT done at", time.strftime("%H:%M:%S"), "status", s)

for i in range(15):
    time.sleep(4)
    js = json.loads(urllib.request.urlopen(
        "https://cdn.jsdelivr.net/gh/adlenebenmechta/adlene-portfolio@main/content.json", timeout=10).read())
    rawg = json.loads(urllib.request.urlopen(
        "https://raw.githubusercontent.com/adlenebenmechta/adlene-portfolio/main/content.json", timeout=10).read())
    print(f"poll[{i+1}] jsdelivr={'probe' if 'probe' in js['settings']['email'] else 'old'}  raw={'probe' if 'probe' in rawg['settings']['email'] else 'old'}")
    if "probe" in js["settings"]["email"] and "probe" in rawg["settings"]["email"]:
        print("BOTH PROPAGATED ✓")
        break

# restore
content["settings"]["email"] = "hello@adlenebenmechta.com"
s, _ = req("PUT", "/api/admin/content", content)
print("restored, status", s)
time.sleep(6)
js = json.loads(urllib.request.urlopen(
    "https://cdn.jsdelivr.net/gh/adlenebenmechta/adlene-portfolio@main/content.json", timeout=10).read())
print("jsdelivr after restore:", js["settings"]["email"])
