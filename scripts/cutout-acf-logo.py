#!/usr/bin/env python3
"""Task 22 — turn the uploaded ACF logo (JPG, dark purple gradient bg)
into a transparent PNG that floats cleanly on the site's dark cards.

Matte logic (from pixel analysis):
  - white "ACF" text      → luminance ramp
  - cyan/blue circuit mark → B-brightness × G/B ratio × (B−R) ramps
  - purple bg / glow      → fails G/B test → transparent
  - sparkle specks        → connected-component size filter
Then: mild defringe, crop to content + 4% pad, save PNG,
and render a QA composite on the card background.
"""

import numpy as np
from PIL import Image

SRC = "public/media/uploads/acf-logo-mw2at0n5.jpg"
OUT = "public/media/logos/acf.png"
QA = "scripts/shot-t22-acf-cutout-qa.png"

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.float32) / 255.0
R, G, B = a[..., 0], a[..., 1], a[..., 2]
Y = 0.2126 * R + 0.7152 * G + 0.0722 * B


def smoothstep(x, e0, e1):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


# white text
a_white = smoothstep(Y, 0.55, 0.78)
# blue mark: B dominant, G/B high (cyan-ish), clearly B>R
gb = G / np.maximum(B, 0.02)
a_blue = (
    smoothstep(B, 0.45, 0.62)
    * smoothstep(gb, 0.35, 0.55)
    * smoothstep(B - R, 0.10, 0.25)
)
alpha = np.maximum(a_white, a_blue)

# ── connected-component filter: drop specks (< 600 px at full res) ──
from scipy import ndimage

lbl, n = ndimage.label(alpha > 0.35)
sizes = ndimage.sum(alpha > 0.35, lbl, range(1, n + 1))
keep = np.zeros(n + 1, dtype=bool)
keep[1:][sizes >= 600] = True
mask = keep[lbl]
# soften: keep original alpha inside kept components only
alpha = np.where(mask, alpha, np.minimum(alpha, 0.0))

# tiny residual noise pass
lbl2, n2 = ndimage.label(alpha > 0.05)
if n2:
    sizes2 = ndimage.sum(alpha > 0.05, lbl2, range(1, n2 + 1))
    keep2 = np.zeros(n2 + 1, dtype=bool)
    keep2[1:][sizes2 >= 600] = True
    alpha = np.where(keep2[lbl2], alpha, 0)

# ── defringe: kill the purple edge halo around white text ──
fringe = (alpha > 0.02) & (alpha < 0.98)
Rd = R.copy()
Rd[fringe] = np.minimum(R[fringe], G[fringe] * 1.12)
out_rgb = np.stack([Rd, G, B], axis=-1)

# ── crop to content + 4% padding ──
ys, xs = np.where(alpha > 0.10)
pad_x = int(0.04 * (xs.max() - xs.min() + 1))
pad_y = int(0.04 * (ys.max() - ys.min() + 1))
x0, x1 = max(xs.min() - pad_x, 0), min(xs.max() + pad_x, a.shape[1] - 1)
y0, y1 = max(ys.min() - pad_y, 0), min(ys.max() + pad_y, a.shape[0] - 1)

rgba = np.dstack([out_rgb, alpha])[y0:y1 + 1, x0:x1 + 1]
rgba8 = (np.clip(rgba, 0, 1) * 255).astype(np.uint8)
res = Image.fromarray(rgba8, "RGBA")
res.save(OUT, optimize=True)
print(f"saved {OUT}  {res.size[0]}x{res.size[1]}")
import os
print(f"size: {os.path.getsize(OUT)//1024} KB  opaque px: {100*(alpha>0.5).mean():.1f}% of bbox")

# ── QA composite: logo on the card background, at box scale ──
CARD_W, CARD_H = 460, 575  # 4:5 box at ~1440 viewport
card = Image.new("RGB", (CARD_W, CARD_H), (10, 10, 11))
# studio sheen
sh = Image.new("L", (CARD_W, CARD_H), 0)
import math
for yy in range(CARD_H):
    for xx in range(0, CARD_W, 2):
        dx, dy = (xx - CARD_W / 2) / (CARD_W * 0.30), (yy - CARD_H * 0.42) / (CARD_H * 0.25)
        d = math.sqrt(dx * dx + dy * dy)
        v = max(0, 1 - d) ** 2 * 18
        sh.putpixel((xx, yy), int(v))
        if xx + 1 < CARD_W:
            sh.putpixel((xx + 1, yy), int(v))
card = Image.composite(Image.new("RGB", card.size, (255, 255, 255)), card, sh.point(lambda v: v))

lw = int(CARD_W * 0.72)
lh = int(res.size[1] * lw / res.size[0])
if lh > int(CARD_H * 0.46):
    lh = int(CARD_H * 0.46)
    lw = int(res.size[0] * lh / res.size[1])
logo = res.resize((lw, lh), Image.LANCZOS)
card.paste(logo, ((CARD_W - lw) // 2, int(CARD_H * 0.40) - lh // 2), logo)
card.save(QA, quality=92)
print(f"QA composite: {QA}")
