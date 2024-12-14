import * as React from "react";
import invariant from "invariant";
import { cn } from "@/utils/styles";

const iconMap = import.meta.glob<
  true,
  string,
  {
    default: React.FC<React.SVGProps<SVGSVGElement>>;
  }
>("../../../images/icons/*.svg", {
  eager: true,
  query: "?react",
});

export interface IconProps {
  name: string;
  className?: string;
}

function Icon({ name, className }: IconProps) {
  const path = `../../../images/icons/${name}.svg`;
  const IconComponent = iconMap[path].default;

  invariant(IconComponent, `The specified icon doesn't exist!`);

  return (
    <IconComponent
      className={cn("fill-current", className)}
      width="24"
      height="24"
    />
  );
}

export default Icon;
