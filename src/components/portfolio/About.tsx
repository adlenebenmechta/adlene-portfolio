"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, SectionLabel } from "./shared";

const FACTS: { label: string; value: string }[] = [
  { label: "Experience", value: "8+ years — independent since 2021" },
  { label: "Disciplines", value: "Creative Direction · Branding · Film · Photography" },
  { label: "Industries", value: "Fashion · Hospitality · Tech · Automotive · Lifestyle" },
  { label: "Location", value: "Algiers, DZ — working worldwide" },
  { label: "Availability", value: "Select projects — Q1 2026" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <section
      id="about"
      aria-label="About Adlene Benmechta"
      className="relative z-10 mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-24 md:px-10 md:py-40 lg:px-16"
    >
      <SectionLabel index="02">About</SectionLabel>

      <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="text-[1.75rem] font-medium leading-[1.15] tracking-[-0.015em] text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              I work at the intersection of strategy, culture and visual
              storytelling.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl text-[15px] leading-[1.9] text-white/60 md:text-base">
              I&apos;m Adlene Benmechta — a creative director and brand
              strategist based between Algiers and Europe. For the past eight
              years I&apos;ve helped fashion houses, hotels, technology
              companies and lifestyle brands define how they look, speak and
              are remembered. My work moves from strategy to the final frame:
              positioning, identity, campaigns, photography and the digital
              experiences that carry them.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.9] text-white/60 md:text-base">
              I believe a brand is not what it says about itself — it&apos;s
              the feeling that remains when the lights go out. That&apos;s
              the standard I hold every project to: work that is intentional
              enough to feel inevitable, and distinctive enough to be
              remembered.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
            {FACTS.map((fact, i) => (
              <Reveal key={fact.label} delay={0.06 * i} y={18}>
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
        </div>

        {/* Portrait */}
        <div className="md:col-span-5">
          <div ref={ref} className="relative">
            <Reveal variant="clip" amount={0.2}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-white/[0.03] md:rounded-xl">
                <motion.div style={{ y: imageY }} className="absolute -inset-y-10 inset-x-0">
                  { }
                  <img
                    src="/media/portrait-director.jpg"
                    alt="Adlene Benmechta — creative director, black and white portrait"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-20">
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-white/85">
                    Adlene Benmechta
                  </span>
                  <span className="mt-1.5 block text-[9px] uppercase tracking-[0.24em] text-white/45">
                    Creative Director — Algiers / Worldwide
                  </span>
                </span>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
