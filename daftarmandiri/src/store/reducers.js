import { combineReducers } from "redux";

import Login from "./login/reducer";


const rootReducer = combineReducers({
    // public
    Login
});

export default rootReducer;