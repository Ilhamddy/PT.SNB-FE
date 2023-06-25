import {
    MASTER_GET,
    MASTER_GET_SUCCESS,
    MASTER_GET_ERROR,
    DESA_GET,
    DESA_GET_SUCCESS,
    DESA_GET_ERROR,
    KECAMATAN_GET,
    KECAMATAN_GET_SUCCESS,
    KECAMATAN_GET_ERROR,
    COMBO_REGISTRASI_GET,
    COMBO_REGISTRASI_GET_SUCCESS,
    COMBO_REGISTRASI_GET_ERROR,
    COMBO_ASURANSI_GET,
    COMBO_ASURANSI_GET_SUCCESS,
    COMBO_ASURANSI_GET_ERROR,
    PROVINSI_GET_BPJS,
    PROVINSI_GET_BPJS_SUCCESS,
    PROVINSI_GET_BPJS_ERROR,
    KABUPATEN_GET_BPJS,
    KABUPATEN_GET_BPJS_SUCCESS,
    KABUPATEN_GET_BPJS_ERROR,
    KECAMATAN_GET_BPJS,
    KECAMATAN_GET_BPJS_SUCCESS,
    KECAMATAN_GET_BPJS_ERROR,
} from "./actionType";

export const masterGet = () => ({
    type: MASTER_GET,
});

export const masterGetSuccess = (data) => ({
    type: MASTER_GET_SUCCESS,
    payload: data,
});

export const masterGetError = (error) => ({
    type: MASTER_GET_ERROR,
    payload: error,
});

export const desaGet = (desa) => ({
    type: DESA_GET,
    payload:{desa}
});

export const desaGetSuccess = (data) => ({
    type: DESA_GET_SUCCESS,
    payload: data,
});

export const desaGetError = (error) => ({
    type: DESA_GET_ERROR,
    payload: error,
});

export const kecamatanGet = () => ({
    type: KECAMATAN_GET
});

export const kecamatanGetSuccess = (data) => ({
    type: KECAMATAN_GET_SUCCESS,
    payload: data,
});

export const kecamatanGetError = (error) => ({
    type: KECAMATAN_GET_ERROR,
    payload: error,
});

export const comboRegistrasiGet = () => ({
    type: COMBO_REGISTRASI_GET
});

export const comboRegistrasiGetSuccess = (data) => ({
    type: COMBO_REGISTRASI_GET_SUCCESS,
    payload: data,
});

export const comboRegistrasiGetError = (error) => ({
    type: COMBO_REGISTRASI_GET_ERROR,
    payload: error,
});

export const comboAsuransiGet = () => ({
    type: COMBO_ASURANSI_GET,
});

export const comboAsuransiGetSuccess = (data) => ({
    type: COMBO_ASURANSI_GET_SUCCESS,
    payload: data,
});

export const comboAsuransiGetError = (error) => ({
    type: COMBO_ASURANSI_GET_ERROR,
    payload: error,
});

export const provinsiGetBpjs = () => ({
    type: PROVINSI_GET_BPJS,
});

export const provinsiGetBpjsSuccess = (data) => ({
    type: PROVINSI_GET_BPJS_SUCCESS,
    payload: data,
});

export const provinsiGetBpjsError = (error) => ({
    type: PROVINSI_GET_BPJS_ERROR,
    payload: error,
});

export const kabupatenGetBpjs = (provinsi) => ({
    type: KABUPATEN_GET_BPJS,
    payload: {provinsi}
});

export const kabupatenGetBpjsSuccess = (data) => ({
    type: KABUPATEN_GET_BPJS_SUCCESS,
    payload: data,
});

export const kabupatenGetBpjsError = (error) => ({
    type: KABUPATEN_GET_BPJS_ERROR,
    payload: error,
});

export const kecamatanGetBpjs = (kabupaten) => ({
    type: KECAMATAN_GET_BPJS,
    payload: {kabupaten}
});

export const kecamatanGetBpjsSuccess = (data) => ({
    type: KECAMATAN_GET_BPJS_SUCCESS,
    payload: data,
});

export const kecamatanGetBpjsError = (error) => ({
    type: KECAMATAN_GET_BPJS_ERROR,
    payload: error,
});