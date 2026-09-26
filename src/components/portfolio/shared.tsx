"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

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
