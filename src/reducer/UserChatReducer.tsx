import { useReducer, useMemo, useEffect } from "react";
import { USER_CHAT_DATA } from "../constants/constant.common";
import { UserChatAction, UserChatState } from "../types/type.reducer";
import { ContactSelected, UserIdKey } from "../types/type.common";
import { USER_CHAT_ACTION } from "../constants/actions";
import {
  addMessageToDB,
  deleteMessageFromDB,
  getLatestMessagefromDB,
  generateNewMessage,
} from "../utils/utils.common";

const getInitialState = (): UserChatState => {
  const savedItems = localStorage.getItem("userChat");
  return {
    userChatData: savedItems
      ? JSON.parse(savedItems).userChatData
      : USER_CHAT_DATA,
  };
};
const reducer = (
  state: UserChatState,
  action: UserChatAction
): UserChatState => {
  let newChatData;
  switch (action.type) {
    case USER_CHAT_ACTION.ADD_MESSAGE:
      newChatData = addMessageToDB(
        state.userChatData,
        action.payload.contactInfo.id,
        action.payload.message
      );
      return { userChatData: newChatData };
    case USER_CHAT_ACTION.DELETE_MESSAGE:
      newChatData = deleteMessageFromDB(
        state.userChatData,
        action.payload.userId,
        action.payload.messageKey
      );
      return { userChatData: newChatData };
    case USER_CHAT_ACTION.EDIT_MESSAGE:
      const newMessage = generateNewMessage(action.payload.message);
      const originalArray = state.userChatData.chatData[action.payload.userId];
      const updatedArray = originalArray.map((item) =>
        item.id === action.payload.messageKey ? newMessage : item
      );
      return {
        userChatData: {
          ...state.userChatData,
          chatData: {
            ...state.userChatData.chatData,
            [action.payload.userId]: updatedArray,
          },
        },
      };

    case USER_CHAT_ACTION.DELETE_CHAT:
      const updatedData = { ...state.userChatData };
      delete updatedData.chatData[action.payload];
      localStorage.setItem(
        "userChat",
        JSON.stringify({ userChatData: updatedData })
      );
      return { userChatData: updatedData };
    default:
      return state;
  }
};
const useUserChatDataReducer = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const latestChatData = useMemo(() => {
    return getLatestMessagefromDB(state.userChatData);
  }, [state.userChatData]);
  function addMessage(message: string, contactInfo: ContactSelected) {
    if (contactInfo != null) {
      dispatch({
        type: USER_CHAT_ACTION.ADD_MESSAGE,
        payload: { message, contactInfo },
      });
    }
  }
  function deleteMessage(userId: UserIdKey, messageKey: string) {
    dispatch({
      type: USER_CHAT_ACTION.DELETE_MESSAGE,
      payload: { userId, messageKey },
    });
  }
  function editMessage(message: string, userId: UserIdKey, messageKey: string) {
    dispatch({
      type: USER_CHAT_ACTION.EDIT_MESSAGE,
      payload: { message, userId, messageKey },
    });
  }
  function deleteChat(userId: UserIdKey) {
    dispatch({
      type: USER_CHAT_ACTION.DELETE_CHAT,
      payload: userId,
    });
  }
  useEffect(() => {
    localStorage.setItem("userChat", JSON.stringify(state));
  }, [state]);
  return {
    userChatData: state.userChatData,
    latestChatData,
    addMessage,
    editMessage,
    deleteMessage,
    deleteChat,
  };
};

export default useUserChatDataReducer;
