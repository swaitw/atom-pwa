import { useEffect, ReactNode } from "react";
import Portal from "@/components/shared/portal/Portal";
import IconButton from "@/components/shared/icon-button/IconButton";
import Overlay from "@/components/shared/overlay/Overlay";
import { cn } from "@/utils/styles";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  className?: string;
  title?: string;
  closeButton?: boolean;
  children?: ReactNode;
}

export interface ModalState {
  open: boolean;
}

const Modal = ({
  open,
  title,
  closeButton,
  onClose,
  className,
  ...props
}: ModalProps) => {
  const showHeader = !!title || closeButton;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <>
        <Overlay onClick={onClose} />

        <div
          className={cn(
            "z-[100] fixed max-w-[50%] max-h-[50%] top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg bg-white text-accent-950 dark:bg-accent-900 dark:text-accent-50",
            className,
          )}
          role="dialog"
          aria-modal
          aria-labelledby="modal-title"
        >
          {showHeader && (
            <div className="flex items-center">
              {title && (
                <span id="modal-title" className="font-bold px-4 text-lg">
                  {title}
                </span>
              )}

              {closeButton && (
                <IconButton
                  className="ml-auto"
                  iconName="close"
                  onClick={onClose}
                />
              )}
            </div>
          )}

          {props.children}
        </div>
      </>
    </Portal>
  );
};

export default Modal;
