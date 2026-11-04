#!/usr/bin/env python3
"""Watch what the DEV SERVER (/work page) sees after a PUT — isolating
server-side fetch caching from CDN behavior."""
import json, time, urllib.request

BASE = "http://localhost:3000"
COOKIE = None

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

s, _ = req("POST", "/api/admin/session", {"password": "admin123"})
assert s == 200
s, raw = req("GET", "/api/admin/content")
content = json.loads(raw)
content["settings"]["email"] = "site-check@adlenebenmechta.com"
s, _ = req("PUT", "/api/admin/content", content)
print("PUT status", s, "— now polling /work html for the change marker")

# /work renders email? no — use footer email on /contact which shows settings.email
for i in range(12):
    time.sleep(5)
    s, html = req("GET", "/contact")
    html = html.decode() if isinstance(html, bytes) else ""
    has = "site-check" in html
    print(f"poll[{i+1}] /contact shows new email: {has}")
    if has:
        print("SERVER SEES UPDATE ✓")
        break

# restore
content["settings"]["email"] = "hello@adlenebenmechta.com"
s, _ = req("PUT", "/api/admin/content", content)
print("restored", s)
