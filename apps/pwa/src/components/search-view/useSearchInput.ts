import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";

export function useSearchInput(type: "push" | "replace") {
  const { i18n } = useLocale();
  const [query, setQuery] = useSearchParams();
  const routerSearchQueryValue = query.get("search") ?? "";
  const [value, setValue] = React.useState(routerSearchQueryValue);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = encodeURIComponent(event.target.value);
      setValue(query);

      const newParams = new URLSearchParams();

      if (query) {
        newParams.set("search", query);
      } else {
        newParams.set("openSearch", "true");
      }

      setQuery(newParams, {
        replace: type === "replace",
      });
    },
    [type, setQuery]
  );

  const isSearching = !!routerSearchQueryValue || !!query.get("openSearch");

  return {
    value,
    isSearching,
    inputProps: {
      defaultValue: routerSearchQueryValue,
      onChange,
      placeholder: i18n("Search_dots"),
      "aria-label": i18n("Search"),
    },
  };
}
