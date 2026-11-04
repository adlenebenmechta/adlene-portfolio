#!/usr/bin/env python3
"""Task 24 — cut the white background out of the user's uploaded
Ministry of Youth emblem (PNG, 2048x2048, plain white bg) so it floats
cleanly on the dark /work cards (same treatment as the task-22 ACF logo).

Matte logic:
  - near-white pixels CONNECTED TO THE BORDER  -> background (transparent)
  - white areas ENCLOSED by the line art       -> kept (part of the emblem)
  - anti-aliased boundary band                 -> alpha from distance-to-white,
                                                  colors unmixed against white
  - stray specks                               -> connected-component size filter
Then: crop to content + 4% pad, downscale to <=1200px, save PNG,
render a QA composite on the card background.
"""
import math

import numpy as np
from PIL import Image
from scipy import ndimage

SRC = "public/media/uploads/minestry-of-youth-mw2eqx3x.png"
OUT = "public/media/logos/ministry-of-youth.png"
QA = "scripts/shot-t24-ministry-cutout-qa.png"

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.float32)
H, W = a.shape[:2]
mn = a.min(axis=2)  # whiteness measure: white bg -> 255

# ── 1. background = near-white components that touch the border ──
whiteish = mn >= 235
lbl, n = ndimage.label(whiteish)
border_labels = set(np.unique(np.concatenate([lbl[0], lbl[-1], lbl[:, 0], lbl[:, -1]])))
border_labels.discard(0)
bg = np.isin(lbl, list(border_labels))
print(f"white components: {n}, border-connected (bg): {len(border_labels)}, "
      f"bg coverage: {bg.mean():.1%}")

# ── 2. boundary band: 3px around the background ──
band = ndimage.binary_dilation(bg, iterations=3) & ~bg


def smoothstep(x, e0, e1):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


# distance from white: 0 = pure white, ~0.84 = ochre, 1.0 = red/green
d = 1.0 - mn / 255.0
alpha_band = smoothstep(d, 0.04, 0.35)

alpha = np.ones((H, W), dtype=np.float32)
alpha[bg] = 0.0
alpha[band] = alpha_band[band]

# ── 3. unmix band colors against white (kill the light halo) ──
out = a.copy()
band_idx = alpha > 0.02
al = np.maximum(alpha, 1e-4)[band_idx][..., None]
unmixed = (a[band_idx] - (1.0 - al) * 255.0) / al
out[band_idx] = np.clip(unmixed, 0, 255)

# ── 4. despeckle: drop tiny opaque islands (< 250 px) ──
lbl2, n2 = ndimage.label(alpha > 0.5)
if n2:
    sizes = ndimage.sum(alpha > 0.5, lbl2, range(1, n2 + 1))
    keep = np.zeros(n2 + 1, dtype=bool)
    keep[1:][sizes >= 250] = True
    drop = ~keep[lbl2]
    alpha[drop] = 0.0
    print(f"components: {n2}, dropped specks: {int((sizes < 250).sum())}")

# ── 5. crop to content + 4% padding ──
ys, xs = np.where(alpha > 0.5)
pad_x = int(0.04 * (xs.max() - xs.min() + 1))
pad_y = int(0.04 * (ys.max() - ys.min() + 1))
x0, x1 = max(xs.min() - pad_x, 0), min(xs.max() + pad_x, W - 1)
y0, y1 = max(ys.min() - pad_y, 0), min(ys.max() + pad_y, H - 1)

rgba = np.dstack([out, alpha * 255])[y0:y1 + 1, x0:x1 + 1].astype(np.uint8)
res = Image.fromarray(rgba, "RGBA")

# ── 6. downscale to max 1200px on the long side ──
scale = min(1.0, 1200 / max(res.size))
if scale < 1.0:
    res = res.resize((round(res.size[0] * scale), round(res.size[1] * scale)), Image.LANCZOS)
res.save(OUT, optimize=True)
import os
print(f"saved {OUT}  {res.size[0]}x{res.size[1]}  {os.path.getsize(OUT)//1024} KB")

# ── QA composite: emblem on the card background at box scale ──
CARD_W, CARD_H = 460, 575
card = Image.new("RGB", (CARD_W, CARD_H), (10, 10, 11))
sh = Image.new("L", (CARD_W, CARD_H), 0)
for yy in range(CARD_H):
    for xx in range(0, CARD_W, 2):
        dx, dy = (xx - CARD_W / 2) / (CARD_W * 0.30), (yy - CARD_H * 0.34) / (CARD_H * 0.25)
        dist = math.sqrt(dx * dx + dy * dy)
        v = max(0, 1 - dist) ** 2 * 18
        sh.putpixel((xx, yy), int(v))
        if xx + 1 < CARD_W:
            sh.putpixel((xx + 1, yy), int(v))
card = Image.composite(Image.new("RGB", card.size, (255, 255, 255)), card, sh)

# square-ish logo: height-limited to 72% of the top-62% zone
zone_h = int(CARD_H * 0.62)
lh = int(zone_h * 0.72)
lw = int(res.size[0] * lh / res.size[1])
logo = res.resize((lw, lh), Image.LANCZOS)
card.paste(logo, ((CARD_W - lw) // 2, int(CARD_H * 0.31) - lh // 2), logo)
card.save(QA, quality=92)
print(f"QA composite: {QA}")
