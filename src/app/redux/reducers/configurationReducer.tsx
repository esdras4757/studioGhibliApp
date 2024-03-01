import { useEffect } from "react";
import { configurationState, configurationActionTypes} from "../types";




const initializeState = {
    theme: 'dark'
  };
  

export function configurtionReducer(state=initializeState,action:configurationActionTypes){
    switch(action.type){
        case "changeTheme":
            return {...state,theme:action.payload}
            default:
                return state;
    }
}