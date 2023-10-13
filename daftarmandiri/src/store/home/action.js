import { 
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
    GET_COMBO_JADWAL,
    GET_COMBO_JADWAL_SUCCESS,
    GET_COMBO_JADWAL_ERROR,
    GET_BERITA_HOME,
    GET_BERITA_HOME_SUCCESS,
    GET_BERITA_HOME_ERROR,
    GET_BERITA_QUERY,
    GET_BERITA_QUERY_SUCCESS,
    GET_BERITA_QUERY_ERROR

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

export const getBeritaHome = () => {
    return {
        type: GET_BERITA_HOME
    }
}

export const getBeritaHomeSuccess = (data) => {
    return {
        type: GET_BERITA_HOME_SUCCESS,
        payload: data
    }
}

export const getBeritaHomeError = (error) => {
    return {
        type: GET_BERITA_HOME_ERROR,
        payload: error
    }
}

export const getBeritaQuery = (queries) => {
    return {
        type: GET_BERITA_QUERY,
        payload: {queries}
    }
}

export const getBeritaQuerySuccess = (data) => {
    return {
        type: GET_BERITA_QUERY_SUCCESS,
        payload: data
    }
}

export const getBeritaQueryError = (error) => {
    return {
        type: GET_BERITA_QUERY_ERROR,
        payload: error
    }
}
