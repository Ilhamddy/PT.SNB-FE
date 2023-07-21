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
    LIST_TARIF_PASIEN_GET_ERROR,
    LISTDIAGNOSAX_GET,
    LISTDIAGNOSAX_GET_SUCCESS,
    LISTDIAGNOSAX_GET_ERROR,
    LISTDIAGNOSAIX_GET,
    LISTDIAGNOSAIX_GET_SUCCESS,
    LISTDIAGNOSAIX_GET_ERROR,
    BRIDGING_INACBG_SAVE,
    BRIDGING_INACBG_SAVE_SUCCESS,
    BRIDGING_INACBG_SAVE_ERROR,
    TARIF_KLAIM_SAVE,
    TARIF_KLAIM_SAVE_SUCCESS,
    TARIF_KLAIM_SAVE_ERROR
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

export const listDiagnosaxGet = (param) => ({
    type: LISTDIAGNOSAX_GET,
    payload: { param },
});

export const listDiagnosaxGetSuccess = (data) => ({
    type: LISTDIAGNOSAX_GET_SUCCESS,
    payload: data,
});

export const listDiagnosaxGetError = (error) => ({
    type: LISTDIAGNOSAX_GET_ERROR,
    payload: error,
});

export const listDiagnosaixGet = (param) => ({
    type: LISTDIAGNOSAIX_GET,
    payload: { param },
});

export const listDiagnosaixGetSuccess = (data) => ({
    type: LISTDIAGNOSAIX_GET_SUCCESS,
    payload: data,
});

export const listDiagnosaixGetError = (error) => ({
    type: LISTDIAGNOSAIX_GET_ERROR,
    payload: error,
});

export const bridgingInacbgSave = (data, history) => ({
    type: BRIDGING_INACBG_SAVE,
    payload: { data, history },
});

// common error
export const bridgingInacbgSaveSuccess = (data, history) => ({
    type: BRIDGING_INACBG_SAVE_SUCCESS,
    payload: { data, history },
});

export const bridgingInacbgSaveError = (error) => ({
    type: BRIDGING_INACBG_SAVE_ERROR,
    payload: error,
});

export const tarifKlaimSave = (data, history) => ({
    type: TARIF_KLAIM_SAVE,
    payload: { data, history },
});

// common error
export const tarifKlaimSaveSuccess = (data, history) => ({
    type: TARIF_KLAIM_SAVE_SUCCESS,
    payload: { data, history },
});

export const tarifKlaimSaveError = (error) => ({
    type: TARIF_KLAIM_SAVE_ERROR,
    payload: error,
});