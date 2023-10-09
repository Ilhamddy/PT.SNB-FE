import {
    BEDAH_SENTRAL_RESET_FORM,
    WIDGET_ORDER_OPERASI_GET,
    WIDGET_ORDER_OPERASI_GET_SUCCESS,
    WIDGET_ORDER_OPERASI_GET_ERROR,
    GET_DAFTAR_ORDER_OPERASI,
    GET_DAFTAR_ORDER_OPERASI_SUCCESS,
    GET_DAFTAR_ORDER_OPERASI_ERROR,
    GET_COMBO_ORDER_OPERASI,
    GET_COMBO_ORDER_OPERASI_SUCCESS,
    GET_COMBO_ORDER_OPERASI_ERROR,
    UPDATE_ORDER_OPERASI,
    UPDATE_ORDER_OPERASI_SUCCESS,
    UPDATE_ORDER_OPERASI_ERROR,
    GET_DAFTAR_PASIEN_OPERASI,
    GET_DAFTAR_PASIEN_OPERASI_SUCCESS,
    GET_DAFTAR_PASIEN_OPERASI_ERROR
} from "./actionType";

const INIT_STATE = {
    widgetOrderOperasiGet: {
        data: [],
        loading: false,
        error: null,
    },
    getDaftarOrderOperasi: {
        data: [],
        loading: false,
        error: null,
    },
    getComboOrderOperasi:{
        data: [],
        loading: false,
        error: null,
    },
    updateOrderOperasi: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getDaftarPasienOperasi:{
        data: [],
        loading: false,
        error: null,
    }
}

const BedahSentral = (state = INIT_STATE, action) => {
    switch (action.type) {
        case BEDAH_SENTRAL_RESET_FORM: {
            return {
                ...state,
                widgetOrderOperasiGet:{
                    ...INIT_STATE.widgetOrderOperasiGet
                },
                getDaftarOrderOperasi:{
                    ...INIT_STATE.getDaftarOrderOperasi
                },
                getComboOrderOperasi:{
                    ...INIT_STATE.getComboOrderOperasi
                },
                updateOrderOperasi:{
                    ...INIT_STATE.updateOrderOperasi
                },
                getDaftarPasienOperasi:{
                    ...INIT_STATE.getDaftarPasienOperasi
                }
            }
        }

        case WIDGET_ORDER_OPERASI_GET: {
            return {
                ...state,
                widgetOrderOperasiGet: {
                    ...state.widgetOrderOperasiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_ORDER_OPERASI_GET_SUCCESS: {
            return {
                ...state,
                widgetOrderOperasiGet: {
                    ...state.widgetOrderOperasiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_ORDER_OPERASI_GET_ERROR: {
            return {
                ...state,
                widgetOrderOperasiGet: {
                    ...state.widgetOrderOperasiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_DAFTAR_ORDER_OPERASI: {
            return {
                ...state,
                getDaftarOrderOperasi: {
                    ...state.getDaftarOrderOperasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_DAFTAR_ORDER_OPERASI_SUCCESS: {
            return {
                ...state,
                getDaftarOrderOperasi: {
                    ...state.getDaftarOrderOperasi,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_DAFTAR_ORDER_OPERASI_ERROR: {
            return {
                ...state,
                getDaftarOrderOperasi: {
                    ...state.getDaftarOrderOperasi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_COMBO_ORDER_OPERASI: {
            return {
                ...state,
                getComboOrderOperasi: {
                    ...state.getComboOrderOperasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_ORDER_OPERASI_SUCCESS: {
            return {
                ...state,
                getComboOrderOperasi: {
                    ...state.getComboOrderOperasi,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_ORDER_OPERASI_ERROR: {
            return {
                ...state,
                getComboOrderOperasi: {
                    ...state.getComboOrderOperasi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPDATE_ORDER_OPERASI: {
            return {
                ...state,
                updateOrderOperasi: {
                    ...state.updateOrderOperasi,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case UPDATE_ORDER_OPERASI_SUCCESS: {
            return {
                ...state,
                updateOrderOperasi: {
                    ...state.updateOrderOperasi,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case UPDATE_ORDER_OPERASI_ERROR: {
            return {
                ...state,
                updateOrderOperasi: {
                    ...state.updateOrderOperasi,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_DAFTAR_PASIEN_OPERASI: {
            return {
                ...state,
                getDaftarPasienOperasi: {
                    ...state.getDaftarPasienOperasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_DAFTAR_PASIEN_OPERASI_SUCCESS: {
            return {
                ...state,
                getDaftarPasienOperasi: {
                    ...state.getDaftarPasienOperasi,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_DAFTAR_PASIEN_OPERASI_ERROR: {
            return {
                ...state,
                getDaftarPasienOperasi: {
                    ...state.getDaftarPasienOperasi,
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
export default BedahSentral;