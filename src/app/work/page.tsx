import type { Metadata } from "next";
import { PageShell } from "@/components/portfolio/PageShell";
import { WorkIndexPage } from "@/components/portfolio/WorkIndexPage";

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

export default function Work() {
  return (
    <PageShell background={<div className="film-grain" aria-hidden="true" />}>
      <WorkIndexPage />
    </PageShell>
  );
}
