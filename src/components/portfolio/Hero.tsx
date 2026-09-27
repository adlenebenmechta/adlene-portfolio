"use client";

/**
 * Clean cinematic hero — the film plays fullscreen, untouched:
 * no text, no buttons, no overlays, no darkening. Pure moving image.
 * (The navbar remains the only chrome, as on every page of the site.)
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Showreel film"
      className="relative z-10 h-svh w-full"
    />
  );
}
