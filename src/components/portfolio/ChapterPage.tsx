"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project, ProjectChapter, PageTexts } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { Reveal, SectionLabel } from "./shared";
import { MediaGallery } from "./MediaGallery";

interface ChapterPageProps {
  project: Project;
  chapter: ProjectChapter;
  nextChapter: ProjectChapter;
  texts: PageTexts["caseStudy"];
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-[10px]">
        {label}
      </dt>
      <dd className="mt-2 text-[13px] leading-relaxed text-white/85">{children}</dd>
    </div>
  );
}

/**
 * A chapter page — one edition of a multi-edition project
 * (e.g. ACF 2025 — STAFF MEMBER / ACF 2026 — TEAM MANAGER).
 */
export function ChapterPage({
  project,
  chapter,
  nextChapter,
  texts,
}: ChapterPageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  const sections = chapter.sections ?? [];

  return (
    <>
      {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pt-28 md:px-10 md:pt-36 lg:px-16">
        <Link
          href={`/work/${project.id}`}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/45 transition-colors duration-300 hover:text-white md:text-[11px]"
        >
          <ArrowLeft
            size={13}
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:-translate-x-1"
          />
          {project.brand}
        </Link>
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/30 md:text-[11px]">
          {project.industry}
        </p>
      </div>

      {/* ─── Title block ────────────────────────────────────────────── */}
      <header className="mx-auto w-full max-w-[1400px] px-6 pt-10 md:px-10 md:pt-16 lg:px-16">
        <div ref={ref}>
          <Reveal y={16}>
            <div className="flex items-center gap-4">
              <figure className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-1.5 md:h-16 md:w-16 md:p-2">
                <img
                  src={mediaUrl(project.logo)}
                  alt={`${project.brand} logo`}
                  className="h-full w-full object-contain"
                />
              </figure>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-[10px]">
                {chapter.role}&ensp;·&ensp;{chapter.year}
              </p>
            </div>
          </Reveal>

          <motion.h1
            style={{ y: titleY }}
            className="mt-5 font-serif text-[2.75rem] font-semibold leading-[1.0] tracking-[-0.02em] text-white sm:text-6xl md:text-8xl lg:text-[6rem]"
          >
            <Reveal delay={0.05}>
              <span className="block">{chapter.title}</span>
            </Reveal>
          </motion.h1>

          <Reveal delay={0.12}>
            <p className="mt-6 text-base italic leading-relaxed text-white/50 md:text-xl">
              {project.brand}&ensp;—&ensp;{chapter.year} edition
            </p>
          </Reveal>
        </div>
      </header>

      {/* ─── Case metadata — liquid glass panel ─────────────────────── */}
      <div className="mx-auto mt-10 w-full max-w-[1400px] px-6 md:mt-14 md:px-10 lg:px-16">
        <Reveal>
          <dl className="liquid-glass grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl p-6 sm:grid-cols-3 md:grid-cols-6 md:gap-x-8 md:p-8">
            <Meta label="Edition">{chapter.year}</Meta>
            <Meta label="Role">{chapter.role}</Meta>
            <div className="col-span-2 sm:col-span-1 md:col-span-4">
              <Meta label="Services">
                <span className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.services.map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </span>
              </Meta>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* ─── The story ──────────────────────────────────────────────── */}
      <section
        aria-label="Chapter overview"
        className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionLabel>{texts.briefTitle}</SectionLabel>
          </div>
          <div className="mt-8 md:col-span-7 md:col-start-6 md:mt-0">
            <Reveal>
              <h2 className="text-[1.6rem] font-medium leading-[1.2] tracking-[-0.015em] text-white sm:text-3xl md:text-[2.25rem]">
                {texts.workTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 text-[15px] leading-[1.9] text-white/60 md:text-base">
                {chapter.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Organised media chapters ───────────────────────────────── */}
      {sections.map((s) => (
        <section
          key={s.id}
          aria-label={s.label}
          className="mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-14 md:px-10 md:py-20 lg:px-16"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <SectionLabel>{s.label}</SectionLabel>
            {s.note && (
              <Reveal y={12} delay={0.06}>
                <p className="max-w-md text-[12px] leading-relaxed text-white/40 md:text-[13px]">
                  {s.note}
                </p>
              </Reveal>
            )}
          </div>
          <MediaGallery media={s.media} />
        </section>
      ))}

      {/* ─── Next edition ───────────────────────────────────────────── */}
      <nav
        aria-label="Next edition"
        className="mx-auto w-full max-w-[1400px] px-6 pb-8 pt-6 md:px-10 md:pt-10 lg:px-16"
      >
        <Link
          href={`/work/${project.id}/${nextChapter.id}`}
          className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] outline-none transition-colors duration-700 hover:border-white/25"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,255,255,0.06),transparent_60%)]"
          />
          <div className="relative flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-14">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-[10px]">
                {nextChapter.id === chapter.id
                  ? `Back to ${texts.editionsLabel}`
                  : `${texts.nextLabel} — ${project.brand} ${nextChapter.year}`}
              </p>
              <p className="mt-4 text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:translate-x-2 sm:text-4xl md:text-5xl">
                {nextChapter.year}&ensp;—&ensp;{nextChapter.title}
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/85 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black md:text-[11px]">
              {texts.exploreLabel}
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </span>
          </div>
        </Link>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/work"
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/45 transition-colors duration-300 hover:text-white md:text-[11px]"
          >
            <ArrowLeft
              size={13}
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:-translate-x-1"
            />
            {texts.backLabel}
          </Link>
          <Link
            href={`/work/${project.id}`}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/45 transition-colors duration-300 hover:text-white md:text-[11px]"
          >
            {project.brand}
            <ArrowRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </nav>
    </>
  );
}
