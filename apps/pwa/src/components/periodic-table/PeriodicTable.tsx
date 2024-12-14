import * as React from "react";
import { Spinner } from "@/components/shared/spinner/Spinner";

import periodicTableData from "@/data/pt.json";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

type ElementRendered = (elementId: number) => React.ReactNode;
interface PeriodicTableProps {
  elementRenderer: ElementRendered;
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
    <div className="table-cell h-6 min-w-6 align-middle text-center font-semibold text-sm bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 text-opacity-40 dark:text-opacity-80">
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
      </div>
    );
  }

  return rows;
}

function PeriodicTable({ elementRenderer }: PeriodicTableProps) {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    let requestAnimationFrame: number = window.requestAnimationFrame(
      () =>
        (requestAnimationFrame = window.requestAnimationFrame(() =>
          setRender(true)
        ))
    );
    return () => window.cancelAnimationFrame(requestAnimationFrame);
  }, []);

  if (!render) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        aria-label="loading"
      >
        <Spinner className="w-12 h-12" />
      </div>
    );
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
        <div className="table overflow-auto w-full h-full pl-safe-left bg-white dark:bg-slate-900">
          {buildTable(elementRenderer)}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default PeriodicTable;
