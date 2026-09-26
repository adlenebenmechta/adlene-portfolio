/* ────────────────────────────────────────────────────────────────────
   PORTFOLIO DATA
   Add a new brand by appending one object to `projects` below —
   the whole site (brand index, case study, gallery, navigation)
   picks it up automatically.
   Replace any media `src` with your own files in /public/media.
   ──────────────────────────────────────────────────────────────────── */

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
  tagline: string;
  industry: string;
  location: string;
  year: string;
  services: string[];
  role: string;
  description: string;
  /** floating preview shown while hovering the brand index */
  preview: { type: MediaKind; src: string; poster?: string; alt: string };
  media: MediaItem[];
}

export const projects: Project[] = [
  {
    id: "maison-noire",
    index: "01",
    brand: "Maison Noire",
    shortName: "Noire",
    tagline: "Parisian couture, reimagined for a new generation.",
    industry: "Fashion & Luxury",
    location: "Paris, FR",
    year: "2025",
    services: ["Creative Direction", "Campaign", "Photography", "Social Content"],
    role: "Creative Director",
    description:
      "Developed an autumn campaign designed to reintroduce the house to a younger international audience. The visual language pairs the brand's couture heritage with a raw, nocturnal Paris — deep blacks, sculptural silhouettes and street-cast energy. Every frame was built to feel like the beginning of a film rather than the end of a lookbook.",
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
        alt: "Maison Noire — NOIRE/SS25 campaign film",
        label: "Campaign Film — NOIRE/SS25",
        span: "full",
      },
      {
        type: "image",
        src: "/media/fashion-portrait-01.jpg",
        alt: "Campaign portrait — draped black couture",
        span: "half-tall",
      },
      {
        type: "image",
        src: "/media/fashion-wide.jpg",
        alt: "Editorial still — studio lighting study",
        span: "half",
      },
      {
        type: "image",
        src: "/media/fashion-hero.png",
        alt: "Key visual — sculptural silhouette",
        span: "half",
      },
      {
        type: "image",
        src: "/media/backstage-portrait.jpg",
        alt: "Backstage — fitting before the show",
        span: "half-tall",
      },
      {
        type: "image",
        src: "/media/fashion-alt.jpg",
        alt: "Campaign wide shot — night atmosphere",
        label: "Social Content — Key Frames",
        span: "wide",
      },
      {
        type: "image",
        src: "/media/street-night.jpg",
        alt: "Street content — Paris after dark",
        span: "third",
      },
      {
        type: "image",
        src: "/media/street-square.jpg",
        alt: "Street content — detail study",
        span: "third",
      },
      {
        type: "image",
        src: "/media/street-urban.jpg",
        alt: "Street content — urban texture",
        span: "third",
      },
      {
        type: "image",
        src: "/media/backstage-prep.jpg",
        alt: "Behind the scenes — campaign production",
        label: "Behind the Scenes",
        span: "wide",
      },
    ],
  },
  {
    id: "halcyon",
    index: "02",
    brand: "Halcyon",
    shortName: "Halcyon",
    tagline: "A quiet language for slow hospitality.",
    industry: "Hospitality",
    location: "Geneva, CH",
    year: "2024",
    services: ["Brand Identity", "Art Direction", "Photography", "Content"],
    role: "Creative Director & Brand Strategist",
    description:
      "A complete identity and content system for a collection of boutique hotels moving away from decor-led luxury toward atmosphere-led hospitality. We built a restrained visual world — warm low light, honest materials, and rooms photographed as they are meant to be felt. The campaign rolled out across print, digital and in-house touchpoints in fourteen properties.",
    preview: {
      type: "image",
      src: "/media/hotel-lobby.jpg",
      alt: "Halcyon — lobby in warm evening light",
    },
    media: [
      {
        type: "video",
        src: "/media/halcyon-film.mp4",
        poster: "/media/halcyon-film-poster.jpg",
        alt: "Halcyon — brand film, slow reveal of the atrium",
        label: "Brand Film — The Quiet Hours",
        span: "full",
      },
      {
        type: "image",
        src: "/media/hotel-suite.jpg",
        alt: "Signature suite — morning light",
        span: "half-tall",
      },
      {
        type: "image",
        src: "/media/hotel-lobby.jpg",
        alt: "Lobby — warm evening atmosphere",
        span: "half",
      },
      {
        type: "image",
        src: "/media/hotel-restaurant.jpg",
        alt: "Restaurant — editorial still life",
        span: "third",
      },
      {
        type: "image",
        src: "/media/hotel-detail.jpg",
        alt: "Interior detail — material study",
        span: "third",
      },
      {
        type: "image",
        src: "/media/hotel-atrium.jpg",
        alt: "Atrium — architectural composition",
        span: "third",
      },
      {
        type: "image",
        src: "/media/hotel-wide.jpg",
        alt: "Grand corridor — campaign key visual",
        label: "Print Campaign — SS24",
        span: "wide",
      },
    ],
  },
  {
    id: "obsidian-labs",
    index: "03",
    brand: "Obsidian Labs",
    shortName: "Obsidian",
    tagline: "Making deep tech feel inevitable.",
    industry: "Technology",
    location: "Berlin, DE",
    year: "2025",
    services: ["Creative Direction", "Brand Identity", "Digital Experience", "Film"],
    role: "Creative Director",
    description:
      "Positioning and full creative direction for a research-driven technology house entering the consumer market. The identity is deliberately silent: monochrome surfaces, generous negative space and product imagery treated like sculpture. A launch film and modular design system carried the brand from landing page to keynote stage without a single stock visual.",
    preview: {
      type: "image",
      src: "/media/tech-detail-01.webp",
      alt: "Obsidian Labs — product on dark surface",
    },
    media: [
      {
        type: "video",
        src: "/media/film-noir-texture.mp4",
        poster: "/media/film-noir-poster.jpg",
        alt: "Obsidian Labs — launch film, Silent Machines",
        label: "Launch Film — Silent Machines",
        span: "full",
      },
      {
        type: "image",
        src: "/media/tech-wide.jpg",
        alt: "Hero visual — device in controlled darkness",
        span: "half",
      },
      {
        type: "image",
        src: "/media/tech-product.jpg",
        alt: "Product study — object as sculpture",
        span: "half",
      },
      {
        type: "image",
        src: "/media/tech-panorama.jpg",
        alt: "Panoramic key visual — edge lighting",
        label: "Launch Key Visuals",
        span: "wide",
      },
      {
        type: "image",
        src: "/media/tech-detail-01.webp",
        alt: "Detail macro — material texture",
        span: "third",
      },
      {
        type: "image",
        src: "/media/tech-detail-02.jpg",
        alt: "Detail macro — form study",
        span: "third",
      },
      {
        type: "image",
        src: "/media/tech-ambient.webp",
        alt: "Ambient application — environment shot",
        span: "third",
      },
    ],
  },
  {
    id: "veloce",
    index: "04",
    brand: "Veloce",
    shortName: "Veloce",
    tagline: "Performance, photographed at night.",
    industry: "Automotive",
    location: "Turin, IT",
    year: "2024",
    services: ["Campaign", "Film", "Photography", "Social Content"],
    role: "Creative Director",
    description:
      "A night-drive campaign for a performance marque that wanted to trade daylight gloss for cinematic realism. Shot over three nights in Turin with available light and a single rigged car, the imagery leans on reflection, speed and restraint. The launch content outperformed every benchmark in the brand's previous campaign history.",
    preview: {
      type: "image",
      src: "/media/auto-front.jpg",
      alt: "Veloce — front grille in night light",
    },
    media: [
      {
        type: "video",
        src: "/media/veloce-film.mp4",
        poster: "/media/veloce-film-poster.jpg",
        alt: "Veloce — night drive film",
        label: "Campaign Film — Night Drive",
        span: "full",
      },
      {
        type: "image",
        src: "/media/auto-portrait-01.png",
        alt: "Vertical campaign visual — street portrait",
        span: "half-tall",
      },
      {
        type: "image",
        src: "/media/auto-front.jpg",
        alt: "Front composition — signature night light",
        span: "half",
      },
      {
        type: "image",
        src: "/media/auto-curve.jpg",
        alt: "Cornering study — motion and reflection",
        label: "Key Visuals — Asfalt",
        span: "wide",
      },
      {
        type: "image",
        src: "/media/auto-night.png",
        alt: "Night environment — city traffic",
        span: "third",
      },
      {
        type: "image",
        src: "/media/auto-portrait-02.jpg",
        alt: "Detail — light signature",
        span: "third",
      },
    ],
  },
  {
    id: "atlas-ivy",
    index: "05",
    brand: "Atlas & Ivy",
    shortName: "Atlas",
    tagline: "Objects of quiet ritual.",
    industry: "Lifestyle & Fragrance",
    location: "Copenhagen, DK",
    year: "2023",
    services: ["Brand Identity", "Packaging", "Campaign", "Social Content"],
    role: "Creative Director",
    description:
      "Naming, identity and launch campaign for a slow-living fragrance house. The world we built is deliberately still — stone, smoke and low northern light — so the product becomes the only moving element. Art direction extended across packaging, unboxing ritual and a social system built on negative space rather than product repetition.",
    preview: {
      type: "image",
      src: "/media/fragrance-detail.jpg",
      alt: "Atlas & Ivy — bottle detail",
    },
    media: [
      {
        type: "image",
        src: "/media/fragrance-hero.jpg",
        alt: "Hero still — bottle in stone landscape",
        label: "Launch Campaign — First Light",
        span: "half-tall",
      },
      {
        type: "image",
        src: "/media/fragrance-still.jpg",
        alt: "Still life — morning ritual",
        span: "half",
      },
      {
        type: "image",
        src: "/media/fragrance-campaign.jpg",
        alt: "Campaign key visual — wide composition",
        span: "wide",
      },
      {
        type: "image",
        src: "/media/fragrance-portrait.jpg",
        alt: "Product portrait — vertical crop",
        span: "portrait",
      },
      {
        type: "image",
        src: "/media/fragrance-detail.jpg",
        alt: "Detail macro — cap and label",
        span: "portrait",
      },
      {
        type: "image",
        src: "/media/fragrance-wide.jpg",
        alt: "Environment — northern light interior",
        label: "Social System — Rituals",
        span: "wide",
      },
    ],
  },
];

export interface Capability {
  index: string;
  title: string;
  note: string;
}

export const capabilities: Capability[] = [
  { index: "01", title: "Creative Direction", note: "Vision, world-building & art direction from concept to final frame" },
  { index: "02", title: "Brand Identity", note: "Naming, identity systems, typography & visual languages" },
  { index: "03", title: "Campaign Development", note: "Seasonal & launch campaigns across film, photo and digital" },
  { index: "04", title: "Art Direction", note: "Set design, casting direction & photographic language" },
  { index: "05", title: "Photography & Video", note: "Editorial, product and documentary storytelling" },
  { index: "06", title: "Social Content", note: "Content systems built for rhythm, not volume" },
  { index: "07", title: "Digital Experiences", note: "Websites and interactive worlds with editorial pacing" },
  { index: "08", title: "Creative Strategy", note: "Positioning, narrative and brand architecture" },
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Brands", href: "#brands" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
