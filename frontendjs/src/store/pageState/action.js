import { CHANGE_PAGE_STATE } from "./actionType"

/**
 * @typedef {"LAYANAN"
 * | "PENERIMAAN_GUDANG"
 * | "SETTING_LAYANAN_LAB"
 * } PageName
 */

/**
 * 
 * @param {PageName} pageName 
 * @param {string} stateName 
 * @returns 
 */
export const changePageState = (pageName, stateName, newState) => {
    return {
        type: CHANGE_PAGE_STATE,
        payload: {
            pageName: pageName,
            stateName: stateName,
            newState: newState
        }
    }
}