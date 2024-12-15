import Modal from "@/components/shared/modal/Modal";
import ElementPicker from "@/components/element-picker/ElementPicker";

interface AddElementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (atomic: number) => void;
}

function AddElementModal({ isOpen, onClose, onAdd }: AddElementModalProps) {
  return (
    <Modal
      className="h-[480px] max-h-[80%] max-w-[288px] overflow-hidden bg-white p-0 text-accent-950 dark:bg-accent-900 dark:text-accent-50"
      open={isOpen}
      onClose={onClose}
    >
      <ElementPicker onElement={(element) => onAdd(element.atomic)} />
    </Modal>
  );
}

export default AddElementModal;
