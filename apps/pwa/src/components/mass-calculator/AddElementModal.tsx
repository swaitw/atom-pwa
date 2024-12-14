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
      className="max-w-[288px] max-h-[80%] h-[480px] p-0 overflow-hidden bg-white text-slate-950 dark:bg-slate-900 dark:text-slate-50"
      open={isOpen}
      onClose={onClose}
    >
      <ElementPicker onElement={(element) => onAdd(element.atomic)} />
    </Modal>
  );
}

export default AddElementModal;
