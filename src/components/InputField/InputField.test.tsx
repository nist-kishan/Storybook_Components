import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputField } from "./InputField";

describe("InputField", () => {
  it("renders label and input", () => {
    render(<InputField label="Name" placeholder="Enter name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("calls onChange", () => {
    const fn = vi.fn();
    render(<InputField label="Name" onChange={fn} />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "K" } });
    expect(fn).toHaveBeenCalled();
  });

  it("shows error message when invalid", () => {
    render(
      <InputField
        label="Email"
        invalid
        errorMessage="Invalid email"
      />
    );
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });
});
