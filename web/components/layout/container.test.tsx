import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "./container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container><p>Content</p></Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
