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
  /** grid placement inside the editorial gallery */
  span: "full" | "wide" | "half" | "half-tall" | "third" | "portrait";
}

export interface Project {
  id: string;
  index: string;
  brand: string;
  shortName: string;
  /** brand logo — replace the file in /public/media/logos/ with the real one */
  logo: string;
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
    kicker: "( 01 ) — Selected Work",
    headline: "The work, in its own room.",
    intro:
      "Every project below opens its own page — campaign films, photography, identities and digital experiences, each with the full story behind it.",
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

const seedProjects: Project[] = [
  {
    id: "maison-noire",
    index: "01",
    brand: "Maison Noire",
    shortName: "Noire",
    logo: "/media/logos/maison-noire.svg",
    tagline: "Parisian couture, reimagined for a new generation.",
    industry: "Fashion & Luxury",
    location: "Paris, FR",
    year: "2025",
    services: ["Creative Direction", "Campaign", "Photography", "Social Content"],
    role: "Creative Director",
    description:
      "Developed an autumn campaign designed to reintroduce the house to a younger international audience. The visual language pairs the brand's couture heritage with a raw, nocturnal Paris — deep blacks, sculptural silhouettes and street-cast energy. Every frame was built to feel like the beginning of a film rather than the end of a lookbook.",
    deliverables: [
      "60-second campaign film — NOIRE/SS25",
      "18 campaign photographs — full key visual set",
      "Social content system — 40+ assets",
      "Campaign photography book — 48 pages",
    ],
    preview: {
      type: "image",
      src: "/media/fashion-portrait-01.jpg",
      alt: "Maison Noire campaign — portrait in black couture",
    },
    media: [
      {
        type: "video",
        src: "/video.mp4",
        poster: "/media/hero-poster.jpg",
        alt: "Maison Noire — SS25 campaign film",
        label: "Campaign Film — SS25",
        span: "full",
      },
      {
        type: "image",
        src: "/media/fashion-hero.png",
        alt: "Maison Noire hero — sculptural black couture",
        span: "wide",
      },
      {
        type: "image",
        src: "/media/fashion-detail.png",
        alt: "Maison Noire — couture detail study",
        span: "half",
      },
      {
        type: "image",
        src: "/media/fashion-portrait-02.jpg",
        alt: "Maison Noire — backstage portrait",
        span: "half-tall",
      },
    ],
  },
  {
    id: "halcyon",
    index: "02",
    brand: "Halcyon",
    shortName: "Halcyon",
    logo: "/media/logos/halcyon.svg",
    tagline: "A quiet language for slow hospitality.",
    industry: "Hospitality",
    location: "Lake Como, IT",
    year: "2024",
    services: ["Brand Identity", "Art Direction", "Photography"],
    role: "Brand Director",
    description:
      "A complete identity for a family-run lakeside hotel trading noise for stillness. We built a quiet system — editorial serif typography, a desaturated palette drawn from morning fog, and photography that treats empty rooms as portraits. The result is a brand that feels like the first hour of daylight.",
    deliverables: [
      "Brand identity — full system and guidelines",
      "45 photographs — property and experience",
      "Printed suite — stationery, menus, wayfinding",
      "Booking website art direction",
    ],
    preview: {
      type: "image",
      src: "/media/hotel-lobby.jpg",
      alt: "Halcyon — lobby in warm evening light",
    },
    media: [
      {
        type: "image",
        src: "/media/hotel-lobby.jpg",
        alt: "Halcyon — lobby in warm evening light",
        span: "full",
      },
      {
        type: "image",
        src: "/media/hotel-detail.jpg",
        alt: "Halcyon — architectural detail",
        span: "half",
      },
      {
        type: "image",
        src: "/media/hotel-suite.jpg",
        alt: "Halcyon — suite morning light",
        span: "half",
      },
      {
        type: "image",
        src: "/media/hotel-dining.jpg",
        alt: "Halcyon — dining room",
        span: "wide",
      },
    ],
  },
  {
    id: "obsidian-labs",
    index: "03",
    brand: "Obsidian Labs",
    shortName: "Obsidian",
    logo: "/media/logos/obsidian-labs.svg",
    tagline: "Precision instruments for teams who ship.",
    industry: "Technology",
    location: "Berlin, DE",
    year: "2025",
    services: ["Brand Identity", "Product Design", "Motion"],
    role: "Creative Lead",
    description:
      "Naming, identity and product design for a developer tooling startup that treats software like craft. The system is built on a strict monochrome core with a single signal colour, engineered type, and motion principles borrowed from oscilloscopes — precise, calm, always in motion.",
    deliverables: [
      "Naming and verbal identity",
      "Visual identity system",
      "Product UI design — 3 core flows",
      "Motion language and launch film",
    ],
    preview: {
      type: "image",
      src: "/media/tech-dark.jpg",
      alt: "Obsidian Labs — product on dark surface",
    },
    media: [
      {
        type: "image",
        src: "/media/tech-dark.jpg",
        alt: "Obsidian Labs — product on dark surface",
        span: "full",
      },
      {
        type: "image",
        src: "/media/tech-desk.jpg",
        alt: "Obsidian Labs — workspace study",
        span: "half",
      },
      {
        type: "image",
        src: "/media/tech-motion.jpg",
        alt: "Obsidian Labs — motion frames",
        span: "half-tall",
      },
    ],
  },
  {
    id: "veloce",
    index: "04",
    brand: "Veloce",
    shortName: "Veloce",
    logo: "/media/logos/veloce.svg",
    tagline: "An automotive house tuned for emotion.",
    industry: "Automotive",
    location: "Turin, IT",
    year: "2024",
    services: ["Campaign", "Film Direction", "Photography"],
    role: "Campaign Director",
    description:
      "A launch campaign for a limited-run coachbuilt roadster. We filmed the car where it is happiest — empty mountain roads before dawn — and built the campaign around a single idea: speed as silence. Stills, film and sound design all move in one direction.",
    deliverables: [
      "90-second launch film",
      "24 campaign photographs",
      "Social teaser system",
      "Launch event visual language",
    ],
    preview: {
      type: "image",
      src: "/media/auto-night.png",
      alt: "Veloce — roadster at night",
    },
    media: [
      {
        type: "image",
        src: "/media/auto-night.png",
        alt: "Veloce — roadster at night",
        span: "full",
      },
      {
        type: "image",
        src: "/media/auto-front.jpg",
        alt: "Veloce — front study",
        span: "half",
      },
      {
        type: "image",
        src: "/media/auto-curve.jpg",
        alt: "Veloce — the mountain road",
        span: "half",
      },
      {
        type: "image",
        src: "/media/auto-portrait-01.png",
        alt: "Veloce — detail portrait",
        span: "portrait",
      },
    ],
  },
  {
    id: "atlas-ivy",
    index: "05",
    brand: "Atlas & Ivy",
    shortName: "Atlas",
    logo: "/media/logos/atlas-ivy.svg",
    tagline: "Everyday objects, quietly upgraded.",
    industry: "Lifestyle",
    location: "Copenhagen, DK",
    year: "2023",
    services: ["Brand Strategy", "Identity", "Packaging"],
    role: "Strategist & Designer",
    description:
      "Strategy and identity for a home goods label making quiet upgrades of everyday objects. The identity plays with botanical etching and cartographic lines — an atlas of small pleasures. Packaging, retail language and photography follow one rule: nothing shouts.",
    deliverables: [
      "Brand strategy and positioning",
      "Visual identity and packaging system",
      "Retail launch language",
      "Lookbook photography direction",
    ],
    preview: {
      type: "image",
      src: "/media/lifestyle-still.jpg",
      alt: "Atlas & Ivy — still life",
    },
    media: [
      {
        type: "image",
        src: "/media/lifestyle-still.jpg",
        alt: "Atlas & Ivy — still life",
        span: "full",
      },
      {
        type: "image",
        src: "/media/lifestyle-shelf.jpg",
        alt: "Atlas & Ivy — retail shelf",
        span: "half",
      },
      {
        type: "image",
        src: "/media/lifestyle-detail.jpg",
        alt: "Atlas & Ivy — packaging detail",
        span: "half",
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
