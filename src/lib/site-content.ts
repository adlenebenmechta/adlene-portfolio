/* ────────────────────────────────────────────────────────────────
   Site content — defaults + types.
   The runtime source of truth is content.json in the repo root,
   editable via the hidden /admin panel (GitHub-backed CMS).
   This module provides the TypeScript types and the seed defaults.
   ──────────────────────────────────────────────────────────────── */

export type MediaKind = "video" | "image";

export interface MediaItem {
  type: MediaKind;
  src: string;
  poster?: string;
  alt: string;
  /** small label chip, e.g. "Campaign Film — SS25" */
  label?: string;
  /** grid placement inside the editorial gallery
   *  "reel"      → 9:16 vertical video (reels / shorts / paid social UGC-style)
   *  "landscape" → 16:9 horizontal video (exhibition / event coverage) */
  span:
    | "full"
    | "wide"
    | "half"
    | "half-tall"
    | "third"
    | "portrait"
    | "reel"
    | "landscape";
}

export interface Project {
  id: string;
  index: string;
  brand: string;
  shortName: string;
  /** brand logo — replace the file in /public/media/logos/ with the real one */
  logo: string;
  /** short serif initials shown in small page-header tiles (wide wordmarks
   *  shrink to nothing in a square tile — e.g. "ACF", "A", "HS") */
  monogram?: string;
  tagline: string;
  industry: string;
  location: string;
  year: string;
  services: string[];
  role: string;
  description: string;
  /** concrete deliverables listed on the case study page */
  deliverables: string[];
  /** floating preview shown while hovering the brand index */
  preview: { type: MediaKind; src: string; poster?: string; alt: string };
  media: MediaItem[];
  /** external brand site — clicking the brand name opens it in a new tab */
  website?: string;
  /** social-proof stat displayed large, e.g. "+5M" */
  stat?: string;
  /** caption under the stat, e.g. "Trusted Athletes & Happy Customers" */
  statLabel?: string;
  /** contextual external link chip, e.g. "Amazon Store" */
  linkLabel?: string;
  linkUrl?: string;
  /** organised media chapters on the case-study page (Video Ads / Styles / Results…) */
  sections?: ProjectSection[];
  /** sub-pages — when present the project page shows one card per chapter */
  chapters?: ProjectChapter[];
}

export interface ProjectSection {
  id: string;
  label: string;
  note?: string;
  media: MediaItem[];
}

export interface ProjectChapter {
  /** url segment — the page lives at /work/<project>/<chapter> */
  id: string;
  year: string;
  title: string;
  role: string;
  description: string;
  sections: ProjectSection[];
}

export interface SiteSettings {
  email: string;
}

/* ── editable page copy (managed from /admin → Texts tab) ────────── */

export interface FactItem {
  label: string;
  value: string;
}

export interface NoteItem {
  index: string;
  title: string;
  note: string;
}

export interface PageTexts {
  home: {
    heroIntro: string;
    /** the name — also drives the curtain signature + footer name */
    heroName: string;
    heroLine: string;
    heroBox: string;
    /** headline of the work section on the home page */
    workTitle: string;
  };
  about: {
    headline: string;
    bio1: string;
    bio2: string;
    portraitName: string;
    portraitRole: string;
    teaserHeadline: string;
    teaserBio: string;
    capabilitiesTitle: string;
    facts: FactItem[];
    capabilities: NoteItem[];
  };
  work: { kicker: string; headline: string; intro: string };
  contact: {
    headline: string;
    subline: string;
    ctaButton: string;
    stepsTitle: string;
    steps: NoteItem[];
    location: string;
    locationSub: string;
    availability: string;
    availabilitySub: string;
    response: string;
    responseSub: string;
    locationTag: string;
  };
  caseStudy: {
    backLabel: string;
    briefTitle: string;
    workTitle: string;
    nextLabel: string;
    openLabel: string;
    visitLabel: string;
    editionsLabel: string;
    exploreLabel: string;
  };
  footer: { tagline: string; copyright: string; bottomLine: string };
}

const seedFacts: FactItem[] = [
  { label: "Experience", value: "8+ years — independent since 2021" },
  { label: "Disciplines", value: "Creative Direction · Branding · Film · Photography" },
  { label: "Industries", value: "Fashion · Hospitality · Tech · Automotive · Lifestyle" },
  { label: "Location", value: "Algiers, DZ — working worldwide" },
  { label: "Availability", value: "Select projects — Q1 2026" },
];

const seedCapabilities: NoteItem[] = [
  { index: "01", title: "Creative Direction", note: "Concept to campaign — one held vision" },
  { index: "02", title: "Brand Identity", note: "Systems built to age slowly and well" },
  { index: "03", title: "Campaign & Film", note: "Direction and photography for moving image" },
  { index: "04", title: "Photography", note: "Editorial, campaign and portrait work" },
  { index: "05", title: "Digital Experiences", note: "Websites and interactive worlds with editorial pacing" },
  { index: "06", title: "Creative Strategy", note: "Positioning, narrative and brand architecture" },
];

const seedSteps: NoteItem[] = [
  {
    index: "01",
    title: "The Brief",
    note: "Tell me about the brand, the ambition and the timeline — a voice note is enough.",
  },
  {
    index: "02",
    title: "The Proposal",
    note: "Within a week you receive a direction, a scope and a transparent budget.",
  },
  {
    index: "03",
    title: "The Work",
    note: "Concept to final frame — with review checkpoints you can follow live.",
  },
];

export const DEFAULT_PAGES: PageTexts = {
  home: {
    heroIntro: "Hi, my name is",
    heroName: "Adlene Benmechta",
    heroLine: "and this is",
    heroBox: "my portfolio",
    workTitle: "Brands I've had the opportunity to work with.",
  },
  about: {
    headline: "I work at the intersection of strategy, culture and visual storytelling.",
    bio1:
      "I'm Adlene Benmechta — a creative director and brand strategist based between Algiers and Europe. For the past eight years I've helped fashion houses, hotels, technology companies and lifestyle brands define how they look, speak and are remembered. My work moves from strategy to the final frame: positioning, identity, campaigns, photography and the digital experiences that carry them.",
    bio2:
      "I believe a brand is not what it says about itself — it's the feeling that remains when the lights go out. That's the standard I hold every project to: work that is intentional enough to feel inevitable, and distinctive enough to be remembered.",
    portraitName: "Adlene Benmechta",
    portraitRole: "Creative Director — Algiers / Worldwide",
    teaserHeadline: "I work at the intersection of strategy, culture and visual storytelling.",
    teaserBio:
      "I'm Adlene Benmechta — a creative director and brand strategist based between Algiers and Europe. For the past eight years I've helped fashion houses, hotels, technology companies and lifestyle brands define how they look, speak and are remembered.",
    capabilitiesTitle: "What I bring to the table.",
    facts: seedFacts,
    capabilities: seedCapabilities,
  },
  work: {
    kicker: "Selected Work",
    headline: "The work, in its own room.",
    intro:
      "Every box opens its own page — films, photography, campaigns and coverage, each with the full story behind it.",
  },
  contact: {
    headline: "Have a project\nin mind?",
    subline: "Let's create something worth remembering.",
    ctaButton: "Start a Project",
    stepsTitle: "What Happens Next",
    steps: seedSteps,
    location: "Algiers, DZ",
    locationSub: "working worldwide",
    availability: "Select projects",
    availabilitySub: "booking Q1 2026",
    response: "Within 48 hours",
    responseSub: "via email",
    locationTag: "Algiers · Worldwide",
  },
  caseStudy: {
    backLabel: "All Work",
    briefTitle: "The Brief",
    workTitle: "The work.",
    nextLabel: "Next Project",
    openLabel: "Open Case Study",
    visitLabel: "Visit Website",
    editionsLabel: "Choose an edition",
    exploreLabel: "Explore the edition",
  },
  footer: {
    tagline:
      "Campaign films, photography and identities — a portfolio of selected work, made with patience and light.",
    copyright: "© 2026 Adlene Benmechta — All rights reserved",
    bottomLine: "Films · Photography · Identity",
  },
};

/** deep-ish merge: fill missing text fields from defaults (arrays as-is when provided) */
export function resolvePages(
  pages: Partial<PageTexts> | null | undefined,
): PageTexts {
  const d = DEFAULT_PAGES;
  const p = pages ?? {};
  return {
    home: { ...d.home, ...(p.home ?? {}) },
    about: {
      ...d.about,
      ...(p.about ?? {}),
      facts: Array.isArray(p.about?.facts) ? p.about.facts : d.about.facts,
      capabilities: Array.isArray(p.about?.capabilities)
        ? p.about.capabilities
        : d.about.capabilities,
    },
    work: { ...d.work, ...(p.work ?? {}) },
    contact: {
      ...d.contact,
      ...(p.contact ?? {}),
      steps: Array.isArray(p.contact?.steps) ? p.contact.steps : d.contact.steps,
    },
    caseStudy: { ...d.caseStudy, ...(p.caseStudy ?? {}) },
    footer: { ...d.footer, ...(p.footer ?? {}) },
  };
}

export interface SiteContent {
  version: number;
  settings: SiteSettings;
  /** fullscreen film behind the home hero */
  hero: { video: string; poster: string };
  /** fullscreen film behind the /work index */
  workFilm: { video: string; poster: string };
  /** about portrait (home teaser + /about) */
  portrait: { src: string; alt: string };
  projects: Project[];
  /** editable page copy — optional for older content.json (falls back to defaults) */
  pages?: Partial<PageTexts>;
}

/* ── seed defaults — mirrored to content.json in the repo ────────── */

/* ── media slots — elegant placeholders, filled from /admin later ── */
const slot = (type: MediaKind, span: MediaItem["span"] = "half"): MediaItem => ({
  type,
  src: "",
  alt: "",
  span,
});

/* vertical 9:16 video slots — the default for ad creatives & social reels */
const videoSlots = (n: number): MediaItem[] =>
  Array.from({ length: n }, () => slot("video", "reel"));

/* horizontal 16:9 video slots — exhibition / event coverage (the Salon) */
const landscapeSlots = (n: number): MediaItem[] =>
  Array.from({ length: n }, () => slot("video", "landscape"));

const imageSlots = (n: number): MediaItem[] =>
  Array.from({ length: n }, () => slot("image", "half"));

/** the e-commerce chapter rhythm: films → styles → results */
const ecomSections = (v: number, s: number, r: number): ProjectSection[] => [
  {
    id: "video-ads",
    label: "Video Ads",
    note: "Vertical 9:16 video creatives produced for the brand — paid social and the brand's own channels.",
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
    monogram: "ACF",
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
            note: "Content created and published live from the exhibition floor — vertical 9:16 films and photos.",
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
            note: "Vertical 9:16 video content from the edition.",
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
    monogram: "A",
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
    monogram: "HS",
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
    monogram: "ZT",
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
    monogram: "GW",
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

  /* ── Ministry of Youth — National Salon coverage (Annaba) ── */
  {
    id: "national-salon-annaba",
    index: "",
    brand: "Ministry of Youth",
    shortName: "Ministry of Youth",
    logo: "/media/logos/ministry-of-youth.png",
    monogram: "MY",
    tagline: "Sole content lead for the National Salon of Girls' Creativity — Annaba.",
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
    preview: { type: "image", src: "", alt: "Ministry of Youth — National Salon, Annaba" },
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
        label: "Films & Coverage",
        note: "Horizontal 16:9 video coverage published during the event.",
        media: landscapeSlots(4),
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

export const DEFAULT_CONTENT: SiteContent = {
  version: 1,
  settings: {
    email: "hello@adlenebenmechta.com",
  },
  hero: {
    video: "/video.mp4",
    poster: "/media/hero-poster.jpg",
  },
  workFilm: {
    video: "/work-video.mp4",
    poster: "/media/work-poster.jpg",
  },
  portrait: {
    src: "/media/portrait-director.jpg",
    alt: "Adlene Benmechta — creative director, portrait",
  },
  projects: seedProjects,
  pages: DEFAULT_PAGES,
};
