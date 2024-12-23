import { Element } from "#src/Element";
import { useElements } from "#src/hooks/useElements";
import { cn } from "#src/utils/styles";

export interface PtElementInfoProps {
  element: Element;
  onClick?: (element: Element) => void;
}

function PtElementInfo({ element, onClick }: PtElementInfoProps) {
  const { getElementLocales } = useElements();
  const elementLocales = getElementLocales(element);

  const onElementButtonClick = () => {
    if (onClick) {
      onClick(element);
    }
  };

  return (
    <div
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Space") {
          onElementButtonClick();
        }
      }}
      onClick={onElementButtonClick}
      className={cn(
        "relative block h-full min-h-[72px] w-full min-w-[72px] select-none p-2 font-semibold transition-none dark:!bg-accent-900/90",
        "element",
        element.group,
      )}
    >
      <div className="absolute text-left text-xs">{element.atomic}</div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
        {element.symbol}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-[9px]">
        {elementLocales.name}
      </div>
    </div>
  );
}

export default PtElementInfo;
