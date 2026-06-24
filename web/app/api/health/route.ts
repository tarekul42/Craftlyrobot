import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const checks: Record<string, string> = {};

  // Database check
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/db");
      await prisma.$queryRaw`SELECT 1`;
      checks.database = "ok";
    } catch {
      checks.database = "error";
    }
  } else {
    checks.database = "disabled";
  }

  // Upstash check
  if (process.env.UPSTASH_REDIS_REST_URL) {
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = Redis.fromEnv();
      await redis.ping();
      checks.upstash = "ok";
    } catch {
      checks.upstash = "error";
    }
  } else {
    checks.upstash = "disabled";
  }

  const allOk = Object.values(checks).every((s) => s === "ok" || s === "disabled");

  return NextResponse.json(
    {
      ok: allOk,
      status: allOk ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks,
    },
    { status: allOk ? 200 : 503 },
  );
}
