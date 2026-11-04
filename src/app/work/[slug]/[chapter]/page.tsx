import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { resolvePages } from "@/lib/site-content";
import { ChapterPage } from "@/components/portfolio/ChapterPage";
import { PageShell } from "@/components/portfolio/PageShell";

export const dynamic = "force-dynamic";

interface ChapterRouteProps {
  params: Promise<{ slug: string; chapter: string }>;
}

export async function generateMetadata({
  params,
}: ChapterRouteProps): Promise<Metadata> {
  const { slug, chapter } = await params;
  const { projects } = await getContent();
  const project = projects.find((p) => p.id === slug);
  const ch = project?.chapters?.find((c) => c.id === chapter);
  if (!project || !ch) return {};

  return {
    title: `${ch.title} — ${ch.year} · ${project.brand} — Adlene Benmechta`,
    description: ch.description,
    openGraph: {
      title: `${ch.title} — ${ch.year} · ${project.brand}`,
      description: ch.description,
      type: "article",
    },
  };
}

export default async function ChapterRoute({ params }: ChapterRouteProps) {
  const { slug, chapter } = await params;
  const content = await getContent();
  const texts = resolvePages(content.pages);
  const { projects } = content;

  const project = projects.find((p) => p.id === slug);
  if (!project?.chapters?.length) notFound();

  const index = project.chapters.findIndex((c) => c.id === chapter);
  if (index === -1) notFound();

  const ch = project.chapters[index];
  const nextChapter = project.chapters[(index + 1) % project.chapters.length];

  return (
    <PageShell
      projects={projects}
      background={<div className="film-grain" aria-hidden="true" />}
      signature={texts.home.heroName}
      footerTexts={texts.footer}
      email={content.settings.email}
    >
      <ChapterPage
        project={project}
        chapter={ch}
        nextChapter={nextChapter}
        texts={texts.caseStudy}
      />
    </PageShell>
  );
}
