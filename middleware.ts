import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// UX guard only — redirects obviously-unauthenticated requests away from
// /admin/*. This runs on the Edge runtime and cannot query Prisma, so it can
// only check whether the cookie exists, not whether it's a valid/unexpired
// session. The real security boundary is requireAdmin() in src/lib/auth.ts,
// called server-side on every admin page and Server Action.
const SESSION_COOKIE = "admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const hasCookie = request.cookies.has(SESSION_COOKIE);
    if (!hasCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
