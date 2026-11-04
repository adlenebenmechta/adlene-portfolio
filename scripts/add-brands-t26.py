#!/usr/bin/env python3
"""Task 26 — append the Thimar (restaurant) and Bona (soft drinks) brands
to content.json, mirroring the GemstoneWell structure (e-com rhythm:
Video Ads / Static Ads & Styles / Results, empty slots = placeholders)."""
import json

PATH = "/home/z/my-project/content.json"


def slots(n, type_, span):
    return [{"alt": "", "span": span, "src": "", "type": type_} for _ in range(n)]


def ecom_sections(v, s, r):
    return [
        {
            "id": "video-ads",
            "label": "Video Ads",
            "note": "Vertical 9:16 video creatives produced for the brand — paid social and the brand's own channels.",
            "media": slots(v, "video", "reel"),
        },
        {
            "id": "static-styles",
            "label": "Static Ads & Styles",
            "note": "Static creatives — feed posts, stories and display styles.",
            "media": slots(s, "image", "half"),
        },
        {
            "id": "results",
            "label": "Results",
            "note": "Campaign performance — the numbers behind the creatives.",
            "media": slots(r, "image", "half"),
        },
    ]


THIMAR = {
    "brand": "Thimar",
    "deliverables": [
        "Video ads — concept to final cut",
        "Static ad styles",
        "Social content",
    ],
    "description": "Thimar (ثمار) is a restaurant. I create the brand's video and static content for social — the dishes, the room and the moments around the table, shot to make people arrive hungry.",
    "id": "thimar",
    "index": "",
    "industry": "Restaurant",
    "location": "Algeria",
    "logo": "/media/logos/thimar.svg",
    "media": [],
    "monogram": "T",
    "preview": {"alt": "Thimar", "src": "", "type": "image"},
    "role": "Creative — Video & Static Ads",
    "sections": ecom_sections(2, 3, 2),
    "services": ["Video Ads", "Static Ads", "Social Content"],
    "shortName": "Thimar",
    "tagline": "A restaurant — plate by plate.",
    "website": "https://www.instagram.com/thimar_dz/",
    "year": "2026",
}

BONA = {
    "brand": "Bona",
    "deliverables": [
        "Video ads — concept to final cut",
        "Static ad styles",
        "Social content",
    ],
    "description": "Bona is an Algerian soft-drinks company. I create the brand's video and static content for social — product, refreshment and the brand's world, built to stop the scroll.",
    "id": "bona",
    "index": "",
    "industry": "Beverages — Soft Drinks",
    "location": "Algeria",
    "logo": "/media/logos/bona.svg",
    "media": [],
    "monogram": "B",
    "preview": {"alt": "Bona", "src": "", "type": "image"},
    "role": "Creative — Video & Static Ads",
    "sections": ecom_sections(2, 3, 2),
    "services": ["Video Ads", "Static Ads", "Social Content"],
    "shortName": "Bona",
    "tagline": "Soft drinks — served cold, shot bright.",
    "website": "https://www.instagram.com/bona_algerie_officiel/?hl=fr",
    "year": "2026",
}

with open(PATH, encoding="utf-8") as f:
    content = json.load(f)

projects = content["projects"]
ids = [p["id"] for p in projects]
assert "thimar" not in ids and "bona" not in ids, "brands already present"

projects.append(THIMAR)
projects.append(BONA)

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(content, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"added thimar + bona → {len(projects)} projects total")
for p in projects:
    print(f"  - {p['id']:24s} {p['brand']}")
