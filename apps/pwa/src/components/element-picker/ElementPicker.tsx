import classNames from "classnames";
import { useState, useRef, useEffect, useCallback } from "react";
import HyperScroller, { HyperScrollerCache } from "react-hyper-scroller";
import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import Button from "@/components/shared/button/Button";
import Icon from "@/components/shared/icon/Icon";

interface ElementPickerProps {
  onElement: (element: Element) => void;
}

interface SearchState {
  query: string;
  elements: Element[];
}

function ElementPicker({ onElement }: ElementPickerProps) {
  const { i18n } = useLocale();
  const { elements: allElements, getElementLocales } = useElements();
  const [search, setSearch] = useState<SearchState>(() => ({
    query: "",
    elements: allElements,
  }));

  const searchElements = useCallback(
    (searchValue?: string) => {
      if (!searchValue) {
        return setSearch({ query: "", elements: allElements });
      }

      const newElements = allElements.filter((element) => {
        const elementLocales = getElementLocales(element);
        const symbol = element.symbol.toLowerCase();
        const name = elementLocales.name.toLowerCase();
        const group = elementLocales.group.toLowerCase();

        if (symbol === searchValue) {
          return true;
        }

        if (name.includes(searchValue)) {
          return true;
        }

        if (group.includes(searchValue)) {
          return true;
        }

        if (parseInt(searchValue, 10) === element.atomic) {
          return true;
        }

        return false;
      });

      setSearch({ query: searchValue, elements: newElements });
    },
    [allElements, getElementLocales]
  );

  useEffect(() => {
    searchElements();
  }, [searchElements]);

  const elementListRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-12 px-4 z-[1] shadow-sm text-accent-400">
        <Icon name="search" />

        <input
          aria-label={i18n("search_elements")}
          className="flex-1 bg-transparent border-0 ml-4 text-inherit h-full p-0 placeholder:text-inherit placeholder:opacity-65 outline-none"
          type="text"
          placeholder={i18n("search_elements")}
          onChange={(event) => {
            const value = event.currentTarget.value.toLowerCase();

            searchElements(value);
          }}
          autoFocus={true}
        />
      </div>

      <div
        ref={elementListRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <HyperScroller
          estimatedItemHeight={64}
          targetView={elementListRef}
          measureItems={false}
          cache={HyperScrollerCache.getOrCreateCache(
            `element-picker:${search.query}`
          )}
        >
          {search.elements.map((element) => {
            const elementLocales = getElementLocales(element);

            return (
              <Button
                key={element.atomic}
                onClick={() => onElement(element)}
                className="flex justify-start w-full py-2 px-4 [text-transform:_none] font-normal"
              >
                <div
                  className={classNames(
                    "flex items-center justify-center w-12 h-12 rounded-full",
                    "element",
                    element.group
                  )}
                >
                  {element.symbol}
                </div>

                <div className="flex flex-col pl-4 text-start">
                  <span className="text-base">{elementLocales.name}</span>
                  <span className="text-sm pt-1">{elementLocales.group}</span>
                </div>
              </Button>
            );
          })}
        </HyperScroller>
      </div>
    </div>
  );
}

export default ElementPicker;
