import {
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
    GET_COMBO_JADWAL,
    GET_COMBO_JADWAL_SUCCESS,
    GET_COMBO_JADWAL_ERROR,
    GET_BERITA_HOME,
    GET_BERITA_HOME_SUCCESS,
    GET_BERITA_HOME_ERROR,
    GET_BERITA_QUERY,
    GET_BERITA_QUERY_SUCCESS,
    GET_BERITA_QUERY_ERROR,
    GET_CAPTCHA,
    GET_CAPTCHA_SUCCESS,
    GET_CAPTCHA_ERROR,
    GET_ALL_BED,
    GET_ALL_BED_SUCCESS,
    GET_ALL_BED_ERROR,
    GET_ANTREAN_PEMERIKSAAN_MANUAL,
    GET_ANTREAN_PEMERIKSAAN_MANUAL_SUCCESS,
    GET_ANTREAN_PEMERIKSAAN_MANUAL_ERROR,
} from "./actionType";

const INIT_STATE = {
    getJadwalDokter: {
        data: [],
        loading: false,
        error: null,
    },
    getComboJadwal: {
        data: [],
        loading: false,
        error: null,
    },
    getBeritaHome: {
        data: [],
        loading: false,
        error: null,
    },
    getBeritaQuery: {
        data: [],
        loading: false,
        error: null,
    },
    getCaptcha: {
        data: [],
        loading: false,
        error: null
    },
    getAllBed: {
        data: [],
        loading: false,
        error: null
    },
    getAntreanPemeriksaanManual: {
        data: [],
        loading: false,
        error: null
    },
}

const login = (state = INIT_STATE, action) => {
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

        
        case GET_COMBO_JADWAL: 
            return {
                ...state,
                getComboJadwal: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_COMBO_JADWAL_SUCCESS:
            return {
                ...state,
                getComboJadwal: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        
        case GET_COMBO_JADWAL_ERROR:
            return {
                ...state,
                getComboJadwal: {
                    ...state.loginUser,
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_BERITA_HOME:
            return {
                ...state,
                getBeritaHome: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_BERITA_HOME_SUCCESS:
            return {
                ...state,
                getBeritaHome: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_BERITA_HOME_ERROR:
            return {
                ...state,
                getBeritaHome: {
                    ...state.loginUser,
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_BERITA_QUERY:
            return {
                ...state,
                getBeritaQuery: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_BERITA_QUERY_SUCCESS:
            return {
                ...state,
                getBeritaQuery: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_BERITA_QUERY_ERROR:
            return {
                ...state,
                getBeritaQuery: {
                    ...state.loginUser,
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_CAPTCHA:
            return {
                ...state,
                getCaptcha: {
                    ...state.getCaptcha,
                    data: [],
                    loading: true,
                    error: null,
                }
            }

        case GET_CAPTCHA_SUCCESS:
            return {
                ...state,
                getCaptcha: {
                    ...state.getCaptcha,
                    data: action.payload,
                    loading: true,
                    error: null,
                }
            }

        
        case GET_CAPTCHA_ERROR:
            return {
                ...state,
                getCaptcha: {
                    ...state.getCaptcha,
                    data: [],
                    loading: true,
                    error: action.payload,
                }
            }

        case GET_ALL_BED:
            return {
                ...state,
                getAllBed: {
                    ...state.getAllBed,
                    data: [],
                    loading: true,
                    error: null,
                }
            }

        case GET_ALL_BED_SUCCESS:
            return {
                ...state,
                getAllBed: {
                    ...state.getAllBed,
                    data: action.payload,
                    loading: true,
                    error: null,
                }
            }

        
        case GET_ALL_BED_ERROR:
            return {
                ...state,
                getAllBed: {
                    ...state.getAllBed,
                    data: [],
                    loading: true,
                    error: action.payload,
                }
            }

        
        case GET_ANTREAN_PEMERIKSAAN_MANUAL:
            return {
                ...state,
                getAntreanPemeriksaanManual: {
                    ...state.getAntreanPemeriksaanManual,
                    loading: true,
                    error: null,
                },
            };

        case GET_ANTREAN_PEMERIKSAAN_MANUAL_SUCCESS:
            return {
                ...state,
                getAntreanPemeriksaanManual: {
                    ...state.getAntreanPemeriksaanManual,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_ANTREAN_PEMERIKSAAN_MANUAL_ERROR:
            return {
                ...state,
                getAntreanPemeriksaanManual: {
                    ...state.getAntreanPemeriksaanManual,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
    

        default:
            return { ...state };
    }
};


export default login;