import { NextResponse } from "next/server";
import { getSessionCookieName, getSessionCookieOptions } from "@/libs/auth";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(getSessionCookieName(), "", {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}
