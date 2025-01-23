import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { origin, pathname } = request.nextUrl;

  const token = request.cookies.get("auth_token");
  const isLoginPage = pathname.startsWith("/login");

  if (!token && !isLoginPage) {
    return NextResponse.redirect(`${origin}/login`);
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(`${origin}/`);
  }

  NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|forbidden|invitation|forgot-password|reset-password|password-reset-sent|_next/static|_next/image|favicon.ico|public|static).*)",
  ],
};
