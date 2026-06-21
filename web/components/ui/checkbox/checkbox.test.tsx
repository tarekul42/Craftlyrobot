import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox data-testid="cb" />);
    expect(screen.getByTestId("cb").getAttribute("data-state")).toBe("unchecked");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} data-testid="cb" />);
    await user.click(screen.getByTestId("cb"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
