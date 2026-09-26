"use client";

import { MotionConfig } from "motion/react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { BrandIndex } from "./BrandIndex";
import { BrandSection } from "./BrandSection";
import { BrandNav } from "./BrandNav";
import { About } from "./About";
import { Capabilities } from "./Capabilities";
import { ContactCTA } from "./ContactCTA";
import { Footer } from "./Footer";
import { projects } from "@/lib/portfolio-data";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative w-full min-h-[115vh] overflow-x-hidden flex flex-col items-center font-sans selection:bg-white/20 selection:text-white">
        {/* ─── Cinematic video background ─────────────────────────── */}
        <video
          className="fixed inset-0 w-full h-full object-cover z-[0]"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/hero-poster.jpg"
          aria-hidden="true"
          style={{ filter: "brightness(0.62) saturate(0.78)" }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Atmospheric overlays — readability + vignette + grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1] bg-black/55"
        />
        <div aria-hidden="true" className="vignette pointer-events-none fixed inset-0 z-[2]" />
        <div className="film-grain" aria-hidden="true" />

        {/* ─── Chrome ─────────────────────────────────────────────── */}
        <Navbar />
        <BrandNav />

        {/* ─── Hero ───────────────────────────────────────────────── */}
        <Hero />

        {/* ─── The archive — solid surface over the video ─────────── */}
        <div className="relative z-10 flex w-full flex-col items-center">
          {/* cinematic fade from the film into the archive */}
          <div
            aria-hidden="true"
            className="h-[34vh] w-full bg-gradient-to-b from-transparent via-[#050505dd] to-[#050505]"
          />

          <div className="flex w-full flex-col items-center bg-[#050505]">
            <BrandIndex />

            {/* Brand case studies */}
            <div id="brands" className="flex w-full flex-col items-center">
              {projects.map((project) => (
                <BrandSection key={project.id} project={project} />
              ))}
            </div>

            <About />
            <Capabilities />
            <ContactCTA />
          </div>

          <Footer />
        </div>
      </main>
    </MotionConfig>
  );
}
