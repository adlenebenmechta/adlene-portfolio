"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/portfolio-data";
import { EASE } from "./shared";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
      className="fixed inset-x-4 top-4 z-50 md:top-6 md:inset-x-6 lg:inset-x-10"
    >
      <motion.nav
        aria-label="Primary navigation"
        animate={{
          backdropFilter: scrolled ? "blur(16px)" : "blur(4px)",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(4px)",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.055)"
            : "rgba(255, 255, 255, 0.01)",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="liquid-glass flex items-center justify-between gap-4 rounded-full px-4 py-3 md:px-6"
      >
        {/* Monogram + name */}
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Adlene Benmechta — back to top"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 text-[9px] tracking-[0.12em] text-white/85 transition-colors duration-500 group-hover:border-white/60"
          >
            AB
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.22em] text-white/80 transition-colors duration-500 group-hover:text-white sm:block">
            Adlene Benmechta
          </span>
        </a>

        {/* Desktop links + CTA */}
        <div className="flex items-center gap-6 md:gap-8">
          <ul className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.18em] text-white/55 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/85 transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:inline-flex"
          >
            Let&apos;s Work Together
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-white/40 md:hidden"
          >
            {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="liquid-glass mt-2 rounded-3xl p-6 md:hidden"
          >
            <ul className="flex flex-col divide-y divide-white/10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 text-lg font-medium tracking-tight text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                    <span className="text-[10px] tabular-nums text-white/30">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-black"
            >
              Let&apos;s Work Together
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
