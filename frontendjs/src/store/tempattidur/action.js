import {
    GET_TEMPAT_TIDUR,
    GET_TEMPAT_TIDUR_SUCCESS,
    GET_TEMPAT_TIDUR_ERROR,
    GET_UNIT_TEMPAT_TIDUR,
    GET_UNIT_TEMPAT_TIDUR_SUCCESS,
    GET_UNIT_TEMPAT_TIDUR_ERROR,
    GET_COMBO_TEMPAT_TIDUR,
    GET_COMBO_TEMPAT_TIDUR_SUCCESS,
    GET_COMBO_TEMPAT_TIDUR_ERROR,
    UPSERT_TEMPAT_TIDUR,
    UPSERT_TEMPAT_TIDUR_SUCCESS,
    UPSERT_TEMPAT_TIDUR_ERROR
} from "./actionType";


export const getTempatTidur = (queries) => ({
    type: GET_TEMPAT_TIDUR,
    payload: {
        queries,
    },
});

export const getTempatTidurSuccess = (data) => ({
    type: GET_TEMPAT_TIDUR_SUCCESS,
    payload: data,
});

export const getTempatTidurError = (error) => ({
    type: GET_TEMPAT_TIDUR_ERROR,
    payload: error,
});

export const getUnitTempatTidur = (queries) => ({
    type: GET_UNIT_TEMPAT_TIDUR,
    payload: {
        queries,
    },
});

export const getUnitTempatTidurSuccess = (data) => ({
    type: GET_UNIT_TEMPAT_TIDUR_SUCCESS,
    payload: data,
});

export const getUnitTempatTidurError = (error) => ({
    type: GET_UNIT_TEMPAT_TIDUR_ERROR,
    payload: error,
});

export const getComboTempatTidur = (queries) => ({
    type: GET_COMBO_TEMPAT_TIDUR,
    payload: {
        queries,
    },
});

export const getComboTempatTidurSuccess = (data) => ({
    type: GET_COMBO_TEMPAT_TIDUR_SUCCESS,
    payload: data,
});

export const getComboTempatTidurError = (error) => ({
    type: GET_COMBO_TEMPAT_TIDUR_ERROR,
    payload: error,
});

export const upsertTempatTidur = (data, callback) => ({
    type: UPSERT_TEMPAT_TIDUR,
    payload: {
        data,
        callback
    },
});

export const upsertTempatTidurSuccess = (data) => ({
    type: UPSERT_TEMPAT_TIDUR_SUCCESS,
    payload: data,
});

export const upsertTempatTidurError = (error) => ({
    type: UPSERT_TEMPAT_TIDUR_ERROR,
    payload: error,
});