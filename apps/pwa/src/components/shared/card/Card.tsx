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
        "overflow-hidden bg-white text-slate-950 dark:bg-slate-900 dark:text-slate-50 shadow-sm",
        rounded && "rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
