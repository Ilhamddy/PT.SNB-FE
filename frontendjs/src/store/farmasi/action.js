import {
    GET_ORDER_RESEP_QUERY,
    GET_ORDER_RESEP_QUERY_ERROR,
    GET_ORDER_RESEP_QUERY_SUCCESS,
    GET_ORDER_RESEP_FROM_NOREC,
    GET_ORDER_RESEP_FROM_NOREC_ERROR,
    GET_ORDER_RESEP_FROM_NOREC_SUCCESS,
    CREATE_OR_UPDATE_VERIF_RESEP,
    CREATE_OR_UPDATE_VERIF_RESEP_SUCCESS,
    CREATE_OR_UPDATE_VERIF_RESEP_ERROR,
    CREATE_OR_UPDATE_PENJUALAN_BEBAS,
    CREATE_OR_UPDATE_PENJUALAN_BEBAS_SUCCESS,
    CREATE_OR_UPDATE_PENJUALAN_BEBAS_ERROR,
    GET_PASIEN_FROM_NOCM,
    GET_PASIEN_FROM_NOCM_SUCCESS,
    GET_PASIEN_FROM_NOCM_ERROR,
    GET_ALL_VERIF_RESEP,
    GET_ALL_VERIF_RESEP_SUCCESS,
    GET_ALL_VERIF_RESEP_ERROR,
    CREATE_OR_UPDATE_RETUR,
    CREATE_OR_UPDATE_RETUR_SUCCESS,
    CREATE_OR_UPDATE_RETUR_ERROR,
    GET_ANTREAN_FROM_DP,
    GET_ANTREAN_FROM_DP_SUCCESS,
    GET_ANTREAN_FROM_DP_ERROR,
    CREATE_OR_UPDATE_ORDER_PLUS_VERIF,
    CREATE_OR_UPDATE_ORDER_PLUS_VERIF_SUCCESS,
    CREATE_OR_UPDATE_ORDER_PLUS_VERIF_ERROR
} from "./actionType";


export const getOrderResepQuery = (queries) => ({
    type: GET_ORDER_RESEP_QUERY,
    payload: {
        queries: queries
    }
});

export const getOrderResepQuerySuccess = (data) => ({
    type: GET_ORDER_RESEP_QUERY_SUCCESS,
    payload: data
});

export const getOrderResepQueryError = (error) => ({
    type: GET_ORDER_RESEP_QUERY_ERROR,
    payload: error
});

export const getOrderResepFromNorec = (queries) => ({
    type: GET_ORDER_RESEP_FROM_NOREC,
    payload: {
        queries: queries
    }
});

export const getOrderResepFromNorecSuccess = (data) => ({
    type: GET_ORDER_RESEP_FROM_NOREC_SUCCESS,
    payload: data
});

export const getOrderResepFromNorecError = (error) => ({
    type: GET_ORDER_RESEP_FROM_NOREC_ERROR,
    payload: error
});

export const createOrUpdateVerifResep = (body, callback) => ({
    type: CREATE_OR_UPDATE_VERIF_RESEP,
    payload: {
        body: body,
        callback: callback
    }
});

export const createOrUpdateVerifResepSuccess = (data) => ({
    type: CREATE_OR_UPDATE_VERIF_RESEP_SUCCESS,
    payload: data
});

export const createOrUpdateVerifResepError = (error) => ({
    type: CREATE_OR_UPDATE_VERIF_RESEP_ERROR,
    payload: error
});

export const createOrUpdatePenjualanBebas = (body, callback) => ({
    type: CREATE_OR_UPDATE_PENJUALAN_BEBAS,
    payload: {
        body: body,
        callback: callback
    }
});

export const createOrUpdatePenjualanBebasSuccess = (data) => ({
    type: CREATE_OR_UPDATE_PENJUALAN_BEBAS_SUCCESS,
    payload: data
});

export const createOrUpdatePenjualanBebasError = (error) => ({
    type: CREATE_OR_UPDATE_PENJUALAN_BEBAS_ERROR,
    payload: error
});

export const getPasienFromNoCm = (queries) => ({
    type: GET_PASIEN_FROM_NOCM,
    payload: {
        queries: queries
    }
});

export const getPasienFromNoCmSuccess = (data) => ({
    type: GET_PASIEN_FROM_NOCM_SUCCESS,
    payload: data
});

export const getPasienFromNoCmError = (error) => ({
    type: GET_PASIEN_FROM_NOCM_ERROR,
    payload: error
});

export const getAllVerifResep = (queries) => ({
    type: GET_ALL_VERIF_RESEP,
    payload: {
        queries: queries
    }
});

export const getAllVerifResepSuccess = (data) => ({
    type: GET_ALL_VERIF_RESEP_SUCCESS,
    payload: data
});

export const getAllVerifResepError = (error) => ({
    type: GET_ALL_VERIF_RESEP_ERROR,
    payload: error
});

export const createOrUpdateRetur = (body, callback) => ({
    type: CREATE_OR_UPDATE_RETUR,
    payload: {
        body: body,
        callback: callback
    }
});

export const createOrUpdateReturSuccess = (data) => ({
    type: CREATE_OR_UPDATE_RETUR_SUCCESS,
    payload: data
});

export const createOrUpdateReturError = (error) => ({
    type: CREATE_OR_UPDATE_RETUR_ERROR,
    payload: error
});

export const getAntreanFromDP = (queries) => ({
    type: GET_ANTREAN_FROM_DP,
    payload: {
        queries: queries
    }
});

export const getAntreanFromDPSuccess = (data) => ({
    type: GET_ANTREAN_FROM_DP_SUCCESS,
    payload: data
});

export const getAntreanFromDPError = (error) => ({
    type: GET_ANTREAN_FROM_DP_ERROR,
    payload: error
});

export const createOrUpdateOrderPlusVerif = (body, callback) => ({
    type: CREATE_OR_UPDATE_ORDER_PLUS_VERIF,
    payload: {
        body: body,
        callback: callback
    }
});

export const createOrUpdateOrderPlusVerifSuccess = (data) => ({
    type: CREATE_OR_UPDATE_ORDER_PLUS_VERIF_SUCCESS,
    payload: data
});

export const createOrUpdateOrderPlusVerifError = (error) => ({
    type: CREATE_OR_UPDATE_ORDER_PLUS_VERIF_ERROR,
    payload: error
});