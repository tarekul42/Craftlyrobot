import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it("calls onChange when typed in", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} placeholder="Test" />);
    await user.type(screen.getByPlaceholderText("Test"), "hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("applies error styles when hasError", () => {
    render(<Input hasError placeholder="Test" data-testid="input" />);
    expect(screen.getByTestId("input").className).toContain(
      "border-destructive",
    );
  });

  it("renders left icon", () => {
    render(
      <Input
        leftIcon={<span data-testid="icon">@</span>}
        placeholder="Email"
      />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("supports different types", () => {
    render(<Input type="email" placeholder="Email" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled placeholder="Test" data-testid="input" />);
    expect(screen.getByTestId("input")).toBeDisabled();
  });
});
