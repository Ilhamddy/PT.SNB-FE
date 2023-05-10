import {
    REGISTRASI_CREATE, 
    REGISTRASI_CREATE_ERROR, 
    REGISTRASI_CREATE_SUCCESS,   
} from "./actionType";

// common success
export const registrasiCreate = (data) => ({
    type: REGISTRASI_CREATE,
    payload: { data },
});
// common error
export const registrasiCreateSuccess = (result) => ({
    type: REGISTRASI_CREATE_SUCCESS,
    payload: { result },
});

export const registrasiCreateError = (error) => ({
    type: REGISTRASI_CREATE_ERROR,
    payload: { error },
});
