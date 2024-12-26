import * as React from "react";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import PeriodicTablePage from "./PeriodicTablePage";
import "hammerjs";
import { render } from "#src/test-utils";

test("should be able to navigate back to main menu", async () => {
  const { route } = render(<PeriodicTablePage />, {
    initialHistoryEntries: ["/periodic-table"],
  });

  await userEvent.click(screen.getByTestId("navbar-back-button"));
  expect(route.location.pathname).toBe("/");
});
