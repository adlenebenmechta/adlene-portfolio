import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAuthed, listUploads, deleteUpload } from "@/lib/github";

export const runtime = "nodejs";

function cookieOf(req: Request): string | undefined {
  return req.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === ADMIN_COOKIE)?.[1];
}

export async function GET(req: Request): Promise<NextResponse> {
  if (!isAuthed(cookieOf(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ files: await listUploads() });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "list failed" },
      { status: 502 },
    );
  }
}

export async function DELETE(req: Request): Promise<NextResponse> {
  if (!isAuthed(cookieOf(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const path = new URL(req.url).searchParams.get("path");
    if (!path)
      return NextResponse.json({ error: "path required" }, { status: 400 });
    await deleteUpload(path);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "delete failed" },
      { status: 400 },
    );
  }
}
