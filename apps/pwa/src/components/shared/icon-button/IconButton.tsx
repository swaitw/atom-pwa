import Button, { ButtonProps } from "@/components/shared/button/Button";
import Icon from "@/components/shared/icon/Icon";
import { cn } from "@/utils/styles";

interface IconButtonProps extends Omit<ButtonProps, "children"> {
  iconName: string;
  text?: string;
  id?: string;
}

function IconButton({ text, className, iconName, ...props }: IconButtonProps) {
  return (
    <Button className={cn("flex-col justify-start p-4", className)} {...props}>
      <div className="flex items-center">
        <Icon name={iconName} />
      </div>

      {text && (
        <div className="pt-4 text-sm font-medium leading-[1.2]">{text}</div>
      )}
    </Button>
  );
}

export default IconButton;
