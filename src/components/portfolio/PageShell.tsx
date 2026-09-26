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

/**
 * Shared page skeleton for every route:
 * — cinematic wrapper with the exact editorial base styles
 * — fixed chrome (Navbar / Footer) that survives route changes
 * — smooth opacity page transition on mount
 * — sticky-footer layout: content grows, footer stays at the bottom
 */
export function PageShell({ children, background }: PageShellProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden font-sans selection:bg-white/20 selection:text-white">
        {/* ─── Fixed background layers (video / overlays) ──────────── */}
        {background}

        {/* ─── Chrome ──────────────────────────────────────────────── */}
        <Navbar />

        {/* ─── Page content — fades in on every route change ───────── */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 flex w-full flex-1 flex-col items-center"
        >
          {children}
        </motion.main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
