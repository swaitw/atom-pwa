import * as React from "react";
import { useElements } from "@/hooks/useElements";
import Icon from "@/components/shared/icon/Icon";
import { PtElementInfoProps } from "./PtElementInfo";
import { cn } from "@/utils/styles";

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
      shouldShowError && setShowError(true);
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
      hideError && window.clearTimeout(hideError);
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
        "relative font-semibold p-2 min-w-[72px] min-h-[72px] w-full h-full transition-none block select-none",
        "element",
        discovered ? element.group : "clear",
        showError && "flex"
      )}
      aria-disabled={discovered}
      aria-label={label}
    >
      <div className="text-xs text-left" aria-hidden={true}>
        {element.atomic}
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
        aria-hidden={true}
      >
        {discovered ? element.symbol : "?"}
      </div>
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-center"
        aria-hidden={true}
      >
        {discovered ? elementLocales.name : "???"}
      </div>

      {showError && (
        <div
          className="absolute inset-0 flex flex-col justify-center items-center will-change-transform animate-in zoom-in duration-500 bg-white dark:bg-accent-900 text-danger-400"
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
