import { combineReducers } from "redux";

import Login from "./login/reducer";
import Master from "./master/reducer";
import DOM from "./dom/reducer";


const rootReducer = combineReducers({
    // public
    Login,
    Master,
    DOM
});

export default rootReducer;