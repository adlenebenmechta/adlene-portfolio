import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  commitContentFile,
  isAuthed,
  readContentFile,
  readContentFileWithSha,
  writeContentFile,
} from "@/lib/github";
import { deepEqual, mergeContent } from "@/lib/content-merge";
import type { SiteContent } from "@/lib/site-content";

export const runtime = "nodejs";

export function authed(req: Request): boolean {
  const cookie = req.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === ADMIN_COOKIE)?.[1];
  return isAuthed(cookie);
}

export async function GET(req: Request): Promise<NextResponse> {
  if (!authed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const content = await readContentFile();
    return NextResponse.json(content);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "read failed" },
      { status: 502 },
    );
  }
}

/** Basic structural validation — keeps the site unbreakable. */
function validate(c: unknown): c is SiteContent {
  if (!c || typeof c !== "object") return false;
  const o = c as Record<string, unknown>;
  if (!Array.isArray(o.projects)) return false;
  const ids = new Set<string>();
  for (const p of o.projects as Record<string, unknown>[]) {
    if (typeof p.id !== "string" || !/^[a-z0-9-]{2,40}$/.test(p.id))
      return false;
    /* two brands must never share a page URL */
    if (ids.has(p.id)) return false;
    ids.add(p.id);
    if (typeof p.brand !== "string" || !p.brand.trim()) return false;
    if (!Array.isArray(p.media)) return false;
  }
  if (o.hero && typeof (o.hero as Record<string, unknown>).video !== "string")
    return false;
  if (o.workFilm && typeof (o.workFilm as Record<string, unknown>).video !== "string")
    return false;
  if (o.portrait && typeof (o.portrait as Record<string, unknown>).src !== "string")
    return false;
  if (
    o.pages &&
    (typeof o.pages !== "object" ||
      (o.pages as Record<string, unknown>).hero === "string"))
    return false;
  return true;
}

export async function PUT(req: Request): Promise<NextResponse> {
  if (!authed(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();

    /* Envelope { base, draft } — the admin UI's non-destructive save:
     * only what the user changed since loading gets applied onto the
     * newest remote content, so concurrent changes (agent fixes,
     * other tabs) survive instead of being silently reverted. */
    const isEnvelope =
      body &&
      typeof body === "object" &&
      !Array.isArray(body) &&
      "draft" in body &&
      ((body as Record<string, unknown>).draft &&
        typeof (body as Record<string, unknown>).draft === "object");

    if (isEnvelope) {
      const { base, draft } = body as {
        base: unknown;
        draft: unknown;
      };
      if (!validate(draft))
        return NextResponse.json(
          { error: "Invalid content shape" },
          { status: 400 },
        );

      let result: unknown = draft;
      let merged = false;
      /* read → merge → commit-at-sha; retry when a concurrent commit
       * slips in between read and write (GitHub answers 409) */
      for (let attempt = 0; attempt < 3; attempt++) {
        const { content: latest, sha } = await readContentFileWithSha();
        if (base != null && deepEqual(base, latest)) {
          result = draft; // no drift — the user's state IS the newest
        } else {
          merged = true;
          result = base == null ? draft : mergeContent(base, draft, latest);
        }
        if (await commitContentFile(result, sha)) break;
        if (attempt === 2)
          throw new Error(
            "content.json kept changing during save — please retry",
          );
      }
      return NextResponse.json({ ok: true, merged, content: result });
    }

    /* Legacy shape: a raw content object replaces the file (used by
     * the E2E suites and any scripted API client). */
    if (!validate(body))
      return NextResponse.json({ error: "Invalid content shape" }, { status: 400 });
    await writeContentFile(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "save failed" },
      { status: 502 },
    );
  }
}
