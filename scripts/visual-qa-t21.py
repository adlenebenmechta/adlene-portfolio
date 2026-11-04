#!/usr/bin/env python3
"""Task 21 visual QA — 9:16 reel slots + 16:9 salon slots (local :3111)."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3111"
OUT = "/home/z/my-project/scripts/shot-t21"

PAGES = [
    ("/work/armoray", "armoray-reels", 1250),          # Video Ads reels row
    ("/work/national-salon-annaba", "salon-films", 1500),  # Films & Coverage 16:9
    ("/work/acf/2026", "acf2026-coverage", 900),       # coverage reels+photos
    ("/work/gemstonewell", "gw-reels", 1150),          # 2 reels
]

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    for path, name, scroll in PAGES:
        page.goto(BASE + path, wait_until="domcontentloaded")
        page.wait_for_timeout(3500)
        if scroll:
            page.evaluate(f"window.scrollTo(0, {scroll})")
            page.wait_for_timeout(1400)
        page.screenshot(path=f"{OUT}-{name}.png", full_page=False)
        print("shot:", name)
    browser.close()
print("done")
