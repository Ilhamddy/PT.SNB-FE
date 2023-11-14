import {
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
    GET_PASIEN_LAMA,
    GET_PASIEN_LAMA_SUCCESS,
    GET_PASIEN_LAMA_ERROR,
    GET_DOKTER_PASIEN,
    GET_DOKTER_PASIEN_SUCCESS,
    GET_DOKTER_PASIEN_ERROR,
    GET_COMBO_DAFTAR,
    GET_COMBO_DAFTAR_SUCCESS,
    GET_COMBO_DAFTAR_ERROR,
    SAVE_PASIEN_MANDIRI,
    SAVE_PASIEN_MANDIRI_SUCCESS,
    SAVE_PASIEN_MANDIRI_ERROR
} from "./actionType";

const INIT_STATE = {
    getJadwalDokter: {
        data: [],
        loading: false,
        error: null,
    },
    getPasienLama: {
        data: [],
        loading: false,
        error: null,
    },
    getDokter: {
        data: [],
        loading: false,
        error: null,
    },
    getComboDaftar: {
        data: [],
        loading: false,
        error: null,
    },
    savePasienMandiri: {
        data: [],
        loading: false,
        error: null,
    }
}

const daftarPasienLama = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_JADWAL_DOKTER: 
            return {
                ...state,
                getJadwalDokter: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
            
        case GET_JADWAL_DOKTER_SUCCESS:
            return {
                ...state,
                getJadwalDokter: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_JADWAL_DOKTER_ERROR:
            return {
                ...state,
                getJadwalDokter: {
                    ...state.loginUser,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_PASIEN_LAMA: 
            return {
                ...state,
                getPasienLama: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        
        case GET_PASIEN_LAMA_SUCCESS:
            return {
                ...state,
                getPasienLama: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        
        case GET_PASIEN_LAMA_ERROR: 
            return {
                ...state,
                getPasienLama: {
                    ...state.loginUser,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            }

        case GET_DOKTER_PASIEN: 
            return {
                ...state,
                getDokter: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        
        case GET_DOKTER_PASIEN_SUCCESS:
            return {
                ...state,
                getDokter: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        
        case GET_DOKTER_PASIEN_ERROR:
            return {
                ...state,
                getDokter: {
                    ...state.loginUser,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        
        case GET_COMBO_DAFTAR:
            return {
                ...state,
                getComboDaftar: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_COMBO_DAFTAR_SUCCESS:
            return {
                ...state,
                getComboDaftar: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_COMBO_DAFTAR_ERROR:
            return {
                ...state,
                getComboDaftar: {
                    ...state.loginUser,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case SAVE_PASIEN_MANDIRI:
            return {
                ...state,
                savePasienMandiri: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        
        case SAVE_PASIEN_MANDIRI_SUCCESS:
            return {
                ...state,
                savePasienMandiri: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case SAVE_PASIEN_MANDIRI_ERROR:
            return {
                ...state,
                savePasienMandiri: {
                    ...state.loginUser,
                    loading: false,
                    error: action.payload,
                },
            };

        default:
            return { ...state };
    }
};


export default daftarPasienLama;