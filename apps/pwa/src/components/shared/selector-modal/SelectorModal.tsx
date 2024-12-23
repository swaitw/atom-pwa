import Button from "#src/components/shared/button/Button";
import Modal, { ModalProps } from "#src/components/shared/modal/Modal";

export interface SelectorModalOption {
  key: string;
  text: string;
}

interface SelectorModalProps extends ModalProps {
  options: SelectorModalOption[];
  onOptionSelected: (option: SelectorModalOption) => void;
}

function SelectorModal(props: SelectorModalProps) {
  return (
    <Modal className={props.className} {...props}>
      {props.options.map((option) => (
        <Button
          key={option.key}
          className="w-full justify-start no-underline"
          onClick={() => props.onOptionSelected(option)}
        >
          {option.text}
        </Button>
      ))}
    </Modal>
  );
}

export default SelectorModal;
