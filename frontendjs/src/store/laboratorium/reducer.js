import { init } from "aos";
import {
    LABORATORIUM_RESET_FORM,
    WIDGET_DETAIL_JENIS_PRODUK_GET,
    WIDGET_DETAIL_JENIS_PRODUK_GET_SUCCESS,
    WIDGET_DETAIL_JENIS_PRODUK_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    widgetDetailJenisProdukGet: {
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

        default: {
            return { ...state };
        }
    }
}
export default Laboratorium;