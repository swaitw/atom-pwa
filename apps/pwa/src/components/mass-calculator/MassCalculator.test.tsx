import * as React from "react";
import { screen } from "@testing-library/react";
import { render } from "#src/test-utils";
import { userEvent } from "@testing-library/user-event";
import MassCalculator from "./MassCalculator";
import "hammerjs";

test("should render mass calculator", async () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  expect(screen.getByText(/mass calculator/i)).toBeInTheDocument();
  expect(screen.getByText(/total/i)).toBeInTheDocument();
  expect(screen.getByText(/298\.06532 g \/ mol/i)).toBeInTheDocument();
  expect(screen.getByText(/add element/i)).toBeInTheDocument();
  expect(screen.getByText(/clear/i)).toBeInTheDocument();
  expect(screen.getByText(/holmium/i)).toBeInTheDocument();
  expect(screen.getByText(/164\.93032 g \/ mol/i)).toBeInTheDocument();
});

test("should clear elements", async () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  await userEvent.click(screen.getByText(/clear/i));
  expect(screen.getByText(/0 g \/ mol/i)).toBeInTheDocument();
  expect(screen.queryByText(/holmium/i)).not.toBeInTheDocument();
});

test("should add elements and verify total mass", async () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  await userEvent.click(screen.getByText(/clear/i));

  // add element
  await userEvent.click(screen.getByText(/add element/i));

  expect(screen.getByRole("textbox")).toBeInTheDocument();

  await userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // adding another element
  await userEvent.click(screen.getByText(/add element/i));
  await userEvent.type(screen.getByRole("textbox"), "oxygen");

  await userEvent.click(screen.getAllByText(/oxygen/i)[0]);

  await userEvent.click(screen.getAllByText(/hydrogen/i)[0]);
  await userEvent.clear(screen.getByDisplayValue("1"));
  await userEvent.type(screen.getByDisplayValue("0"), "2");

  await userEvent.click(screen.getAllByRole("button")[5]);

  //verify total mass of H2O(water)
  expect(screen.getByText(/18\.01528 g \/ mol/i)).toBeInTheDocument();
});

test("should be able to increase and decrease element amount with icons", async () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  await userEvent.click(screen.getByText(/clear/i));

  // add element
  await userEvent.click(screen.getByText(/add element/i));

  await userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // open increase amount modal
  await userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // verify initial amount of Hydrogen
  expect(screen.getByDisplayValue("1")).toBeInTheDocument();

  // Click + icon
  await userEvent.click(screen.getAllByRole("button")[6]);

  // Verify amount is increased
  expect(screen.getByDisplayValue("2")).toBeInTheDocument();

  // Click - icon
  await userEvent.click(screen.getAllByRole("button")[5]);

  expect(screen.getByDisplayValue("1")).toBeInTheDocument();
});

test("should increase element amount by +1 if user add same element again", async () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  await userEvent.click(screen.getByText(/clear/i));

  // add element
  await userEvent.click(screen.getByText(/add element/i));

  await userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // open add element modal again
  await userEvent.click(screen.getByText(/add element/i));

  // add hydrogen again
  await userEvent.click(screen.getAllByText(/hydrogen/i)[2]);

  // Verify total mass of 2 atoms of Hydrogen
  expect(screen.getByText(/2\.01588 g \/ mol/i)).toBeInTheDocument();
});

test("should navigate back", async () => {
  const { route } = render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  await userEvent.click(screen.getAllByRole("button")[0]);
  expect(route.location.pathname).toBe("/");
});

test("should not allow user to add negative amounts", async () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  await userEvent.click(screen.getByText(/clear/i));

  // add element
  await userEvent.click(screen.getByText(/add element/i));

  await userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // open increase amount modal
  await userEvent.click(screen.getAllByText(/hydrogen/i)[0]);

  // verify initial amount of Hydrogen
  expect(screen.getByDisplayValue("1")).toBeInTheDocument();

  // Click - icon
  await userEvent.click(screen.getAllByRole("button")[5]);

  expect(screen.getByDisplayValue("0")).toBeInTheDocument();

  await userEvent.click(screen.getAllByRole("button")[5]);

  // Click again on - icon
  expect(screen.getByDisplayValue("0")).toBeInTheDocument();
});

test("should be able to close add element modal by clicking on overlay", async () => {
  render(<MassCalculator />, {
    initialHistoryEntries: ["/mass-calculator"],
  });

  // clear elements
  await userEvent.click(screen.getByText(/clear/i));

  // add element
  await userEvent.click(screen.getByText(/add element/i));

  // close add elements modal by clicking on overlay
  await userEvent.click(screen.getByTestId("overlay"));
});
