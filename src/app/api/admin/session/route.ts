import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isAuthed } from "@/lib/github";

export const runtime = "nodejs";

export async function GET(
  req: Request,
): Promise<NextResponse<{ authed: boolean }>> {
  const cookie = req.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([k]) => k === ADMIN_COOKIE)?.[1];
  return NextResponse.json({ authed: isAuthed(cookie) });
}

export async function POST(req: Request): Promise<NextResponse> {
  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export async function DELETE(): Promise<NextResponse> {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
