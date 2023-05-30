import {
    EMR_RESET_FORM,
    EMR_HEADER_GET,
    EMR_HEADER_GET_SUCCESS,
    EMR_HEADER_GET_ERROR
} from "./actionType";

export const emrResetForm = () => ({
    type: EMR_RESET_FORM,
});

export const emrHeaderGet = (param) => ({
    type: EMR_HEADER_GET,
    payload: { param },
});

export const emrHeaderGetSuccess = (data) => ({
    type: EMR_HEADER_GET_SUCCESS,
    payload: data,
});

export const emrHeaderGetError = (error) => ({
    type: EMR_HEADER_GET_ERROR,
    payload: error,
});