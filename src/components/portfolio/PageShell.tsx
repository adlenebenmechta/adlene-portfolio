"use client";

import { MotionConfig, motion } from "motion/react";
import { Alex_Brush } from "next/font/google";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { EASE } from "./shared";
import { DEFAULT_PAGES, type PageTexts, type Project } from "@/lib/site-content";

interface PageShellProps {
  children: ReactNode;
  /** brand list for the footer work column */
  projects?: Project[];
  /** fixed background layers (cinematic video, overlays) — rendered outside the animated wrapper */
  background?: ReactNode;
  /** the autograph shown on the curtain — defaults to "Adlene Benmechta" */
  signature?: string;
  /** footer texts (tagline / copyright / bottom line) */
  footerTexts?: PageTexts["footer"];
  /** contact email shown in the footer */
  email?: string;
}

/** curtain wipe ease — decisive start, soft landing */
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
/** pen-writing ease for the signature reveal */
const INK_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** signature script — the director's autograph shown on the curtain between scenes */
const signatureFont = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "block",
});

/**
 * Shared page skeleton for every route:
 * — cinematic page transition: a black curtain covers the viewport on every
 *   route change, "Adlene Benmechta" signs itself across it like a title card,
 *   then the curtain sweeps upward to reveal the new page while its content
 *   rises in (blur + y + fade). The film cuts to black between scenes.
 * — fixed chrome (Navbar / Footer) that survives the reveal
 * — sticky-footer layout: content grows, footer stays at the bottom
 */
export function PageShell({
  children,
  projects,
  background,
  signature = "Adlene Benmechta",
  footerTexts = DEFAULT_PAGES.footer,
  email,
}: PageShellProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden font-sans selection:bg-white/20 selection:text-white">
        {/* ─── Fixed background layers (video / overlays) ──────────── */}
        {/* plain wrapper: keeps the server-passed element out of the sibling
            children array (avoids a dev-only RSC false-positive key warning);
            backgrounds are position:fixed so it is fully layout-neutral */}
        <div>{background}</div>

        {/* ─── Cinematic curtain — signs, then sweeps up ──────────── */}
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.75, delay: 1.55, ease: CURTAIN_EASE }}
          className="pointer-events-none fixed inset-0 z-[100] bg-[#050505]"
        >
          {/* the autograph — ink writes in while the frame is black */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 14, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: -1.5 }}
              transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
              className="flex flex-col items-center"
            >
              <motion.span
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 0.8, delay: 0.15, ease: INK_EASE }}
                className={`${signatureFont.className} text-white/95 text-[clamp(2.6rem,8vw,6rem)] leading-[1.25]`}
                style={{ textShadow: "0 0 24px rgba(255,255,255,0.18)" }}
              >
                {signature}
              </motion.span>
              <motion.svg
                viewBox="0 0 400 20"
                className="mt-2 h-auto w-[76%]"
                aria-hidden="true"
              >
                <motion.path
                  d="M6 12 C 90 3, 205 21, 300 10 C 335 7, 368 6, 394 9"
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.85, ease: INK_EASE }}
                />
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── Chrome ──────────────────────────────────────────────── */}
        <Navbar />

        {/* ─── Page content — rises in as the curtain lifts ─────────── */}
        <motion.main
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 1.72, ease: EASE }}
          className="relative z-10 flex w-full flex-1 flex-col items-center"
        >
          {children}
        </motion.main>

        <Footer
          projects={projects ?? []}
          name={signature}
          texts={footerTexts}
          email={email}
        />
      </div>
    </MotionConfig>
  );
}
