import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function shouldSample(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return Math.random() < 0.01;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/")) {
    const requestId = crypto.randomUUID().slice(0, 8);

    if (shouldSample()) {
      console.log(JSON.stringify({
        type: "api_request",
        requestId,
        method: req.method,
        path: pathname,
        timestamp: new Date().toISOString(),
      }));
    }

    const res = NextResponse.next();
    res.headers.set("x-request-id", requestId);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
