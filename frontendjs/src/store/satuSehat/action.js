import {
    GET_LIST_INSTALASI,GET_LIST_INSTALASI_SUCCESS,GET_LIST_INSTALASI_ERROR,
    UPSERT_ORGANIZATION_INSTALASI,UPSERT_ORGANIZATION_INSTALASI_SUCCESS,UPSERT_ORGANIZATION_INSTALASI_ERROR,
    GET_LIST_UNIT,GET_LIST_UNIT_SUCCESS,GET_LIST_UNIT_ERROR,
    UPSERT_LOCATION_UNIT,UPSERT_LOCATION_UNIT_SUCCESS,UPSERT_LOCATION_UNIT_ERROR,
    GET_LIST_PRACTITIONER,GET_LIST_PRACTITIONER_SUCCESS,GET_LIST_PRACTITIONER_ERROR,
    UPSERT_PRACTITIONER,UPSERT_PRACTITIONER_SUCCESS,UPSERT_PRACTITIONER_ERROR,
    UPSERT_PATIENT,UPSERT_PATIENT_SUCCESS,UPSERT_PATIENT_ERROR,
    UPSERT_ENCOUNTER,UPSERT_ENCOUNTER_SUCCESS,UPSERT_ENCOUNTER_ERROR,
    UPSERT_CONDITION,UPSERT_CONDITION_SUCCESS,UPSERT_CONDITION_ERROR,
    UPSERT_ENCOUNTER_PULANG,UPSERT_ENCOUNTER_PULANG_SUCCESS,UPSERT_ENCOUNTER_PULANG_ERROR
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

export const getListUnit = (queries) => ({
    type: GET_LIST_UNIT,
    payload: {
        queries,
    },
});

export const getListUnitSuccess = (data) => ({
    type: GET_LIST_UNIT_SUCCESS,
    payload: data,
});

export const getListUnitError = (error) => ({
    type: GET_LIST_UNIT_ERROR,
    payload: error,
});

export const upsertLocationUnit = (data, callback) => ({
    type: UPSERT_LOCATION_UNIT,
    payload: {
        data,
        callback
    },
});

export const upsertLocationUnitSuccess = (data) => ({
    type: UPSERT_LOCATION_UNIT_SUCCESS,
    payload: data,
});

export const upsertLocationUnitError = (error) => ({
    type: UPSERT_LOCATION_UNIT_ERROR,
    payload: error,
});

export const getListPractitioner = (queries) => ({
    type: GET_LIST_PRACTITIONER,
    payload: {
        queries,
    },
});

export const getListPractitionerSuccess = (data) => ({
    type: GET_LIST_PRACTITIONER_SUCCESS,
    payload: data,
});

export const getListPractitionerError = (error) => ({
    type: GET_LIST_PRACTITIONER_ERROR,
    payload: error,
});

export const upsertPractitioner = (data, callback) => ({
    type: UPSERT_PRACTITIONER,
    payload: {
        data,
        callback
    },
});

export const upsertPractitionerSuccess = (data) => ({
    type: UPSERT_PRACTITIONER_SUCCESS,
    payload: data,
});

export const upsertPractitionerError = (error) => ({
    type: UPSERT_PRACTITIONER_ERROR,
    payload: error,
});

export const upsertPatient = (data, callback) => ({
    type: UPSERT_PATIENT,
    payload: {
        data,
        callback
    },
});

export const upsertPatientSuccess = (data) => ({
    type: UPSERT_PATIENT_SUCCESS,
    payload: data,
});

export const upsertPatientError = (error) => ({
    type: UPSERT_PATIENT_ERROR,
    payload: error,
});

export const upsertEncounter = (data, callback) => ({
    type: UPSERT_ENCOUNTER,
    payload: {
        data,
        callback
    },
});

export const upsertEncounterSuccess = (data) => ({
    type: UPSERT_ENCOUNTER_SUCCESS,
    payload: data,
});

export const upsertEncounterError = (error) => ({
    type: UPSERT_ENCOUNTER_ERROR,
    payload: error,
});

export const upsertCondition = (data, callback) => ({
    type: UPSERT_CONDITION,
    payload: {
        data,
        callback
    },
});

export const upsertConditionSuccess = (data) => ({
    type: UPSERT_CONDITION_SUCCESS,
    payload: data,
});

export const upsertConditionError = (error) => ({
    type: UPSERT_CONDITION_ERROR,
    payload: error,
});

export const upsertEncounterPulang = (data, callback) => ({
    type: UPSERT_ENCOUNTER_PULANG,
    payload: {
        data,
        callback
    },
});

export const upsertEncounterPulangSuccess = (data) => ({
    type: UPSERT_ENCOUNTER_PULANG_SUCCESS,
    payload: data,
});

export const upsertEncounterPulangError = (error) => ({
    type: UPSERT_ENCOUNTER_PULANG_ERROR,
    payload: error,
});