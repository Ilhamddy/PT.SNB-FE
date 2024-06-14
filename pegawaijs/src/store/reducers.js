import { combineReducers } from "redux";

import userpegawaiSlice from "./userpegawai/userpegawaiSlice.js"
import Login from "frontendjs/src/store/auth/login/reducer.js"
import {allReducers} from "daftarmandiri/src/store/reducers.js"
import { useSelector } from "react-redux";
const rootReducer = combineReducers({
    // public
    userpegawaiSlice,
    Login,
    ...allReducers
});

/**
 * @typedef {ReturnType<typeof rootReducer>} IRootType
 */

/**
 * 
 * @template T
 * @param {(state: IRootType) => T} selector 
 * @returns {ReturnType<typeof useSelector<IRootType, T>>}
 */

export const useSelectorRoot = (selector) => {
    return useSelector(selector)
}


export default rootReducer;