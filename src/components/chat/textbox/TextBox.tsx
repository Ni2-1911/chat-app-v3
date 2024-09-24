import { useRef, KeyboardEvent } from "react";
import { AddMessage, ContactSelected } from "../../../types/type.common";
export default function TextBox({
  contactInfo,
  addMessage,
}: {
  contactInfo: ContactSelected;
  addMessage: AddMessage;
}) {
  const latestMessageRef = useRef<HTMLInputElement>(null);
  const sendMessageRef = useRef<HTMLDivElement>(null);
  function handleSendLatestMessage() {
    if (
      latestMessageRef.current != null &&
      latestMessageRef.current.value != ""
    ) {
      addMessage(latestMessageRef.current.value, contactInfo);
      latestMessageRef.current.value = "";
    }
  }
  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessageRef.current?.click();
    }
  }
  return (
    <div className="textBox flex-center" key={contactInfo?.id}>
      <i className="bx bx-paperclip bx-sm p-3"></i>
      <input
        className="p-3 rounded-sm w-90"
        type="text"
        placeholder="Type a message"
        ref={latestMessageRef}
        onKeyPress={handleKeyPress}
      />
      <div
        className="p-3"
        ref={sendMessageRef}
        onClick={handleSendLatestMessage}
      >
        <i className="bx bxs-send bx-sm"></i>
      </div>
    </div>
  );
}
