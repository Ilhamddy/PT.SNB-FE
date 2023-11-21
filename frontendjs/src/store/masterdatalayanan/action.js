import {
    GET_COMBO_TAMBAH_LAYANAN,
    GET_COMBO_TAMBAH_LAYANAN_SUCCESS,
    GET_COMBO_TAMBAH_LAYANAN_ERROR,
    UPSERT_LAYANAN,
    UPSERT_LAYANAN_SUCCESS,
    UPSERT_LAYANAN_ERROR
} from "./actionType";


export const getComboTambahLayanan = (queries) => ({
    type: GET_COMBO_TAMBAH_LAYANAN,
    payload: {
        queries
    },
});

export const getComboTambahLayananSuccess = (data) => ({
    type: GET_COMBO_TAMBAH_LAYANAN_SUCCESS,
    payload: data,
});

export const getComboTambahLayananError = (error) => ({
    type: GET_COMBO_TAMBAH_LAYANAN_ERROR,
    payload: error
});

export const upsertLayanan = (data, callback) => ({
    type: UPSERT_LAYANAN,
    payload: {
        data,
        callback
    },
});

export const upsertLayananSuccess = (data) => ({
    type: UPSERT_LAYANAN_SUCCESS,
    payload: data,
});

export const upsertLayananError = (error) => ({
    type: UPSERT_LAYANAN_ERROR,
    payload: error
});
