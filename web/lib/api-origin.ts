function getAllowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://craftlyrobot.com";
}

function getAllowedHostname(): string {
  return new URL(getAllowedOrigin()).hostname;
}

export function checkOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const allowedHostname = getAllowedHostname();

  if (!origin && !referer) return true;

  if (origin) {
    try {
      if (new URL(origin).hostname !== allowedHostname) return false;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      if (new URL(referer).hostname !== allowedHostname) return false;
    } catch {
      return false;
    }
  }

  return true;
}

export function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": getAllowedOrigin(),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Idempotency-Key",
  };
}

export function getAllowedCorsOrigin(): string {
  return getAllowedOrigin();
}
