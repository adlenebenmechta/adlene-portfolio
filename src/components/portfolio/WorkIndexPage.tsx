"use client";

import { WorkGrid } from "./WorkGrid";
import { ContactCTA } from "./ContactCTA";
import { Reveal } from "./shared";

/**
 * /work — the portfolio index page.
 * Opens from the "my portfolio" box on the home hero;
 * every card leads to its own case study page.
 */
export function WorkIndexPage() {
  return (
    <div className="flex w-full flex-col items-center bg-[#050505]">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-4 pt-32 md:px-10 md:pt-40 lg:px-16">
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.06] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl">
            The work, in its own room.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/55 md:text-base">
            Every project below opens its own page — campaign films,
            photography, identities and digital experiences, each with the
            full story behind it.
          </p>
        </Reveal>
      </div>

      <WorkGrid />

      <ContactCTA />
    </div>
  );
}
