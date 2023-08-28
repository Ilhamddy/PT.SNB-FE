import {
    GET_ORDER_RESEP_QUERY,
    GET_ORDER_RESEP_QUERY_ERROR,
    GET_ORDER_RESEP_QUERY_SUCCESS,
    GET_ORDER_RESEP_FROM_NOREC,
    GET_ORDER_RESEP_FROM_NOREC_ERROR,
    GET_ORDER_RESEP_FROM_NOREC_SUCCESS,
    CREATE_OR_UPDATE_VERIF_RESEP,
    CREATE_OR_UPDATE_VERIF_RESEP_SUCCESS,
    CREATE_OR_UPDATE_VERIF_RESEP_ERROR
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