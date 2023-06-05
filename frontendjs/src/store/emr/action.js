import {
    EMR_RESET_FORM,
    EMR_HEADER_GET,
    EMR_HEADER_GET_SUCCESS,
    EMR_HEADER_GET_ERROR,
    EMR_TTV_SAVE,
    EMR_TTV_SAVE_SUCCESS,
    EMR_TTV_SAVE_ERROR,
    EMR_TTV_GET,
    EMR_TTV_GET_SUCCESS,
    EMR_TTV_GET_ERROR
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

// common success
export const emrTtvSave = (data, history) => ({
    type: EMR_TTV_SAVE,
    payload: { data, history },
});
// common error
export const emrTtvSaveSuccess = (data, history) => ({
    type: EMR_TTV_SAVE_SUCCESS,
    payload: { data, history},
});

export const emrTtvSaveError = (error) => ({
    type: EMR_TTV_SAVE_ERROR,
    payload: error,
});

export const emrTtvGet = (param) => ({
    type: EMR_TTV_GET,
    payload: { param },
});

export const emrTtvGetSuccess = (data) => ({
    type: EMR_TTV_GET_SUCCESS,
    payload: data,
});

export const emrTtvGetError = (error) => ({
    type: EMR_TTV_GET_ERROR,
    payload: error,
});