import { combineReducers } from "redux";

import userpegawaiSlice from "./userpegawai/userpegawaiSlice.js"
import Login from "frontendjs/src/store/auth/login/reducer.js"
import {allReducers} from "daftarmandiri/src/store/reducers.js"
const rootReducer = combineReducers({
    // public
    userpegawaiSlice,
    Login,
    ...allReducers
});

export default rootReducer;