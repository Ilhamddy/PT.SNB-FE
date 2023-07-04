import { init } from "aos";
import {
    LABORATORIUM_RESET_FORM,
    WIDGET_DETAIL_JENIS_PRODUK_GET,
    WIDGET_DETAIL_JENIS_PRODUK_GET_SUCCESS,
    WIDGET_DETAIL_JENIS_PRODUK_GET_ERROR,
    SAVE_ORDER_PELAYANAN_LABORATORIUM,
    SAVE_ORDER_PELAYANAN_LABORATORIUM_SUCCESS,
    SAVE_ORDER_PELAYANAN_LABORATORIUM_ERROR,
    DAFTAR_ORDER_LABORATORIUM_GET,
    DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    DAFTAR_ORDER_LABORATORIUM_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    widgetDetailJenisProdukGet: {
        data: [],
        loading: false,
        error: null,
    },
    saveOrderPelayananLaboratorium: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    daftarOrderLaboratoriumGet: {
        data: [],
        loading: false,
        error: null,
    },
}

const Laboratorium = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LABORATORIUM_RESET_FORM: {
            return {
                ...state,
                widgetDetailJenisProdukGet:{
                    ...INIT_STATE.widgetDetailJenisProdukGet
                },
                saveOrderPelayananLaboratorium:{
                    ...INIT_STATE.saveOrderPelayananLaboratorium
                },
                daftarOrderLaboratoriumGet:{
                    ...INIT_STATE.daftarOrderLaboratoriumGet
                }
            }
        }

        case WIDGET_DETAIL_JENIS_PRODUK_GET: {
            return {
                ...state,
                widgetDetailJenisProdukGet: {
                    ...state.widgetDetailJenisProdukGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_DETAIL_JENIS_PRODUK_GET_SUCCESS: {
            return {
                ...state,
                widgetDetailJenisProdukGet: {
                    ...state.widgetDetailJenisProdukGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_DETAIL_JENIS_PRODUK_GET_ERROR: {
            return {
                ...state,
                widgetDetailJenisProdukGet: {
                    ...state.widgetDetailJenisProdukGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_ORDER_PELAYANAN_LABORATORIUM: {
            return {
                ...state,
                saveOrderPelayananLaboratorium: {
                    ...state.saveOrderPelayananLaboratorium,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_ORDER_PELAYANAN_LABORATORIUM_SUCCESS: {
            return {
                ...state,
                saveOrderPelayananLaboratorium: {
                    ...state.saveOrderPelayananLaboratorium,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_ORDER_PELAYANAN_LABORATORIUM_ERROR: {
            return {
                ...state,
                saveOrderPelayananLaboratorium: {
                    ...state.saveOrderPelayananLaboratorium,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTAR_ORDER_LABORATORIUM_GET: {
            return {
                ...state,
                daftarOrderLaboratoriumGet: {
                    ...state.daftarOrderLaboratoriumGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS: {
            return {
                ...state,
                daftarOrderLaboratoriumGet: {
                    ...state.daftarOrderLaboratoriumGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTAR_ORDER_LABORATORIUM_GET_ERROR: {
            return {
                ...state,
                daftarOrderLaboratoriumGet: {
                    ...state.daftarOrderLaboratoriumGet,
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
export default Laboratorium;