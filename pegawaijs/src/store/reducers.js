import { combineReducers } from "redux";

import userpegawaiSlice from "./userpegawai/userpegawaiSlice.js"
import Login from "frontendjs/src/store/auth/login/reducer.js"
import DOM from "daftarmandiri/src/store/dom/reducer.js"
const rootReducer = combineReducers({
    // public
    userpegawaiSlice,
    Login,
    DOM
});

export default rootReducer;