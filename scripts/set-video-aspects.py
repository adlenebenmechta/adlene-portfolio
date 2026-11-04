#!/usr/bin/env python3
"""Task 21 — video slot aspect ratios.

User: all videos will be 9:16 vertical, EXCEPT the National Salon (Girls'
Creativity) videos which are horizontal.

Patch content.json (the live source of truth):
  * every video slot in every project except national-salon-annaba
    → span "reel" (9:16 vertical)
  * national-salon-annaba films section → 4 × span "landscape" (16:9)
  * section labels/notes updated to state the expected format
Everything else is preserved byte-for-byte where possible.
"""

import json
from collections import OrderedDict

PATH = "/home/z/my-project/content.json"
SALON = "national-salon-annaba"

with open(PATH, encoding="utf-8") as f:
    data = json.load(f, object_pairs_hook=OrderedDict)

changed = []

def patch_media(media, where):
    for m in media:
        if m.get("type") == "video" and m.get("span") != "reel":
            m["span"] = "reel"
            changed.append(f"{where}: video span → reel")

for p in data["projects"]:
    pid = p["id"]
    for s in p.get("sections") or []:
        if pid == SALON and s.get("id") == "films":
            # rebuild as 4 horizontal 16:9 slots
            s["label"] = "Films & Coverage"
            s["note"] = "Horizontal 16:9 video coverage published during the event."
            s["media"] = [
                OrderedDict([("type", "video"), ("src", ""), ("alt", ""), ("span", "landscape")])
                for _ in range(4)
            ]
            changed.append(f"{pid}/films: → 4 × landscape 16:9, label 'Films & Coverage'")
            continue
        if s.get("id") == "video-ads":
            s["note"] = "Vertical 9:16 video creatives produced for the brand — paid social and the brand's own channels."
        patch_media(s["media"], f"{pid}/{s['id']}")
    for ch in p.get("chapters") or []:
        for s in ch.get("sections") or []:
            if pid == "acf" and s.get("id") == "coverage":
                s["note"] = "Content created and published live from the exhibition floor — vertical 9:16 films and photos."
            if pid == "acf" and s.get("id") == "films":
                s["note"] = "Vertical 9:16 video content from the edition."
            patch_media(s["media"], f"{pid}/{ch['id']}/{s['id']}")

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"{len(changed)} slot updates")
for c in changed:
    print(" -", c)

# verify
with open(PATH, encoding="utf-8") as f:
    check = json.load(f)
print("\n-- verification --")
for p in check["projects"]:
    for s in p.get("sections") or []:
        print(f"  {p['id']:24s} {s['id']:14s} {[(m['type'], m['span']) for m in s['media']]}")
    for ch in p.get("chapters") or []:
        for s in ch.get("sections") or []:
            print(f"  {p['id']}/{ch['id']:<7s} {s['id']:14s} {[(m['type'], m['span']) for m in s['media']]}")
