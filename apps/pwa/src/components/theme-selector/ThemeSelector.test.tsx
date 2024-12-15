import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import { userEvent } from "@testing-library/user-event";
import { STORAGE_KEY } from "@/hooks/useSettings";
import ThemeSelector from "./ThemeSelector";

afterEach(() => {
  window.localStorage.clear();
});

test("should display a button for opening modal", () => {
  render(<ThemeSelector />);

  expect(
    screen.getByRole("button", { name: /change theme/i }),
  ).toBeInTheDocument();
});

test("should open selector modal", async () => {
  render(<ThemeSelector />);

  await userEvent.click(screen.getByRole("button", { name: /change theme/i }));
  expect(
    screen.getByRole("dialog", { name: /change theme/i }),
  ).toBeInTheDocument();
});

test("should display themes in modal", async () => {
  render(<ThemeSelector />);

  await userEvent.click(screen.getByRole("button", { name: /change theme/i }));

  expect(screen.getByRole("button", { name: /dark/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /light/i })).toBeInTheDocument();
});

test("should change theme", async () => {
  render(<ThemeSelector />);

  await userEvent.click(screen.getByRole("button", { name: /change theme/i }));
  await userEvent.click(screen.getByRole("button", { name: /light/i }));

  const settings = JSON.parse(
    window.localStorage.getItem(STORAGE_KEY) as string,
  );

  expect(settings.theme).toBe("light");
});
