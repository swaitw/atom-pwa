import * as React from "react";
import { useLocale } from "@/hooks/useLocale";
import { HUB } from "@/routes";
import IconButton from "@/components/shared/icon-button/IconButton";
import ListItemSwipeAction from "@/components/shared/list-item-swipe-action/ListItemSwipeAction";
import Navbar from "@/components/shared/navbar/Navbar";
import AddElementModal from "./AddElementModal";
import EditElementModal from "./EditElementModal";
import CalculatorElement from "./CalculatorElement";
import { useMassCalculator } from "./hooks/useMassCalculator";
import { useModal } from "./hooks/useModal";
import { useAddRecent } from "@/hooks/useRecent";
import { useNavigate } from "react-router-dom";

function MassCalculator() {
  const {
    elements,
    setElements,
    calculateTotalValue,
    clearElements,
    selectElement,
    removeElement,
    addElement,
    currentEditedElement,
    setEditedElement,
    increaseAmount,
    decreaseAmount,
    changeAmount,
  } = useMassCalculator();
  const { addModal, editModal } = useModal();
  const navigate = useNavigate();
  const { i18n } = useLocale();

  useAddRecent("mass-calculator");

  const onNavbarBackButtonClick = React.useCallback(() => {
    navigate(HUB);
  }, [navigate]);

  return (
    <div className="min-h-full">
      <Navbar
        title={i18n("mass_calculator")}
        onBackButtonClick={onNavbarBackButtonClick}
      />
      <div className="z-[2] flex items-center p-4 shadow-sm">
        <span className="pl-safe-left text-sm font-medium">
          {i18n("result")}
        </span>

        <span className="ml-auto pr-safe-right">
          {calculateTotalValue()} {i18n("g_mol")}
        </span>
      </div>
      <div className="flex pl-safe-left pr-safe-right">
        <IconButton
          className="flex-1 opacity-80"
          onClick={addModal.open}
          iconName="add_circle"
          text={i18n("add_element")}
        />

        <IconButton
          className="flex-1 opacity-80"
          onClick={clearElements}
          iconName="clear_all"
          text={i18n("clear_elements")}
        />
      </div>
      <div className="pb-safe-bottom pl-safe-left pr-safe-right">
        {elements.map(({ atomic, quantity }) => (
          <ListItemSwipeAction
            key={atomic}
            className="ease-linear animate-in fade-in fill-mode-forwards"
            frontContent={
              <CalculatorElement
                atomic={atomic}
                quantity={quantity}
                selectElement={(atomic) => {
                  editModal.open();
                  selectElement(atomic);
                }}
              />
            }
            onAction={() => removeElement(atomic)}
          />
        ))}
      </div>
      <AddElementModal
        isOpen={addModal.isOpen}
        onClose={addModal.close}
        onAdd={(atomic) => {
          addModal.close();
          addElement(atomic);
        }}
      />
      <EditElementModal
        isOpen={editModal.isOpen}
        selectedElement={currentEditedElement()}
        onClose={() => {
          setElements(elements.filter((element) => element.quantity > 0));
          setEditedElement(-1);
          editModal.close();
        }}
        increaseQuantity={increaseAmount}
        decreaseQuantity={decreaseAmount}
        changeQuantity={changeAmount}
      />
    </div>
  );
}

export default MassCalculator;
