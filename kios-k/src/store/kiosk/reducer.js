import {
    KIOSK_RESET_FORM,
    GET_COMBO_KIOSK,
    GET_COMBO_KIOSK_SUCCESS,
    GET_COMBO_KIOSK_ERROR
} from "./actionType";

const INIT_STATE = {
    getComboKiosk: {
        data: [],
        loading: false,
        error: null,
    },
}

const Kiosk = (state = INIT_STATE, action) => {
    switch (action.type) {
        case KIOSK_RESET_FORM: {
            return {
                ...state,
                getComboKiosk:{
                    ...INIT_STATE.getComboKiosk,
                }
            }
        }

        case GET_COMBO_KIOSK: {
            return {
                ...state,
                getComboKiosk: {
                    ...state.getComboKiosk,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_KIOSK_SUCCESS: {
            return {
                ...state,
                getComboKiosk: {
                    ...state.getComboKiosk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_KIOSK_ERROR: {
            return {
                ...state,
                getComboKiosk: {
                    ...state.getComboKiosk,
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

export default Kiosk;