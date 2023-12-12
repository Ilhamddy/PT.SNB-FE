import { 
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
    GET_USER_LOGIN, 
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_ERROR,
    GET_RIWAYAT_REGISTRASI,
    GET_RIWAYAT_REGISTRASI_SUCCESS,
    GET_RIWAYAT_REGISTRASI_ERROR,
    BATAL_REGIS,
    BATAL_REGIS_SUCCESS,
    BATAL_REGIS_ERROR,
    GET_PASIEN_EDIT,
    GET_PASIEN_EDIT_SUCCESS,
    GET_PASIEN_EDIT_ERROR,
    UPDATE_PASIEN,
    UPDATE_PASIEN_SUCCESS,
    UPDATE_PASIEN_ERROR,
    GET_PASIEN_AKUN,
    GET_PASIEN_AKUN_SUCCESS,
    GET_PASIEN_AKUN_ERROR,
    GET_COMBO_PENJAMIN,
    GET_COMBO_PENJAMIN_SUCCESS,
    GET_COMBO_PENJAMIN_ERROR,
    UPSERT_PENJAMIN,
    UPSERT_PENJAMIN_SUCCESS,
    UPSERT_PENJAMIN_ERROR,
    GET_PENJAMIN_PASIEN,
    GET_PENJAMIN_PASIEN_SUCCESS,
    GET_PENJAMIN_PASIEN_ERROR,
    GET_ANTREAN_PEMERIKSAAN,
    GET_ANTREAN_PEMERIKSAAN_SUCCESS,
    GET_ANTREAN_PEMERIKSAAN_ERROR,
    GET_REGISTRASI_NOREC,
    GET_REGISTRASI_NOREC_SUCCESS,
    GET_REGISTRASI_NOREC_ERROR,
    VERIF_USER_EMAIL,
    VERIF_USER_EMAIL_SUCCESS,
    VERIF_USER_EMAIL_ERROR,
    GET_VERIF_USER,
    GET_VERIF_USER_SUCCESS,
    GET_VERIF_USER_ERROR
} from "./actionType";

export const loginUser = (data, callback) => {
    return {
        type: LOGIN_USER,
        payload: {data, callback}
    }
}

export const loginUserSuccess = (data) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: data
    }
}

export const loginUserError = (error) => {
    return {
        type: LOGIN_USER_ERROR,
        payload: error
    }
}

export const logoutUser = (callback) => {
    return {
        type: LOGOUT_USER,
        payload: {callback}
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: {}
    }
}

export const logoutUserError = (error) => {
    return {
        type: LOGOUT_USER_ERROR,
        payload: error
    }
}

export const getUserLogin = () => {
    return {
        type: GET_USER_LOGIN,
        payload: {}
    }
}

export const signUpUser = (data, callback) => {
    return {
        type: SIGNUP_USER,
        payload: {data, callback}
    }
}

export const signUpUserSuccess = (data) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: data
    }
}

export const signUpUserError = (error) => {
    return {
        type: SIGNUP_USER_ERROR,
        payload: error
    }
}

export const getRiwayatRegistrasi = (queries) => {
    return {
        type: GET_RIWAYAT_REGISTRASI,
        payload: {queries}
    }
}

export const getRiwayatRegistrasiSuccess = (data) => {
    return {
        type: GET_RIWAYAT_REGISTRASI_SUCCESS,
        payload: data
    }
}

export const getRiwayatRegistrasiError = (error) => {
    return {
        type: GET_RIWAYAT_REGISTRASI_ERROR,
        payload: error
    }
}

export const batalRegis = (data, callback) => {
    return {
        type: BATAL_REGIS,
        payload: {data, callback}
    }
}

export const batalRegisSuccess = (data) => {
    return {
        type: BATAL_REGIS_SUCCESS,
        payload: data
    }
}

export const batalRegisError = (error) => {
    return {
        type: BATAL_REGIS_ERROR,
        payload: error
    }
}

export const getPasienEdit = (queries) => {
    return {
        type: GET_PASIEN_EDIT,
        payload: {queries}
    }
}

export const getPasienEditSuccess = (data) => {
    return {
        type: GET_PASIEN_EDIT_SUCCESS,
        payload: data
    }
}

export const getPasienEditError = (error) => {
    return {
        type: GET_PASIEN_EDIT_ERROR,
        payload: error
    }
}

export const updatePasien = (data, callback) => {
    return {
        type: UPDATE_PASIEN,
        payload: {data, callback}
    }
}

export const updatePasienSuccess = (data) => {
    return {
        type: UPDATE_PASIEN_SUCCESS,
        payload: data
    }
}

export const updatePasienError = (error) => {
    return {
        type: UPDATE_PASIEN_ERROR,
        payload: error
    }
}

export const getPasienAkun = (queries, callback) => {
    return {
        type: GET_PASIEN_AKUN,
        payload: {queries, callback}
    }
}

export const getPasienAkunSuccess = (data) => {
    return {
        type: GET_PASIEN_AKUN_SUCCESS,
        payload: data
    }
}

export const getPasienAkunError = (error) => {
    return {
        type: GET_PASIEN_AKUN_ERROR,
        payload: error
    }
}

export const getComboPenjamin = () => {
    return {
        type: GET_COMBO_PENJAMIN,
        payload: {}
    }
}

export const getComboPenjaminSuccess = (data) => {
    return {
        type: GET_COMBO_PENJAMIN_SUCCESS,
        payload: data
    }
}

export const getComboPenjaminError = (error) => {
    return {
        type: GET_COMBO_PENJAMIN_ERROR,
        payload: error
    }
}

export const upsertPenjamin = (data, callback) => {
    return {
        type: UPSERT_PENJAMIN,
        payload: {data, callback}
    }
}

export const upsertPenjaminSuccess = (data) => {
    return {
        type: UPSERT_PENJAMIN_SUCCESS,
        payload: data
    }
}

export const upsertPenjaminError = (error) => {
    return {
        type: UPSERT_PENJAMIN_ERROR,
        payload: error
    }
}

export const getPenjaminPasien = () => {
    return {
        type: GET_PENJAMIN_PASIEN,
        payload: {}
    }
}

export const getPenjaminPasienSuccess = (data) => {
    return {
        type: GET_PENJAMIN_PASIEN_SUCCESS,
        payload: data
    }
}

export const getPenjaminPasienError = (error) => {
    return {
        type: GET_PENJAMIN_PASIEN_ERROR,
        payload: error
    }
}

export const getAntreanPemeriksaan = (queries) => {
    return {
        type: GET_ANTREAN_PEMERIKSAAN,
        payload: {
            queries
        }
    }
}

export const getAntreanPemeriksaanSuccess = (data) => {
    return {
        type: GET_ANTREAN_PEMERIKSAAN_SUCCESS,
        payload: data
    }
}

export const getAntreanPemeriksaanError = (error) => {
    return {
        type: GET_ANTREAN_PEMERIKSAAN_ERROR,
        payload: error
    }
}

export const getRegistrasiNorec = (queries) => {
    return {
        type: GET_REGISTRASI_NOREC,
        payload: {
            queries
        }
    }
}

export const getRegistrasiNorecSuccess = (data) => {
    return {
        type: GET_REGISTRASI_NOREC_SUCCESS,
        payload: data
    }
}

export const getRegistrasiNorecError = (error) => {
    return {
        type: GET_REGISTRASI_NOREC_ERROR,
        payload: error
    }
}

export const verifUserEmail = (data, callback) => {
    return {
        type: VERIF_USER_EMAIL,
        payload: {data, callback}
    }
}

export const verifUserEmailSuccess = (data) => {
    return {
        type: VERIF_USER_EMAIL_SUCCESS,
        payload: data
    }
}

export const verifUserEmailError = (error) => {
    return {
        type: VERIF_USER_EMAIL_ERROR,
        payload: error
    }
}

export const getVerifUser = (queries, callback) => {
    return {
        type: GET_VERIF_USER,
        payload: {queries, callback}
    }
}

export const getVerifUserSuccess = (data) => {
    return {
        type: GET_VERIF_USER_SUCCESS,
        payload: data
    }
}

export const getVerifUserError = (error) => {
    return {
        type: GET_VERIF_USER_ERROR,
        payload: error
    }
}