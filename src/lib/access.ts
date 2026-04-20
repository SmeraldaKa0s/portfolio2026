import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";

export interface AccessSession {
  granted?: boolean;
}

export const accessOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? "",
  cookieName: "portfolio-access",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  },
};

export async function hasAccess(): Promise<boolean> {
  if (!process.env.SESSION_SECRET) return false;
  const session = await getIronSession<AccessSession>(await cookies(), accessOptions);
  return Boolean(session.granted);
}
