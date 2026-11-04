"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { Reveal, SectionLabel, BrandCard } from "./shared";

/** editorial layout rhythm per row of the index */
const LAYOUT: { span: string; aspect: string }[] = [
  { span: "md:col-span-7", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-5", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-5", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-7", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-6", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-6", aspect: "md:aspect-[16/10]" },
];

function WorkCard({
  project,
  position,
}: {
  project: Project;
  position: number;
}) {
  const layout = LAYOUT[position % LAYOUT.length];
  const hasSite = Boolean(project.website);

  return (
    <Reveal
      delay={0.05 * (position % 2)}
      y={28}
      className={`aspect-[4/3] ${layout.span} ${layout.aspect}`}
    >
      <div className="group relative h-full w-full">
        {/* the whole card opens the case study */}
        <Link
          href={`/work/${project.id}`}
          className="absolute inset-0 z-[1] rounded-lg outline-none md:rounded-xl"
          aria-label={`Open the ${project.brand} case study`}
        />

        <figure className="relative h-full w-full overflow-hidden rounded-lg bg-white/[0.03] md:rounded-xl">
          {/* media — uploaded preview or the brand wordmark card */}
          {project.preview.src ? (
            <img
              src={mediaUrl(project.preview.src)}
              alt={project.preview.alt}
              loading={position < 2 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]"
            />
          ) : (
            <BrandCard project={project} />
          )}

          {/* readability veils */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25 opacity-90 transition-opacity duration-700 group-hover:opacity-100"
          />

          {/* top meta row — industry only, never a number */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-end p-4 md:p-6">
            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
              {project.industry}
            </span>
          </div>

          {/* bottom editorial info */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:p-8">
            {project.stat && (
              <p className="font-serif text-2xl font-semibold leading-none tracking-[-0.01em] text-white/95 md:text-3xl">
                {project.stat}
              </p>
            )}

            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <h3 className="text-balance text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:-translate-y-0.5 sm:text-3xl md:text-4xl">
                {hasSite ? (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto relative z-[2] inline-flex items-baseline gap-2 outline-none"
                  >
                    {project.brand}
                    <ExternalLink
                      size={18}
                      aria-hidden="true"
                      className="translate-y-[2px] self-center text-white/45 transition-colors duration-300 group-hover:text-white/80"
                    />
                  </a>
                ) : (
                  project.brand
                )}
              </h3>

              <motion.span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white/85 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 md:text-[10px]">
                View Case Study
                <ArrowUpRight size={11} aria-hidden="true" />
              </motion.span>
            </div>

            <p className="max-w-md text-[12px] leading-relaxed text-white/55 md:text-[13px]">
              {project.stat ? project.statLabel : project.tagline}
            </p>
          </div>
        </figure>
      </div>
    </Reveal>
  );
}

export function WorkGrid({
  projects,
  title,
}: {
  projects: Project[];
  title: string;
}) {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-10 pt-24 md:px-10 md:pt-32 lg:px-16"
    >
      <SectionLabel>Selected Work</SectionLabel>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-[10px] uppercase tracking-[0.26em] text-white/35 md:text-[11px]">
            {projects.length} selected brands
          </p>
        </Reveal>
      </div>

      {/* organized editorial grid — every card opens its own page */}
      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12 md:gap-5">
        {projects.map((project, i) => (
          <WorkCard key={project.id} project={project} position={i} />
        ))}
      </div>
    </section>
  );
}
