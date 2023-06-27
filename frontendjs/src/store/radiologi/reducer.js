import { init } from "aos";
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
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    LIST_DAFTAR_ORDER_RADIOLOGI_GET,
    LIST_DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS,
    LIST_DAFTAR_ORDER_RADIOLOGI_GET_ERROR,
    LIST_ORDER_BY_NOREC_GET,
    LIST_ORDER_BY_NOREC_GET_SUCCESS,
    LIST_ORDER_BY_NOREC_GET_ERROR,
    LIST_KAMAR_RADIOLOGI_GET,
    LIST_KAMAR_RADIOLOGI_GET_SUCCESS,
    LIST_KAMAR_RADIOLOGI_GET_ERROR,
    UPDATE_TGLRENCANA_RADIOLOGI,
    UPDATE_TGLRENCANA_RADIOLOGI_SUCCESS,
    UPDATE_TGLRENCANA_RADIOLOGI_ERROR,
    SAVE_VERIFIKASI_RADIOLOGI,
    SAVE_VERIFIKASI_RADIOLOGI_SUCCESS,
    SAVE_VERIFIKASI_RADIOLOGI_ERROR,
    DELETE_ORDER_PELAYANAN,
    DELETE_ORDER_PELAYANAN_SUCCESS,
    DELETE_ORDER_PELAYANAN_ERROR,
    DELETE_DETAIL_ORDER_PELAYANAN,
    DELETE_DETAIL_ORDER_PELAYANAN_SUCCESS,
    DELETE_DETAIL_ORDER_PELAYANAN_ERROR,
    DAFTAR_PASIEN_RADIOLOGI,
    DAFTAR_PASIEN_RADIOLOGI_SUCCESS,
    DAFTAR_PASIEN_RADIOLOGI_ERROR,
    LIST_PELAYANAN_RADIOLOGI_GET,
    LIST_PELAYANAN_RADIOLOGI_GET_SUCCESS,
    LIST_PELAYANAN_RADIOLOGI_GET_ERROR
} from "./actionType";
import { DELETE_ORDER } from "../ecommerce/actionType";

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
    listdaftarOrderRadiologiGet: {
        data: [],
        loading: false,
        error: null,
    },
    listOrderByNorecGet:{
        data:[],
        loading: false,
        error: null,
    },
    listKamarRadiologiGet:{
        data:[],
        loading: false,
        error: null, 
    },
    updateTglRencanaRadiologi:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    saveVerifikasiRadiologi:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    deleteOrderPelayanan:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    deleteDetailOrderPelayanan:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    daftarPasienRadiologi:{
        data:[],
        loading: false,
        error: null, 
    },
    listPelayananRadiologiGet:{
        data:[],
        loading: false,
        error: null, 
    }
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
                },
                listdaftarOrderRadiologiGet:{
                    ...INIT_STATE.listdaftarOrderRadiologiGet
                },
                listOrderByNorecGet:{
                    ...INIT_STATE.listOrderByNorecGet
                },
                listKamarRadiologiGet:{
                    ...INIT_STATE.listKamarRadiologiGet
                },
                updateTglRencanaRadiologi:{
                    ...INIT_STATE.updateTglRencanaRadiologi
                },
                saveVerifikasiRadiologi:{
                    ...INIT_STATE.saveVerifikasiRadiologi
                },
                deleteOrderPelayanan:{
                    ...INIT_STATE.deleteOrderPelayanan
                },
                deleteDetailOrderPelayanan:{
                    ...INIT_STATE.deleteDetailOrderPelayanan
                },
                daftarPasienRadiologi:{
                    ...INIT_STATE.daftarPasienRadiologi
                },
                listPelayananRadiologiGet:{
                    ...INIT_STATE.listPelayananRadiologiGet
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

        case LIST_DAFTAR_ORDER_RADIOLOGI_GET: {
            return {
                ...state,
                listdaftarOrderRadiologiGet: {
                    ...state.listdaftarOrderRadiologiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_DAFTAR_ORDER_RADIOLOGI_GET_SUCCESS: {
            return {
                ...state,
                listdaftarOrderRadiologiGet: {
                    ...state.listdaftarOrderRadiologiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_DAFTAR_ORDER_RADIOLOGI_GET_ERROR: {
            return {
                ...state,
                listdaftarOrderRadiologiGet: {
                    ...state.listdaftarOrderRadiologiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_ORDER_BY_NOREC_GET: {
            return {
                ...state,
                listOrderByNorecGet: {
                    ...state.listOrderByNorecGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_ORDER_BY_NOREC_GET_SUCCESS: {
            return {
                ...state,
                listOrderByNorecGet: {
                    ...state.listOrderByNorecGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_ORDER_BY_NOREC_GET_ERROR: {
            return {
                ...state,
                listOrderByNorecGet: {
                    ...state.listOrderByNorecGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_KAMAR_RADIOLOGI_GET: {
            return {
                ...state,
                listKamarRadiologiGet: {
                    ...state.listKamarRadiologiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_KAMAR_RADIOLOGI_GET_SUCCESS: {
            return {
                ...state,
                listKamarRadiologiGet: {
                    ...state.listKamarRadiologiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_KAMAR_RADIOLOGI_GET_ERROR: {
            return {
                ...state,
                listKamarRadiologiGet: {
                    ...state.listKamarRadiologiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPDATE_TGLRENCANA_RADIOLOGI: {
            return {
                ...state,
                updateTglRencanaRadiologi: {
                    ...state.updateTglRencanaRadiologi,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPDATE_TGLRENCANA_RADIOLOGI_SUCCESS: {
            return {
                ...state,
                updateTglRencanaRadiologi: {
                    ...state.updateTglRencanaRadiologi,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case UPDATE_TGLRENCANA_RADIOLOGI_ERROR: {
            return {
                ...state,
                updateTglRencanaRadiologi: {
                    ...state.updateTglRencanaRadiologi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_VERIFIKASI_RADIOLOGI: {
            return {
                ...state,
                saveVerifikasiRadiologi: {
                    ...state.saveVerifikasiRadiologi,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_VERIFIKASI_RADIOLOGI_SUCCESS: {
            return {
                ...state,
                saveVerifikasiRadiologi: {
                    ...state.saveVerifikasiRadiologi,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_VERIFIKASI_RADIOLOGI_ERROR: {
            return {
                ...state,
                saveVerifikasiRadiologi: {
                    ...state.saveVerifikasiRadiologi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DELETE_ORDER_PELAYANAN: {
            return {
                ...state,
                deleteOrderPelayanan: {
                    ...state.deleteOrderPelayanan,
                    loading: true,
                    error: null,
                }
            }
        }

        case DELETE_ORDER_PELAYANAN_SUCCESS: {
            return {
                ...state,
                deleteOrderPelayanan: {
                    ...state.deleteOrderPelayanan,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case DELETE_ORDER_PELAYANAN_ERROR: {
            return {
                ...state,
                deleteOrderPelayanan: {
                    ...state.deleteOrderPelayanan,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DELETE_DETAIL_ORDER_PELAYANAN: {
            return {
                ...state,
                deleteDetailOrderPelayanan: {
                    ...state.deleteDetailOrderPelayanan,
                    loading: true,
                    error: null,
                }
            }
        }

        case DELETE_DETAIL_ORDER_PELAYANAN_SUCCESS: {
            return {
                ...state,
                deleteDetailOrderPelayanan: {
                    ...state.deleteDetailOrderPelayanan,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case DELETE_DETAIL_ORDER_PELAYANAN_ERROR: {
            return {
                ...state,
                deleteDetailOrderPelayanan: {
                    ...state.deleteDetailOrderPelayanan,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTAR_PASIEN_RADIOLOGI: {
            return {
                ...state,
                daftarPasienRadiologi: {
                    ...state.daftarPasienRadiologi,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTAR_PASIEN_RADIOLOGI_SUCCESS: {
            return {
                ...state,
                daftarPasienRadiologi: {
                    ...state.daftarPasienRadiologi,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTAR_PASIEN_RADIOLOGI_ERROR: {
            return {
                ...state,
                daftarPasienRadiologi: {
                    ...state.daftarPasienRadiologi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_PELAYANAN_RADIOLOGI_GET: {
            return {
                ...state,
                listPelayananRadiologiGet: {
                    ...state.listPelayananRadiologiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_PELAYANAN_RADIOLOGI_GET_SUCCESS: {
            return {
                ...state,
                listPelayananRadiologiGet: {
                    ...state.listPelayananRadiologiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_PELAYANAN_RADIOLOGI_GET_ERROR: {
            return {
                ...state,
                listPelayananRadiologiGet: {
                    ...state.listPelayananRadiologiGet,
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