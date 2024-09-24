export type DialogBoxAction =
  | "deleteMessage"
  | "deleteChat"
  | "editMessage"
  | "addUser";
export type DialogBoxProp = {
  isOpen: boolean;
  closeDialog: () => void;
  actionType: DialogBoxAction;
  dialogAction: Function;
  viewData: { inputData: string; buttonData: string };
};
