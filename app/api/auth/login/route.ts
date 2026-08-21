import { NextResponse } from "next/server";
import {
  createAdminSession,
  getSessionCookieName,
  getSessionCookieOptions,
} from "@/libs/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "Admin credentials are not configured" },
      { status: 500 },
    );
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(
    getSessionCookieName(),
    await createAdminSession(),
    getSessionCookieOptions(),
  );

  return response;
}
