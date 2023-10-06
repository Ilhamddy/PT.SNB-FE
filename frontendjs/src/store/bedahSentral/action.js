import { BEDAH_SENTRAL_RESET_FORM,
WIDGET_ORDER_OPERASI_GET,
WIDGET_ORDER_OPERASI_GET_SUCCESS,
WIDGET_ORDER_OPERASI_GET_ERROR } from "./actionType";

export const bedahSentralResetForm = () => ({
    type: BEDAH_SENTRAL_RESET_FORM,
});

export const widgetOrderOperasiGet = (queries) => ({
    type: WIDGET_ORDER_OPERASI_GET,
    payload: { queries: queries },
});

export const widgetOrderOperasiGetSuccess = (data) => ({
    type: WIDGET_ORDER_OPERASI_GET_SUCCESS,
    payload: data,
});

export const widgetOrderOperasiGetError = (error) => ({
    type: WIDGET_ORDER_OPERASI_GET_ERROR,
    payload: error,
});