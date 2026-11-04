"""Task 26 — scrolled screenshots of the work grid + new brand boxes."""
import asyncio
import os
from playwright.async_api import async_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")
OUT = "/home/z/my-project/scripts"


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1600, "height": 1000})

        await page.goto(f"{BASE}/work", wait_until="load")
        await page.wait_for_timeout(3500)
        # scroll to the grid (below the hero)
        boxes = page.locator('a[aria-label^="Open the "]')
        n = await boxes.count()
        print("boxes:", n)
        await boxes.nth(6).scroll_into_view_if_needed()  # Thimar (0-indexed)
        await page.wait_for_timeout(1500)
        await page.screenshot(path=f"{OUT}/t26-work-grid.png")

        # detail pages
        await page.goto(f"{BASE}/work/thimar", wait_until="load")
        await page.wait_for_timeout(2500)
        await page.screenshot(path=f"{OUT}/t26-thimar.png")

        await page.goto(f"{BASE}/work/bona", wait_until="load")
        await page.wait_for_timeout(2500)
        await page.screenshot(path=f"{OUT}/t26-bona.png")

        await browser.close()
        print("shots saved")

asyncio.run(main())
