"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PageTexts } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { Reveal, SectionLabel } from "./shared";

export function AboutTeaser({
  portrait,
  texts,
}: {
  portrait: { src: string; alt: string };
  texts: PageTexts["about"];
}) {
  return (
    <section
      aria-label="About Adlene Benmechta"
      className="relative z-10 mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-24 md:px-10 md:py-36 lg:px-16"
    >
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        {/* portrait */}
        <div className="order-first md:order-last md:col-span-5">
          <Reveal variant="clip" amount={0.2}>
            <figure className="group relative aspect-square overflow-hidden rounded-lg bg-white/[0.03] md:rounded-xl">
              <img
                src={mediaUrl(portrait.src)}
                alt={portrait.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              />
            </figure>
          </Reveal>
        </div>

        {/* text */}
        <div className="md:col-span-7">
          <SectionLabel index="02">About</SectionLabel>

          <Reveal delay={0.05}>
            <h2 className="mt-7 max-w-2xl text-[1.75rem] font-medium leading-[1.15] tracking-[-0.015em] text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              {texts.teaserHeadline}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-[15px] leading-[1.9] text-white/60 md:text-base">
              {texts.teaserBio}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-white/85 transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:text-[11px]"
            >
              More About Me
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
