#!/usr/bin/env python3
"""Task 24 local verification — Ministry of Youth retitle, exhibition work intact."""
import os
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


s, work = get("/work")
check("/work 200", s == 200)
check("card title 'Ministry of Youth' on /work", work.count("Ministry of Youth") >= 1,
      f"count={work.count('Ministry of Youth')}")
check("new wordmark used on /work", "/media/logos/ministry-of-youth.svg" in work)
check("old wordmark gone from /work", "/media/logos/salon-annaba.svg" not in work)
check("old long brand title gone from /work",
      "National Salon of Girls' Creativity &amp; Women Entrepreneurs" not in work
      and "National Salon of Girls' Creativity & Women Entrepreneurs" not in work)
check("salon context line on card (tagline)",
      "National Salon of Girls&#x27; Creativity" in work or "National Salon of Girls' Creativity" in work)
check("box links to the same work URL", 'href="/work/national-salon-annaba"' in work)
check("aria label uses new name", "Open the Ministry of Youth page" in work)

s, page = get("/work/national-salon-annaba")
check("detail page 200 (same URL)", s == 200)
check("H1 title 'Ministry of Youth'", "Ministry of Youth" in page)
check("title metadata", "<title>Ministry of Youth — Adlene Benmechta</title>" in page)
check("monogram MY tile", ">MY<" in page)
check("exhibition description intact",
      "The National Salon of Girls&#x27; Creativity and Women Entrepreneurs in Annaba" in page
      or "The National Salon of Girls' Creativity and Women Entrepreneurs in Annaba" in page)
check("role kept", "Sole Content Creator — Ministry of Youth Page" in page)
for label in ["Photography", "Films &amp; Coverage", "Published Content"]:
    check(f"section '{label}' present", label in page)
check("16:9 film slots kept", page.count("aspect-[16/9]") == 4)
check("9:16 reel slots absent on salon", "aspect-[9/16]" not in page)

s, home = get("/")
check("home 200", s == 200)
check("home grid shows 'Ministry of Youth'", "Ministry of Youth" in home)

s, prev = get("/work/gemstonewell")
check("previous project 200", s == 200)
check("next-nav now says 'Ministry of Youth'", "Ministry of Youth" in prev)

s, svg = get("/media/logos/ministry-of-youth.svg")
check("wordmark SVG served", s == 200 and "MINISTRY OF YOUTH" in svg)

s, arm = get("/work/armoray")
check("armoray page still 200", s == 200)
check("armoray untouched", "Armoray" in arm and "2025 - 2026" in arm)

print()
if fails:
    print(f"RESULT: {len(fails)} FAILED — {fails}")
    sys.exit(1)
print("RESULT: all checks passed")
