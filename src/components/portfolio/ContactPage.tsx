"use client";

import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";
import { EMAIL } from "@/lib/portfolio-data";
import { Reveal, SectionLabel } from "./shared";

const STEPS: { index: string; title: string; note: string }[] = [
  {
    index: "01",
    title: "The Brief",
    note: "Tell me about the brand, the ambition and the timeline — a voice note is enough.",
  },
  {
    index: "02",
    title: "The Proposal",
    note: "Within a week you receive a direction, a scope and a transparent budget.",
  },
  {
    index: "03",
    title: "The Work",
    note: "Concept to final frame — with review checkpoints you can follow live.",
  },
];

const SOCIALS = [
  { label: "TikTok", Icon: Music2 },
  { label: "Instagram", Icon: Instagram },
  { label: "Twitter", Icon: Twitter },
  { label: "YouTube", Icon: Youtube },
  { label: "Facebook", Icon: Facebook },
];

export function ContactPage() {
  return (
    <>
      {/* ─── CTA block ─────────────────────────────────────────────── */}
      <section
        aria-label="Contact"
        className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 pt-32 text-center md:px-10 md:pt-48 lg:px-16"
      >
        <SectionLabel index="01" className="flex w-full justify-center">
          Contact
        </SectionLabel>

        <Reveal delay={0.05}>
          <h1 className="mt-8 text-[2.75rem] font-medium leading-[1.02] tracking-[-0.025em] text-white sm:text-6xl md:text-8xl">
            Have a project
            <br />
            in mind?
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-md text-balance text-base leading-relaxed text-white/55 md:text-lg">
            Let&apos;s create something worth remembering.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-12 inline-flex items-center gap-4 rounded-full bg-white px-10 py-5 text-[11px] uppercase tracking-[0.22em] text-black transition-all duration-500 hover:bg-white/85 md:px-12 md:py-6 md:text-xs"
          >
            Start a Project
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            />
          </a>
        </Reveal>

        <Reveal delay={0.28}>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-10 block text-[11px] uppercase tracking-[0.26em] text-white/40 transition-colors duration-300 hover:text-white md:text-xs"
          >
            {EMAIL}
          </a>
        </Reveal>
      </section>

      {/* ─── Details grid ───────────────────────────────────────────── */}
      <section
        aria-label="Contact details"
        className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 md:py-36 lg:px-16"
      >
        <Reveal>
          <dl className="liquid-glass grid grid-cols-1 gap-x-8 gap-y-9 rounded-2xl p-8 sm:grid-cols-3 md:p-12">
            <div>
              <dt className="text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-[10px]">
                Location
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-white/85">
                Algiers, DZ
                <span className="block text-[13px] text-white/45">
                  working worldwide
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-[10px]">
                Availability
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-white/85">
                Select projects
                <span className="block text-[13px] text-white/45">
                  booking Q1 2026
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-[10px]">
                Response
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-white/85">
                Within 48 hours
                <span className="block text-[13px] text-white/45">
                  via email
                </span>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* ─── Process + socials ─────────────────────────────────────── */}
      <section
        aria-label="Working together"
        className="mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-24 md:px-10 md:py-36 lg:px-16"
      >
        <SectionLabel index="02">What Happens Next</SectionLabel>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08} y={24}>
              <div className="border-t border-white/15 pt-6">
                <p className="text-[11px] tabular-nums text-white/30">
                  {step.index}
                </p>
                <h3 className="mt-4 text-xl font-medium tracking-[-0.01em] text-white md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/50">
                  {step.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 flex flex-col items-center gap-7 border-t border-white/[0.08] pt-14 md:mt-28">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
              Elsewhere
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {SOCIALS.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href="#top"
                    aria-label={label}
                    className="flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-white/60 transition-all duration-500 hover:border-white/50 hover:text-white"
                  >
                    <Icon size={14} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.26em] text-white/30 transition-colors duration-300 hover:text-white"
            >
              ← Back to Selected Work
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
