import {
  Contact,
  DeleteChat,
  DeleteContact,
  HandleContactSelected,
  LatestMessage,
  ViewMode,
} from "../../../types/type.common";
import { useState, useEffect, useRef } from "react";
import DialogBox from "../../common/DialogBox";
import { DIALOG_BOX_DATA } from "../../../constants/constant.common";
import DropdownMenu from "../../common/DropdownMenu";
import ViewModeWrapper from "../../common/ViewModeWrapper";
import { getTimeFormat } from "../../../utils/utils.common";

function ContactItem({
  info,
  handleContactSelected,
  viewMode,
  deleteContact,
  latestChatData,
  deleteChat,
}: {
  handleContactSelected: HandleContactSelected;
  info: Contact;
  viewMode: ViewMode;
  deleteContact: DeleteContact;
  latestChatData: LatestMessage;
  deleteChat: DeleteChat;
}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [utility, setUtility] = useState("tooltip");
  const [isClipped, setIsClipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const latestMessageTime = latestChatData[info.id]?.time;
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  function action() {
    deleteChat(info.id);
    deleteContact(info.id);
    handleContactSelected(null);
  }
  useEffect(() => {
    if (textRef.current) {
      const isClipped =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsClipped(isClipped);
    }
  }, [latestChatData]);

  return (
    <>
      <div
        className="contactItem cursor-pointer flex-corner p-4"
        onClick={() => handleContactSelected(info)}
        onMouseEnter={(e) => {
          setIsTooltipVisible(true);
          const cursorY = e.clientY;
          if (cursorY > window.innerHeight * 0.6) {
            setUtility("tooltip tooltip-btm");
          }
        }}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <div className="flex-center">
          <img src={info.profileImg} alt="..." className="profile-img p-3" />
          <div className="flex-col">
            <p className="ellipsis-1-line">{info.name}</p>
            <ViewModeWrapper viewMode={viewMode}>
              <p ref={textRef} className="ellipsis-3-lines text-sm text-800">
                {latestChatData[info.id]?.text}
              </p>
            </ViewModeWrapper>
          </div>
        </div>

        <div className="p-3">
          <DropdownMenu>
            <li className="utilListItem" onClick={openDialog}>
              Delete
            </li>
          </DropdownMenu>
          <ViewModeWrapper viewMode={viewMode}>
            <p className="text-sm text-800">
              {latestMessageTime === undefined
                ? null
                : getTimeFormat(new Date(latestMessageTime))}
            </p>
          </ViewModeWrapper>
        </div>
      </div>
      <DialogBox
        isOpen={isOpen}
        closeDialog={closeDialog}
        actionType="deleteChat"
        dialogAction={action}
        viewData={DIALOG_BOX_DATA.deleteConversation}
      />

      {isTooltipVisible && isClipped && (
        <div
          className={`${utility} text-800 text-sm p-3`}
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          {latestChatData[info.id]?.text}
        </div>
      )}
    </>
  );
}
export default ContactItem;
