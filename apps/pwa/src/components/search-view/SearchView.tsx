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
          className="fixed z-[100] inset-0 bg-slate-50 dark:bg-slate-950 flex justify-center overflow-y-auto motion-reduce:animate-none animate-in slide-in-from-bottom-[20%] fade-in-50"
          aria-modal={true}
          aria-label={i18n("Search")}
          ref={searchViewRef}
        >
          <div className="flex items-center flex-col w-full py-0 px-6 [@media_(min-width:_420px)]:max-w-[420px]">
            <div className="m-4 w-full rounded-lg min-h-[52px] max-h-[52px] bg-white dark:bg-slate-900 flex items-center overflow-hidden relative shadow-sm">
              <Button
                onClick={close}
                aria-label={i18n("Close")}
                circle={true}
                className="m-1 ml-2 flex-shrink-0 w-10 h-10 p-0 opacity-60"
              >
                <Icon name="arrow_back" />
              </Button>

              <input
                type="text"
                autoFocus
                {...inputProps}
                className="w-full h-full bg-transparent text-inherit border-0 pr-4 pl-2 text-lg placeholder:text-inherit placeholder:opacity-60 outline-none"
              />

              {isLoading && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-75">
                  <Atom spinning={true} color="primary" weight={32} size={24} />
                </div>
              )}
            </div>

            {noResults && (
              <div className="w-full flex-1 py-8 flex flex-col items-center justify-center">
                <NoResults
                  aria-label="No results"
                  className="w-[80%] h-auto grayscale opacity-50"
                />
              </div>
            )}

            {results.elements.length > 0 && (
              <div className="w-full">
                <div className="flex flex-col items-start my-4">
                  <h2 className="text-xl font-medium m-0 mb-4">
                    {i18n("elements")}
                  </h2>

                  <div className="w-full bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm">
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
    (key) => !["symbol", "name", "group"].includes(key)
  ) as keyof Element;

  let secondLineValue: React.ReactNode = "";

  if (matchKey) {
    secondLineValue = (
      <>
        <strong
          aria-label="Match reason"
          className="font-normal opacity-50 uppercase text-sm tracking-[-0.05px]"
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
      className="flex justify-start w-full py-3 px-4 font-normal"
      onClick={open}
    >
      <div
        className={cn(
          "flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full",
          "element",
          element.group
        )}
      >
        {elementLocales.symbol}
      </div>

      <div className="flex flex-col pl-4 text-start">
        <span className="text-base font-medium">{elementLocales.name}</span>

        <span className="text-sm pt-1 opacity-75">{secondLineValue}</span>
      </div>
    </Button>
  );
}
