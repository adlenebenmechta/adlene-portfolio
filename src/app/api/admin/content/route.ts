import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAuthed, readContentFile, writeContentFile } from "@/lib/github";
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
