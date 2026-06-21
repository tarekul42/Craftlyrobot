import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("applies animate-pulse class", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("animate-pulse");
  });

  it("applies muted background", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("bg-muted");
  });
});
