#!/usr/bin/env python3
"""Task 26 — serif wordmark SVGs for the two new brands (Thimar, Bona).
Same Georgia-serif template as scripts/make-brand-logos.py (task 20)."""
import os

LOGOS = "/home/z/my-project/public/media/logos"
os.makedirs(LOGOS, exist_ok=True)

TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} 120">
  <text x="{half}" y="74" text-anchor="middle" fill="{fill}" font-family="Georgia, 'Times New Roman', 'Noto Serif SC', serif" font-size="{size}" letter-spacing="{ls}" font-weight="500">{text}</text>
</svg>
"""

BRANDS = [
    ("thimar.svg", "THIMAR", 36, 13, "#EDEDED", 400),
    ("bona.svg",   "BONA",   48, 18, "#EDEDED", 300),
]

for fname, text, size, ls, fill, w in BRANDS:
    svg = TEMPLATE.format(w=w, half=w // 2, text=text, size=size, ls=ls, fill=fill)
    with open(os.path.join(LOGOS, fname), "w", encoding="utf-8") as f:
        f.write(svg)
    print("wrote", fname)
print("done")
