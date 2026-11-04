"""Task 26 — admin form behavior (NO SAVE): pasting a web link into the
page-address field must move it to the Website field, derive the slug,
and show the amber note. Plus site screenshots."""
import asyncio
import os
from playwright.async_api import async_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")
PASSWORD = os.environ.get("ADMIN_PASSWORD", "Adlene@2026")
OUT = "/home/z/my-project/scripts"

THIMAR_IG = "https://www.instagram.com/thimar_dz/"
BONA_IG = "https://www.instagram.com/bona_algerie_officiel/?hl=fr"

results = []


def check(name, ok, extra=""):
    results.append((name, ok, extra))
    print(("  PASS " if ok else "  FAIL ") + name + (f"  [{extra}]" if extra and not ok else ""))


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1600, "height": 1000})

        # ── site screenshots ─────────────────────────────────────
        await page.goto(f"{BASE}/work", wait_until="load")
        await page.wait_for_timeout(3500)
        await page.screenshot(path=f"{OUT}/t26-work-grid.png")

        await page.goto(f"{BASE}/work/thimar", wait_until="load")
        await page.wait_for_timeout(2500)
        await page.screenshot(path=f"{OUT}/t26-thimar.png", full_page=False)

        await page.goto(f"{BASE}/work/bona", wait_until="load")
        await page.wait_for_timeout(2500)
        await page.screenshot(path=f"{OUT}/t26-bona.png", full_page=False)

        # ── admin: the paste-a-link-into-slug behavior ───────────
        await page.goto(f"{BASE}/admin", wait_until="load")
        await page.wait_for_timeout(1500)
        pwd = page.locator("input[type='password']")
        if await pwd.count():
            await pwd.fill(PASSWORD)
            await page.keyboard.press("Enter")
            await page.wait_for_timeout(2500)

        add = page.get_by_role("button", name="+ Add brand")
        check("Add brand button visible", await add.count() == 1, await add.count())
        await add.click()
        await page.wait_for_timeout(1200)

        fields = page.locator("input")
        n = await fields.count()
        check("form opened with fields", n > 5, n)

        # label→input mapping: find inputs by their preceding label text
        async def field_for(label_text):
            labels = page.locator("span", has_text=label_text)
            for i in range(await labels.count()):
                el = labels.nth(i)
                if await el.evaluate("e => e.tagName") == "SPAN":
                    parent = el.locator("xpath=ancestor::label[1]")
                    if await parent.count():
                        inp = parent.locator("input")
                        if await inp.count() == 1:
                            return inp.first
            return None

        name_f = await field_for("Brand name")
        slug_f = await field_for("Page address")
        web_f = await field_for("Website — the brand name opens this link")

        check("Brand name field found", name_f is not None)
        check("Page address field found", slug_f is not None)
        check("Website field found", web_f is not None)

        if name_f and slug_f and web_f:
            await name_f.fill("Thimar")
            # slug derives from the name ON SAVE, not while typing —
            # the field stays empty with its "auto from name" placeholder
            check("slug field untouched while typing name", (await slug_f.input_value()) == "",
                  await slug_f.input_value())

            # THE BUG SCENARIO: paste the Instagram link into the page-address field
            await slug_f.fill(THIMAR_IG)
            await page.wait_for_timeout(300)
            slug_val = await slug_f.input_value()
            web_val = await web_f.input_value()
            check("pasted link → slug derived (thimar-dz)", slug_val == "thimar-dz", slug_val)
            check("pasted link → moved to Website field", web_val == THIMAR_IG, web_val)
            note = page.locator("text=Web link detected")
            check("amber note shown", await note.count() >= 1, await note.count())
            await page.screenshot(path=f"{OUT}/t26-admin-paste-note.png")

            # no dashes-mangled URL anywhere
            check("no mangled https-… in slug", "https-" not in slug_val, slug_val)

            # second scenario: Bona link with ?hl=fr
            await slug_f.fill(BONA_IG)
            await page.wait_for_timeout(300)
            slug_val = await slug_f.input_value()
            web_val = await web_f.input_value()
            check("bona link → slug derived (bona-algerie-officiel)", slug_val == "bona-algerie-officiel", slug_val)
            check("bona link → moved to Website field verbatim", web_val == BONA_IG, web_val)

            # typing a normal slug still works + note clears
            await slug_f.fill("thimar-restaurant")
            await page.wait_for_timeout(300)
            check("normal typing → slug kept", (await slug_f.input_value()) == "thimar-restaurant",
                  await slug_f.input_value())
            check("note cleared after normal typing", await page.locator("text=Web link detected").count() == 0)

            # www. prefix without scheme
            await slug_f.fill("www.instagram.com/thimar_dz/")
            await page.wait_for_timeout(300)
            check("www. link → slug derived", (await slug_f.input_value()) == "thimar-dz",
                  await slug_f.input_value())
            check("www. link → https prepended in Website",
                  (await web_f.input_value()) == "https://www.instagram.com/thimar_dz/",
                  await web_f.input_value())

        # CANCEL — never save from this test (it would commit to the repo!)
        cancel = page.get_by_role("button", name="Cancel")
        if await cancel.count():
            await cancel.click()
        await page.wait_for_timeout(800)
        await browser.close()

    bad = [r for r in results if not r[1]]
    print()
    if bad:
        print(f"FAILED: {len(bad)} — {[b[0] for b in bad]}")
        raise SystemExit(1)
    print("ALL ADMIN/FORM CHECKS PASSED (nothing saved)")


asyncio.run(main())
