import {
    GET_COMBO_VERIFIKASI_ONLINE,
    GET_COMBO_VERIFIKASI_ONLINE_SUCCESS,
    GET_COMBO_VERIFIKASI_ONLINE_ERROR,
    GET_DAFTAR_PASIEN_ONLINE,
    GET_DAFTAR_PASIEN_ONLINE_SUCCESS,
    GET_DAFTAR_PASIEN_ONLINE_ERROR
} from "./actionType";

export const getComboVerifikasiOnline = () => {
    return {
        type: GET_COMBO_VERIFIKASI_ONLINE,
    }
}

export const getComboVerifikasiOnlineSuccess = (data) => {
    return {
        type: GET_COMBO_VERIFIKASI_ONLINE_SUCCESS,
        payload: data
    }
}

export const getComboVerifikasiOnlineError = (error) => {
    return {
        type: GET_COMBO_VERIFIKASI_ONLINE_ERROR,
        payload: error
    }
}

export const getDaftarPasienOnline = (queries) => {
    return {
        type: GET_DAFTAR_PASIEN_ONLINE,
        payload: {
            queries: queries
        }
    }
}

export const getDaftarPasienOnlineSuccess = (data) => {
    return {
        type: GET_DAFTAR_PASIEN_ONLINE_SUCCESS,
        payload: data
    }
}

export const getDaftarPasienOnlineError = (error) => {
    return {
        type: GET_DAFTAR_PASIEN_ONLINE_ERROR,
        payload: error
    }
}