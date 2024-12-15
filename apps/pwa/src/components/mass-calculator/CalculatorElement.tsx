import * as React from "react";
import Button from "@/components/shared/button/Button";
import { useLocale } from "@/hooks/useLocale";
import { useElements } from "@/hooks/useElements";
import { cn } from "@/utils/styles";

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
      className="flex w-full justify-start bg-white px-4 py-2 font-normal shadow-sm [text-transform:_none] dark:bg-accent-900"
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          "element",
          element.group,
        )}
      >
        {element.symbol}
      </div>

      <div className="flex flex-col pl-4 text-left">
        <span className="text-lg">{localizedElement.name}</span>

        <span className="pt-1 text-sm">
          {element.atomicMass} {i18n("g_mol")}
        </span>
      </div>

      <div className="ml-auto flex flex-col uppercase">
        <span className="text-xs">{i18n("amount")}</span>

        <span className="pt-1 text-center">{quantity}</span>
      </div>
    </Button>
  );
}

export default CalculatorElement;
