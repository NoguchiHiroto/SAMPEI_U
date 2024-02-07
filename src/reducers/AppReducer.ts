import clone from "clone";
import { Action, Reducer } from "redux";

import { UpdateTempAction, UPDATE_TEMP } from "../actions/AppAction";
import { AppState } from "../states/AppState";
import { initialState } from "../slices/tempSlice";

const AppReducer: Reducer<AppState> = (state: AppState = initialState, action: Action) => {
  // const newState = state;
  const newState = clone(state);
  switch(action.type) {
    case UPDATE_TEMP: {
      const _action = action as UpdateTempAction;
      newState.temp = _action.temp;
      break;
    } 

    default:
      break;
  }
  return newState;
}

export default AppReducer