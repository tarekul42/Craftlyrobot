import { NextResponse } from "next/server";

export interface ApiSuccess<T = unknown> {
  ok: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  ok: false;
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

export function jsonOk<T>(data: T, meta?: Record<string, unknown>) {
  const body: ApiSuccess<T> = { ok: true, data };
  if (meta) body.meta = meta;
  return NextResponse.json(body, { status: 200 });
}

export function jsonCreated<T>(data: T) {
  return NextResponse.json({ ok: true, data } satisfies ApiSuccess<T>, { status: 201 });
}

export function jsonBadRequest(message: string, errors?: Record<string, string[]>) {
  return NextResponse.json(
    { ok: false, message, ...(errors ? { errors } : {}) } satisfies ApiError,
    { status: 400 },
  );
}

export function jsonUnauthorized(message = "Unauthorized") {
  return NextResponse.json({ ok: false, message } satisfies ApiError, { status: 401 });
}

export function jsonForbidden(message = "Forbidden") {
  return NextResponse.json({ ok: false, message } satisfies ApiError, { status: 403 });
}

export function jsonNotFound(message = "Not found") {
  return NextResponse.json({ ok: false, message } satisfies ApiError, { status: 404 });
}

export function jsonTooManyRequests(message: string, retryAfterSeconds: number) {
  return NextResponse.json(
    { ok: false, message, code: "RATE_LIMITED" } satisfies ApiError,
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}

export function jsonMethodNotAllowed(allowed: string[]) {
  return NextResponse.json(
    { ok: false, message: `Method not allowed. Use ${allowed.join(", ")}.`, code: "METHOD_NOT_ALLOWED" } satisfies ApiError,
    { status: 405, headers: { Allow: allowed.join(", ") } },
  );
}

export function jsonInternalError(message = "Something went wrong. Please try again.") {
  return NextResponse.json({ ok: false, message } satisfies ApiError, { status: 500 });
}

export function apiError(message: string, status: number, code?: string) {
  return NextResponse.json({ ok: false, message, code } satisfies ApiError, { status });
}
