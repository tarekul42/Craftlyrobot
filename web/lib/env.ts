const requiredForProduction = [
  "NEXT_PUBLIC_SITE_URL",
  "TURNSTILE_SECRET_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
] as const;

const optional = [
  "DATABASE_URL",
  "RESEND_API_KEY",
  "SLACK_WEBHOOK_URL",
  "SENTRY_DSN",
  "NEXT_PUBLIC_SENTRY_DSN",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "KV_PREFIX",
  "NEXT_PUBLIC_PLAUSIBLE_DOMAIN",
] as const;

export function validateEnv() {
  if (process.env.NODE_ENV !== "production") return;

  const isSsrBuild = typeof window === "undefined" && process.env.NEXT_PHASE !== undefined;
  if (isSsrBuild) return;

  const missing: string[] = [];
  for (const key of requiredForProduction) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `[env] Missing required environment variables in production:\n  ${missing.join("\n  ")}\n\n` +
        "Set these in your Vercel project dashboard or .env.production file.",
    );
  }
}

export function getEnv(key: (typeof requiredForProduction)[number]): string;
export function getEnv(key: (typeof optional)[number]): string | undefined;
export function getEnv(key: string): string | undefined {
  return process.env[key];
}
