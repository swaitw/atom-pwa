import * as React from "react";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import About from "./About";
import { render } from "#src/test-utils";

test.each([
  {
    name: "about",
    linkItem: /about/i,
  },
  {
    name: "app settings",
    linkItem: /app settings/i,
  },
  {
    name: "change language",
    linkItem: /change language/i,
  },
  {
    name: "change theme",
    linkItem: /change theme/i,
  },
  {
    name: "contact me",
    linkItem: /contact me/i,
  },
  {
    name: "source code",
    linkItem: /source code/i,
  },
  {
    name: "report bug",
    linkItem: /report bug/i,
  },
])("should verify links", ({ linkItem }) => {
  render(<About />, {
    initialHistoryEntries: ["/about"],
  });

  expect(screen.getByText(linkItem)).toBeInTheDocument();
});

test("should validate contact me link", () => {
  render(<About />, {
    initialHistoryEntries: ["/about"],
  });

  expect(screen.getByRole("link", { name: /contact me/i })).toHaveAttribute(
    "href",
    "https://twitter.com/HorusGoul",
  );
});

test("should validate source code link", () => {
  render(<About />, {
    initialHistoryEntries: ["/about"],
  });

  expect(screen.getByRole("link", { name: /source code/i })).toHaveAttribute(
    "href",
    "https://github.com/HorusGoul/atom-pwa",
  );
});

test("should validate Report bug link", () => {
  render(<About />, {
    initialHistoryEntries: ["/about"],
  });

  expect(screen.getByRole("link", { name: /report bug/i })).toHaveAttribute(
    "href",
    "mailto:atom@horus.dev",
  );
});

test("should invoke onNavbarBackButtonClick", async () => {
  const { route } = render(
    <>
      <About />
    </>,
    {
      initialHistoryEntries: ["/about"],
    },
  );

  const navButton = screen.getByLabelText(/go back/i);

  await userEvent.click(navButton);
  expect(route.location.pathname).toBe("/");
});
