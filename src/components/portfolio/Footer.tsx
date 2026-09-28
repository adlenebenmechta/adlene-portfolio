"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project, PageTexts } from "@/lib/site-content";

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Selected Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer({
  projects,
  email,
  name,
  texts,
}: {
  projects: Project[];
  email?: string;
  name: string;
  texts: PageTexts["footer"];
}) {
  const mail = email ?? "hello@adlenebenmechta.com";

  return (
    <div className="relative z-10 w-full px-4 pb-10 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          className="liquid-glass w-full rounded-3xl p-6 mt-32 text-white/70 md:mt-48 md:p-10"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 mb-10">
            {/* Brand column */}
            <div className="md:col-span-5">
              <p className="font-serif text-2xl font-medium tracking-[-0.01em] text-white md:text-[2rem]">
                {name}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                {texts.tagline}
              </p>
              <a
                href={`mailto:${mail}`}
                className="group mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
              >
                {mail}
                <ArrowUpRight
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
              <nav aria-label="Work">
                <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                  Work
                </h4>
                <ul className="space-y-2 text-xs">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <Link
                        href={`/work/${project.id}`}
                        className="text-white/60 transition-colors hover:text-white"
                      >
                        {project.brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Menu">
                <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                  Menu
                </h4>
                <ul className="space-y-2 text-xs">
                  {MENU_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Connect">
                <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                  Connect
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link
                      href="/contact"
                      className="text-white/60 transition-colors hover:text-white"
                    >
                      Start a Project
                    </Link>
                  </li>
                  <li>
                    <a
                      href={`mailto:${mail}`}
                      className="text-white/60 transition-colors hover:text-white"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              {texts.copyright}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              {texts.bottomLine}
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
