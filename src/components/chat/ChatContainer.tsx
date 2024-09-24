import ChatHeader from "./header/ChatHeader";
import ChatBox from "./chatbox/ChatBox";
import TextBox from "./textbox/TextBox";
import "/src/assets/styles/components/chat.css";
import Fallback from "../common/Fallback";
import {
  AddMessage,
  ContactSelected,
  DeleteMessage,
  EditMessage,
  UserChatData,
  ViewMode,
} from "../../types/type.common";

export default function ChatContainer({
  contactSelected,
  viewMode,
  userChatData,
  addMessage,
  editMessage,
  deleteMessage,
}: {
  contactSelected: ContactSelected;
  viewMode: ViewMode;
  userChatData: UserChatData;
  addMessage: AddMessage;
  editMessage: EditMessage;
  deleteMessage: DeleteMessage;
}) {
  return (
    <div className="chatContainer h-full flex-center">
      {contactSelected === null ? (
        <Fallback fallBackText="Select a conversation to get started." />
      ) : (
        <div className="flex-col w-100 h-full">
          <ChatHeader contactInfo={contactSelected} />
          <ChatBox
            key={contactSelected.id}
            viewMode={viewMode}
            userId={contactSelected.id}
            userChatData={userChatData}
            editMessage={editMessage}
            deleteMessage={deleteMessage}
          />
          <TextBox contactInfo={contactSelected} addMessage={addMessage} />
        </div>
      )}
    </div>
  );
}
