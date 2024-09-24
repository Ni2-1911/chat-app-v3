import "../../assets/styles/components/sidebar.css";
import SidebarHeader from "./header/SidebarHeader";
import SearchBar from "./search/SearchBar";
import ContactList from "./contact/ContactList";
import AddConversation from "./addConversation/AddConversation";
import {
  DeleteChat,
  HandleContactSelected,
  LatestMessage,
  ToggleMode,
  ViewMode,
} from "../../types/type.common";
import useConatctReducer from "../../reducer/ContactReducer";

export default function SidebarContainer({
  handleContactSelected,
  viewMode,
  toggleMode,
  latestChatData,
  deleteChat,
}: {
  handleContactSelected: HandleContactSelected;
  viewMode: ViewMode;
  toggleMode: ToggleMode;
  latestChatData: LatestMessage;
  deleteChat: DeleteChat;
}) {
  const { contacts, addContact, deleteContact } = useConatctReducer();
  return (
    <div className="sidebarContainer h-full flex-col">
      <SidebarHeader toggleMode={toggleMode} viewMode={viewMode} />
      <SearchBar />
      <ContactList
        viewMode={viewMode}
        handleContactSelected={handleContactSelected}
        contacts={contacts}
        deleteContact={deleteContact}
        latestChatData={latestChatData}
        deleteChat={deleteChat}
      />
      <AddConversation addContact={addContact} />
    </div>
  );
}
