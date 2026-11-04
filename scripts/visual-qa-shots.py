#!/usr/bin/env python3
"""Visual QA screenshots for the new brand-boxes design (local server)."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
SHOT = "/home/z/my-project/scripts/shot"

PAGES = [
    ("/work", "work-boxes", 1100),
    ("/work/acf", "acf-editions", 700),
    ("/work/acf/2026", "acf-2026", 300),
    ("/work/armoray", "armoray", 1600),
    ("/work/national-salon-annaba", "salon", 1200),
    ("/work/gemstonewell", "gemstonewell", 1600),
]

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    for path, name, scroll in PAGES:
        page.goto(BASE + path, wait_until="domcontentloaded")
        page.wait_for_timeout(4000)
        if scroll:
            page.evaluate(f"window.scrollTo(0, {scroll})")
            page.wait_for_timeout(1500)
        page.screenshot(path=f"{SHOT}-{name}.png", full_page=False)
        print("shot:", name)
    browser.close()
print("done")
