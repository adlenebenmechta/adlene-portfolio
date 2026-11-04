"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
} from "lucide-react";
import type { Project, PageTexts, ProjectSection } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { Reveal, SectionLabel, TitleLockup } from "./shared";
import { MediaGallery } from "./MediaGallery";
import { SmartVideo } from "./SmartVideo";

interface CaseStudyProps {
  project: Project;
  next: Project;
  position: number;
  total: number;
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

/** host display for an external link, e.g. "armoray.com" */
function prettyHost(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace(/^www\./, "");
}

/* ── one organised media chapter: Video Ads / Styles / Results … ── */
function Section({
  section,
  label,
}: {
  section: ProjectSection;
  label: string;
}) {
  return (
    <section
      aria-label={section.label}
      className="mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-14 md:px-10 md:py-20 lg:px-16"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <SectionLabel>{section.label}</SectionLabel>
        {section.note && (
          <Reveal y={12} delay={0.06}>
            <p className="max-w-md text-[12px] leading-relaxed text-white/40 md:text-[13px]">
              {section.note}
            </p>
          </Reveal>
        )}
      </div>
      <MediaGallery media={section.media} />
    </section>
  );
}

export function CaseStudy({ project, next, position, total, texts }: CaseStudyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  const heroMedia = project.media[0];
  const gallery = project.media.slice(1);
  const sections = project.sections ?? [];
  const chapters = project.chapters ?? [];
  const hasSite = Boolean(project.website);

  /* ─────────────────────────────────────────────────────────────
     Header — shared by every mode
     ───────────────────────────────────────────────────────────── */
  const header = (
    <header className="mx-auto w-full max-w-[1400px] px-6 pt-10 md:px-10 md:pt-16 lg:px-16">
      <div ref={ref}>
        <Reveal y={16}>
          <div className="flex items-center gap-4">
            {/* the brand's own mark — serif initials when no compact logo */}
            <figure className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] md:h-16 md:w-16">
              {project.monogram ? (
                <span
                  aria-label={project.brand}
                  className={`font-serif tracking-[0.18em] text-[#E8E4DC] ${
                    project.monogram.length >= 3
                      ? "text-base md:text-lg"
                      : project.monogram.length === 2
                        ? "text-xl md:text-2xl"
                        : "text-2xl md:text-3xl"
                  }`}
                >
                  {project.monogram}
                </span>
              ) : (
                <img
                  src={mediaUrl(project.logo)}
                  alt={`${project.brand} logo`}
                  className="h-full w-full object-contain p-1.5 md:p-2"
                />
              )}
            </figure>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-[10px]">
              {project.industry}&ensp;·&ensp;{project.location}
            </p>
          </div>
        </Reveal>

        <motion.h1
          style={{ y: titleY }}
          className="mt-5 text-[2.5rem] font-medium leading-[1.02] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <Reveal delay={0.05}>
            {/* the name — opens the brand's site when there is one */}
            {hasSite ? (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-4 outline-none"
              >
                <span className="text-balance">{project.brand}</span>
                <ExternalLink
                  aria-hidden="true"
                  className="translate-y-[6px] text-white/40 transition-colors duration-300 hover:text-white/85 md:size-9"
                />
              </a>
            ) : (
              <span className="text-balance block">{project.brand}</span>
            )}
          </Reveal>
        </motion.h1>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-base italic leading-relaxed text-white/50 md:text-xl">
            {project.tagline}
          </p>
        </Reveal>

        {/* social proof + external links in context */}
        {(project.stat || hasSite || project.linkUrl) && (
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
              {project.stat && (
                <div>
                  <p className="font-serif text-4xl font-semibold leading-none tracking-[-0.01em] text-white md:text-5xl">
                    {project.stat}
                  </p>
                  {project.statLabel && (
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/45 md:text-[11px]">
                      {project.statLabel}
                    </p>
                  )}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                {hasSite && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/85 transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:text-[11px]"
                  >
                    {texts.visitLabel}
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover/link:rotate-45"
                    />
                  </a>
                )}
                {project.linkUrl && (
                  <a
                    href={project.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/60 transition-all duration-500 hover:border-white/40 hover:text-white md:text-[11px]"
                  >
                    {project.linkLabel || "Open link"}
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );

  const breadcrumb = (
    <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pt-28 md:px-10 md:pt-36 lg:px-16">
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
      <p className="text-[10px] uppercase tracking-[0.24em] text-white/30 md:text-[11px]">
        {project.industry}
      </p>
    </div>
  );

  const nextNav = (
    <nav
      aria-label="Next project"
      className="mx-auto w-full max-w-[1400px] px-6 pb-8 pt-6 md:px-10 md:pt-10 lg:px-16"
    >
      <Link
        href={`/work/${next.id}`}
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] outline-none transition-colors duration-700 hover:border-white/25"
      >
        <div className="absolute inset-0 overflow-hidden">
          {next.preview.src ? (
            <img
              src={mediaUrl(next.preview.src)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-25 transition-all duration-[1600ms] ease-out group-hover:scale-[1.04] group-hover:opacity-40"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_left,rgba(255,255,255,0.06),transparent_60%)]" />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505cc] to-transparent"
          />
        </div>

        <div className="relative flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-[10px]">
              {texts.nextLabel}
            </p>
            <p className="text-balance mt-4 text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:translate-x-2 sm:text-4xl md:text-5xl">
              {next.brand}
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/45">
              {next.stat ? next.statLabel : next.tagline}
            </p>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/85 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black md:text-[11px]">
            {texts.openLabel}
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:rotate-45"
            />
          </span>
        </div>
      </Link>
    </nav>
  );

  /* ─────────────────────────────────────────────────────────────
     MODE A — chapters (ACF): the project page presents its editions
     ───────────────────────────────────────────────────────────── */
  if (chapters.length > 0) {
    return (
      <>
        {breadcrumb}
        {header}

        {/* intro paragraph */}
        <div className="mx-auto mt-14 w-full max-w-[1400px] px-6 md:mt-18 md:px-10 lg:px-16">
          <Reveal>
            <p className="max-w-3xl text-[15px] leading-[1.9] text-white/60 md:text-base">
              {project.description}
            </p>
          </Reveal>
        </div>

        {/* the editions */}
        <section
          aria-label={texts.editionsLabel}
          className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24 lg:px-16"
        >
          <SectionLabel>{texts.editionsLabel}</SectionLabel>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {chapters.map((ch, i) => (
              <Reveal key={ch.id} delay={0.08 * i} y={30} className="h-full">
                <Link
                  href={`/work/${project.id}/${ch.id}`}
                  className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 outline-none transition-colors duration-700 hover:border-white/30 md:min-h-[360px] md:p-12"
                >
                  {/* sheen follows the hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-[11px]">
                      {ch.role}
                    </p>
                    <p className="mt-6 font-serif text-[3.2rem] font-medium leading-none tracking-[-0.02em] text-white/95 transition-transform duration-700 ease-out group-hover:-translate-y-1 md:text-[4.5rem]">
                      {ch.year}
                    </p>
                    {/* the role in the same couture lockup as the chapter
                        header — roman words, final word in italic */}
                    <p className="mt-5 font-serif text-xl tracking-[0.04em] text-white md:text-[1.45rem]">
                      <TitleLockup
                        title={ch.title}
                        italicClassName="font-light text-[#C9C3B4]"
                      />
                    </p>
                    <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/45">
                      {ch.description.split(".")[0]}.
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center justify-between">
                    <span className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/85 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black md:text-[11px]">
                      {texts.exploreLabel}
                      <ArrowRight
                        size={13}
                        aria-hidden="true"
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {nextNav}
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     MODE B — the single-page case study (Armoray, HolyStrips…)
     ───────────────────────────────────────────────────────────── */
  return (
    <>
      {breadcrumb}
      {header}

      {/* ─── Hero media ───────────────────────────────────────────────── */}
      {heroMedia?.src && (
        <div className="mx-auto mt-14 w-full max-w-[1400px] px-6 md:mt-20 md:px-10 lg:px-16">
          <Reveal variant="clip" amount={0.15}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/[0.03] md:aspect-[21/10] md:rounded-xl">
              {heroMedia.type === "video" ? (
                <SmartVideo
                  src={mediaUrl(heroMedia.src)}
                  poster={heroMedia.poster ? mediaUrl(heroMedia.poster) : undefined}
                  alt={heroMedia.alt}
                  label={heroMedia.label}
                  cta
                  className="absolute inset-0"
                  rounded="rounded-none"
                />
              ) : (
                <img
                  src={mediaUrl(heroMedia.src)}
                  alt={heroMedia.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>
          </Reveal>
        </div>
      )}

      {/* ─── Case metadata — liquid glass panel ─────────────────────── */}
      <div className="mx-auto mt-6 w-full max-w-[1400px] px-6 md:mt-8 md:px-10 lg:px-16">
        <Reveal>
          <dl className="liquid-glass grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl p-6 sm:grid-cols-3 md:grid-cols-6 md:gap-x-8 md:p-8">
            <Meta label="Client">{project.brand}</Meta>
            <Meta label="Year">{project.year}</Meta>
            <Meta label="Industry">{project.industry}</Meta>
            <Meta label="Role">{project.role}</Meta>
            <div className="col-span-2 sm:col-span-1 md:col-span-2">
              <Meta label="Services">
                <span className="flex flex-col gap-1">
                  {project.services.map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </span>
              </Meta>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* ─── Overview + deliverables ─────────────────────────────────── */}
      <section
        aria-label="Project overview"
        className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {project.deliverables.length > 0 && (
            <div className="md:col-span-4">
              <SectionLabel>{texts.briefTitle}</SectionLabel>
              <div className="mt-8 md:sticky md:top-28">
                <Reveal delay={0.1} y={18}>
                  <ul className="space-y-3.5">
                    {project.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[13px] leading-relaxed text-white/70"
                      >
                        <Check
                          size={13}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-white/40"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          )}

          <div
            className={
              project.deliverables.length > 0
                ? "md:col-span-7 md:col-start-6"
                : "md:col-span-12"
            }
          >
            <Reveal>
              <h2 className="text-[1.6rem] font-medium leading-[1.2] tracking-[-0.015em] text-white sm:text-3xl md:text-[2.25rem]">
                {texts.workTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 text-[15px] leading-[1.9] text-white/60 md:text-base">
                {project.description}
              </p>
            </Reveal>
            {sections.length > 0 && (
              <Reveal delay={0.14}>
                <p className="mt-5 text-[15px] leading-[1.9] text-white/45 md:text-base">
                  The sections below are the selected edit — everything made
                  for {project.brand}, organised so it reads at a glance.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ─── Organised sections — Video Ads / Styles / Results … ────── */}
      {sections.map((s) => (
        <Section key={s.id} section={s} label={s.label} />
      ))}

      {/* ─── Legacy media gallery (when media[] is used directly) ────── */}
      {gallery.length > 0 && (
        <section
          aria-label={`${project.brand} gallery`}
          className="mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-16 md:px-10 md:py-24 lg:px-16"
        >
          <SectionLabel>The Work</SectionLabel>
          <MediaGallery media={gallery} />
        </section>
      )}

      {nextNav}
    </>
  );
}
