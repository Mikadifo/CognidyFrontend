import React, { RefObject, useEffect } from "react";
import { Button } from "./Button";

interface ConfirmationDialogProps {
  dialogRef: RefObject<HTMLDialogElement>;
  open?: boolean;
  title: string;
  content: string;
  confirmButtonLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmationDialog({
  dialogRef,
  open = false,
  title,
  content,
  onConfirm,
  onClose,
  confirmButtonLabel = "Confirm",
}: ConfirmationDialogProps) {
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (event.target === dialogRef.current) {
        dialogRef.current.close();
      }
    };

    dialog.addEventListener("click", handleOutsideClick);

    return () => dialog.removeEventListener("click", handleOutsideClick);
  }, [dialogRef, onClose]);

  return (
    <dialog
      ref={dialogRef}
      open={open}
      className="bg-white rounded-lg w-[500px] absolute top-1/2 left-1/2 -translate-1/2 z-20 backdrop:backdrop-brightness-50 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-10 px-16 py-12">
        <div className="flex flex-col gap-5 text-dark text-center">
          <h3 className="font-poppins font-bold text-xl">{title}</h3>
          <p className="font-nunito text-base">{content}</p>
        </div>

        <div className="flex gap-5">
          <Button className="!bg-red w-full" onClick={onConfirm}>
            {confirmButtonLabel}
          </Button>
          <Button className="w-full" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmationDialog;
