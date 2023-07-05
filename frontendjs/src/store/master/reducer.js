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
    PROVINSI_GET_BPJS,
    PROVINSI_GET_BPJS_SUCCESS,
    PROVINSI_GET_BPJS_ERROR,
    KABUPATEN_GET_BPJS,
    KABUPATEN_GET_BPJS_SUCCESS,
    KABUPATEN_GET_BPJS_ERROR,
    KECAMATAN_GET_BPJS,
    KECAMATAN_GET_BPJS_SUCCESS,
    KECAMATAN_GET_BPJS_ERROR,
    COMBO_PULANG_GET,
    COMBO_PULANG_GET_SUCCESS,
    COMBO_PULANG_GET_ERROR,
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
    provinsiBpjs: {
        data: [],
        loading: false,
        error: null,
    },
    kabupatenBpjs: {
        data: [],
        loading: false,
        error: null,
    },
    kecamatanBpjs: {
        data: [],
        loading: false,
        error: null,
    },
    comboPulangGet: {
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

        case PROVINSI_GET_BPJS: {
            return {
                ...state,
                provinsiBpjs: {
                    ...state.provinsiBpjs,
                    loading: true,
                    error: null,
                }
            }
        }

        case PROVINSI_GET_BPJS_SUCCESS: {
            return {
                ...state,
                provinsiBpjs: {
                    ...state.provinsiBpjs,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case PROVINSI_GET_BPJS_ERROR: {
            return {
                ...state,
                provinsiBpjs: {
                    ...state.provinsiBpjs,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case KABUPATEN_GET_BPJS: {
            return {
                ...state,
                kabupatenBpjs: {
                    ...state.kabupatenBpjs,
                    loading: true,
                    error: null,
                }
            }
        }

        case KABUPATEN_GET_BPJS_SUCCESS: {
            return {
                ...state,
                kabupatenBpjs: {
                    ...state.kabupatenBpjs,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case KABUPATEN_GET_BPJS_ERROR: {
            return {
                ...state,
                kabupatenBpjs: {
                    ...state.kabupatenBpjs,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case KECAMATAN_GET_BPJS: {
            return {
                ...state,
                kecamatanBpjs: {
                    ...state.kecamatanBpjs,
                    loading: true,
                    error: null,
                }
            }
        }

        case KECAMATAN_GET_BPJS_SUCCESS: {
            return {
                ...state,
                kecamatanBpjs: {
                    ...state.kecamatanBpjs,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case KECAMATAN_GET_BPJS_ERROR: {
            return {
                ...state,
                kecamatanBpjs: {
                    ...state.kecamatanBpjs,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_PULANG_GET: {
            return {
                ...state,
                comboPulangGet: {
                    ...state.comboPulangGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_PULANG_GET_SUCCESS: {
            return {
                ...state,
                comboPulangGet: {
                    ...state.comboPulangGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_PULANG_GET_ERROR: {
            return {
                ...state,
                comboPulangGet: {
                    ...state.comboPulangGet,
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