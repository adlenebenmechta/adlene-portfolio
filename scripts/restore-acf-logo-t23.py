#!/usr/bin/env python3
"""Task 23 — restore the ACF cutout logo that a stale-tab admin save reverted.

The user's Armoray-logo save (commit e93acd4) was made from a form state
loaded BEFORE task 22 set acf.logo -> /media/logos/acf.png, so the save
reverted ACF to the raw uploaded JPG (small logo + ugly box edges).
This restores the cutout while keeping everything else from the user's
save — including their new Armoray logo.
"""
import json

PATH = "content.json"

with open(PATH, encoding="utf-8") as f:
    data = json.load(f)

for p in data["projects"]:
    if p["id"] == "acf":
        before = p["logo"]
        p["logo"] = "/media/logos/acf.png"
        print(f"acf.logo: {before} -> {p['logo']}")
    if p["id"] == "armoray":
        print(f"armoray.logo (kept): {p['logo']}")

with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write("\n")
print("saved", PATH)
