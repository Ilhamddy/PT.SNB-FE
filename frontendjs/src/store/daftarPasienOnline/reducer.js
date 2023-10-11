import {
    GET_COMBO_VERIFIKASI_ONLINE,
    GET_COMBO_VERIFIKASI_ONLINE_SUCCESS,
    GET_COMBO_VERIFIKASI_ONLINE_ERROR,
    GET_DAFTAR_PASIEN_ONLINE,
    GET_DAFTAR_PASIEN_ONLINE_SUCCESS,
    GET_DAFTAR_PASIEN_ONLINE_ERROR
} from "./actionType";

const INIT_STATE = {
    getComboVerifikasiOnline: {
        data: [],
        loading: false,
        error: null,
    },
    getDaftarPasienOnline: {
        data: [],
        loading: false,
        error: null,
    }
    
};

const DaftarPasien = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_COMBO_VERIFIKASI_ONLINE: {
            return {
                ...state,
                getComboVerifikasiOnline: {
                    ...state.getComboVerifikasiOnline,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_VERIFIKASI_ONLINE_SUCCESS: {
            return {
                ...state,
                getComboVerifikasiOnline: {
                    ...state.getComboVerifikasiOnline,
                    data: action.payload,
                    loading: false,
                    error: null,
                }
            }
        }

        case GET_COMBO_VERIFIKASI_ONLINE_ERROR: {
            return {
                ...state,
                getComboVerifikasiOnline: {
                    ...state.getComboVerifikasiOnline,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_DAFTAR_PASIEN_ONLINE: {
            return {
                ...state,
                getDaftarPasienOnline: {
                    ...state.getDaftarPasienOnline,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_DAFTAR_PASIEN_ONLINE_SUCCESS: {
            return {
                ...state,
                getDaftarPasienOnline: {
                    ...state.getDaftarPasienOnline,
                    data: action.payload,
                    loading: false,
                    error: null,
                }
            }
        }

        case GET_DAFTAR_PASIEN_ONLINE_ERROR: {
            return {
                ...state,
                getDaftarPasienOnline: {
                    ...state.getDaftarPasienOnline,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        
        default: {
            return { ...state };
        }
    }
};

export default DaftarPasien;