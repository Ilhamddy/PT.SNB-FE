import {
    DAFTARPASIEN_RESET_FORM,
    DAFTARPASIEN_RJ_GET,
    DAFTARPASIEN_RJ_GET_SUCCESS,
    DAFTARPASIEN_RJ_GET_ERROR,
    WIDGET_DAFTARPASIEN_RJ_GET,
    WIDGET_DAFTARPASIEN_RJ_GET_SUCCESS,
    WIDGET_DAFTARPASIEN_RJ_GET_ERROR
} from "./actionType";

export const daftarPasienResetForm = () => ({
    type: DAFTARPASIEN_RESET_FORM,
});

export const daftarPasienRJGet = (param) => ({
    type: DAFTARPASIEN_RJ_GET,
    payload: { param },
});

export const daftarPasienRJGetSuccess = (data) => ({
    type: DAFTARPASIEN_RJ_GET_SUCCESS,
    payload: data,
});

export const daftarPasienRJGetError = (error) => ({
    type: DAFTARPASIEN_RJ_GET_ERROR,
    payload: error,
});

export const widgetdaftarPasienRJGet = (param) => ({
    type: WIDGET_DAFTARPASIEN_RJ_GET,
    payload: { param },
});

export const widgetdaftarPasienRJGetSuccess = (data) => ({
    type: WIDGET_DAFTARPASIEN_RJ_GET_SUCCESS,
    payload: data,
});

export const widgetdaftarPasienRJGetError = (error) => ({
    type: WIDGET_DAFTARPASIEN_RJ_GET_ERROR,
    payload: error,
});