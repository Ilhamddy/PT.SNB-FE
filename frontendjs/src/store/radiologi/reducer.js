import {
    RADIOLOGI_RESET_FORM,
    SAVE_ORDER_PELAYANAN_RADIOLOGI,
    SAVE_ORDER_PELAYANAN_RADIOLOGI_SUCCESS,
    SAVE_ORDER_PELAYANAN_RADIOLOGI_ERROR,
    DAFTAR_ORDER_RADIOLOGI_GET,
    DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET,
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    saveOrderPelayananRadiologi: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    daftarOrderRadiologiGet: {
        data: [],
        loading: false,
        error: null,
    },
    widgetdaftarOrderRadiologiGet: {
        data: [],
        loading: false,
        error: null,
    },
}

const Radiologi = (state = INIT_STATE, action) => {
    switch (action.type) {
        case RADIOLOGI_RESET_FORM: {
            return {
                ...state,
                saveOrderPelayananRadiologi:{
                    ...INIT_STATE.saveOrderPelayananRadiologi
                },
                daftarOrderRadiologiGet:{
                    ...INIT_STATE.daftarOrderRadiologiGet
                },
                widgetdaftarOrderRadiologiGet:{
                    ...INIT_STATE.widgetdaftarOrderRadiologiGet
                }
            }
        }

        
        case SAVE_ORDER_PELAYANAN_RADIOLOGI: {
            return {
                ...state,
                saveOrderPelayananRadiologi: {
                    ...state.saveOrderPelayananRadiologi,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_ORDER_PELAYANAN_RADIOLOGI_SUCCESS: {
            return {
                ...state,
                saveOrderPelayananRadiologi: {
                    ...state.saveOrderPelayananRadiologi,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_ORDER_PELAYANAN_RADIOLOGI_ERROR: {
            return {
                ...state,
                saveOrderPelayananRadiologi: {
                    ...state.saveOrderPelayananRadiologi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTAR_ORDER_RADIOLOGI_GET: {
            return {
                ...state,
                daftarOrderRadiologiGet: {
                    ...state.daftarOrderRadiologiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS: {
            return {
                ...state,
                daftarOrderRadiologiGet: {
                    ...state.daftarOrderRadiologiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTAR_ORDER_RADIOLOGI_GET_ERROR: {
            return {
                ...state,
                daftarOrderRadiologiGet: {
                    ...state.daftarOrderRadiologiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case WIDGET_DAFTAR_ORDER_RADIOLOGI_GET: {
            return {
                ...state,
                widgetdaftarOrderRadiologiGet: {
                    ...state.widgetdaftarOrderRadiologiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS: {
            return {
                ...state,
                widgetdaftarOrderRadiologiGet: {
                    ...state.widgetdaftarOrderRadiologiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_ERROR: {
            return {
                ...state,
                widgetdaftarOrderRadiologiGet: {
                    ...state.widgetdaftarOrderRadiologiGet,
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
export default Radiologi;