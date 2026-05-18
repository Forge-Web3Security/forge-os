import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("ForgeOS Alpha UI", () => {
  it("renders the workstation shell", () => {
    render(<App />);
    expect(screen.getByText("Collaboration Station")).toBeInTheDocument();
    expect(screen.getByText("Work Board")).toBeInTheDocument();
  });
});
