"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Pause, Play } from "lucide-react";

interface SmartVideoProps {
  src: string;
  poster?: string;
  alt: string;
  label?: string;
  /** show the WATCH PROJECT chip (used on flagship campaign films) */
  cta?: boolean;
  className?: string;
  rounded?: string;
}

/**
 * Performance-aware video:
 * — plays only while (near) the viewport, pauses when scrolled away
 * — muted, looping, playsInline, poster fallback
 * — click toggles playback, hover reveals the label chip
 */
export function SmartVideo({
  src,
  poster,
  alt,
  label,
  cta = false,
  className = "",
  rounded = "rounded-lg md:rounded-xl",
}: SmartVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "250px 0px 250px 0px" });
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !userPaused) {
      video.play().catch(() => {
        /* autoplay may be refused until interaction — poster stays visible */
      });
    } else {
      video.pause();
    }
  }, [inView, userPaused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setUserPaused(false);
    } else {
      video.pause();
      setUserPaused(true);
    }
  };

  return (
    <div className={`group/video relative h-full w-full overflow-hidden bg-[#0a0a0a] ${rounded}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover/video:scale-[1.045]"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={alt}
      />

      {/* readability veil + label chip */}
      {label && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-700 md:p-5 group-hover/video:opacity-100">
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/85 md:text-[10px]">
            {label}
          </span>
        </div>
      )}

      {cta && (
        <button
          type="button"
          onClick={toggle}
          aria-label={userPaused ? `Play ${alt}` : `Pause ${alt}`}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-black/55 md:bottom-5 md:right-5 md:text-[10px]"
        >
          {userPaused ? (
            <Play size={10} aria-hidden="true" />
          ) : (
            <Pause size={10} aria-hidden="true" />
          )}
          <span>Watch Project</span>
        </button>
      )}
    </div>
  );
}
