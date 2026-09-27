"use client";

import type { ReactNode } from "react";
import { PageShell } from "./PageShell";
import { Hero } from "./Hero";
import { WorkGrid } from "./WorkGrid";
import { AboutTeaser } from "./AboutTeaser";
import { ContactCTA } from "./ContactCTA";

/**
 * The multi-page home:
 * — the filmmaker's showreel plays fullscreen and completely clean
 *   (no text over it, nothing covering it)
 * — organized work index below (every card opens its own page)
 * — about teaser + contact CTA
 */
export function HomePage() {
  return (
    <PageShell background={<CinematicBackground />}>
      {/* SEO only — visually hidden so nothing writes over the film */}
      <h1 className="sr-only">
        Adlene Benmechta — Creative Director, Filmmaker &amp; Brand
        Storyteller
      </h1>

      <Hero />

      {/* solid archive surface that slides over the film on scroll */}
      <div className="relative z-10 flex w-full flex-col items-center">
        {/* soft seam: the film dissolves into the archive below */}
        <div
          aria-hidden="true"
          className="h-[26vh] w-full bg-gradient-to-b from-transparent via-[#05050599] to-[#050505]"
        />

        <div className="flex w-full flex-col items-center bg-[#050505]">
          <WorkGrid />
          <AboutTeaser />
          <ContactCTA />
        </div>
      </div>
    </PageShell>
  );
}

/**
 * Fixed looping film background — full colour, unfiltered, uncovered.
 * No brightness filter, no dark veil, no vignette, no grain:
 * the video is shown exactly as the filmmaker made it.
 */
function CinematicBackground(): ReactNode {
  return (
    <video
      className="fixed inset-0 z-[0] h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster="/media/hero-poster.jpg"
      aria-hidden="true"
    >
      <source src="/video.mp4" type="video/mp4" />
    </video>
  );
}
