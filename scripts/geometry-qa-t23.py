#!/usr/bin/env python3
"""Task 23 — DOM geometry check: does the bigger Armoray logo push the
stat/title block into overlap? (VLM flagged it; task 22 disproved the same
alarm with DOM measurements — re-verify after the logo swap.)"""
import asyncio
from playwright.async_api import async_playwright

BASE = "https://adlene-portfolio-production-b8e6.up.railway.app"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})
        await page.goto(f"{BASE}/work", wait_until="load", timeout=60000)
        await page.wait_for_timeout(5000)

        data = await page.evaluate("""() => {
          const card = [...document.querySelectorAll('div.group')].find(g =>
            /Armoray/.test(g.textContent || ''));
          if (!card) return null;
          const pick = (sel, text) => {
            for (const el of card.querySelectorAll(sel)) {
              if (!text || (el.textContent || '').trim() === text)
                return el.getBoundingClientRect().toJSON();
            }
            return null;
          };
          return {
            logo: pick('img.object-contain'),
            stat: pick('p.font-serif'),
            title: pick('h3'),
            card: card.getBoundingClientRect().toJSON(),
          };
        }""")

        if not data:
            print("ARMORAY CARD NOT FOUND")
            return
        c = data["card"]
        print(f"card   x={c['x']:.0f} y={c['y']:.0f} w={c['width']:.0f} h={c['height']:.0f}")
        prev_bottom = None
        for k in ("logo", "stat", "title"):
            r = data.get(k)
            if not r:
                print(f"{k:6s} NOT FOUND")
                continue
            print(f"{k:6s} x={r['x']:.0f} y={r['y']:.0f} w={r['width']:.0f} h={r['height']:.0f} bottom={r['y']+r['height']:.0f}")
            if prev_bottom is not None:
                gap = r["y"] - prev_bottom
                print(f"       gap above: {gap:.1f}px {'⚠ OVERLAP' if gap < 0 else 'ok'}")
            prev_bottom = r["y"] + r["height"]
        await browser.close()

asyncio.run(main())
