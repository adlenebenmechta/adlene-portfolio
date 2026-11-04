#!/usr/bin/env python3
"""Task 24 — local visual QA: salon card as 'Ministry of Youth' + detail header."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"

with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 1000})

    # 1. the salon box on /work
    pg.goto(BASE + "/work", wait_until="load", timeout=60000)
    pg.wait_for_timeout(5000)
    box = pg.locator('a[aria-label="Open the Ministry of Youth page"]').locator("xpath=..")
    box.scroll_into_view_if_needed()
    pg.wait_for_timeout(1600)
    box.screenshot(path="scripts/shot-t24-card.png")
    print("card shot saved")

    # 2. detail page header (monogram + H1 + tagline + description)
    pg.goto(BASE + "/work/national-salon-annaba", wait_until="load", timeout=60000)
    pg.wait_for_timeout(2500)
    pg.locator("header").nth(1).screenshot(path="scripts/shot-t24-header.png")
    print("header shot saved")

    b.close()
