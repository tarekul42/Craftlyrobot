import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./product-card";

const mockProduct = {
  slug: "craftly-robot",
  name: "Craftly Robot",
  tagline: "Build Android apps",
  description: "A product that builds Android apps.",
  status: "coming-soon" as const,
  features: ["Feature 1"],
};

describe("ProductCard", () => {
  it("renders product name", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Craftly Robot")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });
});
