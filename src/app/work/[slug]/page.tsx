import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { resolvePages } from "@/lib/site-content";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { PageShell } from "@/components/portfolio/PageShell";

export const dynamic = "force-dynamic";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getContent();
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: `${project.brand} — Adlene Benmechta`,
    description: project.tagline,
    openGraph: {
      title: `${project.brand} — Adlene Benmechta`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const content = await getContent();
  const texts = resolvePages(content.pages);
  const { projects } = content;
  const index = projects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell
      projects={projects}
      background={<div className="film-grain" aria-hidden="true" />}
      signature={texts.home.heroName}
      footerTexts={texts.footer}
      email={content.settings.email}
    >
      <CaseStudy
        project={project}
        next={next}
        position={index + 1}
        total={projects.length}
        texts={texts.caseStudy}
      />
    </PageShell>
  );
}
