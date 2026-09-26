"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionLabel } from "./shared";

export function ContactCTA() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center border-t border-white/[0.08] px-6 py-28 text-center md:px-10 md:py-44 lg:px-16"
    >
      <SectionLabel index="04" className="flex w-full justify-center">
        Contact
      </SectionLabel>

      <Reveal delay={0.05}>
        <h2 className="mt-8 text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl">
          Have a project in mind?
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-7 max-w-md text-balance text-base leading-relaxed text-white/55 md:text-lg">
          Let&apos;s create something worth remembering.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <Link
          href="/contact"
          className="group mt-14 inline-flex items-center gap-4 rounded-full border border-white/25 px-9 py-5 text-[11px] uppercase tracking-[0.22em] text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:px-12 md:py-6 md:text-xs"
        >
          Start a Project
          <ArrowRight
            size={17}
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          />
        </Link>
      </Reveal>

      <Reveal delay={0.28}>
        <p className="mt-16 text-[10px] uppercase tracking-[0.26em] text-white/30 md:text-[11px]">
          hello@adlenebenmechta.com&ensp;—&ensp;Algiers · Worldwide
        </p>
      </Reveal>
    </section>
  );
}
