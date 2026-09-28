"use client";

import { ArrowUpRight } from "lucide-react";
import type { NoteItem } from "@/lib/site-content";
import { Reveal, SectionLabel } from "./shared";

export function Capabilities({
  title,
  items,
}: {
  title: string;
  items: NoteItem[];
}) {
  return (
    <section
      id="capabilities"
      aria-label="Capabilities"
      className="relative z-10 mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-24 md:px-10 md:py-36 lg:px-16"
    >
      <SectionLabel index="03">Capabilities</SectionLabel>

      <Reveal delay={0.05}>
        <h2 className="mt-7 max-w-2xl text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
          {title}
        </h2>
      </Reveal>

      <ul className="mt-14 list-none border-y border-white/10 md:mt-20">
        {items.map((capability, i) => (
          <li key={capability.index + i} className="border-b border-white/[0.06] last:border-b-0">
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
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="justify-self-end text-white/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80"
                />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
