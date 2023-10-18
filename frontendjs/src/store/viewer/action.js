import {
    GET_LOKET_SISA,
    GET_LOKET_SISA_SUCCESS,
    GET_LOKET_SISA_ERROR,
    PANGGIL_LOKET,
    PANGGIL_LOKET_SUCCESS,
    PANGGIL_LOKET_ERROR,
    GET_ALL_LOKET,
    GET_ALL_LOKET_SUCCESS,
    GET_ALL_LOKET_ERROR,
    GET_ALL_TERPANGGIL,
    GET_ALL_TERPANGGIL_SUCCESS,
    GET_ALL_TERPANGGIL_ERROR,
    PANGGIL_ULANG_ANTREAN,
    PANGGIL_ULANG_ANTREAN_SUCCESS,
    PANGGIL_ULANG_ANTREAN_ERROR,
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR
} from "./actionType";

export const getLoketSisa = () => ({
    type: GET_LOKET_SISA,
});

export const getLoketSisaSuccess = (data) => ({
    type: GET_LOKET_SISA_SUCCESS,
    payload: data,
});

export const getLoketSisaError = (error) => ({
    type: GET_LOKET_SISA_ERROR,
    payload: error,
});

export const panggilLoket = (data, callback) => ({
    type: PANGGIL_LOKET,
    payload: {
        data,
        callback
    },
});

export const panggilLoketSuccess = (data) => ({
    type: PANGGIL_LOKET_SUCCESS,
    payload: data,
});

export const panggilLoketError = (error) => ({
    type: PANGGIL_LOKET_ERROR,
    payload: error,
});

export const getAllLoket = (callback) => ({
    type: GET_ALL_LOKET,
    payload: {
        callback
    },
});

export const getAllLoketSuccess = (data) => ({
    type: GET_ALL_LOKET_SUCCESS,
    payload: data,
});

export const getAllLoketError = (error) => ({
    type: GET_ALL_LOKET_ERROR,
    payload: error,
});

export const getAllTerpanggil = (queries) => ({
    type: GET_ALL_TERPANGGIL,
    payload: {
        queries
    },
});

export const getAllTerpanggilSuccess = (data) => ({
    type: GET_ALL_TERPANGGIL_SUCCESS,
    payload: data,
});

export const getAllTerpanggilError = (error) => ({
    type: GET_ALL_TERPANGGIL_ERROR,
    payload: error,
});

export const panggilUlangAntrian = (data, callback) => ({
    type: PANGGIL_ULANG_ANTREAN,
    payload: {
        data,
        callback
    },
});

export const panggilUlangAntrianSuccess = (data) => ({
    type: PANGGIL_ULANG_ANTREAN_SUCCESS,
    payload: data,
});

export const panggilUlangAntrianError = (error) => ({
    type: PANGGIL_ULANG_ANTREAN_ERROR,
    payload: error,
});

export const getJadwalDokter = (queries, callback) => ({
    type: GET_JADWAL_DOKTER,
    payload: {
        queries,
        callback
    },
});

export const getJadwalDokterSuccess = (data) => ({
    type: GET_JADWAL_DOKTER_SUCCESS,
    payload: data,
});

export const getJadwalDokterError = (error) => ({
    type: GET_JADWAL_DOKTER_ERROR,
    payload: error,
});