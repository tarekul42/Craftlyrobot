import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "./form-field";
import { Input } from "@/components/ui/input";

describe("FormField", () => {
  it("renders label", () => {
    render(
      <FormField label="Email" htmlFor="email">
        <Input id="email" />
      </FormField>,
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("shows required indicator", () => {
    render(
      <FormField label="Name" htmlFor="name" required>
        <Input id="name" />
      </FormField>,
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows hint when provided", () => {
    render(
      <FormField label="Email" htmlFor="email" hint="We won't share it">
        <Input id="email" />
      </FormField>,
    );
    expect(screen.getByText(/won't share/i)).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    render(
      <FormField label="Email" htmlFor="email" error="Invalid email">
        <Input id="email" />
      </FormField>,
    );
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not show hint when error is present", () => {
    render(
      <FormField
        label="Email"
        htmlFor="email"
        hint="Hint text"
        error="Error text"
      >
        <Input id="email" />
      </FormField>,
    );
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument();
    expect(screen.getByText("Error text")).toBeInTheDocument();
  });

  it("links label to input via htmlFor", () => {
    render(
      <FormField label="Email" htmlFor="email">
        <Input id="email" />
      </FormField>,
    );
    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });
});
