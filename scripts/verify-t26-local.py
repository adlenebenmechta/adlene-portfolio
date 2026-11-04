#!/usr/bin/env python3
"""Task 26 local verification — Thimar + Bona brands live, links exact,
chips clean, admin-safe. BASE-parameterized (default local)."""
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


THIMAR_IG = "https://www.instagram.com/thimar_dz/"
BONA_IG = "https://www.instagram.com/bona_algerie_officiel/?hl=fr"

# ── wordmark assets ─────────────────────────────────────────────
for asset in ["/media/logos/thimar.svg", "/media/logos/bona.svg"]:
    s, _ = get(asset)
    check(f"asset {asset} 200", s == 200, s)

# ── /work index ─────────────────────────────────────────────────
s, work = get("/work")
check("/work 200", s == 200, s)
check("Thimar title on /work", work.count(">Thimar<") >= 1, work.count(">Thimar<"))
check("Bona title on /work", work.count(">Bona<") >= 1, work.count(">Bona<"))
check("thimar box link", 'href="/work/thimar"' in work)
check("bona box link", 'href="/work/bona"' in work)
check("thimar logo (user upload, trimmed) on /work", "/media/logos/thimar.png" in work)
check("bona wordmark on /work", "/media/logos/bona.svg" in work)
check("thimar IG link exact", f'href="{THIMAR_IG}"' in work)
check("bona IG link exact (with ?hl=fr)", f'href="{BONA_IG}"' in work)
check("thimar chip text clean", re.search(r">instagram\.com/thimar_dz</span>", work) is not None)
check("bona chip text clean (no ?hl=fr)", re.search(r">instagram\.com/bona_algerie_officiel</span>", work) is not None)

# no query string should leak into VISIBLE text — strip scripts (Next.js
# embeds the content payload, which legitimately contains the URLs), styles,
# then all tag attributes
SCRIPT_RE = re.compile(r"<script[\s\S]*?</script>", re.IGNORECASE)
ATTR_RE = re.compile(r'\s(?:href|src|poster|action)="[^"]*"')


def visible_text(html):
    no_script = SCRIPT_RE.sub("", html)
    no_style = re.sub(r"<style[\s\S]*?</style>", "", no_script, flags=re.IGNORECASE)
    return ATTR_RE.sub("", no_style)


stripped = visible_text(work)
check("no ?hl=fr visible on /work", "?hl=fr" not in stripped)
check("no raw instagram URL visible on /work", "https://www.instagram" not in stripped)
check("8 boxes on /work", work.count('aria-label="Open the ') == 8, work.count('aria-label="Open the '))

# ── Thimar detail ───────────────────────────────────────────────
s, page = get("/work/thimar")
check("/work/thimar 200", s == 200, s)
check("Thimar <title>", "<title>Thimar — Adlene Benmechta</title>" in page)
check("Arabic name ثمار in description", "ثمار" in page)
check("restaurant industry", "Restaurant" in page)
check("IG link on detail (name)", f'href="{THIMAR_IG}"' in page)
check("sections present", all(x in page for x in ["Video Ads", "Static Ads &amp; Styles", "Results"]))
check("2 reel placeholders", page.count("9:16") >= 2, page.count("9:16"))
check("next-project nav → bona", 'href="/work/bona"' in page)
check("instagram URL only in attributes on detail",
      re.findall(r">[^<]*instagram[^<]*<", SCRIPT_RE.sub("", page)) == [])

# ── Bona detail ─────────────────────────────────────────────────
s, page = get("/work/bona")
check("/work/bona 200", s == 200, s)
check("Bona <title>", "<title>Bona — Adlene Benmechta</title>" in page)
check("soft-drinks industry", "Soft Drinks" in page)
check("IG link on detail (name + visit)", page.count(f'href="{BONA_IG}"') >= 2, page.count(f'href="{BONA_IG}"'))
stripped = visible_text(page)
check("no ?hl=fr visible on /work/bona", "?hl=fr" not in stripped)
check("next-project nav wraps to acf", 'href="/work/acf"' in page)

# ── home + all other routes still healthy ───────────────────────
s, home = get("/")
check("home 200", s == 200, s)
check("Thimar on home grid", ">Thimar<" in home)
check("Bona on home grid", ">Bona<" in home)

for route in ["/about", "/contact", "/work/acf", "/work/acf/2026", "/work/armoray",
              "/work/national-salon-annaba", "/work/gemstonewell", "/admin"]:
    s, _ = get(route)
    check(f"{route} 200", s == 200, s)

print()
if fails:
    print(f"FAILED: {len(fails)} — {fails}")
    sys.exit(1)
print("ALL CHECKS PASSED")
