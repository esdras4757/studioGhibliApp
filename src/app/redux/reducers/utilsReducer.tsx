 // reducers/utilsReducer.js
import { changeIsLoading } from "../actions/appActions";
import { utilsState } from "../types";

const initialState: utilsState = {
  isLoading: false,
  update:false
};

interface Action{
type:string
payload:boolean
}

export function utilsReducer(state = initialState, action:Action) {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        isLoading: action.payload
      };
      case 'update':
        return {
          ...state,
          update: !state.update
        };
    default:
      return state;
  }
}
