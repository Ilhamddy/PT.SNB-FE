import {
    GET_REGISTRASI_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
   
} from "./actionType";

// common success
export const RegistrasiApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const RegistrasiApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getRegistrasiList = () => ({
    type: GET_REGISTRASI_LIST,
});
