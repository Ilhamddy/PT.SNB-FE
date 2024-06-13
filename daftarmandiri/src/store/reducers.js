import { combineReducers } from "redux";

import UserPasien from "./userpasien/reducer";
import Master from "./master/reducer";
import DOM from "./dom/reducer";
import Home from "./home/reducer";
import DaftarPasienLama from "./daftarpasienlama/reducer"

export const allReducers = {
    // public
    UserPasien,
    Master,
    DOM,
    Home,
    DaftarPasienLama,
}
const rootReducer = combineReducers(allReducers);

export default rootReducer;