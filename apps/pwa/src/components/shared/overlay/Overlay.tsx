import * as React from "react";

interface OverlayProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  opacity?: number;
}

// TODO: Check accessibility
function Overlay({ opacity = 1, onClick }: OverlayProps) {
  return (
    <div
      className="fixed z-[75] overflow-hidden inset-0 bg-black bg-opacity-45 cursor-pointer will-change-[opacity]"
      onClick={onClick}
      style={{ opacity }}
      data-testid="overlay"
    />
  );
}

export default Overlay;
