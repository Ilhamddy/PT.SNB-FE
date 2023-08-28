import {
    GET_ORDER_RESEP_QUERY,
    GET_ORDER_RESEP_QUERY_ERROR,
    GET_ORDER_RESEP_QUERY_SUCCESS
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