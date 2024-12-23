import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "#src/test-utils";
import SelectorModal, { SelectorModalOption } from "./SelectorModal";
import { userEvent } from "@testing-library/user-event";

const onOptionSelectedMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

const options: SelectorModalOption[] = [
  {
    key: "0",
    text: "Hydrogen",
  },
  {
    key: "1",
    text: "Helium",
  },
];
test("should render Modal", () => {
  render(
    <SelectorModal
      options={options}
      onOptionSelected={onOptionSelectedMock}
      open
    />,
  );

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /hydrogen/i,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /helium/i,
    }),
  ).toBeInTheDocument();
});

test("should invoke onOptionSelected", async () => {
  render(
    <SelectorModal
      options={options}
      onOptionSelected={onOptionSelectedMock}
      open
    />,
  );

  await userEvent.click(
    screen.getByRole("button", {
      name: /hydrogen/i,
    }),
  );

  expect(onOptionSelectedMock).toHaveBeenCalledTimes(1);
  expect(onOptionSelectedMock).toHaveBeenCalledWith(options[0]);
});

test("should not show dialog when not open", () => {
  render(
    <SelectorModal
      options={options}
      onOptionSelected={onOptionSelectedMock}
      open={false}
    />,
  );

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
