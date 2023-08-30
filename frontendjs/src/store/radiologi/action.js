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
    LIST_DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    LIST_ORDER_BY_NOREC_GET,
    LIST_ORDER_BY_NOREC_GET_SUCCESS,
    LIST_ORDER_BY_NOREC_GET_ERROR,
    LIST_KAMAR_RADIOLOGI_GET,
    LIST_KAMAR_RADIOLOGI_GET_SUCCESS,
    LIST_KAMAR_RADIOLOGI_GET_ERROR,
    UPDATE_TGLRENCANA_RADIOLOGI,
    UPDATE_TGLRENCANA_RADIOLOGI_SUCCESS,
    UPDATE_TGLRENCANA_RADIOLOGI_ERROR,
    SAVE_VERIFIKASI_RADIOLOGI,
    SAVE_VERIFIKASI_RADIOLOGI_SUCCESS,
    SAVE_VERIFIKASI_RADIOLOGI_ERROR,
    DELETE_ORDER_PELAYANAN,
    DELETE_ORDER_PELAYANAN_SUCCESS,
    DELETE_ORDER_PELAYANAN_ERROR,
    DELETE_DETAIL_ORDER_PELAYANAN,
    DELETE_DETAIL_ORDER_PELAYANAN_SUCCESS,
    DELETE_DETAIL_ORDER_PELAYANAN_ERROR,
    DAFTAR_PASIEN_RADIOLOGI,
    DAFTAR_PASIEN_RADIOLOGI_SUCCESS,
    DAFTAR_PASIEN_RADIOLOGI_ERROR,
    LIST_PELAYANAN_RADIOLOGI_GET,
    LIST_PELAYANAN_RADIOLOGI_GET_SUCCESS,
    LIST_PELAYANAN_RADIOLOGI_GET_ERROR,
    LIST_COMBO_RADIOLOGI_GET,
    LIST_COMBO_RADIOLOGI_GET_SUCCESS,
    LIST_COMBO_RADIOLOGI_GET_ERROR
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

export const listOrderByNorecGet = (param) => ({
    type: LIST_ORDER_BY_NOREC_GET,
    payload: { param },
});

export const listOrderByNorecGetSuccess = (data) => ({
    type: LIST_ORDER_BY_NOREC_GET_SUCCESS,
    payload: data,
});

export const listOrderByNorecGetError = (error) => ({
    type: LIST_ORDER_BY_NOREC_GET_ERROR,
    payload: error,
});

export const listKamarRadiologiGet = (param) => ({
    type: LIST_KAMAR_RADIOLOGI_GET,
    payload: { param },
});

export const listKamarRadiologiGetSuccess = (data) => ({
    type: LIST_KAMAR_RADIOLOGI_GET_SUCCESS,
    payload: data,
});

export const listKamarRadiologiGetError = (error) => ({
    type: LIST_KAMAR_RADIOLOGI_GET_ERROR,
    payload: error,
});

export const updateTglRencanaRadiologi = (data, history) => ({
    type: UPDATE_TGLRENCANA_RADIOLOGI,
    payload: { data, history },
});

// common error
export const updateTglRencanaRadiologiSuccess = (data, history) => ({
    type: UPDATE_TGLRENCANA_RADIOLOGI_SUCCESS,
    payload: { data, history },
});

export const updateTglRencanaRadiologiError = (error) => ({
    type: UPDATE_TGLRENCANA_RADIOLOGI_ERROR,
    payload: error,
});

export const saveVerifikasiRadiologi = (data, history) => ({
    type: SAVE_VERIFIKASI_RADIOLOGI,
    payload: { data, history },
});

// common error
export const saveVerifikasiRadiologiSuccess = (data, history) => ({
    type: SAVE_VERIFIKASI_RADIOLOGI_SUCCESS,
    payload: { data, history },
});

export const saveVerifikasiRadiologiError = (error) => ({
    type: SAVE_VERIFIKASI_RADIOLOGI_ERROR,
    payload: error,
});

export const deleteOrderPelayanan = (data, history) => ({
    type: DELETE_ORDER_PELAYANAN,
    payload: { data, history },
});

// common error
export const deleteOrderPelayananSuccess = (data, history) => ({
    type: DELETE_ORDER_PELAYANAN_SUCCESS,
    payload: { data, history },
});

export const deleteOrderPelayananError = (error) => ({
    type: DELETE_ORDER_PELAYANAN_ERROR,
    payload: error,
});

export const deleteDetailOrderPelayanan = (data, history) => ({
    type: DELETE_DETAIL_ORDER_PELAYANAN,
    payload: { data, history },
});

// common error
export const deleteDetailOrderPelayananSuccess = (data, history) => ({
    type: DELETE_DETAIL_ORDER_PELAYANAN_SUCCESS,
    payload: { data, history },
});

export const deleteDetailOrderPelayananError = (error) => ({
    type: DELETE_DETAIL_ORDER_PELAYANAN_ERROR,
    payload: error,
});

export const daftarPasienRadiologi = (param) => ({
    type: DAFTAR_PASIEN_RADIOLOGI,
    payload: { param },
});

export const daftarPasienRadiologiSuccess = (data) => ({
    type: DAFTAR_PASIEN_RADIOLOGI_SUCCESS,
    payload: data,
});

export const daftarPasienRadiologiError = (error) => ({
    type: DAFTAR_PASIEN_RADIOLOGI_ERROR,
    payload: error,
});

export const listPelayananRadiologiGet = (param) => ({
    type: LIST_PELAYANAN_RADIOLOGI_GET,
    payload: { param },
});

export const listPelayananRadiologiGetSuccess = (data) => ({
    type: LIST_PELAYANAN_RADIOLOGI_GET_SUCCESS,
    payload: data,
});

export const listPelayananRadiologiGetError = (error) => ({
    type: LIST_PELAYANAN_RADIOLOGI_GET_ERROR,
    payload: error,
});

export const listComboRadiologiGet = (param) => ({
    type: LIST_COMBO_RADIOLOGI_GET,
    payload: { param },
});

export const listComboRadiologiGetSuccess = (data) => ({
    type: LIST_COMBO_RADIOLOGI_GET_SUCCESS,
    payload: data,
});

export const listComboRadiologiGetError = (error) => ({
    type: LIST_COMBO_RADIOLOGI_GET_ERROR,
    payload: error,
});