import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { timingSafeEqual } from "node:crypto";
import { accessOptions, type AccessSession } from "@/lib/access";
import { checkRateLimit } from "@/lib/rate-limit";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.PAGE_ACCESS_PASSWORD ?? "";

  if (!expected || !process.env.SESSION_SECRET) {
    const missing: string[] = [];
    if (!expected) missing.push("PAGE_ACCESS_PASSWORD");
    if (!process.env.SESSION_SECRET) missing.push("SESSION_SECRET");
    return NextResponse.json({ error: "misconfigured", missing }, { status: 500 });
  }

  if (typeof password !== "string" || !safeEqual(password, expected)) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }

  const session = await getIronSession<AccessSession>(await cookies(), accessOptions);
  session.granted = true;
  await session.save();

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const session = await getIronSession<AccessSession>(await cookies(), accessOptions);
  session.destroy();
  return NextResponse.json({ ok: true });
}
