/* ────────────────────────────────────────────────────────────────
   Server-side GitHub API — the CMS write path.
   Commits content.json and media files straight to main via the
   Contents API; media is served through the jsDelivr CDN.
   ──────────────────────────────────────────────────────────────── */


import { createHash } from "crypto";

const OWNER = "adlenebenmechta";
const REPO = "adlene-portfolio";
const BRANCH = "main";
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const CDN_PURGE = "https://purge.jsdelivr.net/gh";
const CDN_BASE = `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@${BRANCH}`;

function token(): string {
  const t = process.env.GITHUB_TOKEN;
  if (!t) throw new Error("GITHUB_TOKEN is not configured");
  return t;
}

async function gh(
  path: string,
  init: RequestInit & { body?: string } = {},
): Promise<Response> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token()}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (res.status === 401) throw new Error("GitHub rejected the token");
  return res;
}

/** Fetch the current content.json from the repo (live, uncached). */
export async function readContentFile(): Promise<unknown> {
  const res = await gh(
    `/contents/content.json?ref=${BRANCH}&t=${Date.now()}`,
  );
  if (!res.ok) throw new Error(`read content.json failed (${res.status})`);
  const j = await res.json();
  return JSON.parse(Buffer.from(j.content, "base64").toString("utf8"));
}

/** Commit the given object as content.json on main. */
export async function writeContentFile(content: unknown): Promise<void> {
  const res = await gh(`/contents/content.json?ref=${BRANCH}`, {});
  const sha = res.ok ? (await res.json()).sha : undefined;

  const put = await gh(`/contents/content.json`, {
    method: "PUT",
    body: JSON.stringify({
      message: "content: update via admin",
      branch: BRANCH,
      sha,
      content: Buffer.from(
        JSON.stringify(content, null, 2) + "\n",
        "utf8",
      ).toString("base64"),
    }),
  });
  if (!put.ok) {
    throw new Error(
      `commit content.json failed (${put.status}): ${await put.text()}`,
    );
  }
  await purgeCdn("content.json");
}

const EXT_OK = new Set([
  "jpg", "jpeg", "png", "webp", "gif", "svg",
  "mp4", "webm", "mov", "m4v",
]);

export interface UploadResult {
  /** repo path, e.g. public/media/uploads/hero-1730.mp4 */
  repoPath: string;
  /** site-relative URL, e.g. /gh/media/uploads/hero-1730.mp4 */
  url: string;
  size: number;
}

/** Commit an uploaded media file into public/media/uploads/. */
export async function uploadMedia(
  filename: string,
  bytes: Buffer,
): Promise<UploadResult> {
  const clean = filename.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
  const ext = clean.split(".").pop() ?? "";
  if (!EXT_OK.has(ext)) throw new Error(`file type .${ext} not allowed`);
  if (bytes.length > 20 * 1024 * 1024)
    throw new Error("file too large — 20MB maximum");

  const slug = clean
    .replace(/\.[^.]+$/, "")
    .slice(0, 40)
    .replace(/-+/g, "-") || "file";
  const name = `${slug}-${Date.now().toString(36)}.${ext}`;
  const repoPath = `public/media/uploads/${name}`;

  const put = await gh(`/contents/${repoPath}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `media: add ${name}`,
      branch: BRANCH,
      content: bytes.toString("base64"),
    }),
  });
  if (!put.ok)
    throw new Error(`upload failed (${put.status}): ${await put.text()}`);

  await purgeCdn(repoPath);
  return { repoPath, url: `/gh/media/uploads/${name}`, size: bytes.length };
}

export interface RepoFile {
  name: string;
  path: string;
  size: number;
  url: string;
}

/** List files currently in public/media/uploads/. */
export async function listUploads(): Promise<RepoFile[]> {
  const res = await gh(`/contents/public/media/uploads?ref=${BRANCH}`);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`list uploads failed (${res.status})`);
  const arr = await res.json();
  return (Array.isArray(arr) ? arr : [])
    .filter((f: { type: string }) => f.type === "file")
    .map((f: { name: string; path: string; size: number }) => ({
      name: f.name,
      path: f.path,
      size: f.size,
      url: `/gh/media/uploads/${f.name}`,
    }))
    .sort((a: RepoFile, b: RepoFile) => b.name.localeCompare(a.name));
}

/** Delete a file from public/media/uploads/ (repo path only). */
export async function deleteUpload(repoPath: string): Promise<void> {
  const prefix = "public/media/uploads/";
  if (!repoPath.startsWith(prefix) || repoPath.includes(".."))
    throw new Error("refusing to delete outside the uploads folder");

  const res = await gh(`/contents/${repoPath}?ref=${BRANCH}`);
  if (!res.ok) throw new Error(`file not found (${res.status})`);
  const sha = (await res.json()).sha;

  const del = await gh(`/contents/${repoPath}`, {
    method: "DELETE",
    body: JSON.stringify({
      message: `media: remove ${repoPath.slice(prefix.length)}`,
      branch: BRANCH,
      sha,
    }),
  });
  if (!del.ok) throw new Error(`delete failed (${del.status})`);
  await purgeCdn(repoPath);
}

/** Ask jsDelivr to drop its cached copy of a repo path (purge API = GET). */
async function purgeCdn(repoPath: string): Promise<void> {
  const url = `${CDN_PURGE}/gh/${OWNER}/${REPO}@${BRANCH}/${repoPath.replace(/^\/+/, "")}`;
  try {
    await fetch(url); // GET — visiting the purge URL invalidates the CDN edge
  } catch {
    // purge is best-effort — CDN refreshes within hours anyway
  }
}

export function cdnPreview(url: string): string {
  return url.startsWith("/gh/")
    ? `${CDN_BASE}/public${url.slice(3)}`
    : url;
}

/* ── admin auth ─────────────────────────────────────────────────── */

export const ADMIN_COOKIE = "cms_auth";

export function adminToken(): string {
  const pwd = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256")
    .update(`adlene-cms:${pwd}`)
    .digest("hex");
}

export function isAuthed(cookieVal: string | undefined): boolean {
  if (!cookieVal || !process.env.ADMIN_PASSWORD) return false;
  const a = Buffer.from(cookieVal);
  const b = Buffer.from(adminToken());
  return a.length === b.length && a.equals(b);
}
