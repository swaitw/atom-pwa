import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "#src/test-utils";
import { userEvent } from "@testing-library/user-event";
import Navbar from "./Navbar";

test("should render a title", () => {
  render(<Navbar title="Custom title" />);

  expect(screen.getByText(/Custom title/i)).toBeInTheDocument();
});

test("should not render a back button by default", () => {
  render(<Navbar />);

  expect(screen.queryByRole("button")).toBeNull();
});

test("should handle clicking the back button", async () => {
  const onBackButtonClickMock = vi.fn();

  render(<Navbar onBackButtonClick={onBackButtonClickMock} />);

  await userEvent.click(screen.getByRole("button"));

  expect(onBackButtonClickMock).toHaveBeenCalledTimes(1);
});
