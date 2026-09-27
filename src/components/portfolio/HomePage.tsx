"use client";

import type { ReactNode } from "react";
import { PageShell } from "./PageShell";
import { Hero } from "./Hero";
import { WorkGrid } from "./WorkGrid";
import { AboutTeaser } from "./AboutTeaser";
import { ContactCTA } from "./ContactCTA";
import { mediaUrl } from "@/lib/media";
import type { SiteContent } from "@/lib/site-content";

/**
 * The multi-page home:
 * — the filmmaker's showreel plays fullscreen and completely clean
 *   (no text over it, nothing covering it)
 * — organized work index below (every card opens its own page)
 * — about teaser + contact CTA
 * All media slots come from the runtime content (admin-editable).
 */
export function HomePage({ content }: { content: SiteContent }) {
  return (
    <PageShell
      projects={content.projects}
      background={<CinematicBackground video={content.hero.video} poster={content.hero.poster} />}
    >
      <Hero />

      {/* solid archive surface that slides over the film on scroll */}
      <div className="relative z-10 flex w-full flex-col items-center">
        {/* soft seam: the film dissolves into the archive below */}
        <div
          aria-hidden="true"
          className="h-[26vh] w-full bg-gradient-to-b from-transparent via-[#05050599] to-[#050505]"
        />

        <div className="flex w-full flex-col items-center bg-[#050505]">
          <WorkGrid projects={content.projects} />
          <AboutTeaser portrait={content.portrait} />
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
function CinematicBackground({
  video,
  poster,
}: {
  video: string;
  poster: string;
}): ReactNode {
  return (
    <video
      className="fixed inset-0 z-[0] h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster={mediaUrl(poster)}
      aria-hidden="true"
    >
      <source src={mediaUrl(video)} type="video/mp4" />
    </video>
  );
}
