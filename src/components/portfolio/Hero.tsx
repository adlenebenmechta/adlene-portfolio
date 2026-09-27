"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
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
export function Hero() {
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
            className="text-xl italic text-white/85 md:text-2xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            Hi, my name is
          </motion.p>

          {/* line 2 — the name */}
          <motion.h1
            {...lineIn(0.5)}
            className="mt-3 text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.98] tracking-[-0.015em] text-white"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.55)" }}
          >
            Adlene Benmechta
          </motion.h1>

          {/* line 3 */}
          <motion.p
            {...lineIn(0.68)}
            className="mt-3 text-xl italic text-white/85 md:text-2xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            and this is
          </motion.p>

          {/* line 4 — the boxed portfolio link */}
          <motion.div
            {...lineIn(0.86)}
            className="mt-8 md:mt-10"
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 rounded-2xl border-2 border-white/70 bg-black/25 px-7 py-4 text-2xl font-medium text-white backdrop-blur-md transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:gap-4 md:px-9 md:py-5 md:text-4xl"
            >
              my portfolio
              <ArrowUpRight
                size={30}
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
