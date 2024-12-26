import { Element } from "#src/Element";
import { useElements } from "#src/hooks/useElements";
import { useLocale } from "#src/hooks/useLocale";
import { cn } from "#src/utils/styles";

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
        "relative block h-full min-h-[72px] w-full min-w-[72px] select-none p-2 font-semibold transition-none",
        "element",
        element.group,
        !enabled && "opacity-50 grayscale",
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

      <div className="text-left text-xs" aria-hidden={true}>
        {element.atomic}
      </div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
        aria-hidden={true}
      >
        {element.symbol}
      </div>

      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-[9px]"
        aria-hidden={true}
      >
        {elementLocales.name}
      </div>
    </div>
  );
}

export default PtElementSetting;
