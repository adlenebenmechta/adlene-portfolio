"""Task 25 — AFTER screenshots: new title lockup + credentials panel + lightbox."""
import asyncio, os
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"
OUT = "/home/z/my-project/scripts"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # 1) header with new TEAM / MANAGER lockup
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})
        await page.goto(f"{BASE}/work/acf/2026", wait_until="networkidle")
        await page.wait_for_timeout(2600)
        await page.screenshot(path=f"{OUT}/t25-after-header.png",
                              clip={"x": 0, "y": 0, "width": 1440, "height": 950})

        # 2) scroll to the credentials panel
        await page.locator("section[aria-label='Credentials']").scroll_into_view_if_needed()
        await page.wait_for_timeout(2200)
        await page.locator("section[aria-label='Credentials']").screenshot(path=f"{OUT}/t25-after-credentials.png")

        # 3) open the lightbox (click badge card)
        await page.get_by_role("button", name="Event Badge — open full view").click()
        await page.wait_for_timeout(1600)
        await page.screenshot(path=f"{OUT}/t25-after-lightbox.png")
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(800)
        await page.close()

        # 4) editions grid (project page cards)
        page = await browser.new_page(viewport={"width": 1440, "height": 1200})
        await page.goto(f"{BASE}/work/acf", wait_until="networkidle")
        await page.wait_for_timeout(2400)
        await page.get_by_text("Choose an edition").scroll_into_view_if_needed()
        await page.wait_for_timeout(1500)
        await page.mouse.wheel(0, 600)
        await page.wait_for_timeout(1200)
        await page.screenshot(path=f"{OUT}/t25-after-editions.png")
        await page.close()

        # 5) mobile header
        page = await browser.new_page(viewport={"width": 390, "height": 844})
        await page.goto(f"{BASE}/work/acf/2026", wait_until="networkidle")
        await page.wait_for_timeout(2400)
        await page.screenshot(path=f"{OUT}/t25-after-mobile.png")
        await page.close()

        # 6) 2025 chapter (STAFF MEMBER) — single-page lockup check
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})
        await page.goto(f"{BASE}/work/acf/2025", wait_until="networkidle")
        await page.wait_for_timeout(2400)
        await page.screenshot(path=f"{OUT}/t25-after-2025.png",
                              clip={"x": 0, "y": 0, "width": 1440, "height": 900})
        await page.close()

        await browser.close()
        print("all AFTER shots saved")

asyncio.run(main())
