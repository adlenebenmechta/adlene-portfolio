"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/lib/portfolio-data";
import { EASE } from "./shared";

export function BrandNav() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  /* Track which brand chapter is currently on screen */
  useEffect(() => {
    const sections = projects
      .map((p) => document.getElementById(`brand-${p.id}`))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("brand-", ""));
          }
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Only visible while the brands archive itself is on screen */
  useEffect(() => {
    const archive = document.getElementById("brands");
    if (!archive) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    observer.observe(archive);
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document
      .getElementById(`brand-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop — floating chapter index */}
          <motion.nav
            key="brand-nav-desktop"
            aria-label="Brand index"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="liquid-glass fixed bottom-8 right-8 z-40 hidden flex-col gap-1 rounded-2xl px-4 py-4 md:flex"
          >
            <span className="mb-2 px-1 text-[8px] uppercase tracking-[0.3em] text-white/30">
              Brands
            </span>
            {projects.map((project) => {
              const isActive = active === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => go(project.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center justify-end gap-3 px-1 py-1.5 text-[10px] uppercase tracking-[0.16em] outline-none"
                >
                  <span
                    aria-hidden="true"
                    className={`h-px transition-all duration-500 ${
                      isActive
                        ? "w-6 bg-white"
                        : "w-0 bg-white/60 group-hover:w-4"
                    }`}
                  />
                  <span
                    className={`transition-colors duration-500 ${
                      isActive
                        ? "text-white"
                        : "text-white/40 hover:text-white/80"
                    }`}
                  >
                    {project.index}&ensp;{project.shortName}
                  </span>
                </button>
              );
            })}
          </motion.nav>

          {/* Mobile — compact horizontal strip */}
          <motion.nav
            key="brand-nav-mobile"
            aria-label="Brand index"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-x-4 bottom-4 z-40 md:hidden"
          >
            <div className="liquid-glass flex gap-1 overflow-x-auto rounded-full p-1.5 no-scrollbar">
              {projects.map((project) => {
                const isActive = active === project.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => go(project.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] transition-colors duration-500 ${
                      isActive
                        ? "bg-white text-black"
                        : "text-white/55"
                    }`}
                  >
                    {project.shortName}
                  </button>
                );
              })}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
