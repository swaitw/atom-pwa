import * as React from "react";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ElementPicker from "./ElementPicker";
import { render } from "#src/test-utils";

test("search for Neon", async () => {
  const onElement = vi.fn();

  render(<ElementPicker onElement={onElement} />);
  expect(screen.getByText("Helium")).toBeVisible();

  await userEvent.type(screen.getByRole("textbox"), "Neon");
  expect(screen.queryByText("Helium")).not.toBeInTheDocument();

  await userEvent.click(screen.getByText("Noble gases"));

  expect(onElement).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Neon",
    }),
  );
});

test("search for atomic number 118", async () => {
  const onElement = vi.fn();

  render(<ElementPicker onElement={onElement} />);

  await userEvent.type(screen.getByRole("textbox"), "118");

  await userEvent.click(screen.getByText("Oganesson"));

  expect(onElement).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Oganesson",
    }),
  );
});

test("search for atomic number 25", async () => {
  const onElement = vi.fn();

  render(<ElementPicker onElement={onElement} />);

  await userEvent.type(screen.getByRole("textbox"), "25");
  expect(screen.getByRole("textbox")).toHaveValue("25");

  await userEvent.click(await screen.findByText("Manganese"));

  expect(onElement).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Manganese",
    }),
  );
});
