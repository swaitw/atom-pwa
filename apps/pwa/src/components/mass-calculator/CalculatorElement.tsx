import * as React from "react";
import classNames from "classnames";
import Button from "@/components/shared/button/Button";
import { useLocale } from "@/hooks/useLocale";
import { useElements } from "@/hooks/useElements";

interface CalculatorElementProps {
  atomic: number;
  quantity: number;
  selectElement: (atomic: number) => void;
}

function CalculatorElement({
  atomic,
  quantity,
  selectElement,
}: CalculatorElementProps) {
  const { i18n } = useLocale();
  const { getLocalizedElement, getElement } = useElements();

  const element = getElement(atomic);
  const localizedElement = getLocalizedElement(atomic);

  if (!element || !localizedElement) {
    return null;
  }

  return (
    <Button
      onClick={() => selectElement(atomic)}
      className="flex justify-start w-full py-2 px-4 [text-transform:_none] font-normal shadow-sm bg-white dark:bg-accent-900"
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

      <div className="flex flex-col pl-4 text-left">
        <span className="text-lg">{localizedElement.name}</span>

        <span className="text-sm pt-1">
          {element.atomicMass} {i18n("g_mol")}
        </span>
      </div>

      <div className="flex flex-col ml-auto uppercase">
        <span className="text-xs">{i18n("amount")}</span>

        <span className="text-center pt-1">{quantity}</span>
      </div>
    </Button>
  );
}

export default CalculatorElement;
