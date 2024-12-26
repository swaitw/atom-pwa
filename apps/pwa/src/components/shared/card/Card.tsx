import * as React from "react";
import { cn } from "#src/utils/styles";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  rounded?: boolean;
}

function Card({ className, children, rounded }: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-white text-accent-950 shadow-sm dark:bg-accent-900 dark:text-accent-50",
        rounded && "rounded-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
