import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback } from "./avatar";

describe("Avatar", () => {
  it("renders fallback when no image", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies default size classes", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>X</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar").className).toContain("h-10");
    expect(screen.getByTestId("avatar").className).toContain("rounded-full");
  });
});
