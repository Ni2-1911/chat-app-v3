import { useReducer } from "react";
import { ViewMode } from "../types/type.common";
import { ViewModeAction, ViewModeState } from "../types/type.reducer";
import { VIEW_MODE_ACTION } from "../constants/actions";
const initialState: { viewMode: ViewMode } = { viewMode: "spacious" };
const reducer = (
  state: ViewModeState,
  action: ViewModeAction
): ViewModeState => {
  switch (action.type) {
    case VIEW_MODE_ACTION.TOGGLE_MODE:
      if (action.payload === "spacious") {
        return { viewMode: "compact" };
      }
      return { viewMode: "spacious" };
    default:
      return state;
  }
};
const useViewModeReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  function toggleMode(currentMode: ViewMode) {
    dispatch({
      type: VIEW_MODE_ACTION.TOGGLE_MODE,
      payload: currentMode,
    });
  }
  return { viewMode: state.viewMode, toggleMode };
};
export default useViewModeReducer;
