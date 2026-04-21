import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { accessOptions, type AccessSession } from "@/lib/access";
import { isProtected } from "@/lib/protected-slugs";

export const config = {
  matcher: ["/work/:slug"],
};

export async function proxy(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/")[2];
  if (!slug || !isProtected(slug)) return NextResponse.next();

  if (!process.env.SESSION_SECRET) {
    const url = req.nextUrl.clone();
    url.pathname = `/gate/${slug}`;
    return NextResponse.rewrite(url);
  }

  const res = NextResponse.next();
  const session = await getIronSession<AccessSession>(req, res, accessOptions);
  if (session.granted) return res;

  const url = req.nextUrl.clone();
  url.pathname = `/gate/${slug}`;
  return NextResponse.rewrite(url);
}
