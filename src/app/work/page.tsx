import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { resolvePages } from "@/lib/site-content";
import { PageShell } from "@/components/portfolio/PageShell";
import {
  WorkFilmBackground,
  WorkIndexPage,
} from "@/components/portfolio/WorkIndexPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work — Adlene Benmechta",
  description:
    "Selected campaigns, films, identities and digital experiences — every project opens its own case study page.",
  openGraph: {
    title: "Work — Adlene Benmechta",
    description:
      "Selected campaigns, films, identities and digital experiences — every project opens its own case study page.",
    type: "website",
  },
};

export default async function Work() {
  const content = await getContent();
  const texts = resolvePages(content.pages);
  return (
    <PageShell
      projects={content.projects}
      background={<WorkFilmBackground film={content.workFilm} />}
      signature={texts.home.heroName}
      footerTexts={texts.footer}
      email={content.settings.email}
    >
      <WorkIndexPage
        projects={content.projects}
        texts={texts.work}
        cta={{ texts: texts.contact, email: content.settings.email }}
      />
    </PageShell>
  );
}
