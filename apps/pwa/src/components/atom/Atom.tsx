import { cn } from "@/utils/styles";

export type AtomColorVariant = "primary" | "white" | "black" | "inherit";

export interface VariantColor {
  main: string;
  contrastText: string;
  dark: string;
  light: string;
}

export interface AtomProps {
  size?: number;
  weight?: 8 | 16 | 24 | 32 | 40 | 48;
  color?: AtomColorVariant;
  spinning?: boolean;
  className?: string;
}
export type ColorMap = {
  [key in AtomColorVariant]: VariantColor;
};

const defaultWeight = 16;

export const colors: ColorMap = {
  primary: {
    main: "text-accent-400",
    dark: "text-accent-600",
    light: "text-accent-300",
    contrastText: "text-white",
  },
  white: {
    main: "text-accent-50",
    contrastText: "text-accent-950",
    dark: "text-accent-100",
    light: "text-white",
  },
  black: {
    main: "text-accent-900",
    contrastText: "text-white",
    light: "text-accent-800",
    dark: "text-accent-950",
  },
  inherit: {
    main: "text-inherit",
    contrastText: "text-inherit",
    light: "text-inherit",
    dark: "text-inherit",
  },
};

function Atom({
  size = 64,
  color = "primary",
  spinning = false,
  weight = defaultWeight,
  className,
  ...props
}: AtomProps) {
  let variantColor: VariantColor;

  switch (color) {
    case "primary":
      variantColor = colors.primary;
      break;
    case "white":
      variantColor = colors.white;
      break;
    case "black":
      variantColor = colors.black;
      break;
    case "inherit":
      variantColor = colors.inherit;
      break;
  }

  const strokeWidth = weight;
  const weightOffset = (weight - defaultWeight) / 2;

  return (
    <svg
      className={cn("block", spinning && "animate-spin", className)}
      viewBox="0 0 614 614"
      width={size}
      height={size}
      {...props}
    >
      <g transform="translate(-129 -129) scale(.85134)" paintOrder="fill">
        <circle
          cx={512}
          cy={512}
          r={32}
          strokeWidth={0}
          className={variantColor.main}
          fill="currentColor"
        />
        <ellipse
          cx={512}
          cy={512}
          rx={112 - weightOffset}
          ry={352 - weightOffset}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
          stroke="currentColor"
          className={variantColor.dark}
        />
        <ellipse
          cx={679.8}
          cy={1318}
          rx={112 - weightOffset}
          ry={352 - weightOffset}
          transform="rotate(60 1294 770)"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
          stroke="currentColor"
          className={variantColor.main}
        />
        <ellipse
          cx={-512}
          cy={-512}
          rx={112 - weightOffset}
          ry={352 - weightOffset}
          transform="rotate(-60 887 -887)"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
          stroke="currentColor"
          className={variantColor.light}
        />
      </g>
    </svg>
  );
}

export default Atom;
