"use client";

import { motion } from "motion/react";
import {
  Facebook,
  Instagram,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Discover",
    links: [
      "Labs & Workshops",
      "Deep Dive Series",
      "Global Circle",
      "Resource Vault",
      "Future Roadmap",
    ],
  },
  {
    title: "The Mission",
    links: [
      "Origin Story",
      "The Collective",
      "Newsroom Hub",
      "Join the Team",
    ],
  },
  {
    title: "Concierge",
    links: [
      "Get in Touch",
      "Legal Privacy",
      "User Agreement",
      "Report Concern",
    ],
  },
];

const SOCIALS = [Music2, Facebook, Twitter, Youtube, Instagram];

export function Footer() {
  return (
    <div className="relative z-10 w-full px-4 pb-10 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="liquid-glass w-full rounded-3xl p-6 mt-32 text-white/70 md:mt-64 md:p-10"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 mb-10">
            {/* Brand column */}
            <div className="md:col-span-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="text-white/80"
                aria-hidden="true"
              >
                <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
              </svg>
              <p className="text-xl font-medium text-white mt-5">LUMINA</p>
              <p className="text-sm leading-relaxed max-w-sm mt-4">
                Lumina provides premium clarity on global events and cosmic
                wonders - shared with all for free.
              </p>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
              {COLUMNS.map((column) => (
                <nav key={column.title} aria-label={column.title}>
                  <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4">
                    {column.title}
                  </h4>
                  <ul className="text-xs space-y-2">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#top"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <p className="text-[10px] uppercase tracking-widest opacity-50">
              Curated by @GotInGeorgiG
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-widest opacity-50">
                Join the Journey:
              </span>
              <div className="flex items-center gap-5">
                {SOCIALS.map((Icon, i) => (
                  <a
                    key={i}
                    href="#top"
                    aria-label={`Social channel ${i + 1}`}
                    className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
