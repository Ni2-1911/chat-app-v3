import {
  LatestMessage,
  Message,
  UserChatData,
  UserIdKey,
} from "../types/type.common";

export function getTimeFormat(date: Date) {
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  if (hours.length === 1) hours = "0" + hours;
  if (minutes.length === 1) minutes = "0" + minutes;
  return `${hours}:${minutes}`;
}
export function deleteMessageFromDB(
  userChatData: UserChatData,
  userId: UserIdKey,
  messageKey: string
): UserChatData {
  const updatedChatData = userChatData.chatData[userId].filter(
    (item) => item.id !== messageKey
  );
  return {
    ...userChatData,
    chatData: { ...userChatData.chatData, [userId]: updatedChatData },
  };
}
export function generateNewMessage(message: string): Message {
  const newMessage: Message = {
    id: Date.now().toString(),
    text: message,
    time: new Date(Date.now()),
  };
  return newMessage;
}
export function addMessageToDB(
  userChatData: UserChatData,
  userId: UserIdKey,
  message: string
): UserChatData {
  const newMessage: Message = generateNewMessage(message);
  let newItem;
  if (userChatData.chatData[userId])
    newItem = [...userChatData.chatData[userId], newMessage];
  else newItem = [newMessage];
  const newChatData = {
    ...userChatData,
    chatData: { ...userChatData.chatData, [userId]: newItem },
  };
  return newChatData;
}
export function getLatestMessagefromDB(userChatData: UserChatData) {
  const chatData = userChatData.chatData;
  const newchatData = Object.fromEntries(
    Object.entries(chatData).map(([userId, messages]) => {
      const lastMessage = messages[messages.length - 1];
      return [userId, lastMessage];
    })
  );
  return newchatData as LatestMessage;
}
