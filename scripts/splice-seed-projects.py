#!/usr/bin/env python3
"""Splice the new seedProjects block into src/lib/site-content.ts"""
import re, sys

TS = "/home/z/my-project/src/lib/site-content.ts"
src = open(TS, encoding="utf-8").read()

start = src.index("const seedProjects: Project[] = [")
end = src.index("];", src.index("const seedProjects: Project[] = ["))
end = src.index("\n", end) + 1

NEW = '''/* ── media slots — elegant placeholders, filled from /admin later ── */
const slot = (type: MediaKind, span: MediaItem["span"] = "half"): MediaItem => ({
  type,
  src: "",
  alt: "",
  span,
});

const videoSlots = (n: number): MediaItem[] =>
  Array.from({ length: n }, (_, i) => slot("video", i === 0 ? "wide" : "half"));

const imageSlots = (n: number): MediaItem[] =>
  Array.from({ length: n }, () => slot("image", "half"));

/** the e-commerce chapter rhythm: films → styles → results */
const ecomSections = (v: number, s: number, r: number): ProjectSection[] => [
  {
    id: "video-ads",
    label: "Video Ads",
    note: "Video creatives produced for the brand — paid social and the brand's own channels.",
    media: videoSlots(v),
  },
  {
    id: "static-styles",
    label: "Static Ads & Styles",
    note: "Static creatives — feed posts, stories and display styles.",
    media: imageSlots(s),
  },
  {
    id: "results",
    label: "Results",
    note: "Campaign performance — the numbers behind the creatives.",
    media: imageSlots(r),
  },
];

const seedProjects: Project[] = [
  /* ── ACF — two editions, two roles ─────────────────────────── */
  {
    id: "acf",
    index: "",
    brand: "ACF",
    shortName: "ACF",
    logo: "/media/logos/acf.svg",
    tagline: "Two editions. Two roles. One exhibition floor.",
    industry: "Events & Exhibitions",
    location: "Algeria",
    year: "2025 — 2026",
    services: ["On-Ground Team", "Social Media", "Content Creation"],
    role: "Staff Member → Team Manager",
    description:
      "My journey with ACF across two editions of the exhibition — from STAFF MEMBER in 2025 to TEAM MANAGER in 2026, leading a twenty-person team and running the event's social media presence across the three days of the salon.",
    deliverables: [
      "On-ground team coordination — 20 staff members",
      "Social media management — live across the 3 days",
      "Photo & video content from the exhibition floor",
    ],
    preview: { type: "image", src: "", alt: "ACF" },
    media: [],
    chapters: [
      {
        id: "2026",
        year: "2026",
        title: "TEAM MANAGER",
        role: "Team Manager",
        description:
          "In the 2026 edition I served as TEAM MANAGER — responsible for a team of twenty staff members, coordinating their briefings, schedules and on-ground operations across the three days of the exhibition. I was also in charge of the event's social media pages throughout the salon — planning, creating and publishing content in real time.",
        sections: [
          {
            id: "team",
            label: "The Team",
            note: "The twenty-person staff team I led across the three days.",
            media: imageSlots(3),
          },
          {
            id: "coverage",
            label: "Social Media Coverage",
            note: "Content created and published live from the exhibition floor.",
            media: [...videoSlots(2), ...imageSlots(2)],
          },
        ],
      },
      {
        id: "2025",
        year: "2025",
        title: "STAFF MEMBER",
        role: "Staff Member",
        description:
          "In the 2025 edition I joined the exhibition as a STAFF MEMBER — part of the on-site team delivering the visitor experience across the three days of the show.",
        sections: [
          {
            id: "photography",
            label: "Photography",
            note: "Moments from the exhibition floor.",
            media: imageSlots(3),
          },
          {
            id: "films",
            label: "Films",
            note: "Video content from the edition.",
            media: videoSlots(2),
          },
        ],
      },
    ],
  },

  /* ── Armoray ───────────────────────────────────────────────── */
  {
    id: "armoray",
    index: "",
    brand: "Armoray",
    shortName: "Armoray",
    logo: "/media/logos/armoray.svg",
    tagline: "Performance e-commerce — ads built to convert.",
    industry: "E-Commerce",
    location: "Online — Worldwide",
    year: "2025",
    services: ["Video Ads", "Static Ads", "Social Content"],
    role: "Creative — Video & Static Ads",
    website: "https://armoray.com",
    stat: "+5M",
    statLabel: "Trusted Athletes & Happy Customers",
    linkLabel: "Amazon Store",
    linkUrl:
      "https://www.amazon.com/stores/ARMORAY/page/FCC26F19-5AC4-4005-B645-112A68B5B70C",
    description:
      "Armoray is an e-commerce performance brand with a community of more than five million trusted athletes and happy customers — available at armoray.com and on its Amazon storefront. I produce the brand's video ads and static creatives: concepts, scripts, filming and the final cuts, built to stop the scroll and convert across paid social and the brand's own channels.",
    deliverables: [
      "Video ads — concept, script, final cut",
      "Static ad styles for paid social",
      "Amazon storefront creatives",
      "Always-on social content",
    ],
    preview: { type: "image", src: "", alt: "Armoray" },
    media: [],
    sections: ecomSections(3, 4, 3),
  },

  /* ── HolyStrips ────────────────────────────────────────────── */
  {
    id: "holystrips",
    index: "",
    brand: "HolyStrips",
    shortName: "HolyStrips",
    logo: "/media/logos/holystrips.svg",
    tagline: "Direct-response creatives for paid social.",
    industry: "E-Commerce",
    location: "Online — Worldwide",
    year: "2025",
    services: ["Video Ads", "Static Ads", "Social Content"],
    role: "Creative — Video & Static Ads",
    website: "https://holystrips.com",
    description:
      "HolyStrips is a direct-to-consumer e-commerce brand sold through holystrips.com. I create the brand's video ads and static ad styles — direct-response creatives built for paid social, with the performance results to show for it.",
    deliverables: [
      "Video ads — concept to final cut",
      "Static ad styles",
      "Social content",
      "Creative testing iterations",
    ],
    preview: { type: "image", src: "", alt: "HolyStrips" },
    media: [],
    sections: ecomSections(3, 4, 3),
  },

  /* ── Zero Trace ────────────────────────────────────────────── */
  {
    id: "zero-trace",
    index: "",
    brand: "Zero Trace",
    shortName: "Zero Trace",
    logo: "/media/logos/zero-trace.svg",
    tagline: "Creatives that carry the brand.",
    industry: "E-Commerce",
    location: "Online — Worldwide",
    year: "2025",
    services: ["Video Ads", "Static Ads", "Social Content"],
    role: "Creative — Video & Static Ads",
    website: "https://zerotraceliving.com",
    description:
      "Zero Trace is a direct-to-consumer e-commerce brand sold through zerotraceliving.com. I create the brand's video ads and static ad styles — direct-response creatives built for paid social, with the performance results to show for it.",
    deliverables: [
      "Video ads — concept to final cut",
      "Static ad styles",
      "Social content",
      "Creative testing iterations",
    ],
    preview: { type: "image", src: "", alt: "Zero Trace" },
    media: [],
    sections: ecomSections(3, 4, 3),
  },

  /* ── GemstoneWell ──────────────────────────────────────────── */
  {
    id: "gemstonewell",
    index: "",
    brand: "GemstoneWell",
    shortName: "GemstoneWell",
    logo: "/media/logos/gemstonewell.svg",
    tagline: "A tighter edit — films, styles, results.",
    industry: "E-Commerce",
    location: "Online — Worldwide",
    year: "2025",
    services: ["Video Ads", "Static Ads", "Social Content"],
    role: "Creative — Video & Static Ads",
    website: "https://gemstonewell.com",
    description:
      "GemstoneWell is an e-commerce brand sold through gemstonewell.com. A tighter selection of my work — video ads and static styles built for paid social, with the results behind them.",
    deliverables: [
      "Video ads — concept to final cut",
      "Static ad styles",
      "Social content",
    ],
    preview: { type: "image", src: "", alt: "GemstoneWell" },
    media: [],
    sections: ecomSections(2, 3, 2),
  },

  /* ── National Salon — Annaba ───────────────────────────────── */
  {
    id: "national-salon-annaba",
    index: "",
    brand: "National Salon of Girls' Creativity & Women Entrepreneurs",
    shortName: "The Salon",
    logo: "/media/logos/salon-annaba.svg",
    tagline: "Sole content lead — Ministry of Youth official page.",
    industry: "Events & Public Institutions",
    location: "Annaba, DZ",
    year: "2025",
    services: ["Content Creation", "Photography", "Film & Reels", "Social Media"],
    role: "Sole Content Creator — Ministry of Youth Page",
    description:
      "The National Salon of Girls' Creativity and Women Entrepreneurs in Annaba. I was the sole person responsible for every piece of content published on the Ministry of Youth's official page — before and throughout the exhibition: planning, shooting, editing and publishing every photo, video and post across the salon's full run.",
    deliverables: [
      "Official page content — planning to publishing",
      "Photography coverage",
      "Films & reels from the salon",
      "Real-time social coverage",
    ],
    preview: { type: "image", src: "", alt: "National Salon — Annaba" },
    media: [],
    sections: [
      {
        id: "photography",
        label: "Photography",
        note: "Coverage from the salon — exhibitors, visitors and the floor.",
        media: imageSlots(4),
      },
      {
        id: "films",
        label: "Films & Reels",
        note: "Video coverage published during the event.",
        media: videoSlots(3),
      },
      {
        id: "published",
        label: "Published Content",
        note: "Posts as they appeared on the official page.",
        media: imageSlots(3),
      },
    ],
  },
];
'''

out = src[:start] + NEW + src[end:]
open(TS, "w", encoding="utf-8").write(out)
print("spliced OK — new file length:", len(out.splitlines()), "lines")
