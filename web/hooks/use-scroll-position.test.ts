import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollPosition } from "./use-scroll-position";

describe("useScrollPosition", () => {
  it("returns initial scroll position", () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(typeof result.current).toBe("number");
  });
});
