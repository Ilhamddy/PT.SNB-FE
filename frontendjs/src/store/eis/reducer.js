import {
    GET_PASIEN_RJ,
    GET_PASIEN_RJ_SUCCESS,
    GET_PASIEN_RJ_ERROR,
    GET_PASIEN_IGD,
    GET_PASIEN_IGD_SUCCESS,
    GET_PASIEN_IGD_ERROR,
    GET_PASIEN_RANAP,
    GET_PASIEN_RANAP_SUCCESS,
    GET_PASIEN_RANAP_ERROR,
    GET_COUNT_CARA_BAYAR,
    GET_COUNT_CARA_BAYAR_SUCCESS,
    GET_COUNT_CARA_BAYAR_ERROR,
    GET_POLIKLINIK_TERBANYAK,
    GET_POLIKLINIK_TERBANYAK_SUCCESS,
    GET_POLIKLINIK_TERBANYAK_ERROR
} from "./actionType";
  
const INIT_STATE = {
    getPasienRJ: {
        data: [],
        loading: false,
        error: null
    },
    getPasienIGD: {
        data: [],
        loading: false,
        error: null
    },
    getPasienRanap: {
        data: [],
        loading: false,
        error: null
    },
    getCountCaraBayar: {
        data: [],
        loading: false,
        error: null
    },
    getPoliklinikTerbanyak: {
        data: [],
        loading: false,
        error: null
    }
};
  
const Eis = (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case GET_PASIEN_RJ: {
            return {
                ...state,
                getPasienRJ: {
                    ...state.getPasienRJ,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_PASIEN_RJ_SUCCESS: {
            return {
                ...state,
                getPasienRJ: {
                    ...state.getPasienRJ,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_PASIEN_RJ_ERROR: {
            return {
                ...state,
                getPasienRJ: {
                    ...state.getPasienRJ,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_PASIEN_IGD: {
            return {
                ...state,
                getPasienIGD: {
                    ...state.getPasienIGD,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_PASIEN_IGD_SUCCESS: {
            return {
                ...state,
                getPasienIGD: {
                    ...state.getPasienIGD,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_PASIEN_IGD_ERROR: {
            return {
                ...state,
                getPasienIGD: {
                    ...state.getPasienIGD,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        
        case GET_PASIEN_RANAP: {
            return {
                ...state,
                getPasienRanap: {
                    ...state.getPasienRanap,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_PASIEN_RANAP_SUCCESS: {
            return {
                ...state,
                getPasienRanap: {
                    ...state.getPasienRanap,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_PASIEN_RANAP_ERROR: {
            return {
                ...state,
                getPasienRanap: {
                    ...state.getPasienRanap,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_COUNT_CARA_BAYAR: {
            return {
                ...state,
                getCountCaraBayar: {
                    ...state.getCountCaraBayar,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_COUNT_CARA_BAYAR_SUCCESS: {
            return {
                ...state,
                getCountCaraBayar: {
                    ...state.getCountCaraBayar,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_COUNT_CARA_BAYAR_ERROR: {
            return {
                ...state,
                getCountCaraBayar: {
                    ...state.getCountCaraBayar,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_POLIKLINIK_TERBANYAK: {
            return {
                ...state,
                getPoliklinikTerbanyak: {
                    ...state.getPoliklinikTerbanyak,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_POLIKLINIK_TERBANYAK_SUCCESS: {
            return {
                ...state,
                getPoliklinikTerbanyak: {
                    ...state.getPoliklinikTerbanyak,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_POLIKLINIK_TERBANYAK_ERROR: {
            return {
                ...state,
                getPoliklinikTerbanyak: {
                    ...state.getPoliklinikTerbanyak,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        default: {
            return { ...state };
        }
    }
}

export default Eis;