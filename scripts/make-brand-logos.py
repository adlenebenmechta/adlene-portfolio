#!/usr/bin/env python3
"""Generate elegant serif wordmark SVGs for the six new brands."""
import os

LOGOS = "/home/z/my-project/public/media/logos"
os.makedirs(LOGOS, exist_ok=True)

TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} 120">
  <text x="{half}" y="74" text-anchor="middle" fill="{fill}" font-family="Georgia, 'Times New Roman', 'Noto Serif SC', serif" font-size="{size}" letter-spacing="{ls}" font-weight="500">{text}</text>
</svg>
"""

BRANDS = [
    ("acf.svg",           "ACF",             44, 14, "#EDEDED", 260),
    ("armoray.svg",       "ARMORAY",         34, 12, "#EDEDED", 420),
    ("holystrips.svg",    "HOLYSTRIPS",      32, 10, "#EDEDED", 460),
    ("zero-trace.svg",    "ZERO TRACE",      32, 10, "#EDEDED", 440),
    ("gemstonewell.svg",  "GEMSTONE WELL",   27,  8, "#EDEDED", 480),
    ("salon-annaba.svg",  "SALON · ANNABA",  26,  8, "#E8E4DC", 480),
]

for fname, text, size, ls, fill, w in BRANDS:
    svg = TEMPLATE.format(w=w, half=w // 2, text=text, size=size, ls=ls, fill=fill)
    with open(os.path.join(LOGOS, fname), "w", encoding="utf-8") as f:
        f.write(svg)
    print("wrote", fname)
print("done")
