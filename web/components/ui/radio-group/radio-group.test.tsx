import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup", () => {
  it("renders all items", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" id="a" />
        <RadioGroupItem value="b" id="b" />
      </RadioGroup>,
    );
    expect(screen.getAllByRole("radio").length).toBe(2);
  });
});
