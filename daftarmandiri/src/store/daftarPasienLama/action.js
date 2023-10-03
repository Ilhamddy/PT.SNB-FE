import { 
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
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
