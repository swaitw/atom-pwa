import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import { userEvent } from "@testing-library/user-event";

import Modal from "./Modal";
import { useState } from "react";

type CustomModalWrapperProps = {
  onClose: () => void;
};

const CustomModalWrapper = ({ onClose }: CustomModalWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        Toggle modal
      </button>
      <Modal open={isOpen} onClose={handleClose}>
        <div>modal-content</div>
      </Modal>
    </>
  );
};

test("should be able to toggle modal by clicking the overlay", async () => {
  const onClose = vi.fn();

  render(<CustomModalWrapper onClose={onClose} />);

  expect(screen.queryByText(/modal-content/i)).toBeNull();

  await userEvent.click(screen.getByRole("button", { name: /toggle modal/i }));

  expect(screen.getByText(/modal-content/i, undefined)).toBeDefined();

  // clicking the overlay resembles more closely what a user will do
  await userEvent.click(screen.getByTestId("overlay"));

  expect(screen.queryByText(/modal-content/i)).toBeNull();
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("should close after clicking the close button", async () => {
  const onClose = vi.fn();
  render(
    <Modal open closeButton onClose={onClose}>
      <div>modal-content</div>
    </Modal>,
  );

  expect(screen.getByText(/modal-content/i)).toBeDefined();

  await userEvent.click(screen.getByRole("button"));

  expect(onClose).toHaveBeenCalledTimes(1);
});

test("should render the modal with a title", () => {
  render(
    <Modal open onClose={vi.fn()} title="modal title">
      <div>modal content</div>
    </Modal>,
  );

  expect(screen.getByText(/modal title/i)).toBeDefined();
});
