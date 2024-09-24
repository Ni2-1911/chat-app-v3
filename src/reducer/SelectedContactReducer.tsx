import { useReducer } from "react";
import {
  ContactSelectedAction,
  ContactSelectedState,
} from "../types/type.reducer";
import { ContactSelected } from "../types/type.common";
import { CONTACT_SELECTED_ACTION } from "../constants/actions";

const initialState = {
  contactSelected: null,
};
const reducer = (
  state: ContactSelectedState,
  action: ContactSelectedAction
): ContactSelectedState => {
  switch (action.type) {
    case CONTACT_SELECTED_ACTION.SET_CONTACT_SELECTED:
      return { ...state, contactSelected: action.payload };
    default:
      return state;
  }
};
const useSelectedContactReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleContactSelected = (contact: ContactSelected): void => {
    dispatch({
      type: CONTACT_SELECTED_ACTION.SET_CONTACT_SELECTED,
      payload: contact,
    });
  };
  return {
    contactSelected: state.contactSelected,
    handleContactSelected,
  };
};
export default useSelectedContactReducer;
