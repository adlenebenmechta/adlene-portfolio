#!/usr/bin/env python3
"""Task 23 — verify the logo-zone BrandCard on every /work card (local first,
then reusable against prod with BASE env). Checks: every logo loads, sits
inside the top 62% zone, and keeps >=12px clearance above the stat/title."""
import asyncio
import os
import sys
from playwright.async_api import async_playwright

BASE = os.environ.get("BASE", "http://localhost:3111")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})
        await page.goto(f"{BASE}/work", wait_until="load", timeout=60000)
        await page.wait_for_timeout(5000)

        cards = await page.evaluate("""() => {
          return [...document.querySelectorAll('div.group')].map(g => {
            const img = g.querySelector('img.object-contain');
            const stat = g.querySelector('p.font-serif');
            const title = g.querySelector('h3');
            const name = (title?.textContent || '').trim().split('\\n')[0].trim();
            if (!img) return null;
            const c = g.getBoundingClientRect();
            const r = img.getBoundingClientRect();
            const s = stat ? stat.getBoundingClientRect() : null;
            return {
              name,
              cardH: Math.round(c.height),
              logo: [Math.round(r.width), Math.round(r.height)],
              logoBottomPct: +(((r.y + r.height - c.y) / c.height) * 100).toFixed(1),
              ok: img.complete && img.naturalWidth > 0,
              gapToStat: s ? Math.round(s.y - (r.y + r.height)) : null,
            };
          }).filter(Boolean);
        }""")

        bad = 0
        for card in cards:
            issues = []
            if not card["ok"]:
                issues.append("logo failed to load")
            if card["logoBottomPct"] > 62.5:
                issues.append(f"logo exceeds zone ({card['logoBottomPct']}% > 62%)")
            if card["gapToStat"] is not None and card["gapToStat"] < 12:
                issues.append(f"only {card['gapToStat']}px above stat")
            status = "⚠ " + "; ".join(issues) if issues else "OK"
            if issues:
                bad += 1
            print(f"{card['name'][:22]:24s} logo {card['logo'][0]}x{card['logo'][1]} "
                  f"bottom@{card['logoBottomPct']}% gapToStat={card['gapToStat']}px  {status}")
        print(f"\n{'ALL CARDS OK' if bad == 0 else f'{bad} CARDS WITH ISSUES'}")
        await browser.close()
        sys.exit(1 if bad else 0)

asyncio.run(main())
