import {
  Contact,
  ContactSelected,
  UserChatData,
  UserIdKey,
  ViewMode,
} from "./type.common";
import {
  CONTACT_SELECTED_ACTION,
  CONTACTS_ACTION,
  USER_CHAT_ACTION,
  VIEW_MODE_ACTION,
} from "../constants/actions";

export type ContactSelectedAction = {
  type: typeof CONTACT_SELECTED_ACTION.SET_CONTACT_SELECTED;
  payload: ContactSelected | null;
};
export type ContactSelectedState = {
  contactSelected: ContactSelected | null;
};
export type ContactsAction = {
  type: (typeof CONTACTS_ACTION)[keyof typeof CONTACTS_ACTION];
  payload: string | UserIdKey;
};
export type ContactsState = {
  contacts: Contact[];
};
export type UserChatAction = {
  type: (typeof USER_CHAT_ACTION)[keyof typeof USER_CHAT_ACTION];
  payload: any;
};
export type UserChatState = {
  userChatData: UserChatData;
};
export type ViewModeAction = {
  type: (typeof VIEW_MODE_ACTION)[keyof typeof VIEW_MODE_ACTION];
  payload: any;
};
export type ViewModeState = {
  viewMode: ViewMode;
};
