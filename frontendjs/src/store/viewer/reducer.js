import {
    GET_LOKET_SISA,
    GET_LOKET_SISA_SUCCESS,
    GET_LOKET_SISA_ERROR,
    PANGGIL_LOKET,
    PANGGIL_LOKET_SUCCESS,
    PANGGIL_LOKET_ERROR,
    GET_ALL_LOKET,
    GET_ALL_LOKET_SUCCESS,
    GET_ALL_LOKET_ERROR,
    GET_ALL_TERPANGGIL,
    GET_ALL_TERPANGGIL_SUCCESS,
    GET_ALL_TERPANGGIL_ERROR,
    PANGGIL_ULANG_ANTREAN,
    PANGGIL_ULANG_ANTREAN_SUCCESS,
    PANGGIL_ULANG_ANTREAN_ERROR,
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
    GET_JADWAL_OPERASI,
    GET_JADWAL_OPERASI_SUCCESS,
    GET_JADWAL_OPERASI_ERROR,
    GET_ALL_BED,
    GET_ALL_BED_SUCCESS,
    GET_ALL_BED_ERROR
} from "./actionType";

const INIT_STATE = {
    getAntreanLoketSisa: {
        data: [],
        loading: false,
        error: null,
    },
    panggilLoket: {
        data: [],
        loading: false,
        error: null,
    },
    getAllLoket: {
        data: [],
        loading: false,
        error: null,
    },
    getAllTerpanggil: {
        data: [],
        loading: false,
        error: null,
    },
    panggilUlangAntrean: {
        data: [],
        loading: false, 
        error: null,
    },
    getJadwalDokter: {
        data: [],
        loading: false,
        error: null,
    },
    getJadwalOperasi: {
        data: [],
        loading: false,
        error: null,
    },
    getAllBed: {
        data: [],
        loading: false,
        error: null,
    }
};

const Viewer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LOKET_SISA: {
            return {
                ...state,
                getAntreanLoketSisa: {
                    ...state.getAntreanLoketSisa,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LOKET_SISA_SUCCESS: {
            console.log('GET_LOKET_SISA_SUCCESS', action.payload)
            if(JSON.stringify(action.payload) === JSON.stringify(state.getAntreanLoketSisa.data)){
                return state
            }
            return {
                ...state,
                getAntreanLoketSisa: {
                    ...state.getAntreanLoketSisa,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_LOKET_SISA_ERROR: {
            return {
                ...state,
                getAntreanLoketSisa: {
                    ...state.getAntreanLoketSisa,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case PANGGIL_LOKET: {
            return {
                ...state,
                panggilLoket: {
                    ...state.panggilLoket,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case PANGGIL_LOKET_SUCCESS: {
            return {
                ...state,
                panggilLoket: {
                    ...state.panggilLoket,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case PANGGIL_LOKET_ERROR: {
            return {
                ...state,
                panggilLoket: {
                    ...state.panggilLoket,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_ALL_LOKET: {
            return state
        }

        case GET_ALL_LOKET_SUCCESS: {
            // TODO: pakai long polling
            if(JSON.stringify(action.payload) === JSON.stringify(state.getAllLoket.data)){
                return state
            }
            return {
                ...state,
                getAllLoket: {
                    ...state.getAllLoket,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_ALL_LOKET_ERROR: {
            return {
                ...state,
                getAllLoket: {
                    ...state.getAllLoket,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_ALL_TERPANGGIL: {
            return {
                ...state,
                getAllTerpanggil: {
                    ...state.getAllTerpanggil,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_ALL_TERPANGGIL_SUCCESS: {
            return {
                ...state,
                getAllTerpanggil: {
                    ...state.getAllTerpanggil,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_ALL_TERPANGGIL_ERROR: {
            return {
                ...state,
                getAllTerpanggil: {
                    ...state.getAllTerpanggil,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case PANGGIL_ULANG_ANTREAN: {
            return {
                ...state,
                panggilUlangAntrean: {
                    ...state.panggilUlangAntrean,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case PANGGIL_ULANG_ANTREAN_SUCCESS: {
            return {
                ...state,
                panggilUlangAntrean: {
                    ...state.panggilUlangAntrean,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case PANGGIL_ULANG_ANTREAN_ERROR: {
            return {
                ...state,
                panggilUlangAntrean: {
                    ...state.panggilUlangAntrean,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_JADWAL_DOKTER: {
            return {
                ...state,
                getJadwalDokter: {
                    ...state.getJadwalDokter,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_JADWAL_DOKTER_SUCCESS: {
            return {
                ...state,
                getJadwalDokter: {
                    ...state.getJadwalDokter,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_JADWAL_DOKTER_ERROR: {
            return {
                ...state,
                getJadwalDokter: {
                    ...state.getJadwalDokter,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_JADWAL_OPERASI: {
            return {
                ...state,
                getJadwalOperasi: {
                    ...state.getJadwalOperasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_JADWAL_OPERASI_SUCCESS: {
            return {
                ...state,
                getJadwalOperasi: {
                    ...state.getJadwalOperasi,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_JADWAL_OPERASI_ERROR: {
            return {
                ...state,
                getJadwalOperasi: {
                    ...state.getJadwalOperasi,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_ALL_BED: {
            return {
                ...state,
                getAllBed: {
                    ...state.getAllBed,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_ALL_BED_SUCCESS: {
            return {
                ...state,
                getAllBed: {
                    ...state.getAllBed,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_ALL_BED_ERROR: {
            return {
                ...state,
                getAllBed: {
                    ...state.getAllBed,
                    loading: false,
                    error: action.payload,
                }
            }
        }


        default: return { ...state };
    }
}

export default Viewer