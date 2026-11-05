#!/usr/bin/env python3
"""Task 27 dynamic QA — the marquee really moves, sits cleanly under the
pill, clears page content, hides behind the mobile menu, and looks right.
Saves screenshots for VLM review. BASE-parameterized."""
import asyncio
import os
import sys

from playwright.async_api import async_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")
OUT = "/home/z/my-project/scripts"
fails = []


def check(name, ok, extra=""):
    print(("  PASS " if ok else "  FAIL ") + name + (f"  [{extra}]" if extra and not ok else ""))
    if not ok:
        fails.append(name)


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # ── desktop ─────────────────────────────────────────────────
        page = await browser.new_page(viewport={"width": 1600, "height": 1000})
        await page.goto(f"{BASE}/work", wait_until="load")
        await page.wait_for_timeout(3200)  # curtain + entrance

        track = page.locator(".trusted-marquee-track")
        check("track exists", await track.count() == 1)
        anim = await track.evaluate(
            "el => getComputedStyle(el).animationName + '|' + getComputedStyle(el).animationPlayState"
        )
        check("animation applied & running", anim == "trusted-marquee-scroll|running", anim)

        # it truly moves: sample transform matrix over ~1.2s
        t1 = await track.evaluate("el => new DOMMatrix(getComputedStyle(el).transform).m41")
        await page.wait_for_timeout(1200)
        t2 = await track.evaluate("el => new DOMMatrix(getComputedStyle(el).transform).m41")
        check("track position changes over time (endless)", t1 != t2, f"{t1:.1f} -> {t2:.1f}")
        moved = abs(t2 - t1)
        check("pace is calm (20-45 px/s)", 18 <= moved <= 50, f"{moved:.1f}px in 1.2s")

        # geometry: pill above strip, strip below pill, no overlap
        pill = page.locator("nav[aria-label='Primary navigation']")
        strip = page.locator("[aria-label^='Trusted by']")
        pb = await pill.bounding_box()
        sb = await strip.bounding_box()
        check("strip is below the pill", sb["y"] >= pb["y"] + pb["height"] - 2,
              f"pill bottom {pb['y']+pb['height']:.0f} vs strip top {sb['y']:.0f}")
        check("strip is slim (40-52px)", 40 <= sb["height"] <= 52, sb["height"])

        # the label never sits under a moving logo: label box vs first visible logo
        label = page.locator("text=Trusted by").first
        lb = await label.bounding_box()
        check("label left of the moving row", lb["x"] + lb["width"] <= sb["x"] + sb["width"] * 0.35)

        # page content clears the fixed strip (breadcrumb inside <main> on /work)
        kicker = page.locator("section[aria-label='Work introduction'] p").first
        cb = await kicker.bounding_box()
        check("page content starts below the strip", cb and cb["y"] >= sb["y"] + sb["height"] - 4,
              f"kicker y {cb and cb['y']:.0f} vs strip bottom {sb['y']+sb['height']:.0f}")

        # all marquee images actually painted (natural sizes > 0) — allow CDN latency
        try:
            await page.wait_for_function(
                """() => [...document.querySelectorAll('.trusted-marquee-track img')]
                        .every(i => i.complete && i.naturalWidth > 0)""",
                timeout=20000,
            )
            imgs_ok = True
        except Exception:
            imgs_ok = False
        imgs = await page.evaluate(
            """() => [...document.querySelectorAll('.trusted-marquee-track img')]
                   .map(i => [i.currentSrc.split('/').pop(), i.naturalWidth])"""
        )
        bad = [n for n, w in imgs if w == 0]
        check("marquee images loaded (naturalWidth>0)", imgs_ok and not bad, str(bad[:3]))

        await page.screenshot(path=f"{OUT}/t27-desktop-work.png")

        # scrolled state — glass intensifies, strip stays put
        await page.evaluate("window.scrollTo(0, 900)")
        await page.wait_for_timeout(900)
        sb2 = await strip.bounding_box()
        check("strip stays fixed when scrolled", abs(sb2["y"] - sb["y"]) < 2,
              f"{sb['y']:.0f} -> {sb2['y']:.0f}")
        bg = await strip.evaluate("el => getComputedStyle(el).backgroundColor")
        check("glass intensifies on scroll", bg not in ("rgba(255, 255, 255, 0.01)",), bg)
        await page.screenshot(path=f"{OUT}/t27-desktop-scrolled.png")
        await page.close()

        # ── home + case study shots ─────────────────────────────────
        page = await browser.new_page(viewport={"width": 1600, "height": 1000})
        await page.goto(f"{BASE}/", wait_until="load")
        await page.wait_for_timeout(3500)
        await page.screenshot(path=f"{OUT}/t27-desktop-home.png")
        await page.goto(f"{BASE}/work/thimar", wait_until="load")
        await page.wait_for_timeout(2500)
        await page.screenshot(path=f"{OUT}/t27-desktop-thimar.png")
        await page.close()

        # ── mobile: strip visible; menu open hides it ───────────────
        m = await browser.new_page(viewport={"width": 390, "height": 844})
        await m.goto(f"{BASE}/work", wait_until="load")
        await m.wait_for_timeout(3200)
        mstrip = m.locator("[aria-label^='Trusted by']")
        check("mobile: strip visible", await mstrip.count() == 1 and await mstrip.is_visible())
        mb = await mstrip.bounding_box()
        check("mobile: strip inside viewport width", mb["x"] >= 12 and mb["x"] + mb["width"] <= 378,
              f"{mb['x']:.0f}..{mb['x']+mb['width']:.0f}")
        await m.screenshot(path=f"{OUT}/t27-mobile-work.png")

        await m.get_by_role("button", name="Open menu").click()
        await m.wait_for_timeout(900)
        check("mobile: strip hidden while menu open",
              (await mstrip.count() == 0) or not (await mstrip.is_visible()))
        await m.screenshot(path=f"{OUT}/t27-mobile-menu.png")
        await m.get_by_role("button", name="Close menu").click()
        await m.wait_for_timeout(900)
        check("mobile: strip returns after menu closes", await mstrip.is_visible())
        await m.close()

        await browser.close()

    print()
    if fails:
        print(f"FAILED: {len(fails)} -> {fails}")
        sys.exit(1)
    print("ALL DYNAMIC PASS")


asyncio.run(main())
