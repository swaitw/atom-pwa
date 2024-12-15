import { Element } from "@/Element";
import { useElements } from "@/hooks/useElements";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/utils/styles";

export interface PtElementSettingProp {
  element: Element;
  enabled?: boolean;
  onClick?: (element: Element) => void;
}

function PtElementSetting({ element, enabled, onClick }: PtElementSettingProp) {
  const { getElementLocales } = useElements();
  const elementLocales = getElementLocales(element);
  const { i18n } = useLocale();

  const onElementButtonClick = () => {
    if (onClick) {
      onClick(element);
    }
  };

  const label = `${element.atomic}. ${elementLocales.name}`;

  return (
    <div
      onClick={onElementButtonClick}
      className={cn(
        "relative font-semibold p-2 min-w-[72px] min-h-[72px] w-full h-full transition-none block select-none",
        "element",
        element.group,
        !enabled && "grayscale opacity-50"
      )}
      role="checkbox"
      aria-checked={enabled}
      onKeyDown={(event) => {
        if (event.key === "Space") {
          onElementButtonClick();
        }
      }}
      aria-label={label}
    >
      <span className="sr-only">
        <dl>
          <dt>{i18n("element_data_symbol")}</dt>
          <dd>{element.symbol}</dd>
          <dt>{i18n("element_data_group")}</dt>
          <dd>{elementLocales.group}</dd>
        </dl>
      </span>

      <div className="text-xs text-left" aria-hidden={true}>
        {element.atomic}
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
        aria-hidden={true}
      >
        {element.symbol}
      </div>

      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-center"
        aria-hidden={true}
      >
        {elementLocales.name}
      </div>
    </div>
  );
}

export default PtElementSetting;
