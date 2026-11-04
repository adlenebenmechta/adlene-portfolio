import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAuthed, uploadMedia } from "@/lib/github";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request): Promise<NextResponse> {
  const cookie = req.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === ADMIN_COOKIE)?.[1];
  if (!isAuthed(cookie))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File))
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = Buffer.from(await file.arrayBuffer());
    const result = await uploadMedia(file.name || "upload.bin", bytes);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "upload failed" },
      { status: 400 },
    );
  }
}
