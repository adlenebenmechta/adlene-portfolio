"use client";

import type { MediaItem as PortfolioMedia } from "@/lib/portfolio-data";
import { MediaItem } from "./MediaItem";

interface MediaGalleryProps {
  media: PortfolioMedia[];
}

/**
 * Asymmetric, art-directed media grid.
 * Every item declares its own span so each brand keeps
 * a unique editorial rhythm.
 */
export function MediaGallery({ media }: MediaGalleryProps) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-2 md:mt-20 md:grid-cols-12 md:gap-4">
      {media.map((item, i) => (
        <MediaItem
          key={`${item.src}-${i}`}
          item={item}
          cta={item.type === "video" && i === 0}
        />
      ))}
    </div>
  );
}
