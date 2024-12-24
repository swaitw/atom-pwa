import { Element } from "#src/Element";
import { useElements } from "#src/hooks/useElements";
import { cn } from "#src/utils/styles";
import { Button } from "react-aria-components";

export interface PtElementInfoProps {
  element: Element;
  onClick?: (element: Element) => void;
}

function PtElementInfo({ element, onClick }: PtElementInfoProps) {
  const { getElementLocales } = useElements();
  const elementLocales = getElementLocales(element);

  return (
    <Button
      onPress={() => {
        onClick?.(element);
      }}
      className={cn(
        "relative block h-full min-h-[72px] w-full min-w-[72px] select-none p-2 font-semibold transition-colors dark:!bg-accent-900/90",
        "element",
        element.group,
        "group outline-none focus-visible:z-10 focus-visible:outline-current pressed:dark:!bg-accent-900/90",
      )}
    >
      <div className="absolute inset-0 h-full w-full transition-transform [.group[data-pressed]_&]:scale-90">
        <div className="absolute left-1 top-1 text-left text-xs">
          {element.atomic}
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
          {element.symbol}
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center text-[9px] tracking-tight">
          {elementLocales.name}
        </div>
      </div>
    </Button>
  );
}

export default PtElementInfo;
