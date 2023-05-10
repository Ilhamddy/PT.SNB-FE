import {
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