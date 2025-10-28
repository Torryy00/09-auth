import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshSession } from "./lib/api/serverApi";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const authRoutes = ["/sign-in", "/sign-up"];
  const privateRoutes = ["/profile", "/notes"];

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  let token = accessToken;

  if (!accessToken && refreshToken) {
    const newToken = await refreshSession(refreshToken);
    if (newToken) {
      const response = NextResponse.next();
      response.cookies.set("accessToken", newToken, { httpOnly: true, path: "/" });
      token = newToken;
      return response;
    } else {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/profile/:path*", "/notes/:path*"],
};
