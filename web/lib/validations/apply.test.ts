import { describe, it, expect } from "vitest";
import { applySchema, roleOptions, departmentOptions, commitmentOptions, skillOptions } from "./apply";

const validData = {
  fullName: "John Doe",
  email: "john@example.com",
  whatsapp: "+88012345678",
  role: "frontend",
  department: "engineering",
  commitment: "10h",
  skills: ["React", "TypeScript"],
  portfolio: "",
  whyCraftly: "I want to join because I believe in the mission and have relevant skills to contribute meaningfully.",
  turnstileToken: "valid-token",
};

describe("applySchema", () => {
  it("accepts valid data", () => {
    const result = applySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty fullName", () => {
    const result = applySchema.safeParse({ ...validData, fullName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = applySchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects short whatsapp", () => {
    const result = applySchema.safeParse({ ...validData, whatsapp: "123" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid role", () => {
    const result = applySchema.safeParse({ ...validData, role: "invalid" });
    expect(result.success).toBe(false);
  });

  it("rejects empty skills", () => {
    const result = applySchema.safeParse({ ...validData, skills: [] });
    expect(result.success).toBe(false);
  });

  it("rejects too many skills", () => {
    const result = applySchema.safeParse({
      ...validData,
      skills: Array.from({ length: 11 }, (_, i) => `skill-${i}`),
    });
    expect(result.success).toBe(false);
  });

  it("rejects short whyCraftly", () => {
    const result = applySchema.safeParse({ ...validData, whyCraftly: "Too short" });
    expect(result.success).toBe(false);
  });

  it("accepts optional portfolio URL", () => {
    const result = applySchema.safeParse({
      ...validData,
      portfolio: "https://github.com/johndoe",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid portfolio URL", () => {
    const result = applySchema.safeParse({ ...validData, portfolio: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("rejects missing turnstileToken", () => {
    const result = applySchema.safeParse({ ...validData, turnstileToken: "" });
    expect(result.success).toBe(false);
  });
});

describe("form options", () => {
  it("roleOptions has unique values", () => {
    const values = roleOptions.map((o) => o.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("departmentOptions has unique values", () => {
    const values = departmentOptions.map((o) => o.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("commitmentOptions has unique values", () => {
    const values = commitmentOptions.map((o) => o.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("skillOptions has no duplicates", () => {
    expect(new Set(skillOptions).size).toBe(skillOptions.length);
  });
});
