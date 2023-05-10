import {
    GET_REGISTRASI_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_REGISTRASI_SUCCESS,
    ADD_REGISTRASI_FAIL,
    UPDATE_REGISTRASI_SUCCESS,
    UPDATE_REGISTRASI_FAIL,
    DELETE_REGISTRASI_SUCCESS,
    DELETE_REGISTRASI_FAIL,
    REGISTRASI_CREATE,
    REGISTRASI_CREATE_SUCCESS,
    REGISTRASI_CREATE_ERROR,
} from "./actionType";

const INIT_STATE = {
    registrasiCreate: {
        loading: false,
        error: null,
    },
    registrasiList: [],
};

const Registrasi = (state = INIT_STATE, action) => {
    switch (action.type) {
        case REGISTRASI_CREATE: {
            return {
                ...state,
                registrasiCreate: {
                    ...state.registrasiCreate,
                    loading: true,
                    error: null,
                }
            }
        }

        case REGISTRASI_CREATE_SUCCESS: {
            return {
                ...state,
                registrasiCreate: {
                    ...state.registrasiCreate,
                    loading: false,
                }
            }
        }

        case REGISTRASI_CREATE_ERROR: {
            return {
                ...state,
                registrasiCreate: {
                    ...state.registrasiCreate,
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

export default Registrasi;