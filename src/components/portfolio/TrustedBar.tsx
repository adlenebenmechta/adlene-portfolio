"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { mediaUrl } from "@/lib/media";
import type { Project } from "@/lib/site-content";
import { EASE } from "./shared";

/**
 * Trusted-by marquee — a slim glass strip docked at the bottom of every
 * page, right above the footer card. The client logos glide through it
 * endlessly: one seamless row built from identical copies and scrolled by
 * a pure-CSS keyframe (translate -25% of a 4-copy track = exactly one
 * copy, so the loop never shows a seam).
 *
 * — never pauses: the motion is the feature ("تمشي ولا تتوقف")
 * — small, jeweller-scale marks: the strip stays quiet so the footer
 *   beneath it keeps the spotlight (logos dimmed to 45–70%, lit on hover)
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
      aria-label="Trusted by — brands Adlene Benmechta has worked with"
      className="liquid-glass relative mt-28 flex h-11 items-stretch overflow-hidden rounded-full md:mt-40 md:h-11"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      } as React.CSSProperties}
    >
      {/* dark underlay — keeps the logos legible over any film frame */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#050505]/45"
      />

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
          className="trusted-marquee-track flex h-11 w-max items-center"
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
                    className="flex h-11 w-28 shrink-0 items-center justify-center md:w-32"
                  >
                    <img
                      src={mediaUrl(p.logo)}
                      alt=""
                      draggable={false}
                      className="max-h-[24px] w-auto max-w-[96px] object-contain opacity-60 transition-[opacity,transform] duration-500 hover:scale-[1.07] hover:opacity-100 md:max-h-[28px] md:max-w-[104px]"
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
    </motion.div>
  );
}
