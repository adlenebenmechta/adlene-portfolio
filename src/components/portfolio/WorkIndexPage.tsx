"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import { projects } from "@/lib/portfolio-data";
import { ContactCTA } from "./ContactCTA";
import { Reveal, EASE } from "./shared";

/** staggered line reveal — same editorial voice as the hero */
const lineIn = (delay: number) => ({
  initial: { opacity: 0, y: 42, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: EASE },
});

/**
 * Fixed looping film background for the /work page —
 * Adlene's second film, full colour, unfiltered, uncovered.
 */
export function WorkFilmBackground(): ReactNode {
  return (
    <video
      className="fixed inset-0 z-[0] h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster="/media/work-poster.jpg"
      aria-hidden="true"
    >
      <source src="/work-video.mp4" type="video/mp4" />
    </video>
  );
}

/** One uniform index card — info below the image, nothing hidden. */
function WorkCard({
  project,
  position,
}: {
  project: Project;
  position: number;
}) {
  const wide = position === projects.length - 1; // the final card completes the grid

  return (
    <Reveal
      delay={0.06 * (position % 2)}
      y={30}
      className={wide ? "md:col-span-2" : ""}
    >
      <Link
        href={`/work/${project.id}`}
        className="group block outline-none focus-visible:opacity-80"
        aria-label={`Open the ${project.brand} case study`}
      >
        <figure className="relative overflow-hidden rounded-lg bg-white/[0.03] md:rounded-xl">
          <img
            src={project.preview.src}
            alt={project.preview.alt}
            loading={position < 2 ? "eager" : "lazy"}
            decoding="async"
            className={`aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] ${
              wide ? "md:aspect-[21/9]" : ""
            }`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10"
          />
        </figure>

        <div className="mt-4 md:mt-5">
          <p className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.26em] text-white/40 md:text-[11px]">
            <span className="tabular-nums text-white/30">{project.index}</span>
            <span aria-hidden="true" className="h-px w-4 bg-white/20" />
            <span>{project.industry}</span>
            <span className="ml-auto tabular-nums">{project.year}</span>
          </p>

          <h2 className="mt-2.5 inline-flex items-center gap-2.5 text-xl font-medium tracking-[-0.02em] text-white sm:text-2xl">
            {project.brand}
            <ArrowUpRight
              size={19}
              aria-hidden="true"
              className="opacity-35 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </h2>

          <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-white/50">
            {project.tagline}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * /work — the organized portfolio index.
 * The second film plays fullscreen behind the page title;
 * below the seam, a clean uniform archive: every project the same
 * card, the same rhythm, every card opens its own case study page.
 */
export function WorkIndexPage() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* ── header over the film ─────────────────────────────── */}
      <section
        aria-label="Work introduction"
        className="relative z-10 flex min-h-svh w-full items-end"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-14 pt-32 md:px-8 md:pb-16 md:pt-36 lg:px-10">
          <motion.p
            {...lineIn(0.3)}
            className="text-[10px] uppercase tracking-[0.32em] text-white/60 md:text-[11px]"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
          >
            ( 01 ) — Selected Work
          </motion.p>

          <motion.h1
            {...lineIn(0.45)}
            className="mt-5 max-w-4xl font-serif text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[1.02] tracking-[-0.015em] text-white"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.55)" }}
          >
            The work, in its own room.
          </motion.h1>

          <motion.p
            {...lineIn(0.62)}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-base"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
          >
            Every project below opens its own page — campaign films,
            photography, identities and digital experiences, each with
            the full story behind it.
          </motion.p>
        </div>
      </section>

      {/* seam: the film dissolves into the archive */}
      <div
        aria-hidden="true"
        className="relative z-10 h-[26vh] w-full bg-gradient-to-b from-transparent via-[#05050599] to-[#050505]"
      />

      {/* ── organized archive on solid ───────────────────────── */}
      <div className="relative z-10 flex w-full flex-col items-center bg-[#050505]">
        <section
          aria-label="Work index"
          className="mx-auto w-full max-w-[1600px] px-5 pb-4 pt-16 md:px-8 md:pt-20 lg:px-10"
        >
          {/* index header row */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-white/10 pb-5">
            <Reveal y={14}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-[11px]">
                Index — {projects.length} case studies
              </p>
            </Reveal>
            <Reveal y={14} delay={0.08}>
              <p className="text-[10px] tabular-nums uppercase tracking-[0.24em] text-white/35 md:text-[11px]">
                2023 → 2025
              </p>
            </Reveal>
          </div>

          {/* uniform editorial grid — every card opens its own page */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-14 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
            {projects.map((project, i) => (
              <WorkCard key={project.id} project={project} position={i} />
            ))}
          </div>
        </section>

        <ContactCTA />
      </div>
    </div>
  );
}
