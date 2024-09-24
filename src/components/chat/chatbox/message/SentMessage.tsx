import MessageAction from "./MessageAction";
import { getTimeFormat } from "../../../../utils/utils.common";
import {
  DeleteMessage,
  EditMessage,
  UserIdKey,
  ViewMode,
} from "../../../../types/type.common";
import ViewModeWrapper from "../../../common/ViewModeWrapper";
export default function SentMessage({
  text,
  time,
  userId,
  messageKey,
  viewMode,
  editMessage,
  deleteMessage,
}: {
  text: string;
  time: Date;
  userId: UserIdKey;
  messageKey: string;
  viewMode: ViewMode;
  editMessage: EditMessage;
  deleteMessage: DeleteMessage;
}) {
  return (
    <div className="messageBox sendingMessage flex-center rounded-md">
      <p className="messageText">{text}</p>
      <div className="messageUtil flex-col p-2">
        <MessageAction
          userId={userId}
          messageKey={messageKey}
          editMessage={editMessage}
          deleteMessage={deleteMessage}
        />
        <ViewModeWrapper viewMode={viewMode}>
          <div className="text-800 text-sm">
            {getTimeFormat(new Date(time))}
          </div>
        </ViewModeWrapper>
      </div>
    </div>
  );
}
