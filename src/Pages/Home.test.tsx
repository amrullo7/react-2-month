
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";

describe("Home Formik CRUD", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should display all users", () => {
    render(<Home />);

    expect(screen.getByText("Abdullo")).toBeInTheDocument();
    expect(screen.getByText("Muhammad")).toBeInTheDocument();
    expect(screen.getByText("Qurbon")).toBeInTheDocument();
  });

  it("should add a new user", async () => {
    const user = userEvent.setup();

    render(<Home />);

    await user.type(
      screen.getByPlaceholderText("Name"),
      "Ali"
    );

    await user.type(
      screen.getByPlaceholderText("Job"),
      "Developer"
    );

    await user.click(
      screen.getByRole("button", { name: "Add" })
    );

    expect(screen.getByText("Ali")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  it("should edit an existing user", async () => {
    const user = userEvent.setup();

    render(<Home />);

    const abdulloCard = screen
      .getByText("Abdullo")
      .closest("div")!;

    const editButton = abdulloCard.querySelector("button")!;

    await user.click(editButton);

    const nameInput = screen.getByDisplayValue("Abdullo");

    await user.clear(nameInput);
    await user.type(nameInput, "Abdullo Updated");

    const jobInput = screen.getByDisplayValue("Student");

    await user.clear(jobInput);
    await user.type(jobInput, "Senior Developer");

    const form = screen.getByRole("form", {
      name: "user-form",
    });

    await user.click(
      form.querySelector('button[type="submit"]')!
    );

    expect(
      screen.getByText("Abdullo Updated")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Senior Developer")
    ).toBeInTheDocument();
  });

  it("should delete an existing user", async () => {
    const user = userEvent.setup();

    render(<Home />);

    const abdulloCard = screen
      .getByText("Abdullo")
      .closest("div")!;

    const buttons = abdulloCard.querySelectorAll("button");

    await user.click(buttons[1]);

    await waitFor(() => {
      expect(
        screen.queryByText("Abdullo")
      ).not.toBeInTheDocument();
    });
  });

  it("should validate required fields", async () => {
    const user = userEvent.setup();

    render(<Home />);

    const form = screen.getByRole("form", {
      name: "user-form",
    });

    await user.click(
      form.querySelector('button[type="submit"]')!
    );

    expect(
      await screen.findByText("Name is required")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Job is required")
    ).toBeInTheDocument();

    // Empty user must NOT be added
    expect(
      screen.queryByRole("heading", { name: "" })
    ).not.toBeInTheDocument();

    expect(
      screen.getAllByRole("heading")
    ).toHaveLength(3);
  });
});
