#!/usr/bin/env python3
"""Task 24 — retitle the National Salon project as "Ministry of Youth".

User request (Arabic): "In the title of the entrepreneurial girls'
exhibition, change it to 'Ministry of Youth' — better. And when they
enter, they find exactly the work of the exhibition."

So only the IDENTITY fields change (brand / shortName / monogram / logo /
tagline). The work itself stays exactly as-is: same id+URL
(/work/national-salon-annaba), same sections & media slots, same
description that names the salon, same user-set year and CMS edits
(uploaded logos, "2025 - 2026" years on other brands are preserved).
"""
import json

PATH = "content.json"

with open(PATH, encoding="utf-8") as f:
    data = json.load(f)

salon = next(p for p in data["projects"] if p["id"] == "national-salon-annaba")

changes = {
    "brand": "Ministry of Youth",
    "shortName": "Ministry of Youth",
    "logo": "/media/logos/ministry-of-youth.svg",
    "monogram": "MY",
    "tagline": "Sole content lead for the National Salon of Girls' Creativity — Annaba.",
}

for key, value in changes.items():
    before = salon.get(key)
    salon[key] = value
    print(f"salon.{key}: {before!r} -> {value!r}")

salon["preview"]["alt"] = "Ministry of Youth — National Salon, Annaba"
print("salon.preview.alt ->", salon["preview"]["alt"])

# ── invariants: the exhibition work must stay exactly reachable ──
assert salon["id"] == "national-salon-annaba", "URL slug must not change"
assert "National Salon of Girls' Creativity" in salon["description"]
assert len(salon["sections"]) == 3, "sections must stay (photography/films/published)"
assert salon["year"] == "2026", "user-set year must be kept"
print("invariants OK (id, description, 3 sections, year kept)")

# other brands untouched (esp. user's uploaded logos + years)
for p in data["projects"]:
    if p["id"] != "national-salon-annaba":
        print(f"  untouched: {p['id']} year={p['year']!r} logo={p['logo']!r}")

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write("\n")
print("saved", PATH)
