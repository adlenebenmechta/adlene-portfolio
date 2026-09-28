import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { resolvePages } from "@/lib/site-content";
import { PageShell } from "@/components/portfolio/PageShell";
import { AboutPage } from "@/components/portfolio/AboutPage";

export const dynamic = "force-dynamic";

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

export default async function About() {
  const content = await getContent();
  const texts = resolvePages(content.pages);
  return (
    <PageShell
      projects={content.projects}
      background={<div className="film-grain" aria-hidden="true" />}
      signature={texts.home.heroName}
      footerTexts={texts.footer}
      email={content.settings.email}
    >
      <AboutPage portrait={content.portrait} texts={texts.about} />
    </PageShell>
  );
}
