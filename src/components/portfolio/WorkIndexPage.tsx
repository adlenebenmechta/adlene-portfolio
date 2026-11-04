"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project, SiteContent, PageTexts } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { ContactCTA } from "./ContactCTA";
import { Reveal, EASE, BrandCard } from "./shared";

/** staggered line reveal — same editorial voice as the hero */
const lineIn = (delay: number) => ({
  initial: { opacity: 0, y: 42, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: EASE },
});

/**
 * Fixed looping film background for the /work page —
 * full colour, unfiltered, uncovered. Slot comes from content.
 */
export function WorkFilmBackground({
  film,
}: {
  film: SiteContent["workFilm"];
}): ReactNode {
  return (
    <video
      className="fixed inset-0 z-[0] h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster={mediaUrl(film.poster)}
      aria-hidden="true"
    >
      <source src={mediaUrl(film.video)} type="video/mp4" />
    </video>
  );
}

/** host display for an external link, e.g. "armoray.com"
 *  (query strings like Instagram's ?hl=fr are dropped for the chip) */
function prettyHost(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/[?#].*$/, "")
    .replace(/\/$/, "")
    .replace(/^www\./, "");
}

/**
 * One brand box — the whole tile opens the project page.
 * When the brand has a website, the NAME itself is an external link
 * (opened in a new tab), exactly one level above the tile link.
 */
function WorkBox({
  project,
  position,
}: {
  project: Project;
  position: number;
}) {
  const hasSite = Boolean(project.website);

  return (
    <Reveal
      delay={0.06 * (position % 3)}
      y={36}
      className="aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5]"
    >
      <div className="group relative h-full w-full">
        {/* the whole box opens the project page */}
        <Link
          href={`/work/${project.id}`}
          className="absolute inset-0 z-[1] rounded-lg outline-none md:rounded-xl"
          aria-label={`Open the ${project.brand} page`}
        />

        <figure className="relative h-full w-full overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] transition-colors duration-700 group-hover:border-white/20 md:rounded-xl">
          {/* media — uploaded preview, or the brand wordmark card */}
          {project.preview.src ? (
            <img
              src={mediaUrl(project.preview.src)}
              alt={project.preview.alt}
              loading={position < 3 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]"
            />
          ) : (
            <BrandCard project={project} />
          )}

          {/* readability veils */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 opacity-90 transition-opacity duration-700 group-hover:opacity-100"
          />

          {/* top meta row — industry & year, never a number */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4 md:p-5">
            <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
              {project.industry}
            </span>
            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[9px] tabular-nums tracking-[0.14em] text-white/55 backdrop-blur-md">
              {project.year}
            </span>
          </div>

          {/* bottom editorial block */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-5 md:p-6">
            {project.stat && (
              <p className="font-serif text-[1.45rem] font-semibold leading-none tracking-[-0.01em] text-white/95 md:text-[1.65rem]">
                {project.stat}
              </p>
            )}

            {/* the name — an external link when the brand has a site */}
            <h3 className="text-balance text-[1.4rem] font-medium leading-[1.08] tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:-translate-y-0.5 md:text-[1.55rem]">
              {hasSite ? (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto relative z-[2] inline-flex items-baseline gap-2 outline-none transition-colors duration-300 hover:text-white"
                >
                  {project.brand}
                  <ExternalLink
                    size={15}
                    aria-hidden="true"
                    className="translate-y-[1px] self-center text-white/45 transition-colors duration-300 group-hover:text-white/80"
                  />
                </a>
              ) : (
                project.brand
              )}
            </h3>

            <p className="max-w-[26ch] text-[11.5px] leading-relaxed text-white/55 md:text-[12px]">
              {project.stat ? project.statLabel : project.tagline}
            </p>

            {/* actions */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <motion.span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3.5 py-2 text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md transition-all duration-500 group-hover:border-white/35 md:text-[10px]">
                View My Work
                <ArrowUpRight size={11} aria-hidden="true" />
              </motion.span>
              {hasSite && (
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3.5 py-2 text-[9px] tracking-[0.12em] text-white/50 backdrop-blur-md md:text-[10px]">
                  {prettyHost(project.website!)}
                </span>
              )}
            </div>
          </div>
        </figure>
      </div>
    </Reveal>
  );
}

/**
 * /work — the portfolio index as a wall of brand boxes.
 * The film plays fullscreen behind the page title; below the seam,
 * the curated grid — one box per brand, no numbering.
 */
export function WorkIndexPage({
  projects,
  texts,
  cta,
}: {
  projects: Project[];
  texts: PageTexts["work"];
  cta: { texts: PageTexts["contact"]; email: string };
}) {
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
            {texts.kicker}
          </motion.p>

          <motion.h1
            {...lineIn(0.45)}
            className="mt-5 max-w-4xl font-serif text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[1.02] tracking-[-0.015em] text-white"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.55)" }}
          >
            {texts.headline}
          </motion.h1>

          <motion.p
            {...lineIn(0.62)}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-base"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
          >
            {texts.intro}
          </motion.p>
        </div>
      </section>

      {/* seam: the film dissolves into the archive */}
      <div
        aria-hidden="true"
        className="relative z-10 h-[26vh] w-full bg-gradient-to-b from-transparent via-[#05050599] to-[#050505]"
      />

      {/* ── the wall of brand boxes ──────────────────────────── */}
      <div className="relative z-10 flex w-full flex-col items-center bg-[#050505]">
        <section
          aria-label="Work index"
          className="mx-auto w-full max-w-[1600px] px-5 pb-4 pt-16 md:px-8 md:pt-20 lg:px-10"
        >
          {/* index header row */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-white/10 pb-5">
            <Reveal y={14}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-[11px]">
                Index — {projects.length} selected brands
              </p>
            </Reveal>
            <Reveal y={14} delay={0.08}>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/35 md:text-[11px]">
                Explore by brand
              </p>
            </Reveal>
          </div>

          {/* the curated grid — content order, no numbering */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 md:gap-5">
            {projects.map((project, i) => (
              <WorkBox key={project.id} project={project} position={i} />
            ))}
          </div>
        </section>

        <ContactCTA texts={cta.texts} email={cta.email} />
      </div>
    </div>
  );
}
