import {
    GET_PASIEN_RJ,
    GET_PASIEN_RJ_SUCCESS,
    GET_PASIEN_RJ_ERROR,
    GET_PASIEN_IGD,
    GET_PASIEN_IGD_SUCCESS,
    GET_PASIEN_IGD_ERROR,
    GET_PASIEN_RANAP,
    GET_PASIEN_RANAP_SUCCESS,
    GET_PASIEN_RANAP_ERROR,
    GET_COUNT_CARA_BAYAR,
    GET_COUNT_CARA_BAYAR_SUCCESS,
    GET_COUNT_CARA_BAYAR_ERROR,
    GET_POLIKLINIK_TERBANYAK,
    GET_POLIKLINIK_TERBANYAK_SUCCESS,
    GET_POLIKLINIK_TERBANYAK_ERROR
} from "./actionType"


export const getPasienRJ = (queries) => ({
    type: GET_PASIEN_RJ,
    payload: {queries: queries}
})

export const getPasienRJSuccess = (data) => ({
    type: GET_PASIEN_RJ_SUCCESS,
    payload: data
})

export const getPasienRJError = (error) => ({
    type: GET_PASIEN_RJ_ERROR,
    payload: error
})

export const getPasienIGD = (queries) => ({
    type: GET_PASIEN_IGD,
    payload: {queries: queries}
})

export const getPasienIGDSuccess = (data) => ({
    type: GET_PASIEN_IGD_SUCCESS,
    payload: data
})

export const getPasienIGDError = (error) => ({
    type: GET_PASIEN_IGD_ERROR,
    payload: error
})

export const getPasienRanap = (queries) => ({
    type: GET_PASIEN_RANAP,
    payload: {queries: queries}
})

export const getPasienRanapSuccess = (data) => ({
    type: GET_PASIEN_RANAP_SUCCESS,
    payload: data
})

export const getPasienRanapError = (error) => ({
    type: GET_PASIEN_RANAP_ERROR,
    payload: error
})

export const getCountCaraBayar = (queries) => ({
    type: GET_COUNT_CARA_BAYAR,
    payload: {queries: queries}
})

export const getCountCaraBayarSuccess = (data) => ({
    type: GET_COUNT_CARA_BAYAR_SUCCESS,
    payload: data
})

export const getCountCaraBayarError = (error) => ({
    type: GET_COUNT_CARA_BAYAR_ERROR,
    payload: error
})

export const getPoliklinikTerbanyak = (queries) => ({
    type: GET_POLIKLINIK_TERBANYAK,
    payload: {queries: queries}
})

export const getPoliklinikTerbanyakSuccess = (data) => ({
    type: GET_POLIKLINIK_TERBANYAK_SUCCESS,
    payload: data
})

export const getPoliklinikTerbanyakError = (error) => ({
    type: GET_POLIKLINIK_TERBANYAK_ERROR,
    payload: error
})

