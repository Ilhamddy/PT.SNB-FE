import {
    MASTER_GET,
    MASTER_GET_SUCCESS,
    MASTER_GET_ERROR,
    DESA_GET,
    DESA_GET_SUCCESS,
    DESA_GET_ERROR,
    KECAMATAN_GET,
    KECAMATAN_GET_SUCCESS,
    KECAMATAN_GET_ERROR,
    OMBO_REGISTRASI_GET,
    COMBO_REGISTRASI_GET_SUCCESS,
    COMBO_REGISTRASI_GET_ERROR,
    COMBO_REGISTRASI_GET,
    COMBO_ASURANSI_GET,
    COMBO_ASURANSI_GET_SUCCESS,
    COMBO_ASURANSI_GET_ERROR,
} from "./actionType";

const INIT_STATE = {
    masterGet: {
        data: [],
        loading: false,
        error: null,
    },
    desaGet: {
        data: [],
        loading: false,
        error: null,
    },
    kecamatanGet: {
        data: [],
        loading: false,
        error: null,
    },
    comboRegistrasiGet: {
        data: [],
        loading: false,
        error: null,
    },
    comboAsuransiGet: {
        data: [],
        loading: false,
        error: null,
    },
};

const Master = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MASTER_GET: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case MASTER_GET_SUCCESS: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case MASTER_GET_ERROR: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DESA_GET: {
            return {
                ...state,
                desaGet: {
                    ...state.desaGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DESA_GET_SUCCESS: {
            return {
                ...state,
                desaGet: {
                    ...state.desaGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DESA_GET_ERROR: {
            return {
                ...state,
                desaGet: {
                    ...state.desaGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case KECAMATAN_GET: {
            return {
                ...state,
                kecamatanGet: {
                    ...state.kecamatanGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case KECAMATAN_GET_SUCCESS: {
            return {
                ...state,
                kecamatanGet: {
                    ...state.kecamatanGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case KECAMATAN_GET_ERROR: {
            return {
                ...state,
                kecamatanGet: {
                    ...state.kecamatanGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_REGISTRASI_GET: {
            return {
                ...state,
                comboRegistrasiGet: {
                    ...state.comboRegistrasiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_REGISTRASI_GET_SUCCESS: {
            return {
                ...state,
                comboRegistrasiGet: {
                    ...state.comboRegistrasiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_REGISTRASI_GET_ERROR: {
            return {
                ...state,
                comboRegistrasiGet: {
                    ...state.comboRegistrasiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_ASURANSI_GET: {
            return {
                ...state,
                comboAsuransiGet: {
                    ...state.comboAsuransiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_ASURANSI_GET_SUCCESS: {
            return {
                ...state,
                comboAsuransiGet: {
                    ...state.comboAsuransiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_ASURANSI_GET_ERROR: {
            return {
                ...state,
                comboAsuransiGet: {
                    ...state.comboAsuransiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        default: {
            return { ...state };
        }
    }
}

export default Master;