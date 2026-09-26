"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/lib/portfolio-data";
import { Reveal } from "./shared";
import { MediaGallery } from "./MediaGallery";

function Meta({
  label,
  children,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} y={18}>
      <div>
        <dt className="text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-[10px]">
          {label}
        </dt>
        <dd className="mt-2.5 text-[13px] leading-relaxed text-white/85">
          {children}
        </dd>
      </div>
    </Reveal>
  );
}

export function BrandSection({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* Subtle parallax drift on the giant brand name */
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id={`brand-${project.id}`}
      aria-label={`${project.brand} case study`}
      className="relative z-10 mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-20 md:px-10 md:py-32 lg:px-16"
    >
      {/* Chapter header */}
      <header className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <Reveal y={16}>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-[10px]">
              Brand&ensp;{project.index}&ensp;/&ensp;{project.location}
            </p>
          </Reveal>

          <motion.h3
            style={{ y: titleY }}
            className="mt-5 text-[2.4rem] font-medium leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.6rem]"
          >
            <Reveal delay={0.05}>{project.brand}</Reveal>
          </motion.h3>

          <Reveal delay={0.1}>
            <p className="mt-5 text-base italic text-white/45 md:text-lg">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-2xl text-[15px] leading-[1.85] text-white/60 md:text-base">
              {project.description}
            </p>
          </Reveal>
        </div>

        {/* Case study metadata */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-start md:col-span-4 md:sticky md:top-28 md:grid-cols-1 md:pt-14">
          <Meta label="Client" delay={0.1}>
            {project.brand}
          </Meta>
          <Meta label="Year" delay={0.15}>
            {project.year}
          </Meta>
          <Meta label="Industry" delay={0.2}>
            {project.industry}
          </Meta>
          <Meta label="Services" delay={0.25}>
            <span className="flex flex-col gap-1">
              {project.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </span>
          </Meta>
          <Meta label="Role" delay={0.3}>
            {project.role}
          </Meta>
        </dl>
      </header>

      {/* Media gallery */}
      <MediaGallery media={project.media} />
    </section>
  );
}
