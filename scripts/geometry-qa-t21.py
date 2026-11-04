#!/usr/bin/env python3
"""Geometric QA — measure the actual rendered aspect ratios of every media slot."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3111"
PAGES = [
    "/work/armoray",
    "/work/holystrips",
    "/work/zero-trace",
    "/work/gemstonewell",
    "/work/national-salon-annaba",
    "/work/acf/2026",
    "/work/acf/2025",
]

JS = """
() => {
  const out = [];
  // media slots are Reveal divs directly inside the section grids
  document.querySelectorAll("section section, div.grid").forEach(grid => {
    grid.querySelectorAll(":scope > div").forEach(el => {
      const cls = el.className || "";
      if (!cls.includes("aspect-")) return;
      const r = el.getBoundingClientRect();
      if (r.width < 20 || r.height < 20) return;
      out.push({
        ratio: +(r.height / r.width).toFixed(3),
        w: Math.round(r.width), h: Math.round(r.height),
        reel: cls.includes("9/16"), land: cls.includes("16/9") && !cls.includes("16/10"),
        label: (el.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 24),
      });
    });
  });
  return out;
}
"""

def classify(ratio, reel, land):
    if reel and abs(ratio - 16 / 9) < 0.03: return "9:16-REEL"
    if land and abs(ratio - 9 / 16) < 0.03: return "16:9-LANDSCAPE"
    return f"other({ratio})"

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    ok = True
    for path in PAGES:
        page.goto(BASE + path, wait_until="domcontentloaded")
        page.wait_for_timeout(2500)
        slots = page.evaluate(JS)
        # dedupe by size+label
        seen, res = set(), []
        for s in slots:
            key = (s["w"], s["h"], s["label"])
            if key in seen: continue
            seen.add(key)
            res.append(s)
        print(f"\n{path}")
        for s in res:
            c = classify(s["ratio"], s["reel"], s["land"])
            mark = "OK " if c in ("9:16-REEL", "16:9-LANDSCAPE") or s["label"].startswith("Photo") or "other" not in c else "?? "
            print(f"  {mark}{c:14s} {s['w']}x{s['h']}  '{s['label']}'")
    browser.close()
print("\ngeometry check done")
