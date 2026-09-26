"use client";

import type { ReactNode } from "react";
import { PageShell } from "./PageShell";
import { Hero } from "./Hero";
import { WorkGrid } from "./WorkGrid";
import { AboutTeaser } from "./AboutTeaser";
import { ContactCTA } from "./ContactCTA";

/**
 * The multi-page home:
 * — cinematic fullscreen video hero
 * — organized work index (every card opens its own case study page)
 * — about teaser + contact CTA
 */
export function HomePage() {
  return (
    <PageShell background={<CinematicBackground />}>
      <Hero />

      {/* solid archive surface over the film */}
      <div className="relative z-10 flex w-full flex-col items-center">
        {/* cinematic fade from the film into the archive */}
        <div
          aria-hidden="true"
          className="h-[34vh] w-full bg-gradient-to-b from-transparent via-[#050505dd] to-[#050505]"
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

/** Fixed looping film background with readability overlays */
function CinematicBackground(): ReactNode {
  return (
    <>
      <video
        className="fixed inset-0 z-[0] w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/media/hero-poster.jpg"
        aria-hidden="true"
        style={{ filter: "brightness(0.62) saturate(0.78)" }}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric overlays — readability + vignette + grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-black/55"
      />
      <div
        aria-hidden="true"
        className="vignette pointer-events-none fixed inset-0 z-[2]"
      />
      <div className="film-grain" aria-hidden="true" />
    </>
  );
}
