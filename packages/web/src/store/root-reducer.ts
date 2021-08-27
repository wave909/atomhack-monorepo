import {combineReducers} from "redux";
import {StateType} from "typesafe-actions";


const rootReducer = combineReducers({
});

export default rootReducer

export type RootState = StateType<ReturnType<typeof rootReducer>>