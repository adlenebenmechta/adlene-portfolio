#!/usr/bin/env python3
"""Task 24 (final) — trim the user's own transparent Ministry of Youth PNG.

The user removed the white background themselves (clean result, VLM-verified)
and set the logo to /gh/media/uploads/minestry-of-youth-mw2etod2.png — but
that file carries ~24% empty transparent margin on a 2048x2048 canvas, which
would render the emblem visibly smaller inside the card's logo zone (the
task-22 complaint was exactly a too-small logo).

This keeps THEIR pixels (their background removal, no re-matting):
  - crop to the alpha bounding box + 4% pad
  - no resampling unless the file stays > 900 KB (then max side 1200, LANCZOS)
  - save as public/media/logos/ministry-of-youth.png (same path the seeds and
    content.json already reference)
"""
import os

import numpy as np
from PIL import Image

SRC = "public/media/uploads/minestry-of-youth-mw2etod2.png"
OUT = "public/media/logos/ministry-of-youth.png"

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

# QA composite on the card background, emblem at zone height
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
logo = res.resize((lw, lh), Image.LANCZOS)
card.paste(logo, ((CARD_W - lw) // 2, int(CARD_H * 0.31) - lh // 2), logo)
card.save("scripts/shot-t24-ministry-trim-qa.png", quality=92)
print("QA composite: scripts/shot-t24-ministry-trim-qa.png")
