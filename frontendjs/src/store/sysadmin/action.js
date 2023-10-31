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
    UPSERT_TEMPAT_TIDUR_ERROR,
    GET_ALL_UNIT,
    GET_ALL_UNIT_SUCCESS,
    GET_ALL_UNIT_ERROR,
    GET_COMBO_DAFTAR_UNIT,
    GET_COMBO_DAFTAR_UNIT_SUCCESS,
    GET_COMBO_DAFTAR_UNIT_ERROR,
    UPSERT_UNIT,
    UPSERT_UNIT_SUCCESS,
    UPSERT_UNIT_ERROR,
    GET_ALL_KAMAR,
    GET_ALL_KAMAR_SUCCESS,
    GET_ALL_KAMAR_ERROR,
    GET_COMBO_DAFTAR_KAMAR,
    GET_COMBO_DAFTAR_KAMAR_SUCCESS,
    GET_COMBO_DAFTAR_KAMAR_ERROR,
    GET_COMBO_SYSADMIN, GET_COMBO_SYSADMIN_SUCCESS, GET_COMBO_SYSADMIN_ERROR,
    UPSERT_ROLES, UPSERT_ROLES_SUCCESS, UPSERT_ROLES_ERROR,
    UPSERT_KAMAR,
    UPSERT_KAMAR_SUCCESS,
    UPSERT_KAMAR_ERROR,
    GET_MAP_ROLE_PERMISSIONS, GET_MAP_ROLE_PERMISSIONS_SUCCESS, GET_MAP_ROLE_PERMISSIONS_ERROR,
    UPSERT_ROLE_PERMISSIONS, UPSERT_ROLE_PERMISSIONS_SUCCESS, UPSERT_ROLE_PERMISSIONS_ERROR
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

export const getAllUnit = (queries) => ({
    type: GET_ALL_UNIT,
    payload: {
        queries,
    },
});

export const getAllUnitSuccess = (data) => ({
    type: GET_ALL_UNIT_SUCCESS,
    payload: data,
});

export const getAllUnitError = (error) => ({
    type: GET_ALL_UNIT_ERROR,
    payload: error,
});

export const getComboDaftarUnit = (queries) => ({
    type: GET_COMBO_DAFTAR_UNIT,
    payload: {
        queries,
    },
});

export const getComboDaftarUnitSuccess = (data) => ({
    type: GET_COMBO_DAFTAR_UNIT_SUCCESS,
    payload: data,
});

export const getComboDaftarUnitError = (error) => ({
    type: GET_COMBO_DAFTAR_UNIT_ERROR,
    payload: error,
});

export const upsertUnit = (data, callback) => ({
    type: UPSERT_UNIT,
    payload: {
        data,
        callback
    },
});

export const upsertUnitSuccess = (data) => ({
    type: UPSERT_UNIT_SUCCESS,
    payload: data,
});

export const upsertUnitError = (error) => ({
    type: UPSERT_UNIT_ERROR,
    payload: error,
});

export const getAllKamar = (queries) => ({
    type: GET_ALL_KAMAR,
    payload: {
        queries,
    },
});

export const getAllKamarSuccess = (data) => ({
    type: GET_ALL_KAMAR_SUCCESS,
    payload: data,
});

export const getAllKamarError = (error) => ({
    type: GET_ALL_KAMAR_ERROR,
    payload: error,
});

export const getComboDaftarKamar = (queries) => ({
    type: GET_COMBO_DAFTAR_KAMAR,
    payload: {
        queries,
    },
});

export const getComboDaftarKamarSuccess = (data) => ({
    type: GET_COMBO_DAFTAR_KAMAR_SUCCESS,
    payload: data,
});

export const getComboDaftarKamarError = (error) => ({
    type: GET_COMBO_DAFTAR_KAMAR_ERROR,
    payload: error,
});

export const getComboSysadmin = (queries) => ({
    type: GET_COMBO_SYSADMIN,
    payload: {
        queries,
    },
});

export const getComboSysadminSuccess = (data) => ({
    type: GET_COMBO_SYSADMIN_SUCCESS,
    payload: data,
});

export const getComboSysadminError = (error) => ({
    type: GET_COMBO_SYSADMIN_ERROR,
    payload: error,
});

export const upsertRoles = (data, callback) => ({
    type: UPSERT_ROLES,
    payload: {
        data,
        callback
    },
});

export const upsertRolesSuccess = (data) => ({
    type: UPSERT_ROLES_SUCCESS,
    payload: data,
});

export const upsertRolesError = (error) => ({
    type: UPSERT_ROLES_ERROR,
    payload: error,
});

export const upsertKamar = (data, callback) => ({
    type: UPSERT_KAMAR,
    payload: {
        data,
        callback
    },
});

export const upsertKamarSuccess = (data) => ({
    type: UPSERT_KAMAR_SUCCESS,
    payload: data,
});

export const upsertKamarError = (error) => ({
    type: UPSERT_KAMAR_ERROR,
    payload: error,
});

export const getMapRolePermissions = (queries) => ({
    type: GET_MAP_ROLE_PERMISSIONS,
    payload: {
        queries,
    },
});

export const getMapRolePermissionsSuccess = (data) => ({
    type: GET_MAP_ROLE_PERMISSIONS_SUCCESS,
    payload: data,
});

export const getMapRolePermissionsError = (error) => ({
    type: GET_MAP_ROLE_PERMISSIONS_ERROR,
    payload: error,
});

export const upsertRolePermissions = (data, callback) => ({
    type: UPSERT_ROLE_PERMISSIONS,
    payload: {
        data,
        callback
    },
});

export const upsertRolePermissionsSuccess = (data) => ({
    type: UPSERT_ROLE_PERMISSIONS_SUCCESS,
    payload: data,
});

export const upsertRolePermissionsError = (error) => ({
    type: UPSERT_ROLE_PERMISSIONS_ERROR,
    payload: error,
});