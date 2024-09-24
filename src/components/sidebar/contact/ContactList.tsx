import ContactItem from "./ContactItem";
import Fallback from "../../common/Fallback";
import {
  Contact,
  DeleteChat,
  DeleteContact,
  HandleContactSelected,
  LatestMessage,
  ViewMode,
} from "../../../types/type.common";

export default function ContactList({
  handleContactSelected,
  viewMode,
  contacts,
  deleteContact,
  latestChatData,
  deleteChat,
}: {
  handleContactSelected: HandleContactSelected;
  viewMode: ViewMode;
  contacts: Contact[];
  deleteContact: DeleteContact;
  latestChatData: LatestMessage;
  deleteChat: DeleteChat;
}) {
  return (
    <div className="contactList w-100">
      {contacts.length === 0 ? (
        <Fallback fallBackText="No conversation yet" />
      ) : (
        <>
          {contacts.map((contact) => {
            return (
              <div key={contact.id} className="border-btm">
                <ContactItem
                  viewMode={viewMode}
                  info={contact}
                  handleContactSelected={handleContactSelected}
                  deleteContact={deleteContact}
                  latestChatData={latestChatData}
                  deleteChat={deleteChat}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
