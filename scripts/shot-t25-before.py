"""Task 25 — capture current ACF 2026 chapter page + editions grid for design review."""
import asyncio, os, sys
from playwright.async_api import async_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")
OUT = "/home/z/my-project/scripts"
SHOTS = [
    ("acf-2026-top", f"{BASE}/work/acf/2026", 1440, 2400, 900),
    ("acf-2026-full", f"{BASE}/work/acf/2026", 1440, 6000, 2600),
    ("acf-editions", f"{BASE}/work/acf", 1440, 4200, 2200),
    ("acf-2026-mobile", f"{BASE}/work/acf/2026", 390, 3200, 1400),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, url, w, h, clip_h in SHOTS:
            page = await browser.new_page(viewport={"width": w, "height": min(h, 1200)})
            await page.goto(url, wait_until="networkidle")
            await page.wait_for_timeout(2500)
            await page.screenshot(path=f"{OUT}/t25-{name}.png", full_page=(h <= 2000))
            if h > 2000:
                await page.screenshot(path=f"{OUT}/t25-{name}.png", clip={"x": 0, "y": 0, "width": w, "height": clip_h})
            await page.close()
            print("saved", name)
        await browser.close()

asyncio.run(main())
