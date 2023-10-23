import { 
    SDM_RESET_FORM,
    GET_DAFTAR_PEGAWAI,
    GET_DAFTAR_PEGAWAI_SUCCESS,
    GET_DAFTAR_PEGAWAI_ERROR,
    GET_COMBO_SDM,
    GET_COMBO_SDM_SUCCESS,
    GET_COMBO_SDM_ERROR,
    SAVE_BIODATA_PEGAWAI,
    SAVE_BIODATA_PEGAWAI_SUCCESS,
    SAVE_BIODATA_PEGAWAI_ERROR,
    GET_PEGAWAI_BYID,
    GET_PEGAWAI_BYID_SUCCESS,
    GET_PEGAWAI_BYID_ERROR ,
    GET_COMBO_JADWAL,
    GET_COMBO_JADWAL_SUCCESS,
    GET_COMBO_JADWAL_ERROR,
} from "./actionType";

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