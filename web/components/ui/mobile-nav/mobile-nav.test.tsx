import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileNav } from "./mobile-nav";

describe("MobileNav", () => {
  it("renders trigger button", () => {
    render(<MobileNav items={[{ title: "Home", href: "/" }]} />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("opens panel on click", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={[{ title: "Home", href: "/" }]} />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByText("Home")).toBeVisible();
  });
});
