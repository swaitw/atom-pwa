import { useSearchInput } from "./useSearchInput";
import * as React from "react";
import FocusTrap from "focus-trap-react";
import Button from "@/components/shared/button/Button";
import Portal from "@/components/shared/portal/Portal";
import { useLocale } from "@/hooks/useLocale";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import Icon from "@/components/shared/icon/Icon";
import { useContentSearch, SearchResult } from "@/hooks/useContentSearch";
import { useElements } from "@/hooks/useElements";
import { Element } from "@/Element";
import Atom from "@/components/atom";
import { PERIODIC_TABLE } from "@/routes";
import NoResults from "./no-results.svg?react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/styles";

function SearchView() {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const { value, inputProps, isSearching } = useSearchInput("replace");
  const query = value.trim();
  const deferredQuery = React.useDeferredValue(query);
  const results = useContentSearch(deferredQuery);

  function close() {
    navigate(-1);
  }

  const searchViewRef = React.useRef<HTMLDivElement>(null);

  useLockBodyScroll(searchViewRef, isSearching);

  const isLoading = query !== deferredQuery;
  const noResults = !isLoading && results.elements.length === 0;

  if (!isSearching) {
    return null;
  }

  return (
    <Portal>
      <FocusTrap>
        <div
          className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-accent-50 animate-in fade-in-50 slide-in-from-bottom-[20%] motion-reduce:animate-none dark:bg-accent-950"
          aria-modal={true}
          aria-label={i18n("Search")}
          ref={searchViewRef}
        >
          <div className="flex w-full flex-col items-center px-6 py-0 [@media_(min-width:_420px)]:max-w-[420px]">
            <div className="relative m-4 flex max-h-[52px] min-h-[52px] w-full items-center overflow-hidden rounded-lg bg-white shadow-sm dark:bg-accent-900">
              <Button
                onClick={close}
                aria-label={i18n("Close")}
                circle={true}
                className="m-1 ml-2 h-10 w-10 flex-shrink-0 p-0 opacity-60"
              >
                <Icon name="arrow_back" />
              </Button>

              <input
                type="text"
                autoFocus
                {...inputProps}
                className="h-full w-full border-0 bg-transparent pl-2 pr-4 text-lg text-inherit outline-none placeholder:text-inherit placeholder:opacity-60"
              />

              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-75">
                  <Atom spinning={true} color="primary" weight={32} size={24} />
                </div>
              )}
            </div>

            {noResults && (
              <div className="flex w-full flex-1 flex-col items-center justify-center py-8">
                <NoResults
                  aria-label="No results"
                  className="h-auto w-[80%] opacity-50 grayscale"
                />
              </div>
            )}

            {results.elements.length > 0 && (
              <div className="w-full">
                <div className="my-4 flex flex-col items-start">
                  <h2 className="m-0 mb-4 text-xl font-medium">
                    {i18n("elements")}
                  </h2>

                  <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm dark:bg-accent-900">
                    {results.elements.slice(0, 10).map((result) => (
                      <ElementSearchResult key={result.id} {...result} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
}

export default SearchView;

function ElementSearchResult({ id, match }: SearchResult) {
  const { i18n } = useLocale();
  const { getLocalizedElement, getElement } = useElements();
  const element = getElement(id);
  const elementLocales = getLocalizedElement(id);
  const navigate = useNavigate();

  if (!elementLocales || !element) {
    return null;
  }

  const matchKey = Object.values(match)?.[0]?.find(
    (key) => !["symbol", "name", "group"].includes(key),
  ) as keyof Element;

  let secondLineValue: React.ReactNode = "";

  if (matchKey) {
    secondLineValue = (
      <>
        <strong
          aria-label="Match reason"
          className="text-sm font-normal uppercase tracking-[-0.05px] opacity-50"
        >
          {i18n(`element_data_${matchKey}`)}
        </strong>
        <span className="block pt-1">
          {elementLocales[matchKey] as string | number}
        </span>
      </>
    );
  } else {
    secondLineValue = elementLocales.group;
  }

  function open() {
    navigate(`${PERIODIC_TABLE}/${element.atomic}`);
  }

  return (
    <Button
      className="flex w-full justify-start px-4 py-3 font-normal"
      onClick={open}
    >
      <div
        className={cn(
          "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full",
          "element",
          element.group,
        )}
      >
        {elementLocales.symbol}
      </div>

      <div className="flex flex-col pl-4 text-start">
        <span className="text-base font-medium">{elementLocales.name}</span>

        <span className="pt-1 text-sm opacity-75">{secondLineValue}</span>
      </div>
    </Button>
  );
}
