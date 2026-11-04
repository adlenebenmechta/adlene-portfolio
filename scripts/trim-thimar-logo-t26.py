#!/usr/bin/env python3
"""Task 26 — trim the user's own transparent Thimar PNG (task-24 pattern).

The user uploaded thimar-logo-mw2mzrm8.png (2048x2048, transparent) for the
new Thimar restaurant brand. The canvas carries a large transparent margin
(content = 71.5% x 41.3%), which would render the mark small inside the
card's logo zone (the task-22 "too small" failure mode).

Keeps THEIR pixels — crop to the alpha bounding box + 4% pad, save as
public/media/logos/thimar.png (referenced by content.json + seeds).
"""
import os

import numpy as np
from PIL import Image

SRC = "public/media/uploads/thimar-logo-mw2mzrm8.png"
OUT = "public/media/logos/thimar.png"

im = Image.open(SRC)
a = np.asarray(im)
alpha = a[..., 3]
ys, xs = np.where(alpha > 128)
x0, x1 = xs.min(), xs.max() + 1
y0, y1 = ys.min(), ys.max() + 1
pad_x = int(0.04 * (x1 - x0))
pad_y = int(0.04 * (y1 - y0))
x0, x1 = max(x0 - pad_x, 0), min(x1 + pad_x, a.shape[1])
y0, y1 = max(y0 - pad_y, 0), min(y1 + pad_y, a.shape[0])

res = im.crop((x0, y0, x1, y1))
print(f"trimmed: {im.size} -> {res.size} (content {x1-x0}x{y1-y0} + 4% pad)")

res.save(OUT, optimize=True)
size_kb = os.path.getsize(OUT) // 1024
print(f"saved {OUT}  {res.size[0]}x{res.size[1]}  {size_kb} KB")

if size_kb > 900:
    scale = min(1.0, 1200 / max(res.size))
    res = res.resize((round(res.size[0] * scale), round(res.size[1] * scale)), Image.LANCZOS)
    res.save(OUT, optimize=True)
    print(f"downscaled -> {res.size}  {os.path.getsize(OUT)//1024} KB")

# QA composite on the card background, logo at zone height
import math
CARD_W, CARD_H = 460, 575
card = Image.new("RGB", (CARD_W, CARD_H), (10, 10, 11))
sh = Image.new("L", (CARD_W, CARD_H), 0)
for yy in range(CARD_H):
    for xx in range(0, CARD_W, 2):
        dx = (xx - CARD_W / 2) / (CARD_W * 0.30)
        dy = (yy - CARD_H * 0.34) / (CARD_H * 0.25)
        v = max(0, 1 - math.sqrt(dx * dx + dy * dy)) ** 2 * 18
        sh.putpixel((xx, yy), int(v))
        if xx + 1 < CARD_W:
            sh.putpixel((xx + 1, yy), int(v))
card = Image.composite(Image.new("RGB", card.size, (255, 255, 255)), card, sh)
zone_h = int(CARD_H * 0.62)
lh = int(zone_h * 0.72)
lw = int(res.size[0] * lh / res.size[1])
if lw > CARD_W * 0.86:  # wide logo — fit by width instead
    lw = int(CARD_W * 0.86)
    lh = int(res.size[1] * lw / res.size[0])
logo = res.resize((lw, lh), Image.LANCZOS)
card.paste(logo, ((CARD_W - lw) // 2, int(CARD_H * 0.31) - lh // 2), logo)
card.save("scripts/t26-thimar-trim-qa.png", quality=92)
print("QA composite: scripts/t26-thimar-trim-qa.png")
