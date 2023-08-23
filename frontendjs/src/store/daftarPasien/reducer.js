import {
    DAFTARPASIEN_RESET_FORM,
    DAFTARPASIEN_RJ_GET,
    DAFTARPASIEN_RJ_GET_SUCCESS,
    DAFTARPASIEN_RJ_GET_ERROR,
    WIDGET_DAFTARPASIEN_RJ_GET,
    WIDGET_DAFTARPASIEN_RJ_GET_SUCCESS,
    WIDGET_DAFTARPASIEN_RJ_GET_ERROR,
    WIDGET_DAFTARPASIEN_RI_GET,
    WIDGET_DAFTARPASIEN_RI_GET_SUCCESS,
    WIDGET_DAFTARPASIEN_RI_GET_ERROR,
    DAFTARPASIEN_RI_GET,
    DAFTARPASIEN_RI_GET_SUCCESS,
    DAFTARPASIEN_RI_GET_ERROR,
    DAFTARPASIEN_PULANG_GET,
    DAFTARPASIEN_PULANG_GET_SUCCESS,
    DAFTARPASIEN_PULANG_GET_ERROR,
    DAFTARPASIEN_RI_PULANG_SAVE,
    DAFTARPASIEN_RI_PULANG_SAVE_SUCCESS,
    DAFTARPASIEN_RI_PULANG_SAVE_ERROR,
    LIST_FASKES_GET,
    LIST_FASKES_GET_SUCCESS,
    LIST_FASKES_GET_ERROR,
    DAFTARPASIEN_NOREC_GET,
    DAFTARPASIEN_NOREC_GET_SUCCESS,
    DAFTARPASIEN_NOREC_GET_ERROR,
    DAFTARPASIEN_NOREC_GET_RESET,
    ANTREAN_NOREC_GET,
    ANTREAN_NOREC_GET_SUCCESS,
    ANTREAN_NOREC_GET_ERROR,
    ANTREAN_NOREC_GET_RESET,
    DAFTARPASIEN_REGISTRASI_GET,
    DAFTARPASIEN_REGISTRASI_GET_SUCCESS,
    DAFTARPASIEN_REGISTRASI_GET_ERROR,
    WIDGET_DAFTARPASIEN_REGISTRASI_GET,
    WIDGET_DAFTARPASIEN_REGISTRASI_GET_SUCCESS,
    WIDGET_DAFTARPASIEN_REGISTRASI_GET_ERROR,
    LIST_PASIEN_MUTASI_GET,
    LIST_PASIEN_MUTASI_GET_SUCCESS,
    LIST_PASIEN_MUTASI_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    daftarPasienRJGet: {
        data: [],
        loading: false,
        error: null,
    },
    widgetdaftarPasienRJGet: {
        data: [],
        loading: false,
        error: null,
    },
    widgetdaftarPasienRIGet: {
        data: [],
        loading: false,
        error: null,
    },
    daftarPasienRIGet: {
        data: [],
        loading: false,
        error: null,
    },
    daftarPasienPulangGet: {
        data: [],
        loading: false,
        error: null,
    },
    daftarPasienRIPulangSave: {
        data: [],
        loading: false,
        error: null,
    },
    listFaskesGet: {
        data: [],
        loading: false,
        error: null,    
    },
    daftarPasienNoRecGet: {
        data: [],
        loading: false,
        error: null,
    },
    antreanNoRecGet: {
        data: [],
        loading: false,
        error: null,
    },
    daftarPasienRegistrasiGet: {
        data: [],
        loading: false,
        error: null,
    },
    widgetdaftarPasienRegistrasiGet: {
        data: [],
        loading: false,
        error: null,
    },
    listPasienMutasiGet:{
        data: [],
        loading: false,
        error: null,
    }
};

const DaftarPasien = (state = INIT_STATE, action) => {
    switch (action.type) {
        case DAFTARPASIEN_RESET_FORM: {
            return {
                ...state,
                daftarPasienRJGet:{
                    ...INIT_STATE.daftarPasienRJGet,
                },
                daftarPasienRIGet:{
                    ...INIT_STATE.daftarPasienRIGet,
                },
                daftarPasienRegistrasiGet:{
                    ...INIT_STATE.daftarPasienRegistrasiGet
                },
                widgetdaftarPasienRegistrasiGet:{
                    ...INIT_STATE.widgetdaftarPasienRegistrasiGet
                },
                listPasienMutasiGet:{
                    ...INIT_STATE.listPasienMutasiGet
                }
            }
        }

        case DAFTARPASIEN_RJ_GET: {
            return {
                ...state,
                daftarPasienRJGet: {
                    ...state.daftarPasienRJGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTARPASIEN_RJ_GET_SUCCESS: {
            return {
                ...state,
                daftarPasienRJGet: {
                    ...state.daftarPasienRJGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTARPASIEN_RJ_GET_ERROR: {
            return {
                ...state,
                daftarPasienRJGet: {
                    ...state.daftarPasienRJGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_RJ_GET: {
            return {
                ...state,
                widgetdaftarPasienRJGet: {
                    ...state.widgetdaftarPasienRJGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_RJ_GET_SUCCESS: {
            return {
                ...state,
                widgetdaftarPasienRJGet: {
                    ...state.widgetdaftarPasienRJGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_RJ_GET_ERROR: {
            return {
                ...state,
                widgetdaftarPasienRJGet: {
                    ...state.widgetdaftarPasienRJGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_RI_GET: {
            return {
                ...state,
                widgetdaftarPasienRIGet: {
                    ...state.widgetdaftarPasienRIGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_RI_GET_SUCCESS: {
            return {
                ...state,
                widgetdaftarPasienRIGet: {
                    ...state.widgetdaftarPasienRIGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_RI_GET_ERROR: {
            return {
                ...state,
                widgetdaftarPasienRIGet: {
                    ...state.widgetdaftarPasienRIGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTARPASIEN_RI_GET: {
            return {
                ...state,
                daftarPasienRIGet: {
                    ...state.daftarPasienRIGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTARPASIEN_RI_GET_SUCCESS: {
            return {
                ...state,
                daftarPasienRIGet: {
                    ...state.daftarPasienRIGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTARPASIEN_RI_GET_ERROR: {
            return {
                ...state,
                daftarPasienRIGet: {
                    ...state.daftarPasienRIGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTARPASIEN_PULANG_GET: {
            return {
                ...state,
                daftarPasienPulangGet: {
                    ...state.daftarPasienPulangGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTARPASIEN_PULANG_GET_SUCCESS: {
            return {
                ...state,
                daftarPasienPulangGet: {
                    ...state.daftarPasienPulangGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTARPASIEN_PULANG_GET_ERROR: {
            return {
                ...state,
                daftarPasienPulangGet: {
                    ...state.daftarPasienPulangGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTARPASIEN_RI_PULANG_SAVE: {
            return {
                ...state,
                daftarPasienRIPulangSave: {
                    ...state.daftarPasienRIPulangSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTARPASIEN_RI_PULANG_SAVE_SUCCESS: {
            return {
                ...state,
                daftarPasienRIPulangSave: {
                    ...state.daftarPasienRIPulangSave,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTARPASIEN_RI_PULANG_SAVE_ERROR: {
            return {
                ...state,
                daftarPasienRIPulangSave: {
                    ...state.daftarPasienRIPulangSave,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case LIST_FASKES_GET: {
            return {
                ...state,
                listFaskesGet: {
                    ...state.listFaskesGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_FASKES_GET_SUCCESS: {
            return {
                ...state,
                listFaskesGet: {
                    ...state.listFaskesGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_FASKES_GET_ERROR: {
            return {
                ...state,
                listFaskesGet: {
                    ...state.listFaskesGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTARPASIEN_NOREC_GET: {
            return {
                ...state,
                daftarPasienNoRecGet: {
                    ...state.daftarPasienNoRecGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTARPASIEN_NOREC_GET_SUCCESS: {
            return {
                ...state,
                daftarPasienNoRecGet: {
                    ...state.daftarPasienNoRecGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTARPASIEN_NOREC_GET_ERROR: {
            return {
                ...state,
                daftarPasienNoRecGet: {
                    ...state.daftarPasienNoRecGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTARPASIEN_NOREC_GET_RESET: {
            return {
                ...state,
                daftarPasienNoRecGet: {
                    ...state.daftarPasienNoRecGet,
                    data: [],
                    loading: false,
                    error: null,
                }
            }
        }

        case ANTREAN_NOREC_GET: {
            return {
                ...state,
                antreanNoRecGet: {
                    ...state.antreanNoRecGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case ANTREAN_NOREC_GET_SUCCESS: {
            return {
                ...state,
                antreanNoRecGet: {
                    ...state.antreanNoRecGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case ANTREAN_NOREC_GET_ERROR: {
            return {
                ...state,
                antreanNoRecGet: {
                    ...state.antreanNoRecGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case ANTREAN_NOREC_GET_RESET: {
            return {
                ...state,
                antreanNoRecGet: {
                    ...state.antreanNoRecGet,
                    data: [],
                    loading: false,
                    error: null,
                }
            }
        }

        case DAFTARPASIEN_REGISTRASI_GET: {
            return {
                ...state,
                daftarPasienRegistrasiGet: {
                    ...state.daftarPasienRegistrasiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTARPASIEN_REGISTRASI_GET_SUCCESS: {
            return {
                ...state,
                daftarPasienRegistrasiGet: {
                    ...state.daftarPasienRegistrasiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTARPASIEN_REGISTRASI_GET_ERROR: {
            return {
                ...state,
                daftarPasienRegistrasiGet: {
                    ...state.daftarPasienRegistrasiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_REGISTRASI_GET: {
            return {
                ...state,
                widgetdaftarPasienRegistrasiGet: {
                    ...state.widgetdaftarPasienRegistrasiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_REGISTRASI_GET_SUCCESS: {
            return {
                ...state,
                widgetdaftarPasienRegistrasiGet: {
                    ...state.widgetdaftarPasienRegistrasiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_DAFTARPASIEN_REGISTRASI_GET_ERROR: {
            return {
                ...state,
                widgetdaftarPasienRegistrasiGet: {
                    ...state.widgetdaftarPasienRegistrasiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_PASIEN_MUTASI_GET: {
            return {
                ...state,
                listPasienMutasiGet: {
                    ...state.listPasienMutasiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_PASIEN_MUTASI_GET_SUCCESS: {
            return {
                ...state,
                listPasienMutasiGet: {
                    ...state.listPasienMutasiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_PASIEN_MUTASI_GET_ERROR: {
            return {
                ...state,
                listPasienMutasiGet: {
                    ...state.listPasienMutasiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }


        default: {
            return { ...state };
        }
    }
};

export default DaftarPasien;