import {
  DeleteMessage,
  EditMessage,
  Message,
  UserChatData,
  UserIdKey,
  ViewMode,
} from "../../../types/type.common";
import DefaultMessage from "./message/DefaultMessage";
import SentMessage from "./message/SentMessage";
import { useRef, useEffect, useState } from "react";

function Loading() {
  return (
    <div
      className="text-800 rounded-md p-4"
      style={{ alignSelf: "center", backgroundColor: "white" }}
    >
      <i className="bx bx-loader-alt bx-spin p-2"></i>
      Loading
    </div>
  );
}

export default function ChatBox({
  userId,
  viewMode,
  userChatData,
  editMessage,
  deleteMessage,
}: {
  userId: UserIdKey;
  viewMode: ViewMode;
  userChatData: UserChatData;
  editMessage: EditMessage;
  deleteMessage: DeleteMessage;
}) {
  const [conversation, setConversation] = useState(
    userChatData.chatData[userId] || []
  );
  const [messageSize, setMessageSize] = useState<number>(
    Math.min(conversation.length, 12)
  );
  const [messages, setMessages] = useState(getMessageChunk());
  const [isLoading, setIsLoading] = useState(false);
  function getMessageChunk() {
    const newArray = [];
    const start = Math.max(0, conversation.length - 1 - messageSize);
    for (let i = start; i < conversation.length; i++) {
      newArray.push(conversation[i]);
    }
    return newArray;
  }
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setConversation(userChatData.chatData[userId] || []);
  }, [userId]);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollTo({
        top: endOfMessagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation]);
  const handleScroll = (e: any) => {
    if (conversation.length > messages.length) {
      setIsLoading(true);
      setTimeout(() => {
        if (e.target.scrollTop === 0) {
          setMessageSize(Math.min(messageSize + 3, conversation.length));
          setMessages(getMessageChunk());
          setIsLoading(false);
        }
      }, 2000);
    }
  };
  return (
    <div
      ref={endOfMessagesRef}
      className="chatBox flex-col"
      onScroll={(e) => handleScroll(e)}
    >
      <DefaultMessage />
      {isLoading ? <Loading /> : null}
      {conversation.length ? (
        <>
          {messages.map((message: Message) => {
            return (
              <>
                <SentMessage
                  key={message.id}
                  viewMode={viewMode}
                  text={message.text}
                  time={message.time}
                  userId={userId}
                  messageKey={message.id}
                  editMessage={editMessage}
                  deleteMessage={deleteMessage}
                />
              </>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
