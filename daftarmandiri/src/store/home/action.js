import { 
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
    GET_COMBO_JADWAL,
    GET_COMBO_JADWAL_SUCCESS,
    GET_COMBO_JADWAL_ERROR
} from "./actionType";

export const getJadwalDokter = (queries) => {
    return {
        type: GET_JADWAL_DOKTER,
        payload: {queries}
    }
}

export const getJadwalDokterSuccess = (data) => {
    return {
        type: GET_JADWAL_DOKTER_SUCCESS,
        payload: data
    }
}

export const getJadwalDokterError = (error) => {
    return {
        type: GET_JADWAL_DOKTER_ERROR,
        payload: error
    }
}

export const getComboJadwal = (queries) => {
    return {
        type: GET_COMBO_JADWAL,
        payload: {queries}
    }
}

export const getComboJadwalSuccess = (data) => {
    return {
        type: GET_COMBO_JADWAL_SUCCESS,
        payload: data
    }
}

export const getComboJadwalError = (error) => {
    return {
        type: GET_COMBO_JADWAL_ERROR,
        payload: error
    }
}
