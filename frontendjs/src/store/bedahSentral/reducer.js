import {
    BEDAH_SENTRAL_RESET_FORM,
    WIDGET_ORDER_OPERASI_GET,
    WIDGET_ORDER_OPERASI_GET_SUCCESS,
    WIDGET_ORDER_OPERASI_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    widgetOrderOperasiGet: {
        data: [],
        loading: false,
        error: null,
    },
}

const BedahSentral = (state = INIT_STATE, action) => {
    switch (action.type) {
        case BEDAH_SENTRAL_RESET_FORM: {
            return {
                ...state,
                widgetOrderOperasiGet:{
                    ...INIT_STATE.widgetOrderOperasiGet
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

        default: {
            return { ...state };
        }
    }
}
export default BedahSentral;