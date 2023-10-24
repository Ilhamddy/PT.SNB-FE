import { SDM_RESET_FORM,
GET_DAFTAR_PEGAWAI,GET_DAFTAR_PEGAWAI_SUCCESS,GET_DAFTAR_PEGAWAI_ERROR,
GET_COMBO_SDM,GET_COMBO_SDM_SUCCESS,GET_COMBO_SDM_ERROR,
SAVE_BIODATA_PEGAWAI,SAVE_BIODATA_PEGAWAI_SUCCESS,SAVE_BIODATA_PEGAWAI_ERROR,
GET_PEGAWAI_BYID,GET_PEGAWAI_BYID_SUCCESS,GET_PEGAWAI_BYID_ERROR,
GET_USER_ROLE_BYID_PEGAWAI,GET_USER_ROLE_BYID_PEGAWAI_SUCCESS,GET_USER_ROLE_BYID_PEGAWAI_ERROR,
SAVE_SIGNUP_USER_ROLE,SAVE_SIGNUP_USER_ROLE_SUCCESS,SAVE_SIGNUP_USER_ROLE_ERROR,
GET_COMBO_JADWAL,
GET_COMBO_JADWAL_SUCCESS,
GET_COMBO_JADWAL_ERROR,
GET_JADWAL_DOKTER_SDM,
GET_JADWAL_DOKTER_SDM_SUCCESS,
GET_JADWAL_DOKTER_SDM_ERROR,
UPSERT_JADWAL,
UPSERT_JADWAL_SUCCESS,
UPSERT_JADWAL_ERROR, } from "./actionType";

export const sdmResetForm = () => ({
    type: SDM_RESET_FORM,
});

export const getDaftarPegawai = (queries) => ({
    type: GET_DAFTAR_PEGAWAI,
    payload: { queries: queries },
});

export const getDaftarPegawaiSuccess = (data) => ({
    type: GET_DAFTAR_PEGAWAI_SUCCESS,
    payload: data,
});

export const getDaftarPegawaiError = (error) => ({
    type: GET_DAFTAR_PEGAWAI_ERROR,
    payload: error,
});

export const getComboSDM = (queries) => ({
    type: GET_COMBO_SDM,
    payload: { queries: queries },
});

export const getComboSDMSuccess = (data) => ({
    type: GET_COMBO_SDM_SUCCESS,
    payload: data,
});

export const getComboSDMError = (error) => ({
    type: GET_COMBO_SDM_ERROR,
    payload: error,
});

export const saveBiodataPegawai = (body, callback) => ({
    type: SAVE_BIODATA_PEGAWAI,
    payload: {
        body: body,
        callback: callback
    }
});

export const saveBiodataPegawaiSuccess = (data) => ({
    type: SAVE_BIODATA_PEGAWAI_SUCCESS,
    payload: data
});

export const saveBiodataPegawaiError = (error) => ({
    type: SAVE_BIODATA_PEGAWAI_ERROR,
    payload: error
});

export const getPegawaiById = (queries) => ({
    type: GET_PEGAWAI_BYID,
    payload: { queries: queries },
});

export const getPegawaiByIdSuccess = (data) => ({
    type: GET_PEGAWAI_BYID_SUCCESS,
    payload: data,
});

export const getPegawaiByIdError = (error) => ({
    type: GET_PEGAWAI_BYID_ERROR,
    payload: error,
});

export const getUserRoleById = (queries) => ({
    type: GET_USER_ROLE_BYID_PEGAWAI,
    payload: { queries: queries },
});

export const getUserRoleByIdSuccess = (data) => ({
    type: GET_USER_ROLE_BYID_PEGAWAI_SUCCESS,
    payload: data,
});

export const getUserRoleByIdError = (error) => ({
    type: GET_USER_ROLE_BYID_PEGAWAI_ERROR,
    payload: error,
});

export const saveSignupUserRole = (body, callback) => ({
    type: SAVE_SIGNUP_USER_ROLE,
    payload: {
        body: body,
        callback: callback
    }
});

export const saveSignupUserRoleSuccess = (data) => ({
    type: SAVE_SIGNUP_USER_ROLE_SUCCESS,
    payload: data
});

export const saveSignupUserRoleError = (error) => ({
    type: SAVE_SIGNUP_USER_ROLE_ERROR,
    payload: error
});
export const getComboJadwal = (queries) => ({
    type: GET_COMBO_JADWAL,
    payload: { queries: queries },
});

export const getComboJadwalSuccess = (data) => ({
    type: GET_COMBO_JADWAL_SUCCESS,
    payload: data,
});

export const getComboJadwalError = (error) => ({
    type: GET_COMBO_JADWAL_ERROR,
    payload: error,
});

export const getJadwalDokterSDM = (queries) => ({
    type: GET_JADWAL_DOKTER_SDM,
    payload: { queries: queries },
});

export const getJadwalDokterSDMSuccess = (data) => ({
    type: GET_JADWAL_DOKTER_SDM_SUCCESS,
    payload: data,
});

export const getJadwalDokterSDMError = (error) => ({
    type: GET_JADWAL_DOKTER_SDM_ERROR,
    payload: error,
});

export const upsertJadwal = (body, callback) => ({
    type: UPSERT_JADWAL,
    payload: {
        body: body,
        callback: callback
    }
});

export const upsertJadwalSuccess = (data) => ({
    type: UPSERT_JADWAL_SUCCESS,
    payload: data
});

export const upsertJadwalError = (error) => ({
    type: UPSERT_JADWAL_ERROR,
    payload: error
});