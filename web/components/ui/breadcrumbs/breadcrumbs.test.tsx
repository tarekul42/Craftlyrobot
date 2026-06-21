import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders all items", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Community", href: "/community" },
          { label: "Engineering" },
        ]}
      />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("marks last item as current page", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Current" },
        ]}
      />
    );
    expect(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
  });

  it("links are clickable for items with href", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Current" },
        ]}
      />
    );
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
  });
});
