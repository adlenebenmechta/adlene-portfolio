"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { EASE, Reveal, SectionLabel } from "./shared";

export function BrandIndex() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /* Preview follows the cursor with a soft spring lag */
  const mouseY = useMotionValue(0);
  const previewY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.6 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseY.set(Math.max(0, Math.min(e.clientY - rect.top - 240, rect.height - 480)));
  };

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-24 md:px-10 md:pt-36 lg:px-16"
    >
      <SectionLabel index="01">Selected Work</SectionLabel>

      <Reveal delay={0.05}>
        <h2 className="mt-7 max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
          Brands I&apos;ve had the opportunity to work with.
        </h2>
      </Reveal>

      <div className="relative mt-14 md:mt-20">
        <ul
          ref={listRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
          className="relative list-none"
        >
          {projects.map((project, i) => (
            <li key={project.id}>
              <Reveal delay={i * 0.04} y={24}>
                <a
                  href={`#brand-${project.id}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative block border-t border-white/10 py-6 outline-none last:border-b focus-visible:border-white/30 md:py-8"
                >
                  <div className="flex items-baseline gap-4 md:gap-10">
                    <span className="w-8 shrink-0 text-[11px] tabular-nums text-white/30 md:w-12">
                      {project.index}
                    </span>

                    <span className="flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-4">
                        <span className="text-[1.65rem] font-medium leading-none tracking-[-0.02em] text-white/85 transition-all duration-500 group-hover:translate-x-3 group-hover:text-white sm:text-4xl md:text-5xl lg:text-[3.4rem] group-focus-visible:translate-x-3">
                          {project.brand}
                        </span>
                        <ArrowUpRight
                          size={20}
                          aria-hidden="true"
                          className="-translate-x-2 translate-y-1 text-white/0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-white/50"
                        />
                      </span>

                      <span className="mt-3 block text-[9px] uppercase tracking-[0.24em] text-white/30 transition-colors duration-500 group-hover:text-white/55 md:text-[10px]">
                        {project.industry}&ensp;—&ensp;{project.year}&ensp;—&ensp;
                        {project.services.slice(0, 2).join(" · ")}
                      </span>
                    </span>

                    <span className="hidden shrink-0 text-right text-[10px] uppercase tracking-[0.2em] text-white/30 md:block">
                      {project.location}
                    </span>
                  </div>

                  {/* Mobile inline preview */}
                  <span className="mt-5 flex items-center gap-4 md:hidden">
                    <span className="block h-16 w-24 shrink-0 overflow-hidden rounded-md">
                      { }
                      <img
                        src={project.preview.src}
                        alt={project.preview.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="text-[11px] leading-relaxed text-white/45">
                      {project.tagline}
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Floating media preview — desktop only */}
        <AnimatePresence>
          {active !== null && (
            <motion.figure
              key={active}
              style={{ y: previewY }}
              initial={{ opacity: 0, scale: 0.94, clipPath: "inset(14% 12% 14% 12%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0, scale: 0.96, clipPath: "inset(14% 12% 14% 12%)" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="pointer-events-none absolute right-2 top-0 z-20 hidden aspect-[4/5] w-[300px] overflow-hidden rounded-xl lg:block xl:w-[340px]"
              aria-hidden="true"
            >
              { }
              <img
                src={projects[active].preview.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-16">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/85">
                  {projects[active].brand}
                </span>
                <span className="text-[10px] tabular-nums text-white/50">
                  {projects[active].year}
                </span>
              </span>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
