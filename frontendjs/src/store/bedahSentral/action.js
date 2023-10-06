import { BEDAH_SENTRAL_RESET_FORM,
WIDGET_ORDER_OPERASI_GET,
WIDGET_ORDER_OPERASI_GET_SUCCESS,
WIDGET_ORDER_OPERASI_GET_ERROR,
GET_DAFTAR_ORDER_OPERASI,
GET_DAFTAR_ORDER_OPERASI_SUCCESS,
GET_DAFTAR_ORDER_OPERASI_ERROR } from "./actionType";

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

export const getDaftarOrderOperasi = (queries) => ({
    type: GET_DAFTAR_ORDER_OPERASI,
    payload: { queries: queries },
});

export const getDaftarOrderOperasiSuccess = (data) => ({
    type: GET_DAFTAR_ORDER_OPERASI_SUCCESS,
    payload: data,
});

export const getDaftarOrderOperasiError = (error) => ({
    type: GET_DAFTAR_ORDER_OPERASI_ERROR,
    payload: error,
});