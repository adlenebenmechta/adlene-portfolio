import type { Metadata } from "next";
import { AboutPage } from "@/components/portfolio/AboutPage";
import { PageShell } from "@/components/portfolio/PageShell";

export const metadata: Metadata = {
  title: "About — Adlene Benmechta",
  description:
    "Adlene Benmechta is a creative director and brand strategist working between Algiers and Europe — strategy, culture and visual storytelling for brands that want to be remembered.",
  openGraph: {
    title: "About — Adlene Benmechta",
    description:
      "Strategy, culture and visual storytelling — creative direction across identity, campaign, film and digital.",
    type: "website",
  },
};

export default function About() {
  return (
    <PageShell background={<div className="film-grain" aria-hidden="true" />}>
      <AboutPage />
    </PageShell>
  );
}
