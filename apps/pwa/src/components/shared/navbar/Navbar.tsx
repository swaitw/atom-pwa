import { useLocale } from "@/hooks/useLocale";
import IconButton from "@/components/shared/icon-button/IconButton";
import { cn } from "@/utils/styles";

interface NavbarProps {
  title?: string;
  onBackButtonClick?: () => void;
  className?: string;
  rightButton?: {
    label: string;
    iconName: string;
    onClick: () => void;
  };
}

function Navbar({
  title,
  className,
  onBackButtonClick,
  rightButton,
}: NavbarProps) {
  const { i18n } = useLocale();

  return (
    <nav
      className={cn(
        "flex min-h-14 w-full flex-shrink-0 items-center pl-safe-left pr-safe-right pt-safe-top",
        className,
      )}
    >
      {onBackButtonClick && (
        <IconButton
          className="h-full"
          iconName="arrow_back"
          id="navbar-back-button"
          onClick={onBackButtonClick}
          aria-label={i18n("Go back")}
        />
      )}
      {title && <div className="pl-4 text-lg font-semibold">{title}</div>}

      {rightButton && (
        <IconButton
          className="ml-auto h-full"
          iconName={rightButton.iconName}
          aria-label={rightButton.label}
          onClick={rightButton.onClick}
        />
      )}
    </nav>
  );
}

export default Navbar;
