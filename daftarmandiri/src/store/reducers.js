import { combineReducers } from "redux";

import UserPasien from "./userpasien/reducer";
import Master from "./master/reducer";
import DOM from "./dom/reducer";
import Home from "./home/reducer";
import DaftarPasienLama from "./daftarpasienlama/reducer"


const rootReducer = combineReducers({
    // public
    UserPasien,
    Master,
    DOM,
    Home,
    DaftarPasienLama,
});

export default rootReducer;