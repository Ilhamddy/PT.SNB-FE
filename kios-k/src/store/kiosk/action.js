import {
    KIOSK_RESET_FORM,
    GET_COMBO_KIOSK,
    GET_COMBO_KIOSK_SUCCESS,
    GET_COMBO_KIOSK_ERROR
} from "./actionType";

export const kioskResetForm = () => ({
    type: KIOSK_RESET_FORM,
});

export const getComboKiosk = (queries) => ({
    type: GET_COMBO_KIOSK,
    payload: { queries },
});

export const getComboKioskSuccess = (data) => ({
    type: GET_COMBO_KIOSK_SUCCESS,
    payload: data,
});

export const getComboKioskError = (error) => ({
    type: GET_COMBO_KIOSK_ERROR,
    payload: error,
});