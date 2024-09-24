import ChatContainer from "../components/chat/ChatContainer";
import Fallback from "../components/common/Fallback";
import SidebarContainer from "../components/sidebar/SidebarContainer";
import useSelectedContactReducer from "../reducer/SelectedContactReducer";
import useUserChatData from "../reducer/UserChatReducer";
import useViewModeReducer from "../reducer/ViewModeReducer";
import { Suspense } from "react";

export default function Home() {
  const { contactSelected, handleContactSelected } =
    useSelectedContactReducer();
  const { viewMode, toggleMode } = useViewModeReducer();
  const {
    userChatData,
    latestChatData,
    addMessage,
    editMessage,
    deleteMessage,
    deleteChat,
  } = useUserChatData();
  return (
    <div className="chatApp flex-corner h-full w-full">
      <Suspense fallback={<Fallback fallBackText="loading..." />}>
        <SidebarContainer
          viewMode={viewMode}
          toggleMode={toggleMode}
          handleContactSelected={handleContactSelected}
          latestChatData={latestChatData}
          deleteChat={deleteChat}
        />
        <ChatContainer
          viewMode={viewMode}
          contactSelected={contactSelected}
          userChatData={userChatData}
          addMessage={addMessage}
          editMessage={editMessage}
          deleteMessage={deleteMessage}
        />
      </Suspense>
    </div>
  );
}
