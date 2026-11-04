"""Geometry QA for T25: cert centering in mat, equal card heights, editions pill alignment."""
import asyncio
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto(f"{BASE}/work/acf/2026", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # credentials cards
        badge_fig = page.locator("section[aria-label='Credentials'] button").first
        cert_fig = page.locator("section[aria-label='Credentials'] button").nth(1)
        await badge_fig.scroll_into_view_if_needed()
        await page.wait_for_timeout(1800)

        b_box = await badge_fig.bounding_box()
        c_box = await cert_fig.bounding_box()
        print(f"badge card: {b_box['width']:.0f}x{b_box['height']:.0f}")
        print(f"cert  card: {c_box['width']:.0f}x{c_box['height']:.0f}")
        print(f"equal heights: {abs(b_box['height'] - c_box['height']) < 2}")

        # cert img centering inside its ivory mat
        cert_img = cert_fig.locator("img")
        ivory = cert_fig.locator("div.bg-\\[\\#F4F1E8\\]")
        ib = await ivory.bounding_box()
        imb = await cert_img.bounding_box()
        print(f"cert ivory: {ib['width']:.0f}x{ib['height']:.0f}, img: {imb['width']:.0f}x{imb['height']:.0f}")
        top_gap = imb['y'] - ib['y']
        bot_gap = (ib['y'] + ib['height']) - (imb['y'] + imb['height'])
        left_gap = imb['x'] - ib['x']
        right_gap = (ib['x'] + ib['width']) - (imb['x'] + imb['width'])
        print(f"gaps top/bottom: {top_gap:.0f}/{bot_gap:.0f} | left/right: {left_gap:.0f}/{right_gap:.0f}")
        await page.close()

        # editions pill alignment
        page = await browser.new_page(viewport={"width": 1440, "height": 1200})
        await page.goto(f"{BASE}/work/acf", wait_until="networkidle")
        await page.wait_for_timeout(2500)
        pills = page.get_by_text("Explore edition", exact=False)
        n = await pills.count()
        print("explore pills found:", n)
        ys = []
        for i in range(n):
            bb = await pills.nth(i).bounding_box()
            if bb: ys.append(round(bb['y'] + bb['height']))
        print("pill bottom Ys:", ys, "aligned:", len(set(ys)) == 1)
        await page.close()
        await browser.close()

asyncio.run(main())
