"use client";

import type { MediaItem as PortfolioMedia } from "@/lib/portfolio-data";
import { Reveal } from "./shared";
import { SmartVideo } from "./SmartVideo";

/** Editorial grid placement for each media kind */
const SPAN: Record<PortfolioMedia["span"], string> = {
  full: "col-span-2 aspect-[16/10] md:col-span-12 md:aspect-[21/10]",
  wide: "col-span-2 aspect-[16/10] md:col-span-12 md:aspect-[21/9]",
  half: "col-span-2 aspect-[4/3] md:col-span-6",
  "half-tall": "col-span-2 aspect-[3/4] md:col-span-6 md:aspect-[4/5]",
  third: "col-span-1 aspect-[3/4] md:col-span-4",
  portrait: "col-span-1 aspect-[3/4] md:col-span-3",
};

interface MediaItemProps {
  item: PortfolioMedia;
  /** flagship films get the WATCH PROJECT chip */
  cta?: boolean;
}

export function MediaItem({ item, cta = false }: MediaItemProps) {
  return (
    <Reveal variant="clip" className={SPAN[item.span]} amount={0.25}>
      <figure className="group relative h-full w-full overflow-hidden rounded-md bg-white/[0.03] md:rounded-lg">
        {item.type === "video" ? (
          <SmartVideo
            src={item.src}
            poster={item.poster}
            alt={item.alt}
            label={item.label}
            cta={cta}
            className="absolute inset-0"
            rounded="rounded-none"
          />
        ) : (
          <>
            { }
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
            />
            {item.label && (
              <span className="pointer-events-none absolute bottom-0 left-0 flex w-full items-end justify-start bg-gradient-to-t from-black/55 to-transparent p-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/85 md:text-[10px]">
                  {item.label}
                </span>
              </span>
            )}
          </>
        )}
      </figure>
    </Reveal>
  );
}
