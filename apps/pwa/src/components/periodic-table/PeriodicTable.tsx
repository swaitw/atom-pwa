import * as React from "react";

import periodicTableData from "#src/data/pt.json";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { cn } from "#src/utils/styles";

type ElementRendered = (elementId: number) => React.ReactNode;
interface PeriodicTableProps {
  elementRenderer: ElementRendered;
  className?: string;
}

function EmptyCell() {
  return (
    <div
      className="table-cell border-l border-t dark:border-accent-400/20"
      aria-hidden={true}
    >
      <div className="relative block h-full min-h-[72px] w-full min-w-[72px] dark:bg-accent-950" />
    </div>
  );
}

function EmptyElement() {
  return (
    <div
      className="table-cell min-h-[72px] min-w-[72px] border-l border-t dark:border-accent-400/20"
      aria-hidden={true}
    />
  );
}

function LabelCell({
  children,
  border,
}: {
  children?: React.ReactNode;
  border: "left" | "top" | "none";
}) {
  return (
    <div
      className={cn(
        "table-cell bg-accent-50 text-center align-middle text-sm font-semibold text-accent-950 text-opacity-40 dark:border-accent-400/20 dark:bg-accent-950/80 dark:text-accent-50 dark:text-opacity-80",
        border === "top" && "border-t",
        border === "left" && "border-l",
      )}
    >
      <div className="relative flex h-full min-w-6 items-center justify-center dark:bg-accent-950">
        <div>{children}</div>
      </div>
    </div>
  );
}

function buildTable(elementRenderer: ElementRendered) {
  const rows: JSX.Element[] = [
    <div key="row-head" className="table-row">
      <LabelCell border="none" />
      <LabelCell border="left">1</LabelCell>
      <LabelCell border="left">2</LabelCell>
      <LabelCell border="left">3</LabelCell>
      <LabelCell border="left">4</LabelCell>
      <LabelCell border="left">5</LabelCell>
      <LabelCell border="left">6</LabelCell>
      <LabelCell border="left">7</LabelCell>
      <LabelCell border="left">8</LabelCell>
      <LabelCell border="left">9</LabelCell>
      <LabelCell border="left">10</LabelCell>
      <LabelCell border="left">11</LabelCell>
      <LabelCell border="left">12</LabelCell>
      <LabelCell border="left">13</LabelCell>
      <LabelCell border="left">14</LabelCell>
      <LabelCell border="left">15</LabelCell>
      <LabelCell border="left">16</LabelCell>
      <LabelCell border="left">17</LabelCell>
      <LabelCell border="left">18</LabelCell>
    </div>,
  ];

  for (let i = 0; i < periodicTableData.length; i++) {
    const row = periodicTableData[i];

    rows.push(
      <div className="table-row" key={`row-${i}`}>
        {i <= 6 ? (
          // TODO: localize "Period N"
          <LabelCell border="top">{i + 1}</LabelCell>
        ) : (
          // TODO: localize and label "Lanthanides" and "Actinides"
          <LabelCell border="top" />
        )}

        {row.map((element, index) => {
          const key = `row-${i}-cell-${index}`;

          if (element <= 0) {
            return <EmptyCell key={key} />;
          }

          const renderedElement = elementRenderer(element);

          if (!renderedElement) {
            return <EmptyElement key={key} />;
          }

          return (
            <div
              className="table-cell border-l border-t dark:border-accent-400/20"
              key={`row-${i}-cell-${index}`}
            >
              {elementRenderer(element)}
            </div>
          );
        })}
      </div>,
    );
  }

  return rows;
}

function PeriodicTable({ elementRenderer, className }: PeriodicTableProps) {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    let requestAnimationFrame: number = window.requestAnimationFrame(
      () =>
        (requestAnimationFrame = window.requestAnimationFrame(() =>
          setRender(true),
        )),
    );
    return () => window.cancelAnimationFrame(requestAnimationFrame);
  }, []);
  const lightRef = React.useRef<HTMLDivElement>(null);

  if (!render) {
    return <div className="flex h-full w-full items-center justify-center" />;
  }

  function onMouseOver(e: React.MouseEvent<HTMLDivElement>) {
    const absX = e.clientX;
    const absY = e.clientY;

    if (lightRef.current) {
      lightRef.current.style.left = `${absX - 100}px`;
      lightRef.current.style.top = `${absY - 100}px`;
    }
  }

  return (
    <TransformWrapper
      minScale={0.2}
      limitToBounds={false}
      doubleClick={{
        disabled: true,
      }}
    >
      <TransformComponent
        contentStyle={{ width: "100%", height: "100%" }}
        wrapperStyle={{ width: "100%", height: "100%" }}
      >
        <div
          ref={lightRef}
          className={cn(
            "pointer-events-none absolute h-[200px] w-[200px] bg-[radial-gradient(circle,_rgba(255,255,255,1)_0%,_transparent_100%)] blur-2xl",
          )}
        />

        <div
          className={cn(
            "table h-full max-h-[696px] w-full max-w-[1320px] overflow-auto",
            className,
          )}
          onMouseOver={onMouseOver}
        >
          {buildTable(elementRenderer)}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default PeriodicTable;
