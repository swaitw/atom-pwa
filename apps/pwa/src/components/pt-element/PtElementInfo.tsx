import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { cn } from "@/utils/styles";

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
        "relative font-semibold p-2 min-w-[72px] min-h-[72px] w-full h-full transition-none block select-none",
        "element",
        element.group,
      )}
    >
      <div className="text-xs text-left">{element.atomic}</div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
        {element.symbol}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-center">
        {elementLocales.name}
      </div>
    </div>
  );
}

export default PtElementInfo;
