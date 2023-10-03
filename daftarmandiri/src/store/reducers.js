import { combineReducers } from "redux";

import Login from "./login/reducer";
import Master from "./master/reducer";
import DOM from "./dom/reducer";
import Home from "./home/reducer";
import DaftarPasienLama from "./daftarPasienLama/reducer"


const rootReducer = combineReducers({
    // public
    Login,
    Master,
    DOM,
    Home,
    DaftarPasienLama,
});

export default rootReducer;