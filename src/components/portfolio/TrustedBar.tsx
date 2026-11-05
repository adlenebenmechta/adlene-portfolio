"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { mediaUrl } from "@/lib/media";
import type { Project } from "@/lib/site-content";
import { EASE } from "./shared";

/**
 * Trusted-by marquee — docked at the bottom edge of the hero film frame,
 * right where the fullscreen showreel meets the archive below. It is part
 * of the opening frame: visible the moment the site opens, no scrolling
 * needed, and it scrolls away with the film when the archive slides over.
 *
 * The client logos glide through it endlessly: one seamless row built from
 * identical copies and scrolled by a pure-CSS keyframe (translate -25% of
 * a 4-copy track = exactly one copy, so the loop never shows a seam).
 *
 * — never pauses: the motion is the feature ("تمشي ولا تتوقف")
 * — same glass family as the navbar pill above (liquid-glass rim +
 *   backdrop blur), tuned a touch denser (blur 20px, white 7%) so the
 *   marks keep contrast even over the film's brightest frames
 * — marks sized up to jeweller-statement scale (28/34px), base
 *   opacity 85% (lit fully on hover) — no washed-out wordmarks
 * — a tiny rotated-diamond separator between logos, jewellery-style
 * — soft mask on both ends so marks drift in and out of the darkness
 */

/** number of identical copies inside the track — 4 keeps every viewport
 *  (up to ~3× copy width, i.e. 4K) covered without a visible gap */
const COPIES = 4;

/** seconds for the row to travel exactly one copy — calm, editorial pace */
const SPEED_S = 46;

export function TrustedBar({ projects }: { projects: Project[] }) {
  const branded = projects.filter((p) => p.logo && p.id);
  if (branded.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 2, ease: EASE }}
      aria-label="Trusted by — brands Adlene Benmechta has worked with"
      className="absolute inset-x-0 bottom-5 z-20 px-4 sm:px-6 md:bottom-6 md:px-10 lg:px-16"
    >
      <div
        className="liquid-glass relative mx-auto flex h-12 w-full max-w-[1400px] items-stretch overflow-hidden rounded-full md:h-[52px]"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          backgroundImage:
            "linear-gradient(rgba(5, 5, 5, 0.42), rgba(5, 5, 5, 0.42))",
        } as React.CSSProperties}
      >
        {/* ─── static label ─────────────────────────────────────── */}
        <div className="relative z-10 flex shrink-0 items-center gap-2.5 border-r border-white/10 pl-5 pr-4 md:pl-6 md:pr-5">
          <span
            aria-hidden="true"
            className="h-[5px] w-[5px] rotate-45 bg-white/40"
          />
          <span className="whitespace-nowrap text-[8.5px] font-medium uppercase leading-none tracking-[0.3em] text-white/60 md:text-[9px]">
            Trusted by
          </span>
        </div>

        {/* ─── the endless row ──────────────────────────────────── */}
        <div
          className="relative z-10 flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div
            className="trusted-marquee-track flex h-12 w-max items-center md:h-[52px]"
            style={{ animationDuration: `${SPEED_S}s` }}
          >
            {Array.from({ length: COPIES }, (_, copy) => (
              <span
                key={copy}
                aria-hidden={copy > 0 ? true : undefined}
                className="flex items-center"
              >
                {branded.map((p) => (
                  <span key={`${copy}-${p.id}`} className="flex items-center">
                    <Link
                      href={`/work/${p.id}`}
                      aria-label={`${p.brand} — view the work`}
                      tabIndex={copy > 0 ? -1 : undefined}
                      className="flex h-12 w-32 shrink-0 items-center justify-center md:h-[52px] md:w-36"
                    >
                      <img
                        src={mediaUrl(p.logo)}
                        alt=""
                        draggable={false}
                        className="max-h-[28px] w-auto max-w-[110px] object-contain opacity-85 transition-[opacity,transform] duration-500 hover:scale-[1.07] hover:opacity-100 md:max-h-[34px] md:max-w-[126px]"
                      />
                    </Link>
                    <span
                      aria-hidden="true"
                      className="mx-3 h-[3px] w-[3px] shrink-0 rotate-45 bg-white/25 md:mx-4"
                    />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
