import {
    DAFTARPASIEN_RESET_FORM,
    DAFTARPASIEN_RJ_GET,
    DAFTARPASIEN_RJ_GET_SUCCESS,
    DAFTARPASIEN_RJ_GET_ERROR,
    WIDGET_DAFTARPASIEN_RJ_GET,
    WIDGET_DAFTARPASIEN_RJ_GET_SUCCESS,
    WIDGET_DAFTARPASIEN_RJ_GET_ERROR,
    WIDGET_DAFTARPASIEN_RI_GET,
    WIDGET_DAFTARPASIEN_RI_GET_SUCCESS,
    WIDGET_DAFTARPASIEN_RI_GET_ERROR,
    DAFTARPASIEN_RI_GET,
    DAFTARPASIEN_RI_GET_SUCCESS,
    DAFTARPASIEN_RI_GET_ERROR,
    DAFTARPASIEN_PULANG_GET,
    DAFTARPASIEN_PULANG_GET_SUCCESS,
    DAFTARPASIEN_PULANG_GET_ERROR,
    DAFTARPASIEN_RI_PULANG_SAVE,
    DAFTARPASIEN_RI_PULANG_SAVE_SUCCESS,
    DAFTARPASIEN_RI_PULANG_SAVE_ERROR,
    LIST_FASKES_GET,
    LIST_FASKES_GET_SUCCESS,
    LIST_FASKES_GET_ERROR,
    DAFTARPASIEN_NOREC_GET,
    DAFTARPASIEN_NOREC_GET_SUCCESS,
    DAFTARPASIEN_NOREC_GET_ERROR,
    DAFTARPASIEN_NOREC_GET_RESET,
    ANTREAN_NOREC_GET,
    ANTREAN_NOREC_GET_SUCCESS,
    ANTREAN_NOREC_GET_ERROR,
    ANTREAN_NOREC_GET_RESET,
    DAFTARPASIEN_REGISTRASI_GET,
    DAFTARPASIEN_REGISTRASI_GET_SUCCESS,
    DAFTARPASIEN_REGISTRASI_GET_ERROR,
    WIDGET_DAFTARPASIEN_REGISTRASI_GET,
    WIDGET_DAFTARPASIEN_REGISTRASI_GET_SUCCESS,
    WIDGET_DAFTARPASIEN_REGISTRASI_GET_ERROR,
    LIST_PASIEN_MUTASI_GET,
    LIST_PASIEN_MUTASI_GET_SUCCESS,
    LIST_PASIEN_MUTASI_GET_ERROR,
    GET_DAFTAR_PASIEN_FARMASI,
    GET_DAFTAR_PASIEN_FARMASI_SUCCESS,
    GET_DAFTAR_PASIEN_FARMASI_ERROR,
} from "./actionType";

export const daftarPasienResetForm = () => ({
    type: DAFTARPASIEN_RESET_FORM,
});

export const daftarPasienRJGet = (param) => ({
    type: DAFTARPASIEN_RJ_GET,
    payload: { param },
});

export const daftarPasienRJGetSuccess = (data) => ({
    type: DAFTARPASIEN_RJ_GET_SUCCESS,
    payload: data,
});

export const daftarPasienRJGetError = (error) => ({
    type: DAFTARPASIEN_RJ_GET_ERROR,
    payload: error,
});

export const widgetdaftarPasienRJGet = (param) => ({
    type: WIDGET_DAFTARPASIEN_RJ_GET,
    payload: { param },
});

export const widgetdaftarPasienRJGetSuccess = (data) => ({
    type: WIDGET_DAFTARPASIEN_RJ_GET_SUCCESS,
    payload: data,
});

export const widgetdaftarPasienRJGetError = (error) => ({
    type: WIDGET_DAFTARPASIEN_RJ_GET_ERROR,
    payload: error,
});

export const widgetdaftarPasienRIGet = (param) => ({
    type: WIDGET_DAFTARPASIEN_RI_GET,
    payload: { param },
});

export const widgetdaftarPasienRIGetSuccess = (data) => ({
    type: WIDGET_DAFTARPASIEN_RI_GET_SUCCESS,
    payload: data,
});

export const widgetdaftarPasienRIGetError = (error) => ({
    type: WIDGET_DAFTARPASIEN_RI_GET_ERROR,
    payload: error,
});

export const daftarPasienRIGet = (param) => ({
    type: DAFTARPASIEN_RI_GET,
    payload: { param },
});

export const daftarPasienRIGetSuccess = (data) => ({
    type: DAFTARPASIEN_RI_GET_SUCCESS,
    payload: data,
});

export const daftarPasienRIGetError = (error) => ({
    type: DAFTARPASIEN_RI_GET_ERROR,
    payload: error,
});

export const daftarPasienPulangGet = ({dateStart, dateEnd, instalasi, unit, search}) => ({
    type: DAFTARPASIEN_PULANG_GET,
    payload: { dateStart, dateEnd, instalasi, unit, search},
});

export const daftarPasienPulangGetSuccess = (data) => ({
    type: DAFTARPASIEN_PULANG_GET_SUCCESS,
    payload: data,
});

export const daftarPasienPulangGetError = (error) => ({
    type: DAFTARPASIEN_PULANG_GET_ERROR,
    payload: error,
});

export const daftarPasienRIPulangSave = (data, callback) => ({
    type: DAFTARPASIEN_RI_PULANG_SAVE,
    payload: {
        data,
        callback
    },
});

export const daftarPasienRIPulangSaveSuccess = (data) => ({
    type: DAFTARPASIEN_RI_PULANG_SAVE_SUCCESS,
    payload: data,
});

export const daftarPasienRIPulangSaveError = (error) => ({
    type: DAFTARPASIEN_RI_PULANG_SAVE_ERROR,
    payload: error,
});

export const listFaskesGet = (qfaskes, faskesType) => ({
    type: LIST_FASKES_GET,
    payload: { qfaskes, faskesType },
});

export const listFaskesSuccess = (data) => ({
    type: LIST_FASKES_GET_SUCCESS,
    payload: data,
});

export const listFaskesError = (error) => ({
    type: LIST_FASKES_GET_ERROR,
    payload: error,
});

export const daftarPasienNorecGet = (norec) => ({
    type: DAFTARPASIEN_NOREC_GET,
    payload: { norec },
});

export const daftarPasienNorecGetSuccess = (data) => ({
    type: DAFTARPASIEN_NOREC_GET_SUCCESS,
    payload: data,
});

export const daftarPasienNorecGetError = (error) => ({
    type: DAFTARPASIEN_NOREC_GET_ERROR,
    payload: error,
});

export const daftarPasienNorecGetReset = () => ({
    type: DAFTARPASIEN_NOREC_GET_RESET,
    payload: {},
});

export const antreanPasienNorecGet = (norec) => ({
    type: ANTREAN_NOREC_GET,
    payload: { norec },
});

export const antreanPasienNorecGetSuccess = (data) => ({
    type: ANTREAN_NOREC_GET_SUCCESS,
    payload: data,
});

export const antreanPasienNorecGetError = (error) => ({
    type: ANTREAN_NOREC_GET_ERROR,  
    payload: error,
});

export const antreanPasienNorecGetReset = () => ({
    type: ANTREAN_NOREC_GET_RESET,
    payload: {},
});

export const daftarPasienRegistrasiGet = (param) => ({
    type: DAFTARPASIEN_REGISTRASI_GET,
    payload: { param },
});

export const daftarPasienRegistrasiGetSuccess = (data) => ({
    type: DAFTARPASIEN_REGISTRASI_GET_SUCCESS,
    payload: data,
});

export const daftarPasienRegistrasiGetError = (error) => ({
    type: DAFTARPASIEN_REGISTRASI_GET_ERROR,
    payload: error,
});

export const widgetdaftarPasienRegistrasiGet = (param) => ({
    type: WIDGET_DAFTARPASIEN_REGISTRASI_GET,
    payload: { param },
});

export const widgetdaftarPasienRegistrasiGetSuccess = (data) => ({
    type: WIDGET_DAFTARPASIEN_REGISTRASI_GET_SUCCESS,
    payload: data,
});

export const widgetdaftarPasienRegistrasiGetError = (error) => ({
    type: WIDGET_DAFTARPASIEN_REGISTRASI_GET_ERROR,
    payload: error,
});

export const listPasienMutasiGet = (param) => ({
    type: LIST_PASIEN_MUTASI_GET,
    payload: { param },
});

export const listPasienMutasiGetSuccess = (data) => ({
    type: LIST_PASIEN_MUTASI_GET_SUCCESS,
    payload: data,
});

export const listPasienMutasiGetError = (error) => ({
    type: LIST_PASIEN_MUTASI_GET_ERROR,
    payload: error,
});

export const getDaftarPasienFarmasi = (queries) => ({
    type: GET_DAFTAR_PASIEN_FARMASI,
    payload: { queries },
});

export const getDaftarPasienFarmasiSuccess = (data) => ({
    type: GET_DAFTAR_PASIEN_FARMASI_SUCCESS,
    payload: data,
});

export const getDaftarPasienFarmasiError = (error) => ({
    type: GET_DAFTAR_PASIEN_FARMASI_ERROR,
    payload: error,
});