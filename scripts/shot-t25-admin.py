"""T25 — screenshot the admin CMS chapter editor with the new Badge & Certification panel."""
import asyncio
from playwright.async_api import async_playwright

BASE = "http://localhost:3000"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1600, "height": 1000})
        await page.goto(f"{BASE}/admin", wait_until="networkidle")
        await page.wait_for_timeout(1500)

        # login
        pwd = page.locator("input[type='password']")
        if await pwd.count():
            await pwd.fill("admin123")
            await page.keyboard.press("Enter")
            await page.wait_for_timeout(2500)

        # open the Brands tab (or whatever shows brand list)
        for label in ["Brands", "Brand", "Work", "Projects"]:
            tab = page.get_by_role("button", name=label, exact=False)
            if await tab.count():
                await tab.first.click()
                await page.wait_for_timeout(1500)
                break

        # find ACF edit button
        edit = page.get_by_role("button", name="Edit", exact=False)
        print("edit buttons:", await edit.count())
        # click the one near ACF text
        acf_card = page.locator("text=ACF").first
        await acf_card.scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        # try clicking edit within the same container as ACF
        for i in range(await edit.count()):
            btn = edit.nth(i)
            txt = await btn.locator("xpath=ancestor::li|ancestor::div").first.inner_text()
            if "ACF" in txt[:120]:
                await btn.click()
                break
        await page.wait_for_timeout(2000)

        # scroll to the Badge & Certification panel
        panel = page.get_by_text("Badge & Certification", exact=False).first
        await panel.scroll_into_view_if_needed()
        await page.wait_for_timeout(1200)
        await page.screenshot(path="/home/z/my-project/scripts/t25-admin-credentials-panel.png")
        print("saved admin panel shot")

        # also verify the upload buttons exist
        up = page.get_by_text("Upload badge", exact=False)
        up2 = page.get_by_text("Upload certification", exact=False)
        print("badge uploader:", await up.count(), "| cert uploader:", await up2.count())
        await browser.close()

asyncio.run(main())
