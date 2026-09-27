"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { EASE } from "./shared";

interface PageShellProps {
  children: ReactNode;
  /** fixed background layers (cinematic video, overlays) — rendered outside the animated wrapper */
  background?: ReactNode;
}

/** curtain wipe ease — decisive start, soft landing */
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Shared page skeleton for every route:
 * — cinematic page transition: a black curtain covers the viewport on every
 *   route change, then sweeps upward to reveal the new page while its content
 *   rises in (blur + y + fade). The film cuts to black between scenes.
 * — fixed chrome (Navbar / Footer) that survives the reveal
 * — sticky-footer layout: content grows, footer stays at the bottom
 */
export function PageShell({ children, background }: PageShellProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden font-sans selection:bg-white/20 selection:text-white">
        {/* ─── Fixed background layers (video / overlays) ──────────── */}
        {background}

        {/* ─── Cinematic curtain — covers, then sweeps up ──────────── */}
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: CURTAIN_EASE }}
          className="pointer-events-none fixed inset-0 z-[100] bg-[#050505]"
        />

        {/* ─── Chrome ──────────────────────────────────────────────── */}
        <Navbar />

        {/* ─── Page content — rises in as the curtain lifts ─────────── */}
        <motion.main
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.14, ease: EASE }}
          className="relative z-10 flex w-full flex-1 flex-col items-center"
        >
          {children}
        </motion.main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
