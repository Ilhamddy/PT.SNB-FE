import {
    REGISTRASI_SAVE, 
    REGISTRASI_SAVE_ERROR, 
    REGISTRASI_SAVE_SUCCESS,
    REGISTRASI_LIST_GET,
    REGISTRASI_LIST_GET_ERROR,
    REGISTRASI_LIST_GET_SUCCESS,
    REGISTRASI_RESET_FORM,
    REGISTRASI_GET,
    REGISTRASI_GET_SUCCESS,
    REGISTRASI_GET_ERROR,
    REGISTRASI_LIST_BYOR_GET,
    REGISTRASI_LIST_BYOR_GET_SUCCESS,
    REGISTRASI_LIST_BYOR_GET_ERROR
} from "./actionType";

export const registrasiResetForm = () => ({
    type: REGISTRASI_RESET_FORM,
});

// common success
export const registrasiSave = (data, history) => ({
    type: REGISTRASI_SAVE,
    payload: { data, history },
});
// common error
export const registrasiSaveSuccess = (data, history) => ({
    type: REGISTRASI_SAVE_SUCCESS,
    payload: { data, history},
});

export const registrasiSaveError = (error) => ({
    type: REGISTRASI_SAVE_ERROR,
    payload: error,
});


export const registrasiGetList = (nocm) => ({
    type: REGISTRASI_LIST_GET,
    payload: {nocm},
});

export const registrasiGetListSuccess = (data) => ({
    type: REGISTRASI_LIST_GET_SUCCESS,
    payload: data,
});

export const registrasiGetListError = (error) => ({
    type: REGISTRASI_LIST_GET_ERROR,
    payload: error,
});

export const registrasiGetListByOr = (nocm) => ({
    type: REGISTRASI_LIST_BYOR_GET,
    payload: {nocm},
});

export const registrasiGetListByOrSuccess = (data) => ({
    type: REGISTRASI_LIST_BYOR_GET_SUCCESS,
    payload: data,
});

export const registrasiGetListByOrError = (error) => ({
    type: REGISTRASI_LIST_BYOR_GET_ERROR,
    payload: error,
});

export const registrasiGet = (id) => ({
    type: REGISTRASI_GET,
    payload: {id},
});

export const registrasiGetSuccess = (data) => ({
    type: REGISTRASI_GET_SUCCESS,
    payload: data,
});

export const registrasiGetError = (error) => ({
    type: REGISTRASI_GET_ERROR,
    payload: error,
});