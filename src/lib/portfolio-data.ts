/* ────────────────────────────────────────────────────────────────
   Static site chrome data — nav links, capabilities, contact email.
   Brand/media content now lives in content.json (see site-content.ts)
   and is managed through the hidden /admin panel.
   ──────────────────────────────────────────────────────────────── */

export type { Project, MediaItem, MediaKind } from "./site-content";

export interface Capability {
  index: string;
  title: string;
  note: string;
}

export const capabilities: Capability[] = [
  { index: "01", title: "Creative Direction", note: "Concept to campaign — one held vision" },
  { index: "02", title: "Brand Identity", note: "Systems built to age slowly and well" },
  { index: "03", title: "Campaign & Film", note: "Direction and photography for moving image" },
  { index: "04", title: "Photography", note: "Editorial, campaign and portrait work" },
  { index: "05", title: "Digital Experiences", note: "Websites and interactive worlds with editorial pacing" },
  { index: "06", title: "Creative Strategy", note: "Positioning, narrative and brand architecture" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const EMAIL = "hello@adlenebenmechta.com";
