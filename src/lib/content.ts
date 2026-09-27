/* ────────────────────────────────────────────────────────────────
   Server-side content loading.
   Source of truth: content.json at the repo root (edited via /admin).
   Fetched from GitHub raw with a short in-memory cache; falls back
   to the baked-in defaults if the fetch fails (the site never breaks).
   ──────────────────────────────────────────────────────────────── */


import { DEFAULT_CONTENT, type SiteContent } from "./site-content";

const RAW_URL =
  "https://raw.githubusercontent.com/adlenebenmechta/adlene-portfolio/main/content.json";

const CACHE_TTL_MS = 20_000; // 20s — admin changes appear almost instantly
let cache: { at: number; data: SiteContent } | null = null;

export async function getContent(): Promise<SiteContent> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.data;

  try {
    const res = await fetch(RAW_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = (await res.json()) as SiteContent;
      if (data && Array.isArray(data.projects)) {
        cache = { at: Date.now(), data };
        return data;
      }
    }
  } catch {
    // network hiccup → fall through to defaults (or stale cache below)
  }

  if (cache) return cache.data; // stale is better than reset
  return DEFAULT_CONTENT;
}

export type { SiteContent };
