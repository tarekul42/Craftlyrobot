import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch data-testid="switch" />);
    expect(screen.getByTestId("switch").getAttribute("data-state")).toBe(
      "unchecked",
    );
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} data-testid="switch" />);
    await user.click(screen.getByTestId("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
