import { combineReducers } from "redux";

import Login from "./login/reducer";
import Master from "./master/reducer";


const rootReducer = combineReducers({
    // public
    Login,
    Master
});

export default rootReducer;