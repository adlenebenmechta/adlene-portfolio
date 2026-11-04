"""Task 25 — TEMPORARY test documents (badge + certificate) for local visual QA.
Mimics what the user will upload: a portrait event badge and a landscape
certificate, both light documents on cream. NOT for production."""
from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/truetype/chinese/NotoSansSC-Regular.ttf"
serif = None
for cand in [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
]:
    try:
        ImageFont.truetype(cand, 40)
        serif = cand
        break
    except Exception:
        pass

def font(size, bold=False):
    path = serif or FONT
    if bold and serif:
        path = serif.replace("DejaVuSerif.ttf", "DejaVuSerif-Bold.ttf")
    return ImageFont.truetype(path, size)

# ── 1) Event badge — portrait card, like an ID/accreditation badge ──
W, H = 700, 1000
img = Image.new("RGB", (W, H), "#F6F3EA")
d = ImageDraw.Draw(img)
# header band
d.rectangle([0, 0, W, 150], fill="#1d2f4e")
d.text((W // 2, 75), "ACF", anchor="mm", font=font(64, bold=True), fill="#F6F3EA")
d.text((W // 2, 122), "ANNUAL CREATIVE FORUM", anchor="mm", font=font(20), fill="#c9d4e8")
# photo placeholder
d.rounded_rectangle([W // 2 - 130, 210, W // 2 + 130, 470], 12, outline="#b9b2a0", width=2)
d.text((W // 2, 340), "PHOTO", anchor="mm", font=font(28), fill="#b9b2a0")
# name + role
d.text((W // 2, 540), "ADLENE BENMECHTA", anchor="mm", font=font(38, bold=True), fill="#22201b")
d.text((W // 2, 600), "TEAM MANAGER", anchor="mm", font=font(30), fill="#8a8474")
# divider
d.line([120, 660, W - 120, 660], fill="#b9b2a0", width=2)
# details
for i, (k, v) in enumerate([("EDITION", "2026"), ("ACCESS", "ALL AREAS"), ("DAYS", "3")]):
    x = 120 + i * ((W - 240) // 3)
    d.text((x, 710), k, anchor="lm", font=font(18), fill="#8a8474")
    d.text((x, 745), v, anchor="lm", font=font(26, bold=True), fill="#22201b")
# footer band
d.rectangle([0, H - 90, W, H], fill="#1d2f4e")
d.text((W // 2, H - 45), "OFFICIAL STAFF ACCREDITATION", anchor="mm", font=font(20), fill="#c9d4e8")
img.save("/home/z/my-project/public/media/uploads/test-badge-t25.png")

# ── 2) Certificate — landscape A4-ish ──
W, H = 1400, 1000
img = Image.new("RGB", (W, H), "#F8F5EC")
d = ImageDraw.Draw(img)
# double border
d.rectangle([50, 50, W - 50, H - 50], outline="#a3552e", width=6)
d.rectangle([72, 72, W - 72, H - 72], outline="#c8a06a", width=2)
d.text((W // 2, 190), "CERTIFICATE OF APPRECIATION", anchor="mm", font=font(52, bold=True), fill="#22201b")
d.text((W // 2, 260), "ANNUAL CREATIVE FORUM \u00b7 2026 EDITION", anchor="mm", font=font(24), fill="#8a8474")
d.line([W // 2 - 220, 310, W // 2 + 220, 310], fill="#c8a06a", width=2)
d.text((W // 2, 400), "This certificate is proudly presented to", anchor="mm", font=font(26), fill="#55503f")
d.text((W // 2, 490), "ADLENE BENMECHTA", anchor="mm", font=font(72, bold=True), fill="#1d2f4e")
d.text((W // 2, 590), "in recognition of outstanding leadership as TEAM MANAGER", anchor="mm", font=font(26), fill="#55503f")
d.text((W // 2, 630), "across the three days of the exhibition.", anchor="mm", font=font(26), fill="#55503f")
# signature lines
d.line([240, 790, 520, 790], fill="#55503f", width=2)
d.text((380, 815), "Forum Director", anchor="mm", font=font(20), fill="#8a8474")
d.line([W - 520, 790, W - 240, 790], fill="#55503f", width=2)
d.text((W - 380, 815), "Annaba, 2026", anchor="mm", font=font(20), fill="#8a8474")
# seal
d.ellipse([W // 2 - 70, 730, W // 2 + 70, 870], outline="#a3552e", width=4)
d.text((W // 2, 800), "ACF", anchor="mm", font=font(34, bold=True), fill="#a3552e")
img.save("/home/z/my-project/public/media/uploads/test-certificate-t25.png")
print("test documents created")
