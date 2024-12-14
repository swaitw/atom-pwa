import * as React from "react";
import Button from "@/components/shared/button/Button";
import { useUnmounted } from "@/hooks/useUnmounted";
import SwipeableModal from "@/components/shared/swipeable-modal/SwipeableModal";
import Icon from "@/components/shared/icon/Icon";
import { useLocale } from "@/hooks/useLocale";

export interface ConfirmAction<T = unknown, C = unknown> {
  title: string;
  message: string;
  okButtonText?: string;
  cancelButtonText?: string;
  onCancel?: (() => Promise<C>) | (() => C);
  onConfirm?: (() => Promise<T>) | (() => T);
  hideCancel?: boolean;
  hideConfirm?: boolean;
}

export interface ConfirmContext {
  confirmAction: (action: ConfirmAction) => void;
}

export const ConfirmContext = React.createContext<ConfirmContext>({
  confirmAction: () => null,
});

export function useConfirm() {
  return React.useContext(ConfirmContext);
}

interface ConfirmProviderProps {
  children: React.ReactNode;
}

function ConfirmProvider({ children }: ConfirmProviderProps) {
  const { i18n } = useLocale();
  const [action, setAction] = React.useState<ConfirmAction | null>(null);
  const [, setLoading] = React.useState(false);

  const unmountedRef = useUnmounted();

  const confirmAction = React.useCallback((action: ConfirmAction) => {
    setAction(action);
  }, []);

  const onCancelClick = React.useCallback(async () => {
    if (!action) {
      return;
    }

    try {
      setLoading(true);

      if (action.onCancel) {
        await action.onCancel();
      }

      if (unmountedRef.current) return;
      setAction(null);
    } finally {
      if (unmountedRef.current) return;
      setLoading(false);
    }
  }, [action, unmountedRef]);

  const onConfirmClick = React.useCallback(async () => {
    if (!action) {
      return;
    }

    try {
      setLoading(true);

      if (action.onConfirm) {
        await action.onConfirm();
      }

      if (unmountedRef.current) return;
      setAction(null);
    } finally {
      if (unmountedRef.current) return;
      setLoading(false);
    }
  }, [action, unmountedRef]);

  return (
    <ConfirmContext.Provider value={{ confirmAction }}>
      {children}

      {action && (
        <SwipeableModal
          closeButton={true}
          title={action.title}
          open={true}
          onClose={onCancelClick}
          className="p-0 max-w-[288px] max-h-[80%] h-auto overflow-hidden"
        >
          <p className="pb-4 px-4 m-0">{action.message}</p>

          <div className="flex">
            {!action.hideCancel && (
              <Button onClick={onCancelClick} className="flex-1">
                <span>{action.cancelButtonText || i18n("Cancel")}</span>
              </Button>
            )}

            {!action.hideConfirm && (
              <Button
                className="flex-1 text-accent-400"
                onClick={onConfirmClick}
              >
                <span className="pl-2">
                  {action.okButtonText || i18n("Continue_text")}
                </span>
                <Icon name="arrow_forward" className="ml-2" />
              </Button>
            )}
          </div>
        </SwipeableModal>
      )}
    </ConfirmContext.Provider>
  );
}

export default ConfirmProvider;
