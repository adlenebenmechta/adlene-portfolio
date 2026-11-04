#!/usr/bin/env python3
"""E2E test: add a test brand via the admin API, verify, then clean up."""
import json, time, urllib.request

BASE = "http://localhost:3000"
COOKIE = None

def req(method: str, path: str, body=None, raw=None, ctype="application/json"):
    global COOKIE
    r = urllib.request.Request(BASE + path, method=method)
    if COOKIE:
        r.add_header("Cookie", COOKIE)
    data = None
    if body is not None:
        data = json.dumps(body).encode()
        r.add_header("Content-Type", ctype)
    if raw is not None:
        data = raw
    try:
        with urllib.request.urlopen(r, data=data, timeout=60) as resp:
            sc = resp.headers.get("set-cookie")
            if sc and sc.startswith("cms_auth="):
                COOKIE = sc.split(";")[0]
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()

def jbody(status, raw):
    if not raw:
        return status, None
    try:
        return status, json.loads(raw)
    except Exception:
        return status, raw.decode()[:200]

# 1. login
s, r = jbody(*req("POST", "/api/admin/session", {"password": "admin123"}))
assert s == 200, (s, r)
print("login ✓")

# 2. get current content
s, content = jbody(*req("GET", "/api/admin/content"))
assert s == 200, (s, content)
print("content read ✓", len(content["projects"]), "projects")

# 3. add test brand
test = {
    "id": "test-brand-e2e",
    "index": "06",
    "brand": "Test Brand E2E",
    "shortName": "Test",
    "logo": "/gh/media/uploads/test-upload-mujybcp5.jpg",
    "tagline": "A temporary brand added by the automated test.",
    "industry": "Testing",
    "location": "Sandbox, DZ",
    "year": "2026",
    "services": ["Testing", "Automation"],
    "role": "Tester",
    "description": "This brand exists only to verify the admin panel end-to-end. It should appear on /work and its own case study page, then be removed.",
    "deliverables": ["A passing test"],
    "preview": {"type": "image", "src": "/gh/media/uploads/test-upload-mujybcp5.jpg", "alt": "Test brand preview"},
    "media": [{"type": "image", "src": "/gh/media/uploads/test-upload-mujybcp5.jpg", "alt": "Test media", "span": "full"}],
}
content["projects"].append(test)
s, r = jbody(*req("PUT", "/api/admin/content", content))
assert s == 200, (s, r)
print("content PUT (add brand) ✓")

# 4. wait for raw.githubusercontent propagation + server cache expiry
deadline = time.time() + 180
ok_brand = ok_page = ok_footer = False
while time.time() < deadline and not (ok_brand and ok_page):
    time.sleep(6)
    s, html = req("GET", "/work")
    html = html.decode() if isinstance(html, bytes) else ""
    ok_brand = ok_brand or "Test Brand E2E" in html
    s2, html2 = req("GET", "/work/test-brand-e2e")
    html2 = html2.decode() if isinstance(html2, bytes) else ""
    ok_page = ok_page or (s2 == 200 and "Test Brand E2E" in html2)
    print(f"  poll: /work has brand={ok_brand}, case page ok={ok_page}")
print("site reflects new brand ✓" if (ok_brand and ok_page) else "!! SITE DID NOT UPDATE")

# 5. remove test brand
s, content2 = jbody(*req("GET", "/api/admin/content"))
content2["projects"] = [p for p in content2["projects"] if p["id"] != "test-brand-e2e"]
s, r = jbody(*req("PUT", "/api/admin/content", content2))
assert s == 200, (s, r)
print("cleanup PUT (remove brand) ✓")

time.sleep(8)
s, html = req("GET", "/work")
html = html.decode() if isinstance(html, bytes) else ""
print("brand removed from site ✓" if "Test Brand E2E" not in html else "!! still visible (raw cache lag)")
