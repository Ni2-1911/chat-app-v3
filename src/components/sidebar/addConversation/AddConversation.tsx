import DialogBox from "../../common/DialogBox";
import { useState } from "react";
import { DIALOG_BOX_DATA } from "../../../constants/constant.common";
import { AddContact } from "../../../types/type.common";
export default function AddConversation({
  addContact,
}: {
  addContact: AddContact;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  function handleAddConnection(name: string) {
    if (name.length) addContact(name);
  }
  return (
    <>
      <button
        className="addConversation btn-primary rounded-md cursor-pointer p-4"
        onClick={openDialog}
      >
        Start a new conversation
      </button>
      <DialogBox
        isOpen={isOpen}
        closeDialog={closeDialog}
        actionType="addUser"
        dialogAction={handleAddConnection}
        viewData={DIALOG_BOX_DATA.newConversation}
      />
    </>
  );
}
