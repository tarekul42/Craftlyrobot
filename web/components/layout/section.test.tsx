import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "./section";

describe("Section", () => {
  it("renders children", () => {
    render(<Section><p>Content</p></Section>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies muted background class", () => {
    const { container } = render(<Section background="muted"><p>Content</p></Section>);
    expect(container.firstChild).toHaveClass("bg-muted");
  });
});
