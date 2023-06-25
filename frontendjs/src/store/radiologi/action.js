import {
    RADIOLOGI_RESET_FORM,
    SAVE_ORDER_PELAYANAN_RADIOLOGI,
    SAVE_ORDER_PELAYANAN_RADIOLOGI_SUCCESS,
    SAVE_ORDER_PELAYANAN_RADIOLOGI_ERROR,
    DAFTAR_ORDER_RADIOLOGI_GET,
    DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET,
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    LIST_DAFTAR_ORDER_RADIOLOGI_GET,
    LIST_DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    LIST_DAFTAR_ORDER_RADIOLOGI_GET_ERROR
} from "./actionType";

export const radiologiResetForm = () => ({
    type: RADIOLOGI_RESET_FORM,
});

export const saveOrderPelayananRadiologi = (data, history) => ({
    type: SAVE_ORDER_PELAYANAN_RADIOLOGI,
    payload: { data, history },
});

// common error
export const saveOrderPelayananRadiologiSuccess = (data, history) => ({
    type: SAVE_ORDER_PELAYANAN_RADIOLOGI_SUCCESS,
    payload: { data, history },
});

export const saveOrderPelayananRadiologiError = (error) => ({
    type: SAVE_ORDER_PELAYANAN_RADIOLOGI_ERROR,
    payload: error,
});

export const daftarOrderRadiologiGet = (param) => ({
    type: DAFTAR_ORDER_RADIOLOGI_GET,
    payload: { param },
});

export const daftarOrderRadiologiGetSuccess = (data) => ({
    type: DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    payload: data,
});

export const daftarOrderRadiologiGetError = (error) => ({
    type: DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    payload: error,
});

export const widgetdaftarOrderRadiologiGet = (param) => ({
    type: WIDGET_DAFTAR_ORDER_RADIOLOGI_GET,
    payload: { param },
});

export const widgetdaftarOrderRadiologiGetSuccess = (data) => ({
    type: WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    payload: data,
});

export const widgetdaftarOrderRadiologiGetError = (error) => ({
    type: WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    payload: error,
});

export const listdaftarOrderRadiologiGet = (param) => ({
    type: LIST_DAFTAR_ORDER_RADIOLOGI_GET,
    payload: { param },
});

export const listdaftarOrderRadiologiGetSuccess = (data) => ({
    type: LIST_DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    payload: data,
});

export const listdaftarOrderRadiologiGetError = (error) => ({
    type: LIST_DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    payload: error,
});