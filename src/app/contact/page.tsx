import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { resolvePages } from "@/lib/site-content";
import { ContactPage } from "@/components/portfolio/ContactPage";
import { PageShell } from "@/components/portfolio/PageShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact — Adlene Benmechta",
  description:
    "Start a project with Adlene Benmechta — creative direction, brand identity, campaigns and digital experiences.",
  openGraph: {
    title: "Contact — Adlene Benmechta",
    description:
      "Have a project in mind? Let's create something worth remembering.",
    type: "website",
  },
};

export default async function Contact() {
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
      <ContactPage email={content.settings.email} texts={texts.contact} />
    </PageShell>
  );
}
