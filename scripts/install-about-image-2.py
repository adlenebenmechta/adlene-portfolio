#!/usr/bin/env python3
"""Install the new About portrait (B&W cutout, square 400x400):
2x Lanczos upscale for retina + mild sharpen, same path overwrite."""
from PIL import Image, ImageFilter, ImageEnhance

SRC = "/tmp/about-image-2"
OUT = "/home/z/my-project/public/media/portrait-director.jpg"

img = Image.open(SRC).convert("RGB")
w, h = img.size
print(f"source: {w}x{h}")

# 2x upscale for retina displays
img = img.resize((w * 2, h * 2), Image.LANCZOS)
# mild unsharp mask to recover crispness after upscale
img = img.filter(ImageFilter.UnsharpMask(radius=1.6, percent=68, threshold=2))
# keep it pure B&W as authored
img = ImageEnhance.Contrast(img).enhance(1.03)

img.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)

import os
print(f"saved: {OUT} ({os.path.getsize(OUT)//1024} KB, {img.size[0]}x{img.size[1]})")
