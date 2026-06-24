import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/")) {
    const requestId = crypto.randomUUID().slice(0, 8);

    console.log(
      `[req:${requestId}] ${req.method} ${pathname}`,
    );

    const res = NextResponse.next();
    res.headers.set("x-request-id", requestId);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
