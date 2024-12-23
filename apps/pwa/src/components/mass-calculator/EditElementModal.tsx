import * as React from "react";
import IconButton from "#src/components/shared/icon-button/IconButton";
import Modal from "#src/components/shared/modal/Modal";
import { useLocale } from "#src/hooks/useLocale";
import { useElements } from "#src/hooks/useElements";
import { MassCalculatorElement } from "./hooks/useMassCalculator";

interface EditElementModalProps {
  isOpen: boolean;
  onClose: () => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  changeQuantity: (quantity: number) => void;
  selectedElement?: MassCalculatorElement;
}

function EditElementModal({
  isOpen,
  selectedElement,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
  onClose,
}: EditElementModalProps) {
  const { i18n } = useLocale();
  const { getLocalizedElement } = useElements();

  const element = selectedElement
    ? getLocalizedElement(selectedElement.atomic)
    : null;

  if (!selectedElement || !element) {
    return null;
  }

  return (
    <Modal
      title={element.name}
      closeButton={true}
      className="h-auto max-h-[80%] max-w-[288px] overflow-hidden bg-white p-0 text-accent-950 dark:bg-accent-900 dark:text-accent-50"
      open={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center pt-4">
        <IconButton
          className="flex-1"
          iconName="remove"
          onClick={decreaseQuantity}
        />

        <input
          className="m-0 w-full flex-1 border-0 bg-transparent p-0 text-center text-5xl text-accent-400"
          type="tel"
          name="amount"
          value={selectedElement.quantity}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            const amount = parseInt(event.currentTarget.value, 10);
            changeQuantity(amount);
          }}
        />

        <IconButton
          className="flex-1"
          iconName="add"
          onClick={increaseQuantity}
        />
      </div>

      <div className="p-4 opacity-65">{i18n("change_amount")}</div>
    </Modal>
  );
}

export default EditElementModal;
