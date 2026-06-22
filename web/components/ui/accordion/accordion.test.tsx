import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const renderAccordion = () =>
  render(
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Question 1</AccordionTrigger>
        <AccordionContent>Answer 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Question 2</AccordionTrigger>
        <AccordionContent>Answer 2</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );

describe("Accordion", () => {
  it("renders all triggers", () => {
    renderAccordion();
    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 2")).toBeInTheDocument();
  });

  it("expands content on click", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByText("Question 1"));
    expect(screen.getByText("Answer 1")).toBeVisible();
  });

  it("only one item open at a time (type=single)", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByText("Question 1"));
    expect(screen.getByText("Answer 1")).toBeVisible();
    await user.click(screen.getByText("Question 2"));
    expect(screen.queryByText("Answer 1")).toBeNull();
  });
});
