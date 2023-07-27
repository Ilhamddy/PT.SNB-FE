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
    SAVE_VERIFIKASI_LABORATORIUM,
    SAVE_VERIFIKASI_LABORATORIUM_SUCCESS,
    SAVE_VERIFIKASI_LABORATORIUM_ERROR,
    DAFTAR_PASIEN_LABORATORIUM,
    DAFTAR_PASIEN_LABORATORIUM_SUCCESS,
    DAFTAR_PASIEN_LABORATORIUM_ERROR,
    LIST_PELAYANAN_LABORATORIUM_GET,
    LIST_PELAYANAN_LABORATORIUM_GET_SUCCESS,
    LIST_PELAYANAN_LABORATORIUM_GET_ERROR,
    MASTER_PELAYANAN_LABORATORIUM_GET,
    MASTER_PELAYANAN_LABORATORIUM_GET_SUCCESS,
    MASTER_PELAYANAN_LABORATORIUM_GET_ERROR,
    COMBO_LABORATORIUM_GET,
    COMBO_LABORATORIUM_GET_SUCCESS,
    COMBO_LABORATORIUM_GET_ERROR
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

export const saveVerifikasiLaboratorium = (data, history) => ({
    type: SAVE_VERIFIKASI_LABORATORIUM,
    payload: { data, history },
});
// common error
export const saveVerifikasiLaboratoriumSuccess = (data, history) => ({
    type: SAVE_VERIFIKASI_LABORATORIUM_SUCCESS,
    payload: { data, history },
});

export const saveVerifikasiLaboratoriumError = (error) => ({
    type: SAVE_VERIFIKASI_LABORATORIUM_ERROR,
    payload: error,
});

export const daftarPasienLaboratorium = (param) => ({
    type: DAFTAR_PASIEN_LABORATORIUM,
    payload: { param },
});

export const daftarPasienLaboratoriumSuccess = (data) => ({
    type: DAFTAR_PASIEN_LABORATORIUM_SUCCESS,
    payload: data,
});

export const daftarPasienLaboratoriumError = (error) => ({
    type: DAFTAR_PASIEN_LABORATORIUM_ERROR,
    payload: error,
});

export const listPelayananLaboratoriumGet = (param) => ({
    type: LIST_PELAYANAN_LABORATORIUM_GET,
    payload: { param },
});

export const listPelayananLaboratoriumGetSuccess = (data) => ({
    type: LIST_PELAYANAN_LABORATORIUM_GET_SUCCESS,
    payload: data,
});

export const listPelayananLaboratoriumGetError = (error) => ({
    type: LIST_PELAYANAN_LABORATORIUM_GET_ERROR,
    payload: error,
});

export const masterPelayananLaboratoriumGet = (param) => ({
    type: MASTER_PELAYANAN_LABORATORIUM_GET,
    payload: { param },
});

export const masterPelayananLaboratoriumGetSuccess = (data) => ({
    type: MASTER_PELAYANAN_LABORATORIUM_GET_SUCCESS,
    payload: data,
});

export const masterPelayananLaboratoriumGetError = (error) => ({
    type: MASTER_PELAYANAN_LABORATORIUM_GET_ERROR,
    payload: error,
});

export const comboLaboratoriumGet = (param) => ({
    type: COMBO_LABORATORIUM_GET,
    payload: { param },
});

export const comboLaboratoriumGetSuccess = (data) => ({
    type: COMBO_LABORATORIUM_GET_SUCCESS,
    payload: data,
});

export const comboLaboratoriumGetError = (error) => ({
    type: COMBO_LABORATORIUM_GET_ERROR,
    payload: error,
});