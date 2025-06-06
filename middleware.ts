// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const isLoggedIn = Boolean(token);

  const { pathname } = request.nextUrl;

  if (!isLoggedIn && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/user-profile",
    "/register",
    "/update-profile",
    // Add other routes you want to protect
  ],
};
