import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress", () => {
  it("renders with default value", () => {
    render(<Progress value={50} data-testid="progress" />);
    expect(screen.getByTestId("progress")).toBeInTheDocument();
  });

  it("applies correct transform for value", () => {
    render(<Progress value={75} data-testid="progress" />);
    const indicator = screen.getByTestId("progress").firstChild as HTMLElement;
    expect(indicator.style.transform).toContain("25%"); // 100 - 75 = 25
  });
});
