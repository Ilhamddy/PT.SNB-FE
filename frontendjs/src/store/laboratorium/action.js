import {
    LABORATORIUM_RESET_FORM,
    WIDGET_DETAIL_JENIS_PRODUK_GET,
    WIDGET_DETAIL_JENIS_PRODUK_GET_SUCCESS,
    WIDGET_DETAIL_JENIS_PRODUK_GET_ERROR
} from "./actionType";

export const laboratoriumResetForm = () => ({
    type: LABORATORIUM_RESET_FORM,
});

export const widgetDetailJenisProdukGet = (param) => ({
    type: WIDGET_DETAIL_JENIS_PRODUK_GET,
    payload: { param },
});

export const widgetDetailJenisProdukGetSuccess = (data) => ({
    type: WIDGET_DETAIL_JENIS_PRODUK_GET_SUCCESS,
    payload: data,
});

export const widgetDetailJenisProdukGetError = (error) => ({
    type: WIDGET_DETAIL_JENIS_PRODUK_GET_ERROR,
    payload: error,
});