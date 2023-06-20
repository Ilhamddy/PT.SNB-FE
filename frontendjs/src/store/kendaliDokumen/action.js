import {
    DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    KENDALIDOKUMEN_RESET_FORM,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    SAVE_DOKUMEN_REKAMMEDIS,
    SAVE_DOKUMEN_REKAMMEDIS_SUCCESS,
    SAVE_DOKUMEN_REKAMMEDIS_ERROR
} from "./actionType";

export const kendaliDokumenResetForm = () => ({
    type: KENDALIDOKUMEN_RESET_FORM,
});

export const daftarDokumenRekammedisGet = (param) => ({
    type: DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    payload: { param },
});

export const daftarDokumenRekammedisGetSuccess = (data) => ({
    type: DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    payload: data,
});

export const daftarDokumenRekammedisGetError = (error) => ({
    type: DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    payload: error,
});

export const widgetdaftarDokumenRekammedisGet = (param) => ({
    type: WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    payload: { param },
});

export const widgetdaftarDokumenRekammedisGetSuccess = (data) => ({
    type: WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    payload: data,
});

export const widgetdaftarDokumenRekammedisGetError = (error) => ({
    type: WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    payload: error,
});

export const saveDokumenRekammedis = (data, history) => ({
    type: SAVE_DOKUMEN_REKAMMEDIS,
    payload: { data, history },
});

// common error
export const saveDokumenRekammedisSuccess = (data, history) => ({
    type: SAVE_DOKUMEN_REKAMMEDIS_SUCCESS,
    payload: { data, history },
});

export const saveDokumenRekammedisError = (error) => ({
    type: SAVE_DOKUMEN_REKAMMEDIS_ERROR,
    payload: error,
});