"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { PageShell } from "./PageShell";
import { Hero } from "./Hero";
import { TrustedBar } from "./TrustedBar";
import { WorkGrid } from "./WorkGrid";
import { AboutTeaser } from "./AboutTeaser";
import { ContactCTA } from "./ContactCTA";
import { Capabilities } from "./Capabilities";
import { mediaUrl } from "@/lib/media";
import { resolvePages, type SiteContent } from "@/lib/site-content";

/**
 * The multi-page home:
 * — the filmmaker's showreel plays fullscreen and completely clean
 *   (no text over it, nothing covering it)
 * — organized work index below (every card opens its own page)
 * — about teaser + contact CTA
 * All media slots come from the runtime content (admin-editable).
 */
export function HomePage({ content }: { content: SiteContent }) {
  const texts = resolvePages(content.pages);
  return (
    <PageShell
      projects={content.projects}
      background={<CinematicBackground video={content.hero.video} poster={content.hero.poster} />}
      signature={texts.home.heroName}
      footerTexts={texts.footer}
      email={content.settings.email}
    >
      {/* the opening film frame — hero text + the endless client strip
          docked at the frame's bottom edge (visible on load, no scroll) */}
      <div className="relative z-10 w-full">
        <Hero texts={texts.home} />
        <TrustedBar projects={content.projects} />
      </div>

      {/* solid archive surface that slides over the film on scroll */}
      <div className="relative z-10 flex w-full flex-col items-center">
        {/* soft seam: the film dissolves into the archive below */}
        <div
          aria-hidden="true"
          className="h-[26vh] w-full bg-gradient-to-b from-transparent via-[#05050599] to-[#050505]"
        />

        <div className="flex w-full flex-col items-center bg-[#050505]">
          <WorkGrid projects={content.projects} title={texts.home.workTitle} />
          <AboutTeaser portrait={content.portrait} texts={texts.about} />
          <Capabilities
            title={texts.about.capabilitiesTitle}
            items={texts.about.capabilities}
          />
          <ContactCTA texts={texts.contact} email={content.settings.email} />
        </div>
      </div>
    </PageShell>
  );
}

/**
 * Fixed looping film background — full colour, unfiltered, uncovered.
 * No brightness filter, no dark veil, no vignette, no grain:
 * the video is shown exactly as the filmmaker made it.
 *
 * Seamless loop: instead of letting the browser's native loop path fire
 * at the exact end (some browsers repaint the element black for a beat,
 * and an evicted media buffer turns the wrap into a visible re-buffer),
 * we seek back to 0 just BEFORE the end while the decoder is still warm.
 * The native `loop` attribute stays on as a safety net — if the rAF
 * guard ever misses (e.g. a throttled tab), the video still wraps.
 *
 * Never-stall watchdog: browsers pause background films on their own
 * (tab switch, power saving, mobile app switch, buffer eviction) and
 * never resume them — the frame freezes into a still. Whenever ANYTHING
 * pauses this film, we bring it straight back; the moment the page is
 * visible/focused again, playback resumes. muted + playsInline keeps
 * autoplay permission, so play() never needs a user gesture.
 */
function CinematicBackground({
  video,
  poster,
}: {
  video: string;
  poster: string;
}): ReactNode {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    /* 1) seamless early-seek wrap */
    let raf = 0;
    const tick = () => {
      // guard against NaN duration while metadata loads
      if (v.duration && v.currentTime >= v.duration - 0.15) {
        v.currentTime = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* 2) insist on playing — nothing may leave the film frozen */
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    const resume = () => {
      if (v.paused) v.play().catch(() => {/* retried by the next event */});
    };
    const onResumeSoon = () => {
      clearTimeout(resumeTimer);
      // tiny delay: lets seek-related micro-pauses settle before
      // we re-issue play(), avoiding a play/pause tug-of-war
      resumeTimer = setTimeout(resume, 80);
    };
    const onEnded = () => {
      v.currentTime = 0;
      resume();
    };
    const onVisible = () => {
      if (!document.hidden) onResumeSoon();
    };

    v.addEventListener("pause", onResumeSoon);
    v.addEventListener("ended", onEnded);
    v.addEventListener("stalled", onResumeSoon);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onResumeSoon);
    window.addEventListener("pageshow", onResumeSoon);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      v.removeEventListener("pause", onResumeSoon);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("stalled", onResumeSoon);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onResumeSoon);
      window.removeEventListener("pageshow", onResumeSoon);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="fixed inset-0 z-[0] h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={mediaUrl(poster)}
      aria-hidden="true"
    >
      <source src={mediaUrl(video)} type="video/mp4" />
    </video>
  );
}
