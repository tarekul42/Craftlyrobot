import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSplit } from "./hero-split";

describe("HeroSplit", () => {
  it("renders title", () => {
    render(<HeroSplit title="Split Title" />);
    expect(screen.getByText("Split Title")).toBeInTheDocument();
  });

  it("renders form element when provided", () => {
    render(
      <HeroSplit title="Title" form={<div data-testid="test-form" />} />,
    );
    expect(screen.getByTestId("test-form")).toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<HeroSplit title="Title" eyebrow="Eyebrow Text" />);
    expect(screen.getByText("Eyebrow Text")).toBeInTheDocument();
  });
});
