"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { EASE } from "./shared";

const HEADLINE_LINES = [
  "Creative work for brands",
  "that want to be remembered.",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentBlur = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["blur(0px)", "blur(7px)"]
  );

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col justify-center px-6 pb-24 pt-36 md:px-10 md:pt-40 lg:px-16"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, filter: contentBlur }}
        className="max-w-5xl"
      >
        {/* Metadata line */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="text-[9px] uppercase tracking-[0.35em] text-white/45 md:text-[11px]"
        >
          Creative Direction&ensp;·&ensp;Branding&ensp;·&ensp;Content&ensp;·&ensp;Digital
        </motion.p>

        {/* Editorial headline */}
        <h1 className="mt-8 text-[2.65rem] font-medium leading-[1.04] tracking-[-0.025em] text-white sm:text-6xl md:mt-10 md:text-7xl xl:text-[5.4rem]">
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 78, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.4,
                  delay: 0.55 + i * 0.18,
                  ease: EASE,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 1.15, ease: EASE }}
          className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/60 md:mt-10 md:text-lg"
        >
          I create visual identities, campaigns, content and digital
          experiences that help brands communicate with clarity and
          character.
        </motion.p>

        {/* Secondary meta row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.45, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-[10px]"
        >
          <span>Portfolio — Vol. II</span>
          <span aria-hidden="true" className="h-px w-6 bg-white/15" />
          <span>Algiers&ensp;/&ensp;Worldwide</span>
          <span aria-hidden="true" className="h-px w-6 bg-white/15" />
          <span>Since 2017</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-9 flex flex-col items-center gap-4"
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-[0.32em] text-white/35">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-white/12">
          <motion.span
            className="absolute left-0 top-0 h-5 w-px bg-white/80"
            animate={{ y: [-20, 56] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
          />
        </span>
        <ArrowDown size={11} className="text-white/25" />
      </motion.div>
    </section>
  );
}
