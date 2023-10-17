import { SDM_RESET_FORM,
GET_DAFTAR_PEGAWAI,GET_DAFTAR_PEGAWAI_SUCCESS,GET_DAFTAR_PEGAWAI_ERROR,
GET_COMBO_SDM,GET_COMBO_SDM_SUCCESS,GET_COMBO_SDM_ERROR } from "./actionType";

export const sdmResetForm = () => ({
    type: SDM_RESET_FORM,
});

export const getDaftarPegawai = (queries) => ({
    type: GET_DAFTAR_PEGAWAI,
    payload: { queries: queries },
});

export const getDaftarPegawaiSuccess = (data) => ({
    type: GET_DAFTAR_PEGAWAI_SUCCESS,
    payload: data,
});

export const getDaftarPegawaiError = (error) => ({
    type: GET_DAFTAR_PEGAWAI_ERROR,
    payload: error,
});

export const getComboSDM = (queries) => ({
    type: GET_COMBO_SDM,
    payload: { queries: queries },
});

export const getComboSDMSuccess = (data) => ({
    type: GET_COMBO_SDM_SUCCESS,
    payload: data,
});

export const getComboSDMError = (error) => ({
    type: GET_COMBO_SDM_ERROR,
    payload: error,
});