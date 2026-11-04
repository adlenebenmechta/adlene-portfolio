#!/usr/bin/env python3
"""Task 23 — screenshot the live /work page for visual QA of both logos."""
import asyncio
from playwright.async_api import async_playwright

BASE = "https://adlene-portfolio-production-b8e6.up.railway.app"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})
        await page.goto(f"{BASE}/work", wait_until="load", timeout=60000)
        await page.wait_for_timeout(6000)

        # check both logo images actually loaded (naturalWidth > 0)
        stats = await page.evaluate(
            """() => [...document.querySelectorAll('img')].map(i => ({
                src: i.currentSrc || i.src,
                ok: i.complete && i.naturalWidth > 0,
                w: i.naturalWidth, h: i.naturalHeight,
                rendered: [Math.round(i.getBoundingClientRect().width), Math.round(i.getBoundingClientRect().height)],
            })).filter(x => /logo|uploads/.test(x.src))"""
        )
        for s in stats:
            print(f"{'OK ' if s['ok'] else 'BAD'} {s['src'].split('/')[-1]:42s} "
                  f"natural {s['w']}x{s['h']} → rendered {s['rendered'][0]}x{s['rendered'][1]}")

        await page.screenshot(path="/home/z/my-project/scripts/shot-t23-work-top.png")
        # scroll to the boxes grid (below the intro)
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.35)")
        await page.wait_for_timeout(1800)
        await page.screenshot(path="/home/z/my-project/scripts/shot-t23-work-grid.png")
        print("screenshots saved")
        await browser.close()

asyncio.run(main())
