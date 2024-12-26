import * as React from "react";

interface OverlayProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  opacity?: number;
}

// TODO: Check accessibility
function Overlay({ opacity = 1, onClick }: OverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[75] cursor-pointer overflow-hidden bg-black bg-opacity-45 will-change-[opacity]"
      onClick={onClick}
      style={{ opacity }}
      data-testid="overlay"
    />
  );
}

export default Overlay;
