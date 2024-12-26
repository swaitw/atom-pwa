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
    <div
      className={cn(
        "relative block h-full min-h-[72px] w-full min-w-[72px] select-none overflow-hidden p-2 font-semibold transition-colors dark:!bg-accent-900/90",
        "element",
        element.group,
      )}
    >
      <Button
        onPress={() => {
          onClick?.(element);
        }}
        className="focus-visible:outline-curren absolute inset-0 h-full w-full outline-none transition-transform focus-visible:z-10 pressed:scale-90"
      >
        <div className="absolute left-1 top-1 text-left text-xs font-extrabold tracking-tighter opacity-80 dark:text-accent-50">
          {element.atomic}
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-2xl font-semibold dark:text-[var(--element-color)]">
          {element.symbol}
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center text-[9px] tracking-tight dark:text-accent-50">
          {elementLocales.name}
        </div>
      </Button>
    </div>
  );
}

export default PtElementInfo;
