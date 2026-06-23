import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroCentered } from "./hero-centered";

describe("HeroCentered", () => {
  it("renders title", () => {
    render(<HeroCentered title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<HeroCentered title="Title" eyebrow="Section" />);
    expect(screen.getByText("Section")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<HeroCentered title="Title" description="Test description" />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders CTA buttons when provided", () => {
    render(
      <HeroCentered
        title="Title"
        primaryCta={{ label: "Get started", href: "/start" }}
      />,
    );
    expect(screen.getByText("Get started")).toBeInTheDocument();
  });
});
