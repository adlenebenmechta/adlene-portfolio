import type { Metadata } from "next";
import { getContent } from "@/lib/content";
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
  return (
    <PageShell projects={content.projects} background={<WorkFilmBackground film={content.workFilm} />}>
      <WorkIndexPage projects={content.projects} />
    </PageShell>
  );
}
