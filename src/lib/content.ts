/* ────────────────────────────────────────────────────────────────
   Server-side content loading.
   Source of truth: content.json at the repo root (edited via /admin).

   Read order (fastest-freshness first):
   1. GitHub Contents API (with GITHUB_TOKEN) — always current
   2. raw.githubusercontent.com — seconds-to-minutes fresh
   3. stale in-memory cache → baked-in defaults (site never breaks)

   Media FILES stay on the jsDelivr CDN (immutable names = cache-safe);
   only content.json needs read freshness.
   ──────────────────────────────────────────────────────────────── */

import { DEFAULT_CONTENT, type SiteContent } from "./site-content";

const OWNER = "adlenebenmechta";
const REPO = "adlene-portfolio";
const BRANCH = "main";

const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/content.json?ref=${BRANCH}`;
const RAW_URL = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/content.json`;

const CACHE_TTL_MS = 20_000; // 20s in-memory — admin changes appear quickly
let cache: { at: number; data: SiteContent } | null = null;

function isContent(d: unknown): d is SiteContent {
  return !!d && typeof d === "object" && Array.isArray((d as SiteContent).projects);
}

async function fromApi(): Promise<SiteContent | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`${API_URL}&t=${Date.now()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const j = await res.json();
    const data = JSON.parse(Buffer.from(j.content, "base64").toString("utf8"));
    return isContent(data) ? data : null;
  } catch {
    return null;
  }
}

async function fromRaw(): Promise<SiteContent | null> {
  try {
    const res = await fetch(`${RAW_URL}?t=${Date.now()}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return isContent(data) ? data : null;
  } catch {
    return null;
  }
}

export async function getContent(): Promise<SiteContent> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.data;

  const fresh = (await fromApi()) ?? (await fromRaw());
  if (fresh) {
    cache = { at: Date.now(), data: fresh };
    return fresh;
  }

  if (cache) return cache.data; // stale is better than reset
  return DEFAULT_CONTENT;
}

export type { SiteContent };
