import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FAQSection } from "./faq";

const mockFaqs = [
  { question: "Question 1", answer: "Answer 1" },
  { question: "Question 2", answer: "Answer 2" },
];

describe("FAQSection", () => {
  it("renders all questions", () => {
    render(<FAQSection items={mockFaqs} title="FAQ" />);
    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 2")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<FAQSection items={mockFaqs} title="Frequently Asked" />);
    expect(screen.getByText("Frequently Asked")).toBeInTheDocument();
  });
});
