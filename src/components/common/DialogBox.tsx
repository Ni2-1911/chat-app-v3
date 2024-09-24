import { useEffect, useRef } from "react";
import { DialogBoxProp } from "../../types/type.props";

export default function DialogBox({
  isOpen,
  closeDialog,
  dialogAction,
  actionType,
  viewData,
}: DialogBoxProp) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);
  function handleCloseDialog() {
    if (inputRef.current) inputRef.current.value = "";
    closeDialog();
  }
  function handleAction() {
    const inputValue = inputRef.current?.value.trim() || "";
    if (["editMessage", "addUser"].includes(actionType)) {
      dialogAction(inputValue);
    } else {
      dialogAction();
    }
    handleCloseDialog();
  }
  return (
    <dialog ref={dialogRef}>
      <div className="flex-center flex-col h-100">
        {actionType === "editMessage" || actionType === "addUser" ? (
          <input
            ref={inputRef}
            className="dialog-input rounded-sm p-2"
            type="text"
            placeholder={viewData.inputData}
          />
        ) : (
          <div className="dialog-input rounded-sm p-2">
            {viewData.inputData}
          </div>
        )}
        <div className="dialogHead p-2">
          <button
            className="btn-primary btn-dialog rounded-sm"
            onClick={() => handleCloseDialog()}
          >
            cancel
          </button>
          <button
            className="btn-primary btn-dialog rounded-sm"
            onClick={() => handleAction()}
          >
            {viewData.buttonData}
          </button>
        </div>
      </div>
    </dialog>
  );
}
