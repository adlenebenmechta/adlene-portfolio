"""Probe: does the lightbox actually open? DOM state + clean screenshot."""
import asyncio
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto(f"{BASE}/work/acf/2026", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        await page.get_by_role("button", name="Event Badge — open full view").scroll_into_view_if_needed()
        await page.wait_for_timeout(1200)
        await page.get_by_role("button", name="Event Badge — open full view").click()
        await page.wait_for_timeout(2500)

        dialog = page.locator("[role='dialog']")
        print("dialog count:", await dialog.count())
        if await dialog.count():
            print("dialog visible:", await dialog.first.is_visible())
            img = dialog.locator("img")
            print("img count:", await img.count())
            if await img.count():
                print("img natural size:", await img.first.evaluate("el => [el.naturalWidth, el.naturalHeight]"))
                print("img box:", await img.first.bounding_box())
        btn = page.get_by_role("button", name="Close")
        print("close btn visible:", await btn.is_visible() if await btn.count() else "none")

        await page.screenshot(path="/home/z/my-project/scripts/t25-lightbox-probe.png")
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(1000)
        print("after esc, dialog count:", await page.locator("[role='dialog']").count())
        await page.close()
        await browser.close()

asyncio.run(main())
