/**
 * Dev-mode guards.
 *
 * Check if a service is available in dev mode and log a message.
 * Useful for services that need DATABASE_URL or other env vars
 * that aren't always configured in local development.
 */

export function isDevMode(): boolean {
  return process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL;
}

export function devModeGuard(entity: string): boolean {
  if (isDevMode()) {
    console.log(`[${entity}] (dev mode — not saved)`);
    return true;
  }
  return false;
}
