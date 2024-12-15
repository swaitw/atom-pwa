import * as React from "react";
import { cn } from "@/utils/styles";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  circle?: boolean;
  link?: string;
  id?: string;
  children?: React.ReactNode;
}

function Button({
  className,
  circle,
  link,
  id,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    "relative m-0 flex cursor-pointer select-none items-center justify-center border-0 bg-transparent p-4 font-medium",
    circle && "rounded-full",
    link && "text-center text-inherit no-underline",
    className,
  );

  if (link) {
    return (
      <a
        data-testid={id}
        data-atom-button
        href={link}
        className={buttonClassName}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      role="button"
      data-testid={id}
      data-atom-button
      className={buttonClassName}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export default Button;
