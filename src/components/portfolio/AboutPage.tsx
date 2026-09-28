"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PageTexts } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { Reveal, SectionLabel } from "./shared";

export function AboutPage({
  portrait,
  texts,
}: {
  portrait: { src: string; alt: string };
  texts: PageTexts["about"];
}) {
  return (
    <>
      {/* ─── Intro ─────────────────────────────────────────────────── */}
      <section
        aria-label="About Adlene Benmechta"
        className="mx-auto w-full max-w-[1400px] px-6 pt-28 md:px-10 md:pt-40 lg:px-16"
      >
        <SectionLabel index="01">About</SectionLabel>

        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-4xl text-[2.25rem] font-medium leading-[1.06] tracking-[-0.025em] text-white sm:text-5xl md:text-7xl">
            {texts.headline}
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-12">
          {/* text column */}
          <div className="md:col-span-7">
            <Reveal delay={0.08}>
              <p className="text-[15px] leading-[1.9] text-white/60 md:text-base">
                {texts.bio1}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 text-[15px] leading-[1.9] text-white/60 md:text-base">
                {texts.bio2}
              </p>
            </Reveal>

            <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
              {texts.facts.map((fact, i) => (
                <Reveal key={fact.label + i} delay={0.06 * i} y={18}>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-[10px]">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-[13px] leading-relaxed text-white/80">
                      {fact.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.2}>
              <Link
                href="/contact"
                className="group mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-black transition-all duration-500 hover:bg-white/85 md:text-[11px]"
              >
                Start a Project
                <ArrowRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          {/* Portrait — square cutout, shown in full, no crop */}
          <div className="md:col-span-5">
            <Reveal variant="clip" amount={0.2}>
              <figure className="group relative aspect-square overflow-hidden rounded-lg bg-white/[0.03] md:rounded-xl">
                <img
                  src={mediaUrl(portrait.src)}
                  alt={portrait.alt}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-20">
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-white/85">
                    {texts.portraitName}
                  </span>
                  <span className="mt-1.5 block text-[9px] uppercase tracking-[0.24em] text-white/45">
                    {texts.portraitRole}
                  </span>
                </span>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Capabilities ──────────────────────────────────────────── */}
      <section
        aria-label="Capabilities"
        className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 md:py-36 lg:px-16"
      >
        <SectionLabel index="02">Capabilities</SectionLabel>

        <Reveal delay={0.05}>
          <h2 className="mt-7 max-w-2xl text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            {texts.capabilitiesTitle}
          </h2>
        </Reveal>

        <ul className="mt-14 list-none border-y border-white/10 md:mt-20">
          {texts.capabilities.map((capability, i) => (
            <li
              key={capability.index + i}
              className="border-b border-white/[0.06] last:border-b-0"
            >
              <Reveal delay={Math.min(i * 0.03, 0.2)} y={20}>
                <div className="group grid grid-cols-[2.6rem_1fr_auto] items-baseline gap-x-4 px-2 py-6 transition-colors duration-500 hover:bg-white/[0.025] md:grid-cols-[5rem_1fr_1fr_2.5rem] md:gap-x-8 md:px-4 md:py-8">
                  <span className="text-[11px] tabular-nums text-white/30 md:text-xs">
                    {capability.index}
                  </span>
                  <h3 className="text-xl font-medium tracking-[-0.01em] text-white/85 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white sm:text-2xl md:text-[2rem] md:leading-tight">
                    {capability.title}
                  </h3>
                  <p className="hidden max-w-xs text-right text-[13px] leading-relaxed text-white/40 md:block">
                    {capability.note}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden h-1.5 w-1.5 justify-self-end rounded-full bg-white/0 transition-all duration-500 group-hover:bg-white/70 md:block"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
