import {
    GET_LIST_INSTALASI,GET_LIST_INSTALASI_SUCCESS,GET_LIST_INSTALASI_ERROR,
    UPSERT_ORGANIZATION_INSTALASI,UPSERT_ORGANIZATION_INSTALASI_SUCCESS,UPSERT_ORGANIZATION_INSTALASI_ERROR
} from "./actionType";

export const getListInstalasi = (queries) => ({
    type: GET_LIST_INSTALASI,
    payload: {
        queries,
    },
});

export const getListInstalasiSuccess = (data) => ({
    type: GET_LIST_INSTALASI_SUCCESS,
    payload: data,
});

export const getListInstalasiError = (error) => ({
    type: GET_LIST_INSTALASI_ERROR,
    payload: error,
});

export const upsertOrganizationInstalasi = (data, callback) => ({
    type: UPSERT_ORGANIZATION_INSTALASI,
    payload: {
        data,
        callback
    },
});

export const upsertOrganizationInstalasiSuccess = (data) => ({
    type: UPSERT_ORGANIZATION_INSTALASI_SUCCESS,
    payload: data,
});

export const upsertOrganizationInstalasiError = (error) => ({
    type: UPSERT_ORGANIZATION_INSTALASI_ERROR,
    payload: error,
});