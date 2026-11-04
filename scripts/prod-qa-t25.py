"""Final production QA for T25: title lockup renders, credentials hidden until upload."""
import asyncio
from playwright.async_api import async_playwright

BASE = "https://adlene-portfolio-production-b8e6.up.railway.app"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})
        await page.goto(f"{BASE}/work/acf/2026", wait_until="networkidle")
        await page.wait_for_timeout(3200)

        # H1 contains both lines
        h1 = page.locator("h1")
        print("H1 text:", repr(await h1.inner_text()))
        spans = h1.locator("span.block")
        n = await spans.count()
        print("H1 block lines:", n)
        for i in range(n):
            t = await spans.nth(i).inner_text()
            cls = await spans.nth(i).get_attribute("class")
            print(f"  line {i}: {t!r} | italic={'italic' in (cls or '')}")

        # credentials strip should NOT exist (nothing uploaded yet)
        creds = page.locator("section[aria-label='Credentials']")
        print("credentials strip present:", await creds.count())

        await page.screenshot(path="/home/z/my-project/scripts/t25-prod-2026.png",
                              clip={"x": 0, "y": 0, "width": 1440, "height": 900})
        await page.close()

        # 2025 chapter too
        page = await browser.new_page(viewport={"width": 1440, "height": 1000})
        await page.goto(f"{BASE}/work/acf/2025", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        print("2025 H1:", repr(await page.locator("h1").inner_text()))
        await page.screenshot(path="/home/z/my-project/scripts/t25-prod-2025.png",
                              clip={"x": 0, "y": 0, "width": 1440, "height": 900})
        await page.close()

        # editions cards
        page = await browser.new_page(viewport={"width": 1440, "height": 1200})
        await page.goto(f"{BASE}/work/acf", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        await page.get_by_text("Choose an edition").scroll_into_view_if_needed()
        await page.wait_for_timeout(1500)
        await page.mouse.wheel(0, 500)
        await page.wait_for_timeout(1200)
        await page.screenshot(path="/home/z/my-project/scripts/t25-prod-editions.png")
        await browser.close()
        print("prod shots saved")

asyncio.run(main())
