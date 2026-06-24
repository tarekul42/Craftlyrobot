/**
 * Centralized error logging for API routes.
 * Logs method, path, status, and message.
 */
export function logApiError(
  route: string,
  error: unknown,
  req?: Request,
) {
  const method = req?.method ?? "?";
  const path = req?.url ? new URL(req.url).pathname : "?";
  const message = error instanceof Error ? error.message : String(error);

  console.error(`[api:${route}] ${method} ${path} — ${message}`);

  if (error instanceof Error && error.stack) {
    console.error(`[api:${route}] Stack:`, error.stack);
  }
}
