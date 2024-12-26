import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocale } from "#src/hooks/useLocale";

export function useSearchInput(type: "push" | "replace") {
  const { i18n } = useLocale();
  const [query, setQuery] = useSearchParams();
  const routerSearchQueryValue = query.get("search") ?? "";
  const [value, setValue] = React.useState(routerSearchQueryValue);
  const navigate = useNavigate();

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
    [type, setQuery],
  );

  const isSearching = !!routerSearchQueryValue || !!query.get("openSearch");

  function openSearch() {
    const newParams = new URLSearchParams();
    newParams.set("openSearch", "true");
    setQuery(newParams);
  }

  function closeSearch() {
    navigate(-1);
  }

  return {
    value,
    isSearching,
    openSearch,
    closeSearch,
    inputProps: {
      defaultValue: routerSearchQueryValue,
      onChange,
      placeholder: i18n("Search_dots"),
      "aria-label": i18n("Search"),
    },
  };
}
