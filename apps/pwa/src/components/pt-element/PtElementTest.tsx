import * as React from "react";
import { useElements } from "#src/hooks/useElements";
import Icon from "#src/components/shared/icon/Icon";
import { PtElementInfoProps } from "./PtElementInfo";
import { cn } from "#src/utils/styles";

export interface PtElementTestProps extends PtElementInfoProps {
  discovered: boolean;
  shouldShowError: boolean;
}

function PtElementTest({
  element,
  discovered,
  onClick,
  shouldShowError,
}: PtElementTestProps) {
  const [showError, setShowError] = React.useState(false);
  const { getElementLocales } = useElements();

  const elementLocales = getElementLocales(element);

  const onElementButtonClick = () => {
    if (onClick && !discovered) {
      onClick(element);
      if (shouldShowError) {
        setShowError(true);
      }
    }
  };

  React.useEffect(() => {
    let hideError: number | undefined;
    if (showError) {
      hideError = window.setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
    return () => {
      if (hideError) {
        window.clearTimeout(hideError);
      }
    };
  }, [showError]);

  const label = discovered
    ? `${element.atomic}. ${elementLocales.name}`
    : `${element.atomic}. ?`;

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
        "relative block h-full min-h-[72px] w-full min-w-[72px] select-none p-2 font-semibold transition-none",
        "element",
        discovered ? element.group : "clear",
        showError && "flex",
      )}
      aria-disabled={discovered}
      aria-label={label}
    >
      <div className="text-left text-xs" aria-hidden={true}>
        {element.atomic}
      </div>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
        aria-hidden={true}
      >
        {discovered ? element.symbol : "?"}
      </div>
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-[9px]"
        aria-hidden={true}
      >
        {discovered ? elementLocales.name : "???"}
      </div>

      {showError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white text-danger-400 duration-500 will-change-transform animate-in zoom-in dark:bg-accent-900"
          role="alert"
          aria-label="Oops!"
        >
          <Icon name="close" aria-hidden={true} />

          <div>Oops!</div>
        </div>
      )}
    </div>
  );
}

export default PtElementTest;
