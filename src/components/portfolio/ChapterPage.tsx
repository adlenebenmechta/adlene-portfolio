"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { createPortal } from "react-dom";
import type { Project, ProjectChapter, PageTexts } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { BrandMark, Reveal, SectionLabel, TitleLockup } from "./shared";
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

/* ── one official document — badge or certificate ─────────────────
   A museum-style frame: dark outer card, ivory passe-partout
   inside so any scan or photo of the document sits like it
   would behind glass in a real frame. Opens the lightbox. */
function CredentialCard({
  src,
  caption,
  sub,
  aspect,
  onOpen,
}: {
  src: string;
  caption: string;
  sub: string;
  /** the badge keeps its portrait ratio and drives the row height;
   *  the certificate stretches to match it on md+ (a landscape
   *  document in a taller mat — like a real gallery pair) */
  aspect: string;
  onOpen: () => void;
}) {
  return (
    <Reveal variant="clip" amount={0.2} className="h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${caption} — open full view`}
        className="group block h-full w-full cursor-zoom-in rounded-xl outline-none"
      >
        <figure className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:border-white/25 group-hover:bg-white/[0.035] md:p-5">
          {/* ivory passe-partout — documents read instantly as documents */}
          <div
            className={`relative overflow-hidden rounded-lg bg-[#F4F1E8] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(0,0,0,0.05)] ${aspect}`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-5 md:p-7">
              <img
                src={mediaUrl(src)}
                alt={caption}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/70 md:text-[11px]">
              {caption}
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 md:text-[10px]">
              {sub}
            </span>
          </figcaption>
        </figure>
      </button>
    </Reveal>
  );
}

/* ── the credentials strip — badge & certification, framed ───────── */
function CredentialsPanel({
  project,
  chapter,
  onOpen,
}: {
  project: Project;
  chapter: ProjectChapter;
  onOpen: (doc: { src: string; caption: string }) => void;
}) {
  const badge = chapter.badge?.src ? chapter.badge : null;
  const certificate = chapter.certificate?.src ? chapter.certificate : null;
  if (!badge && !certificate) return null;

  const single = badge ? (certificate ? false : true) : true;

  return (
    <section
      aria-label="Credentials"
      className="mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-14 md:px-10 md:py-20 lg:px-16"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <SectionLabel>Credentials</SectionLabel>
        <Reveal y={12} delay={0.06}>
          <p className="max-w-md text-[12px] leading-relaxed text-white/40 md:text-[13px]">
            Official documents from the {chapter.year} edition — the event
            badge and certification.
          </p>
        </Reveal>
      </div>

      <div
        className={`mt-12 grid gap-4 md:mt-16 md:items-stretch md:gap-5 ${
          single ? "max-w-xl" : "md:grid-cols-2"
        }`}
      >
        {badge && (
          <CredentialCard
            src={badge.src}
            caption={badge.alt?.trim() || "Event Badge"}
            sub={`${project.brand} · ${chapter.year}`}
            aspect="aspect-[4/5]"
            onOpen={() =>
              onOpen({ src: badge.src, caption: badge.alt?.trim() || "Event Badge" })
            }
          />
        )}
        {certificate && (
          <CredentialCard
            src={certificate.src}
            caption={certificate.alt?.trim() || "Certification"}
            sub={`${project.brand} · ${chapter.year}`}
            aspect="aspect-[4/3] md:aspect-auto md:min-h-[320px] md:flex-1"
            onOpen={() =>
              onOpen({
                src: certificate.src,
                caption: certificate.alt?.trim() || "Certification",
              })
            }
          />
        )}
      </div>
    </section>
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

  /* lightbox — full view of an official document */
  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
  } | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  /* the overlay must portal to <body> — ancestors keep a transform/filter
   * after their entrance animation, which would re-anchor position:fixed */
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  /* the title as a couture lockup — roman words above, the last
   * word in italic on its own line (TEAM / MANAGER) */
  const words = chapter.title.trim().split(/\s+/);
  const headWords = words.slice(0, -1).join(" ");
  const tailWord = words[words.length - 1];

  return (
    <>
      {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pt-36 md:px-10 md:pt-40 lg:px-16">
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
              {/* the brand's own mark — the real logo, serif initials only
                  as a fallback when no logo file exists */}
              <BrandMark project={project} />
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-[10px]">
                {chapter.year}
              </p>
            </div>
          </Reveal>

          {/* the role as an editorial lockup — a roman line over an
              italic line. Light weight, tight leading and air: couture,
              not shouting. */}
          <motion.h1
            style={{ y: titleY }}
            className="mt-7 font-serif text-[2.6rem] font-normal leading-[0.98] text-white sm:text-6xl md:text-8xl lg:text-[5.75rem]"
          >
            <Reveal delay={0.05}>
              {words.length > 1 ? (
                <>
                  <span className="block tracking-[0.05em]">{headWords}</span>
                  <span className="-ml-[0.045em] block font-light italic tracking-[0.015em] text-[#DDD8CA]">
                    {tailWord}
                  </span>
                </>
              ) : (
                <span className="block tracking-[0.05em]">{chapter.title}</span>
              )}
            </Reveal>
          </motion.h1>
        </div>
      </header>

      {/* ─── Case metadata — liquid glass panel ─────────────────────── */}
      <div className="mx-auto mt-12 w-full max-w-[1400px] px-6 md:mt-20 md:px-10 lg:px-16">
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

      {/* Credentials — badge & certification, framed */}
      <CredentialsPanel project={project} chapter={chapter} onOpen={setLightbox} />

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
              <p className="mt-4 font-serif text-2xl font-normal leading-[1.05] tracking-[-0.01em] text-white transition-transform duration-700 ease-out group-hover:translate-x-2 sm:text-4xl md:text-5xl">
                {nextChapter.year}&ensp;—&ensp;
                <TitleLockup
                  title={nextChapter.title}
                  italicClassName="font-light text-[#C9C3B4]"
                />
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

      {/* Lightbox — the document at full size */}
      {portalReady &&
        createPortal(
          <AnimatePresence>
            {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={lightbox.caption}
              onClick={closeLightbox}
              className="fixed inset-0 z-[120] flex cursor-zoom-out flex-col items-center justify-center gap-5 bg-black/90 p-6 backdrop-blur-md md:p-12"
            >
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close"
                className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 transition-colors duration-300 hover:border-white hover:text-white md:right-10 md:top-10"
              >
                <X size={16} aria-hidden="true" />
              </button>
              <motion.figure
                initial={{ scale: 0.96, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.97, y: 8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full"
              >
                <img
                  src={mediaUrl(lightbox.src)}
                  alt={lightbox.caption}
                  className="max-h-[74vh] w-auto max-w-full rounded-lg bg-[#F4F1E8] object-contain p-4 shadow-[0_40px_120px_rgba(0,0,0,0.6)] md:p-6"
                />
                <figcaption className="mt-5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/55 md:text-[11px]">
                  <span aria-hidden="true" className="h-px w-8 bg-white/20" />
                  {lightbox.caption} — {project.brand} {chapter.year}
                  <span aria-hidden="true" className="h-px w-8 bg-white/20" />
                </figcaption>
              </motion.figure>
            </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
