import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/portfolio-data";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { PageShell } from "@/components/portfolio/PageShell";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
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
  const index = projects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell background={<div className="film-grain" aria-hidden="true" />}>
      <CaseStudy
        project={project}
        next={next}
        position={index + 1}
        total={projects.length}
      />
    </PageShell>
  );
}
