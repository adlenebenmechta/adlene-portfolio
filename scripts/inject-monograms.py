#!/usr/bin/env python3
"""Task 20 fix — inject monogram field into content.json (after logo),
matching the new DEFAULT_CONTENT in site-content.ts."""
import json
from collections import OrderedDict

MONOGRAMS = {
    "acf": "ACF",
    "armoray": "A",
    "holystrips": "HS",
    "zero-trace": "ZT",
    "gemstonewell": "GW",
    "national-salon-annaba": "SA",
}

path = "/home/z/my-project/content.json"
data = json.load(open(path), object_pairs_hook=OrderedDict)

changed = 0
for proj in data["projects"]:
    mono = MONOGRAMS.get(proj.get("id"))
    if not mono:
        continue
    if proj.get("monogram") == mono:
        continue
    # rebuild with monogram inserted right after logo, preserving order
    out = OrderedDict()
    for k, v in proj.items():
        out[k] = v
        if k == "logo":
            out["monogram"] = mono
    if "logo" not in proj:
        proj["monogram"] = mono
    else:
        proj.clear()
        proj.update(out)
    changed += 1

with open(path, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write("\n")

print(f"monogram injected into {changed} projects")
verify = json.load(open(path))
print({p["id"]: p.get("monogram") for p in verify["projects"]})
