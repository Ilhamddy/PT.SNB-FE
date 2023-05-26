import {
   DAFTARPASIEN_RESET_FORM,
   DAFTARPASIEN_RJ_GET,
   DAFTARPASIEN_RJ_GET_SUCCESS,
   DAFTARPASIEN_RJ_GET_ERROR,
   WIDGET_DAFTARPASIEN_RJ_GET,
   WIDGET_DAFTARPASIEN_RJ_GET_SUCCESS,
   WIDGET_DAFTARPASIEN_RJ_GET_ERROR
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
};

const DaftarPasien = (state = INIT_STATE, action) => {
    switch (action.type) {
        case DAFTARPASIEN_RESET_FORM: {
            return {
                ...state,
                daftarPasienRJGet:{
                    ...INIT_STATE.daftarPasienRJGet,
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


        default: {
            return { ...state };
        }
    }
};

export default DaftarPasien;