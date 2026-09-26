"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import { projects } from "@/lib/portfolio-data";
import { Reveal, SectionLabel } from "./shared";

/** editorial layout rhythm per row of the index */
const LAYOUT: { span: string; aspect: string }[] = [
  { span: "md:col-span-7", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-5", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-5", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-7", aspect: "md:aspect-[16/10]" },
  { span: "md:col-span-12", aspect: "md:aspect-[21/9]" },
];

function WorkCard({
  project,
  position,
}: {
  project: Project;
  position: number;
}) {
  const layout = LAYOUT[position % LAYOUT.length];

  return (
    <Reveal
      delay={0.05 * (position % 2)}
      y={28}
      className={`aspect-[4/3] ${layout.span} ${layout.aspect}`}
    >
      <Link
        href={`/work/${project.id}`}
        className="group relative block h-full w-full outline-none focus-visible:opacity-80"
        aria-label={`Open the ${project.brand} case study`}
      >
        <figure className="relative h-full w-full overflow-hidden rounded-lg bg-white/[0.03] md:rounded-xl">
          {/* media */}
          { }
          <img
            src={project.preview.src}
            alt={project.preview.alt}
            loading={position < 2 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]"
          />

          {/* readability veils */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25 opacity-90 transition-opacity duration-700 group-hover:opacity-100"
          />

          {/* top meta row */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-6">
            <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] tabular-nums tracking-[0.2em] text-white/75 backdrop-blur-md">
              {project.index}
            </span>
            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
              {project.industry}
            </span>
          </div>

          {/* bottom editorial info */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:p-8">
            <p className="text-[9px] uppercase tracking-[0.26em] text-white/50 md:text-[10px]">
              {project.year}&ensp;—&ensp;{project.location}&ensp;—&ensp;
              {project.services.slice(0, 2).join(" · ")}
            </p>

            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <h3 className="text-2xl font-medium leading-none tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:-translate-y-0.5 sm:text-3xl md:text-4xl">
                {project.brand}
              </h3>

              <motion.span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white/85 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 md:text-[10px]">
                View Case Study
                <ArrowUpRight size={11} aria-hidden="true" />
              </motion.span>
            </div>

            <p className="max-w-md text-[12px] leading-relaxed text-white/55 md:text-[13px]">
              {project.tagline}
            </p>
          </div>
        </figure>
      </Link>
    </Reveal>
  );
}

export function WorkGrid() {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-10 pt-24 md:px-10 md:pt-32 lg:px-16"
    >
      <SectionLabel index="01">Selected Work</SectionLabel>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
            Brands I&apos;ve had the opportunity to work with.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-[10px] uppercase tracking-[0.26em] text-white/35 md:text-[11px]">
            {projects.length} case studies&ensp;—&ensp;2023 → 2025
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
