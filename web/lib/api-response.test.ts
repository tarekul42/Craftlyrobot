import { describe, it, expect } from "vitest";
import { jsonOk, jsonBadRequest, jsonForbidden, jsonTooManyRequests, jsonMethodNotAllowed, jsonInternalError, apiError } from "./api-response";

describe("api-response", () => {
  it("jsonOk returns 200 with data", async () => {
    const res = jsonOk({ id: "abc" }, { route: "test" });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true, data: { id: "abc" }, meta: { route: "test" } });
  });

  it("jsonBadRequest returns 400 with message", async () => {
    const res = jsonBadRequest("Invalid");
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ ok: false, message: "Invalid" });
  });

  it("jsonBadRequest returns 400 with field errors", async () => {
    const res = jsonBadRequest("Validation failed", { email: ["Required"] });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ ok: false, message: "Validation failed", errors: { email: ["Required"] } });
  });

  it("jsonForbidden returns 403", async () => {
    const res = jsonForbidden();
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body).toEqual({ ok: false, message: "Forbidden" });
  });

  it("jsonTooManyRequests returns 429 with Retry-After header", async () => {
    const res = jsonTooManyRequests("Slow down", 120);
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("120");
    const body = await res.json();
    expect(body).toEqual({ ok: false, message: "Slow down", code: "RATE_LIMITED" });
  });

  it("jsonMethodNotAllowed returns 405 with Allow header", async () => {
    const res = jsonMethodNotAllowed(["POST"]);
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
    const body = await res.json();
    expect(body).toEqual({ ok: false, message: "Method not allowed. Use POST.", code: "METHOD_NOT_ALLOWED" });
  });

  it("jsonInternalError returns 500", async () => {
    const res = jsonInternalError();
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({ ok: false, message: "Something went wrong. Please try again." });
  });

  it("apiError returns custom status and code", async () => {
    const res = apiError("Not found", 404, "NOT_FOUND");
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toEqual({ ok: false, message: "Not found", code: "NOT_FOUND" });
  });
});
