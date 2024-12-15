import * as React from "react";
import { cn } from "@/utils/styles";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  rounded?: boolean;
}

function Card({ className, children, rounded }: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-white text-accent-950 dark:bg-accent-900 dark:text-accent-50 shadow-sm",
        rounded && "rounded-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
