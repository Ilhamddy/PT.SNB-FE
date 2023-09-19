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

export const getAllLoket = () => ({
    type: GET_ALL_LOKET,
});

export const getAllLoketSuccess = (data) => ({
    type: GET_ALL_LOKET_SUCCESS,
    payload: data,
});

export const getAllLoketError = (error) => ({
    type: GET_ALL_LOKET_ERROR,
    payload: error,
});