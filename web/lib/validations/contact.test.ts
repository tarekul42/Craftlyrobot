import { describe, it, expect } from "vitest";
import { contactSchema } from "./contact";

const validData = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Collaboration inquiry",
  message: "I would like to discuss a potential collaboration opportunity with your team.",
  turnstileToken: "valid-token",
};

describe("contactSchema", () => {
  it("accepts valid data", () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = contactSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({ ...validData, email: "bad" });
    expect(result.success).toBe(false);
  });

  it("rejects short subject", () => {
    const result = contactSchema.safeParse({ ...validData, subject: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const result = contactSchema.safeParse({
      ...validData,
      message: "Too short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing turnstileToken", () => {
    const result = contactSchema.safeParse({ ...validData, turnstileToken: "" });
    expect(result.success).toBe(false);
  });
});
