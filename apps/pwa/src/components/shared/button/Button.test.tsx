import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import Button from "./Button";
import { userEvent } from "@testing-library/user-event";

const onClickMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

test("should render button component with link", () => {
  render(
    <Button link="https://twitter.com/HorusGoul">
      <div>mock text</div>
    </Button>,
  );
  expect(screen.getByRole("link", { name: /mock text/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /mock text/i })).toHaveAttribute(
    "href",
    "https://twitter.com/HorusGoul",
  );
});

test("should invoke onClick", async () => {
  render(
    <Button link="https://twitter.com/HorusGoul" onClick={onClickMock}>
      <div>mock text</div>
    </Button>,
  );

  const linkButton = screen.getByRole("link", {
    name: /mock text/i,
  }) as HTMLAnchorElement;

  await userEvent.click(linkButton);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test("should invoke onClick", async () => {
  render(
    <Button link="https://twitter.com/HorusGoul">
      <div>mock text</div>
    </Button>,
  );

  const linkButton = screen.getByRole("link", {
    name: /mock text/i,
  }) as HTMLAnchorElement;

  await userEvent.click(linkButton);

  expect(onClickMock).toHaveBeenCalledTimes(0);
});
