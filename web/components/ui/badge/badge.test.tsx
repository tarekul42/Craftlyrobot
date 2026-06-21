import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    render(<Badge data-testid="badge">Default</Badge>);
    expect(screen.getByTestId("badge").className).toContain("bg-primary");
  });

  it("applies secondary variant", () => {
    render(
      <Badge variant="secondary" data-testid="badge">
        Secondary
      </Badge>,
    );
    expect(screen.getByTestId("badge").className).toContain("bg-secondary");
  });

  it("applies success variant", () => {
    render(
      <Badge variant="success" data-testid="badge">
        Success
      </Badge>,
    );
    expect(screen.getByTestId("badge").className).toContain("bg-success");
  });

  it("applies destructive variant", () => {
    render(
      <Badge variant="destructive" data-testid="badge">
        Error
      </Badge>,
    );
    expect(screen.getByTestId("badge").className).toContain("bg-destructive");
  });

  it("applies outline variant", () => {
    render(
      <Badge variant="outline" data-testid="badge">
        Outline
      </Badge>,
    );
    expect(screen.getByTestId("badge").className).toContain("text-foreground");
  });
});
