import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, JWT_COOKIE_NAME } from "@/lib/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(JWT_COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;

  // Protect /dashboard: only authenticated admins may enter
  if (pathname.startsWith("/dashboard")) {
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (payload.role !== "admin") {
      return NextResponse.redirect(
        new URL("/login?error=forbidden", request.url)
      );
    }
  }

  // Send already-authenticated admins straight to the dashboard
  if (
    (pathname === "/login" || pathname === "/register") &&
    payload?.role === "admin"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
