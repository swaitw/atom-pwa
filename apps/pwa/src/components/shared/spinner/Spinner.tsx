import { cn } from "@/utils/styles";

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <svg
      id="loading"
      aria-busy="true"
      role="progressbar"
      viewBox="0 0 24 24"
      className={cn(
        "stroke-2 [stroke-dasharray:_48] stroke-current text-accent-400 fill-none animate-spin",
        className
      )}
    >
      <circle cx={12} cy={12} r={10} />
    </svg>
  );
};
