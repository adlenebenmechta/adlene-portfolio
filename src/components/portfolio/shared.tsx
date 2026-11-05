"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { Project } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";

/** Signature easing — slow-out, cinematic, no bounce */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  /** clip-path reveal used for media frames */
  variant?: "up" | "clip";
}

/** Scroll-triggered editorial reveal — opacity + y + subtle blur */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  once = true,
  amount = 0.3,
  variant = "up",
}: RevealProps) {
  if (variant === "clip") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, clipPath: "inset(10% 8% 10% 8%)", scale: 1.05 }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 1.3, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface SectionLabelProps {
  index?: string;
  children: ReactNode;
  className?: string;
}

/** Small uppercase editorial kicker, e.g. "( 01 ) — SELECTED WORK" */
export function SectionLabel({ index, children, className = "" }: SectionLabelProps) {
  return (
    <div className={className}>
      <Reveal y={14}>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-[11px]">
          {index && (
            <span className="tabular-nums text-white/25">( {index} )</span>
          )}
          <span aria-hidden="true" className="h-px w-10 bg-white/20" />
          <span>{children}</span>
        </div>
      </Reveal>
    </div>
  );
}

/** Role-title lockup — the final word set in italic serif
 *  (e.g. "TEAM <i>MANAGER</i>"), the couture treatment shared by the
 *  chapter header and the edition cards. Single words pass through. */
export function TitleLockup({
  title,
  italicClassName = "",
}: {
  title: string;
  italicClassName?: string;
}) {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return <>{title}</>;
  return (
    <>
      {words.slice(0, -1).join(" ")}{" "}
      <span className={`italic ${italicClassName}`.trim()}>
        {words[words.length - 1]}
      </span>
    </>
  );
}

/** The brand's own mark for page headers (case study + chapter) —
 *  the real logo when one is uploaded: the plaque widens to fit
 *  wordmarks so every logo reads clearly, with serif initials kept
 *  only as a fallback for brands without a logo file. */
export function BrandMark({ project }: { project: Project }) {
  return (
    <figure className="flex h-12 w-auto min-w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-1.5 md:h-16 md:min-w-16 md:p-2">
      {project.logo ? (
        <img
          src={mediaUrl(project.logo)}
          alt={`${project.brand} logo`}
          className="h-full w-auto max-w-[176px] object-contain md:max-w-[216px]"
        />
      ) : project.monogram ? (
        <span
          aria-label={project.brand}
          className={`font-serif tracking-[0.18em] text-[#E8E4DC] ${
            project.monogram.length >= 3
              ? "text-base md:text-lg"
              : project.monogram.length === 2
                ? "text-xl md:text-2xl"
                : "text-2xl md:text-3xl"
          }`}
        >
          {project.monogram}
        </span>
      ) : null}
    </figure>
  );
}

/** Brand logo card — the box visual while no preview image is uploaded.
 *  The logo floats large on the studio sheen — no frame, no box edges,
 *  so both transparent wordmarks and cut-out logos blend into the card.
 *  The logo lives in the top 62% of the card, so even a tall square
 *  logo can never crowd the stat / title block at the bottom. */
export function BrandCard({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 bg-[#0a0a0b]">
      {/* soft studio sheen — follows the logo-zone center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_34%,rgba(255,255,255,0.07),transparent_70%)]"
      />
      {/* subtle vignette to seat the logo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_34%,transparent_55%,rgba(0,0,0,0.35))]"
      />
      {/* logo zone — deterministic clearance above the editorial block */}
      <div className="absolute inset-x-0 top-0 flex h-[62%] items-center justify-center">
        <img
          src={mediaUrl(project.logo)}
          alt=""
          aria-hidden="true"
          className="relative max-h-[72%] max-w-[76%] object-contain opacity-90 transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
        />
      </div>
    </div>
  );
}
