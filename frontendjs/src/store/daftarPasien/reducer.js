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


        default: {
            return { ...state };
        }
    }
};

export default DaftarPasien;