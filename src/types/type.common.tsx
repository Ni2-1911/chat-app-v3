export type UserIdKey = `user_id_${number}`;
export type Contact = {
  id: UserIdKey;
  name: string;
  profileImg: string;
};
export type Message = {
  id: string;
  text: string;
  time: Date;
};
export type UserChatData = Contact & {
  chatData: { [key in UserIdKey]: Message[] };
};
export type LatestMessage = {
  [key in UserIdKey]: Message;
};
export type ContactSelected = Contact | null;
export type ViewMode = "compact" | "spacious";
export type HandleContactSelected = (contact: ContactSelected) => void;
export type ToggleMode = (currentMode: ViewMode) => void;
export type AddContact = (name: string) => void;
export type DeleteContact = (userId: UserIdKey) => void;
export type DeleteChat = (userId: UserIdKey) => void;
export type AddMessage = (
  message: string,
  contactInfo: ContactSelected
) => void;
export type DeleteMessage = (userId: UserIdKey, messageKey: string) => void;
export type EditMessage = (
  message: string,
  userId: UserIdKey,
  messageKey: string
) => void;
