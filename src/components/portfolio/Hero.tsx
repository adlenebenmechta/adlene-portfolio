"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { PageTexts } from "@/lib/site-content";
import { EASE } from "./shared";

/** staggered line reveal */
const lineIn = (delay: number) => ({
  initial: { opacity: 0, y: 42, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: EASE },
});

/**
 * Editorial cinematic hero — the film plays fullscreen, untouched.
 * A stacked serif composition sits on the left:
 *
 *   Hi, my name is          ← italic, elegant
 *   Adlene Benmechta        ← huge display serif
 *   and this is             ← italic
 *   [ my portfolio ]        ← big boxed link → /work
 */
export function Hero({ texts }: { texts: PageTexts["home"] }) {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative z-10 flex min-h-svh w-full items-center"
    >
      <div className="mx-auto w-full max-w-[1600px] -translate-y-12 pl-5 pr-6 pb-24 pt-24 md:-translate-y-16 md:pl-8 md:pr-10 md:pb-28 md:pt-28 lg:pl-10 lg:pr-16">
        <div className="max-w-4xl font-serif">
          {/* line 1 */}
          <motion.p
            {...lineIn(0.35)}
            className="text-lg italic text-white/85 md:text-xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            {texts.heroIntro}
          </motion.p>

          {/* line 2 — the name: one word per line, bold, display scale
              (a notch under the original 7rem, matching the lockup's
              task-32 reduction) */}
          <motion.h1
            {...lineIn(0.5)}
            className="mt-3 text-[clamp(2.4rem,7vw,5.75rem)] font-bold leading-[1.02] tracking-[-0.015em] text-white"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.55)" }}
          >
            {texts.heroName.trim().split(/\s+/).map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </motion.h1>

          {/* line 3 */}
          <motion.p
            {...lineIn(0.68)}
            className="mt-2.5 text-lg italic text-white/85 md:text-xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            {texts.heroLine}
          </motion.p>

          {/* line 4 — the boxed portfolio link */}
          <motion.div
            {...lineIn(0.86)}
            className="mt-7 md:mt-8"
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 rounded-2xl border-2 border-white/70 bg-black/25 px-6 py-3.5 text-xl font-medium text-white backdrop-blur-md transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:gap-4 md:px-8 md:py-4 md:text-3xl"
            >
              {texts.heroBox}
              <ArrowUpRight
                size={26}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
