"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import { Reveal, SectionLabel } from "./shared";
import { MediaGallery } from "./MediaGallery";
import { SmartVideo } from "./SmartVideo";

interface CaseStudyProps {
  project: Project;
  next: Project;
  position: number;
  total: number;
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

export function CaseStudy({ project, next, position, total }: CaseStudyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  const heroMedia = project.media[0];
  const gallery = project.media.slice(1);

  return (
    <>
      {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pt-28 md:px-10 md:pt-36 lg:px-16">
        <Link
          href="/"
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/45 transition-colors duration-300 hover:text-white md:text-[11px]"
        >
          <ArrowLeft
            size={13}
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:-translate-x-1"
          />
          All Work
        </Link>
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/30 md:text-[11px]">
          <span className="tabular-nums">{project.index}</span>&ensp;/&ensp;
          <span className="tabular-nums">
            {String(total).padStart(2, "0")}
          </span>
        </p>
      </div>

      {/* ─── Title block ─────────────────────────────────────────────── */}
      <header className="mx-auto w-full max-w-[1400px] px-6 pt-10 md:px-10 md:pt-16 lg:px-16">
        <div ref={ref}>
          <Reveal y={16}>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-[10px]">
              {project.industry}&ensp;·&ensp;{project.location}
            </p>
          </Reveal>

          <motion.h1
            style={{ y: titleY }}
            className="mt-5 text-[2.75rem] font-medium leading-[1.0] tracking-[-0.025em] text-white sm:text-6xl md:text-8xl lg:text-[6.5rem]"
          >
            <Reveal delay={0.05}>
              <span className="block">{project.brand}</span>
            </Reveal>
          </motion.h1>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base italic leading-relaxed text-white/50 md:text-xl">
              {project.tagline}
            </p>
          </Reveal>
        </div>
      </header>

      {/* ─── Hero media ───────────────────────────────────────────────── */}
      <div className="mx-auto mt-14 w-full max-w-[1400px] px-6 md:mt-20 md:px-10 lg:px-16">
        <Reveal variant="clip" amount={0.15}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/[0.03] md:aspect-[21/10] md:rounded-xl">
            {heroMedia.type === "video" ? (
              <SmartVideo
                src={heroMedia.src}
                poster={heroMedia.poster}
                alt={heroMedia.alt}
                label={heroMedia.label}
                cta
                className="absolute inset-0"
                rounded="rounded-none"
              />
            ) : (
               
              <img
                src={heroMedia.src}
                alt={heroMedia.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        </Reveal>
      </div>

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
        className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-32 lg:px-16"
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionLabel index="02">The Brief</SectionLabel>
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

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <h2 className="text-[1.6rem] font-medium leading-[1.2] tracking-[-0.015em] text-white sm:text-3xl md:text-[2.25rem]">
                The work.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 text-[15px] leading-[1.9] text-white/60 md:text-base">
                {project.description}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-[15px] leading-[1.9] text-white/60 md:text-base">
                Every asset in this chapter was developed end-to-end — from the
                first narrative frame to the final delivery kit — as {project.role.toLowerCase()} for{" "}
                {project.brand}. The system below is the selected edit: the
                films, key visuals and social assets that defined how the brand
                was seen in {project.year}.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Media gallery ───────────────────────────────────────────── */}
      {gallery.length > 0 && (
        <section
          aria-label={`${project.brand} gallery`}
          className="mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-16 md:px-10 md:py-24 lg:px-16"
        >
          <SectionLabel index="03">The Work</SectionLabel>
          <MediaGallery media={gallery} />
        </section>
      )}

      {/* ─── Next project ────────────────────────────────────────────── */}
      <nav
        aria-label="Next project"
        className="mx-auto w-full max-w-[1400px] px-6 pb-8 pt-6 md:px-10 md:pt-10 lg:px-16"
      >
        <Link
          href={`/work/${next.id}`}
          className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] outline-none transition-colors duration-700 hover:border-white/25"
        >
          <div className="absolute inset-0 overflow-hidden">
            { }
            <img
              src={next.preview.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-25 transition-all duration-[1600ms] ease-out group-hover:scale-[1.04] group-hover:opacity-40"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505cc] to-transparent"
            />
          </div>

          <div className="relative flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-14">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-[10px]">
                Next Project&ensp;—&ensp;{next.index}
              </p>
              <p className="mt-4 text-3xl font-medium leading-none tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:translate-x-2 sm:text-4xl md:text-6xl">
                {next.brand}
              </p>
              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/45">
                {next.tagline}
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/85 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black md:text-[11px]">
              Open Case Study
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </span>
          </div>
        </Link>
      </nav>
    </>
  );
}
