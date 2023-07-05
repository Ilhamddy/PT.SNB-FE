import {
    LABORATORIUM_RESET_FORM,
    WIDGET_DETAIL_JENIS_PRODUK_GET,
    WIDGET_DETAIL_JENIS_PRODUK_GET_SUCCESS,
    WIDGET_DETAIL_JENIS_PRODUK_GET_ERROR,
    SAVE_ORDER_PELAYANAN_LABORATORIUM,
    SAVE_ORDER_PELAYANAN_LABORATORIUM_SUCCESS,
    SAVE_ORDER_PELAYANAN_LABORATORIUM_ERROR,
    DAFTAR_ORDER_LABORATORIUM_GET,
    DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    WIDGET_DAFTAR_ORDER_LABORATORIUM_GET,
    WIDGET_DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    WIDGET_DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    LIST_DAFTAR_ORDER_LABORATORIUM_GET,
    LIST_DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    LIST_DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    LIST_ORDER_LABORATORIUM_BY_NOREC_GET,
    LIST_ORDER_LABORATORIUM_BY_NOREC_GET_SUCCESS,
    LIST_ORDER_LABORATORIUM_BY_NOREC_GET_ERROR,
    UPDATE_TGLRENCANA_LABORATORIUM,
    UPDATE_TGLRENCANA_LABORATORIUM_SUCCESS,
    UPDATE_TGLRENCANA_LABORATORIUM_ERROR,
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

export const saveOrderPelayananLaboratorium = (data, history) => ({
    type: SAVE_ORDER_PELAYANAN_LABORATORIUM,
    payload: { data, history },
});

// common error
export const saveOrderPelayananLaboratoriumSuccess = (data, history) => ({
    type: SAVE_ORDER_PELAYANAN_LABORATORIUM_SUCCESS,
    payload: { data, history },
});

export const saveOrderPelayananLaboratoriumError = (error) => ({
    type: SAVE_ORDER_PELAYANAN_LABORATORIUM_ERROR,
    payload: error,
});

export const daftarOrderLaboratoriumGet = (param) => ({
    type: DAFTAR_ORDER_LABORATORIUM_GET,
    payload: { param },
});

export const daftarOrderLaboratoriumGetSuccess = (data) => ({
    type: DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    payload: data,
});

export const daftarOrderLaboratoriumGetError = (error) => ({
    type: DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    payload: error,
});

export const widgetdaftarOrderLaboratoriumGet = (param) => ({
    type: WIDGET_DAFTAR_ORDER_LABORATORIUM_GET,
    payload: { param },
});

export const widgetdaftarOrderLaboratoriumGetSuccess = (data) => ({
    type: WIDGET_DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    payload: data,
});

export const widgetdaftarOrderLaboratoriumGetError = (error) => ({
    type: WIDGET_DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    payload: error,
});

export const listdaftarOrderLaboratoriumGet = (param) => ({
    type: LIST_DAFTAR_ORDER_LABORATORIUM_GET,
    payload: { param },
});

export const listdaftarOrderLaboratoriumGetSuccess = (data) => ({
    type: LIST_DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    payload: data,
});

export const listdaftarOrderLaboratoriumGetError = (error) => ({
    type: LIST_DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    payload: error,
});

export const listOrderLaboratoriumByNorecGet = (param) => ({
    type: LIST_ORDER_LABORATORIUM_BY_NOREC_GET,
    payload: { param },
});

export const listOrderLaboratoriumByNorecGetSuccess = (data) => ({
    type: LIST_ORDER_LABORATORIUM_BY_NOREC_GET_SUCCESS,
    payload: data,
});

export const listOrderLaboratoriumByNorecGetError = (error) => ({
    type: LIST_ORDER_LABORATORIUM_BY_NOREC_GET_ERROR,
    payload: error,
});

export const updateTglRencanaLaboratorium = (data, history) => ({
    type: UPDATE_TGLRENCANA_LABORATORIUM,
    payload: { data, history },
});
// common error
export const updateTglRencanaLaboratoriumSuccess = (data, history) => ({
    type: UPDATE_TGLRENCANA_LABORATORIUM_SUCCESS,
    payload: { data, history },
});

export const updateTglRencanaLaboratoriumError = (error) => ({
    type: UPDATE_TGLRENCANA_LABORATORIUM_ERROR,
    payload: error,
});