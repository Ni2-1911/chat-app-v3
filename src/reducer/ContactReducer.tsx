import { useReducer, useEffect } from "react";
import { Contact, UserIdKey } from "../types/type.common";
import { CONTACTS_ACTION } from "../constants/actions";
import { ContactsAction, ContactsState } from "../types/type.reducer";
import { DEFAULT_PROFILE_IMAGE } from "../constants/constant.common";

const DEFAULT_USER: Contact[] = [
  {
    id: "user_id_1",
    name: "chunking demo",
    profileImg:
      "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
  },
];

const getInitialState = (): ContactsState => {
  const savedItems = localStorage.getItem("contacts");
  return {
    contacts: savedItems ? JSON.parse(savedItems).contacts : DEFAULT_USER,
  };
};

const reducer = (
  state: ContactsState,
  action: ContactsAction
): ContactsState => {
  switch (action.type) {
    case CONTACTS_ACTION.ADD_CONTACT:
      const newUser: Contact = {
        id: `user_id_${Date.now()}`,
        name: action.payload,
        profileImg: DEFAULT_PROFILE_IMAGE,
      };
      return { contacts: [...state.contacts, newUser] };
    case CONTACTS_ACTION.DELETE_CONTACT:
      return {
        contacts: state.contacts.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

const useConatctReducer = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    localStorage.setItem(
      "contacts",
      JSON.stringify({ contacts: state.contacts })
    );
  }, [state.contacts]);

  function addContact(name: string) {
    dispatch({ type: CONTACTS_ACTION.ADD_CONTACT, payload: name });
  }
  function deleteContact(userId: UserIdKey) {
    dispatch({ type: CONTACTS_ACTION.DELETE_CONTACT, payload: userId });
  }
  return { contacts: state.contacts, addContact, deleteContact };
};
export default useConatctReducer;
