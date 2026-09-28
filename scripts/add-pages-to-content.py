#!/usr/bin/env python3
"""Add the `pages` (editable texts) block to content.json, seeded with the
current live copy — idempotent (skips if already present)."""
import json, pathlib

p = pathlib.Path("/home/z/my-project/content.json")
d = json.loads(p.read_text())

if "pages" in d:
    print("pages already present — keys:", list(d["pages"].keys()))
    raise SystemExit(0)

d["pages"] = {
    "home": {
        "heroIntro": "Hi, my name is",
        "heroName": "Adlene Benmechta",
        "heroLine": "and this is",
        "heroBox": "my portfolio",
        "workTitle": "Brands I've had the opportunity to work with.",
    },
    "about": {
        "headline": "I work at the intersection of strategy, culture and visual storytelling.",
        "bio1": "I'm Adlene Benmechta — a creative director and brand strategist based between Algiers and Europe. For the past eight years I've helped fashion houses, hotels, technology companies and lifestyle brands define how they look, speak and are remembered. My work moves from strategy to the final frame: positioning, identity, campaigns, photography and the digital experiences that carry them.",
        "bio2": "I believe a brand is not what it says about itself — it's the feeling that remains when the lights go out. That's the standard I hold every project to: work that is intentional enough to feel inevitable, and distinctive enough to be remembered.",
        "portraitName": "Adlene Benmechta",
        "portraitRole": "Creative Director — Algiers / Worldwide",
        "teaserHeadline": "I work at the intersection of strategy, culture and visual storytelling.",
        "teaserBio": "I'm Adlene Benmechta — a creative director and brand strategist based between Algiers and Europe. For the past eight years I've helped fashion houses, hotels, technology companies and lifestyle brands define how they look, speak and are remembered.",
        "capabilitiesTitle": "What I bring to the table.",
        "facts": [
            {"label": "Experience", "value": "8+ years — independent since 2021"},
            {"label": "Disciplines", "value": "Creative Direction · Branding · Film · Photography"},
            {"label": "Industries", "value": "Fashion · Hospitality · Tech · Automotive · Lifestyle"},
            {"label": "Location", "value": "Algiers, DZ — working worldwide"},
            {"label": "Availability", "value": "Select projects — Q1 2026"},
        ],
        "capabilities": [
            {"index": "01", "title": "Creative Direction", "note": "Concept to campaign — one held vision"},
            {"index": "02", "title": "Brand Identity", "note": "Systems built to age slowly and well"},
            {"index": "03", "title": "Campaign & Film", "note": "Direction and photography for moving image"},
            {"index": "04", "title": "Photography", "note": "Editorial, campaign and portrait work"},
            {"index": "05", "title": "Digital Experiences", "note": "Websites and interactive worlds with editorial pacing"},
            {"index": "06", "title": "Creative Strategy", "note": "Positioning, narrative and brand architecture"},
        ],
    },
    "work": {
        "kicker": "( 01 ) — Selected Work",
        "headline": "The work, in its own room.",
        "intro": "Every project below opens its own page — campaign films, photography, identities and digital experiences, each with the full story behind it.",
    },
    "contact": {
        "headline": "Have a project in mind?",
        "subline": "Let's create something worth remembering.",
        "ctaButton": "Start a Project",
        "stepsTitle": "What Happens Next",
        "steps": [
            {"index": "01", "title": "The Brief", "note": "Tell me about the brand, the ambition and the timeline — a voice note is enough."},
            {"index": "02", "title": "The Proposal", "note": "Within a week you receive a direction, a scope and a transparent budget."},
            {"index": "03", "title": "The Work", "note": "Concept to final frame — with review checkpoints you can follow live."},
        ],
        "location": "Algiers, DZ",
        "locationSub": "working worldwide",
        "availability": "Select projects",
        "availabilitySub": "booking Q1 2026",
        "response": "Within 48 hours",
        "responseSub": "via email",
        "locationTag": "Algiers · Worldwide",
    },
    "caseStudy": {
        "backLabel": "All Work",
        "briefTitle": "The Brief",
        "workTitle": "The work.",
        "nextLabel": "Next Project",
        "openLabel": "Open Case Study",
    },
    "footer": {
        "tagline": "Campaign films, photography and identities — a portfolio of selected work, made with patience and light.",
        "copyright": "© 2026 Adlene Benmechta — All rights reserved",
        "bottomLine": "Films · Photography · Identity",
    },
}

p.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n")
print("content.json now has pages with keys:", list(d["pages"].keys()))
