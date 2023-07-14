import {
    CASEMIX_RESET_FORM,
    LIST_CARI_PASIEN_GET,
    LIST_CARI_PASIEN_GET_SUCCESS,
    LIST_CARI_PASIEN_GET_ERROR,
    LIST_DAFTAR_PASIEN_GET,
    LIST_DAFTAR_PASIEN_GET_SUCCESS,
    LIST_DAFTAR_PASIEN_GET_ERROR,
    LIST_TARIF_PASIEN_GET,
    LIST_TARIF_PASIEN_GET_SUCCESS,
    LIST_TARIF_PASIEN_GET_ERROR
} from "./actionType";

export const casemixResetForm = () => ({
    type: CASEMIX_RESET_FORM,
});

export const listCariPasienGet = (param) => ({
    type: LIST_CARI_PASIEN_GET,
    payload: { param },
});

export const listCariPasienGetSuccess = (data) => ({
    type: LIST_CARI_PASIEN_GET_SUCCESS,
    payload: data,
});

export const listCariPasienGetError = (error) => ({
    type: LIST_CARI_PASIEN_GET_ERROR,
    payload: error,
});

export const listDaftarPasienGet = (param) => ({
    type: LIST_DAFTAR_PASIEN_GET,
    payload: { param },
});

export const listDaftarPasienGetSuccess = (data) => ({
    type: LIST_DAFTAR_PASIEN_GET_SUCCESS,
    payload: data,
});

export const listDaftarPasienGetError = (error) => ({
    type: LIST_DAFTAR_PASIEN_GET_ERROR,
    payload: error,
});

export const listTarifPasienGet = (param) => ({
    type: LIST_TARIF_PASIEN_GET,
    payload: { param },
});

export const listTarifPasienGetSuccess = (data) => ({
    type: LIST_TARIF_PASIEN_GET_SUCCESS,
    payload: data,
});

export const listTarifPasienGetError = (error) => ({
    type: LIST_TARIF_PASIEN_GET_ERROR,
    payload: error,
});