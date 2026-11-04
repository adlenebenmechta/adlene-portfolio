#!/usr/bin/env python3
"""Task 23 — 2x-zoom crop of the Armoray card for a decisive VLM look at
the stat/title spacing (the VLM keeps claiming an overlap the DOM disproves)."""
import asyncio
from playwright.async_api import async_playwright

BASE = "https://adlene-portfolio-production-b8e6.up.railway.app"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=2)
        await page.goto(f"{BASE}/work", wait_until="load", timeout=60000)
        await page.wait_for_timeout(5000)

        card = page.locator("div.group", has_text="Armoray").first
        await card.scroll_into_view_if_needed()
        await page.wait_for_timeout(1200)
        await card.screenshot(path="/home/z/my-project/scripts/shot-t23-armoray-2x.png")
        print("armoray card element screenshot saved (2x scale)")
        await browser.close()

asyncio.run(main())
