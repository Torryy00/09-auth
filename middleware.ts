import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); 
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/(auth routes)");
  const isPrivateRoute = pathname.startsWith("/(private routes)");

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(auth routes)/:path*", "/(private routes)/:path*"],
};