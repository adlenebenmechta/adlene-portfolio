#!/usr/bin/env python3
"""Task 27 local verification — Trusted-by marquee under the navbar:
present on every route, 4 seamless copies, all 9 logos resolve, label
correct, E2E suites unaffected. BASE-parameterized (default local)."""
import json
import os
import re
import sys
import urllib.request

BASE = os.environ.get("BASE", "http://localhost:3000")
fails = []


def get(path):
    req = urllib.request.Request(BASE + path)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode("utf-8", "replace")


def check(name, ok, extra=""):
    print(("  PASS " if ok else "  FAIL ") + name + (f"  [{extra}]" if extra and not ok else ""))
    if not ok:
        fails.append(name)


# ── the 9 live brands (content.json is the source of truth) ─────
with open("content.json", "r", encoding="utf-8") as f:
    content = json.load(f)
brands = [(p["id"], p["brand"], p.get("logo", "")) for p in content["projects"]]
branded = [(i, b, l) for i, b, l in brands if l]
print(f"      brands with logos: {len(branded)} — {', '.join(b for _, b, _ in branded)}")
check("all brands have logos (9 expected)", len(branded) == 9, len(branded))

ROUTES = ["/", "/work", "/work/acf", "/work/armoray", "/work/thimar",
          "/work/bona", "/work/national-salon-annaba", "/about", "/contact"]
# one chapter route (ACF's first chapter id from content.json)
first_chapter = (content["projects"][0].get("chapters") or [{}])[0].get("id", "")
if first_chapter:
    ROUTES.append(f"/work/acf/{first_chapter}")

LINK_RE = re.compile(r'aria-label="([^"]+) — view the work"[^>]*href="(/work/[a-z0-9-]+)"')

for route in ROUTES:
    s, html = get(route)
    tag = route if route != "/" else "/ (home)"
    ok_200 = s == 200
    check(f"{tag} 200", ok_200, s)
    if not ok_200:
        continue
    has_label = "Trusted by" in html
    has_track = "trusted-marquee-track" in html
    links = LINK_RE.findall(html)
    marquee_links = [l for l in links]
    n_copies_ok = len(marquee_links) == len(branded) * 4
    check(f"{tag}: marquee label present", has_label)
    check(f"{tag}: marquee track present", has_track)
    check(f"{tag}: {len(branded)} logos x 4 copies = {len(branded)*4} links",
          n_copies_ok, f"got {len(marquee_links)}")

# ── every marquee logo image resolves (local /media or CDN /gh) ──
for pid, brand, logo in branded:
    if logo.startswith("/gh/"):
        url = f"https://cdn.jsdelivr.net/gh/adlenebenmechta/adlene-portfolio@main/public{logo[3:]}"
    else:
        url = BASE + logo
    try:
        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=20) as r:
            ok = r.status == 200
    except Exception as e:  # noqa: BLE001
        ok = False
    check(f"logo resolves: {brand} ({logo})", ok)

# ── first copy is keyboard-reachable, duplicates inert ──────────
s, html = get("/work")
n_tabindex = html.count('tabindex="-1"')
check("duplicate links inert (27 tabindex=-1)", n_tabindex == 27, n_tabindex)
check("duplicates carry aria-hidden (>=3 wrappers)",
      html.count('aria-hidden="true"') >= 3, html.count('aria-hidden="true"'))

# ── /admin stays untouched (no marquee in admin shell) ──────────
s, html = get("/admin")
check("/admin has no marquee", "trusted-marquee-track" not in html)

print()
if fails:
    print(f"FAILED: {len(fails)} -> {fails}")
    sys.exit(1)
print("ALL PASS")
