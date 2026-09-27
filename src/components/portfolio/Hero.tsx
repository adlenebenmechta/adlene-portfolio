"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "./shared";

/**
 * Clean cinematic hero — the film plays fullscreen, untouched.
 * A single line of text sits on the left; "my portfolio" lives in
 * a bordered box that opens the work index page.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative z-10 flex min-h-svh w-full items-center"
    >
      <div className="mx-auto flex w-full max-w-[1400px] justify-start px-6 pb-28 pt-24 md:px-10 md:pt-28 lg:px-16">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="text-lg leading-relaxed text-white md:text-2xl"
            style={{ textShadow: "0 2px 28px rgba(0, 0, 0, 0.6)" }}
          >
            Hi, my name is{" "}
            <span className="font-medium">Adlene Benmechta</span> and this is
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: EASE }}
            className="mt-6 md:mt-8"
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-white/50 bg-black/20 px-5 py-2.5 text-base text-white backdrop-blur-sm transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:px-6 md:py-3 md:text-xl"
            >
              my portfolio
              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
