"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
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

/** newest work first — a professionally ordered index */
const SORTED: Project[] = [...projects].sort(
  (a, b) => Number(b.year) - Number(a.year),
);

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

/** One index row — big typography, hairline rule, arrow.
 *  Mobile shows a thumbnail; desktop gets the floating preview instead. */
function IndexRow({
  project,
  position,
  onEnter,
}: {
  project: Project;
  position: number;
  onEnter: (p: Project | null) => void;
}) {
  return (
    <li>
      <Link
        href={`/work/${project.id}`}
        onMouseEnter={() => onEnter(project)}
        onFocus={() => onEnter(project)}
        onBlur={() => onEnter(null)}
        className="group block border-t border-white/10 py-7 outline-none transition-colors duration-500 hover:bg-white/[0.02] focus-visible:bg-white/[0.03] md:py-9"
        aria-label={`Open the ${project.brand} case study`}
      >
        {/* mobile thumbnail */}
        <figure className="mb-4 overflow-hidden rounded-lg md:hidden">
          <img
            src={project.preview.src}
            alt={project.preview.alt}
            loading={position < 2 ? "eager" : "lazy"}
            decoding="async"
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>

        {/* mobile meta line */}
        <p className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.24em] text-white/35 md:hidden">
          <span className="tabular-nums text-white/30">
            {String(position + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-px w-4 bg-white/20" />
          <span>{project.industry}</span>
          <span className="ml-auto tabular-nums">{project.year}</span>
        </p>

        <div className="mt-2 md:mt-0 md:grid md:grid-cols-[3.5rem_1fr_auto] md:items-baseline md:gap-8">
          {/* number — desktop */}
          <span className="hidden self-start pt-2 text-[11px] tabular-nums text-white/30 md:block">
            {String(position + 1).padStart(2, "0")}
          </span>

          {/* brand + tagline */}
          <div>
            <h2 className="inline-flex items-center gap-4 text-[1.85rem] font-medium leading-none tracking-[-0.02em] text-white/90 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white sm:text-4xl md:text-5xl">
              {project.brand}
              <ArrowUpRight
                size={26}
                aria-hidden="true"
                className="opacity-25 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </h2>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/45 md:mt-4">
              {project.tagline}
            </p>
          </div>

          {/* meta — desktop */}
          <div className="hidden pt-2 text-right md:block">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
              {project.industry}
            </p>
            <p className="mt-1.5 text-[10px] tabular-nums text-white/30">
              {project.year}&ensp;·&ensp;{project.location}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

/**
 * /work — the professional portfolio index.
 * The second film plays fullscreen behind the page title; below the seam,
 * a strictly ordered editorial list: newest first, hairline rules,
 * a spring-following image preview on desktop, thumbnails on mobile.
 */
export function WorkIndexPage() {
  const [active, setActive] = useState<Project | null>(null);
  const [hoverFine, setHoverFine] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 170, damping: 22, mass: 0.55 });
  const py = useSpring(my, { stiffness: 170, damping: 22, mass: 0.55 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 768px)");
    const update = () => setHoverFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
          onMouseMove={(e) => {
            mx.set(e.clientX - 170);
            my.set(e.clientY - 115);
          }}
          onMouseLeave={() => setActive(null)}
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
                2023 → 2025 · Newest first
              </p>
            </Reveal>
          </div>

          {/* the ordered list */}
          <ul className="border-b border-white/10">
            {SORTED.map((project, i) => (
              <IndexRow
                key={project.id}
                project={project}
                position={i}
                onEnter={setActive}
              />
            ))}
          </ul>

          {/* warm the preview cache */}
          <div className="pointer-events-none h-0 overflow-hidden" aria-hidden="true">
            {SORTED.map((p) => (
              <img key={p.id} src={p.preview.src} alt="" decoding="async" />
            ))}
          </div>
        </section>

        <ContactCTA />
      </div>

      {/* ── floating preview — desktop pointers only ──────────── */}
      {hoverFine && (
        <motion.div
          aria-hidden="true"
          style={{ x: px, y: py }}
          animate={{
            opacity: active ? 1 : 0,
            scale: active ? 1 : 0.92,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="pointer-events-none fixed left-0 top-0 z-20 hidden w-[340px] md:block"
        >
          <div className="aspect-[16/10] overflow-hidden rounded-lg shadow-2xl shadow-black/60">
            {active && (
              <img
                src={active.preview.src}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
