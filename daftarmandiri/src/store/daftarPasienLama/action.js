import { 
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
    GET_PASIEN_LAMA,
    GET_PASIEN_LAMA_SUCCESS,
    GET_PASIEN_LAMA_ERROR,
    GET_DOKTER_PASIEN,
    GET_DOKTER_PASIEN_SUCCESS,
    GET_DOKTER_PASIEN_ERROR,
    GET_COMBO_DAFTAR,
    GET_COMBO_DAFTAR_SUCCESS,
    GET_COMBO_DAFTAR_ERROR
} from "./actionType";

export const getJadwalDokterDaftar = (queries) => {
    return {
        type: GET_JADWAL_DOKTER,
        payload: {queries}
    }
}

export const getJadwalDokterDaftarSuccess = (data) => {
    return {
        type: GET_JADWAL_DOKTER_SUCCESS,
        payload: data
    }
}

export const getJadwalDokterDaftarError = (error) => {
    return {
        type: GET_JADWAL_DOKTER_ERROR,
        payload: error
    }
}

export const getPasienLama = (queries) => {
    return {
        type: GET_PASIEN_LAMA,
        payload: {queries}
    }
}

export const getPasienLamaSuccess = (data) => {
    return {
        type: GET_PASIEN_LAMA_SUCCESS,
        payload: data
    }
}

export const getPasienLamaError = (error) => {
    return {
        type: GET_PASIEN_LAMA_ERROR,
        payload: error
    }
}

export const getDokterPasien = (queries) => {
    return {
        type: GET_DOKTER_PASIEN,
        payload: {queries}
    }
}

export const getDokterPasienSuccess = (data) => {
    return {
        type: GET_DOKTER_PASIEN_SUCCESS,
        payload: data
    }
}

export const getDokterPasienError = (error) => {
    return {
        type: GET_DOKTER_PASIEN_ERROR,
        payload: error
    }
}

export const getComboDaftar = (queries) => {
    return {
        type: GET_COMBO_DAFTAR,
        payload: {queries}
    }
}

export const getComboDaftarSuccess = (data) => {
    return {
        type: GET_COMBO_DAFTAR_SUCCESS,
        payload: data
    }
}

export const getComboDaftarError = (error) => {
    return {
        type: GET_COMBO_DAFTAR_ERROR,
        payload: error
    }
}