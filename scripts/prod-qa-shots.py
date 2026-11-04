#!/usr/bin/env python3
"""Task 20 production visual QA — screenshot key new pages."""
from playwright.sync_api import sync_playwright

BASE = "https://adlene-portfolio-production-b8e6.up.railway.app"
SHOTS = [
    ("/work", "prod-work-boxes.png", 1400),
    ("/work/armoray", "prod-armoray.png", 1400),
    ("/work/acf", "prod-acf-editions.png", 1400),
    ("/work/acf/2026", "prod-acf-2026.png", 1400),
    ("/work/national-salon-annaba", "prod-salon.png", 1400),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    for path, name, w in SHOTS:
        pg = b.new_page(viewport={"width": w, "height": 1000})
        pg.goto(BASE + path, wait_until="networkidle", timeout=45000)
        pg.wait_for_timeout(1800)
        pg.screenshot(path=f"/home/z/my-project/scripts/{name}")
        print("shot:", name)
        pg.close()
    b.close()
print("done")
