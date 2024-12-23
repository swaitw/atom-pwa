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
  return <div className="table-cell" aria-hidden={true} />;
}

function EmptyElement() {
  return (
    <div className="table-cell min-h-[72px] min-w-[72px]" aria-hidden={true} />
  );
}

function LabelCell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="table-cell h-6 min-w-6 bg-accent-50 text-center align-middle text-sm font-semibold text-accent-950 text-opacity-40 dark:bg-accent-950/80 dark:text-accent-50 dark:text-opacity-80">
      {children}
    </div>
  );
}

function buildTable(elementRenderer: ElementRendered) {
  const rows: JSX.Element[] = [
    <div key="row-head" className="table-row">
      <LabelCell />
      <LabelCell>1</LabelCell>
      <LabelCell>2</LabelCell>
      <LabelCell>3</LabelCell>
      <LabelCell>4</LabelCell>
      <LabelCell>5</LabelCell>
      <LabelCell>6</LabelCell>
      <LabelCell>7</LabelCell>
      <LabelCell>8</LabelCell>
      <LabelCell>9</LabelCell>
      <LabelCell>10</LabelCell>
      <LabelCell>11</LabelCell>
      <LabelCell>12</LabelCell>
      <LabelCell>13</LabelCell>
      <LabelCell>14</LabelCell>
      <LabelCell>15</LabelCell>
      <LabelCell>16</LabelCell>
      <LabelCell>17</LabelCell>
      <LabelCell>18</LabelCell>
    </div>,
  ];

  for (let i = 0; i < periodicTableData.length; i++) {
    const row = periodicTableData[i];

    rows.push(
      <div className="table-row" key={`row-${i}`}>
        {i <= 6 ? (
          // TODO: localize "Period N"
          <LabelCell>{i + 1}</LabelCell>
        ) : (
          // TODO: localize and label "Lanthanides" and "Actinides"
          <LabelCell />
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
            <div className="table-cell" key={`row-${i}-cell-${index}`}>
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

  if (!render) {
    return <div className="flex h-full w-full items-center justify-center" />;
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
          className={cn(
            "table h-full max-h-[696px] w-full max-w-[1320px] overflow-auto bg-white dark:bg-accent-900/80",
            className,
          )}
        >
          {buildTable(elementRenderer)}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default PeriodicTable;
