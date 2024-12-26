import * as React from "react";
import { cn } from "#src/utils/styles";

export interface HubItemProps {
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  title?: string;
  category?: string;
  imageUrl?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function HubItem({
  colSpan = 1,
  rowSpan = 1,
  title = "Item",
  category,
  imageUrl,
  onClick,
  disabled = !onClick,
}: HubItemProps) {
  return (
    <button
      className={cn(
        "relative m-0 flex min-h-[136px] flex-col justify-end overflow-hidden rounded-lg border-0 bg-transparent bg-cover bg-center bg-no-repeat p-4 text-white shadow-md",
        disabled ? "grayscale" : "cursor-pointer",
      )}
      data-hub-item={true}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        backgroundImage: `url(${imageUrl})`,
      }}
      onClick={onClick}
      aria-disabled={disabled}
    >
      <div
        className={cn(
          "absolute inset-0 z-0 shadow-[inset_0px_-32px_96px_rgba(0,0,0,0.4),inset_0px_-16px_48px_rgba(0,0,0,0.8)]",
          disabled && "bg-accent-900 bg-opacity-85 backdrop-blur-[2px]",
        )}
      />

      {category && (
        <span
          className="z-[1] text-left font-extrabold uppercase tracking-[0.8px] text-accent-400 [text-shadow:_2px_2px_2px_rgba(0,0,0,0.4)]"
          style={{
            alignSelf: colSpan === 2 ? "flex-end" : "flex-start",
            fontSize: colSpan === 2 ? 13 : 12,
            lineHeight: colSpan === 2 ? 1 : 1.5,
          }}
        >
          {category}
        </span>
      )}

      <span
        className="z-[1] text-left font-semibold [text-shadow:_2px_2px_2px_rgba(0,0,0,0.4)]"
        style={{
          alignSelf: colSpan === 2 ? "flex-end" : "flex-start",
          fontSize: colSpan === 2 ? 16 : 13,
          paddingTop: colSpan === 2 ? 2 : 0,
        }}
      >
        {title}
      </span>
    </button>
  );
}

export default HubItem;
