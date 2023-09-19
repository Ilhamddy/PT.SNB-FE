import {
    GET_LOKET_SISA,
    GET_LOKET_SISA_SUCCESS,
    GET_LOKET_SISA_ERROR,
    PANGGIL_LOKET,
    PANGGIL_LOKET_SUCCESS,
    PANGGIL_LOKET_ERROR,
    GET_ALL_LOKET,
    GET_ALL_LOKET_SUCCESS,
    GET_ALL_LOKET_ERROR,
} from "./actionType";

const INIT_STATE = {
    getAntreanLoketSisa: {
        data: [],
        loading: false,
        error: null,
    },
    panggilLoket: {
        data: [],
        loading: false,
        error: null,
    },
    getAllLoket: {
        data: [],
        loading: false,
        error: null,
    }
};

const Viewer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LOKET_SISA: {
            return {
                ...state,
                getAntreanLoketSisa: {
                    ...state.masterGet,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LOKET_SISA_SUCCESS: {
            return {
                ...state,
                getAntreanLoketSisa: {
                    ...state.masterGet,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_LOKET_SISA_ERROR: {
            return {
                ...state,
                getAntreanLoketSisa: {
                    ...state.masterGet,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case PANGGIL_LOKET: {
            return {
                ...state,
                panggilLoket: {
                    ...state.masterGet,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case PANGGIL_LOKET_SUCCESS: {
            return {
                ...state,
                panggilLoket: {
                    ...state.masterGet,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case PANGGIL_LOKET_ERROR: {
            return {
                ...state,
                panggilLoket: {
                    ...state.masterGet,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_ALL_LOKET: {
            return {
                ...state,
                getAllLoket: {
                    ...state.masterGet,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_ALL_LOKET_SUCCESS: {
            return {
                ...state,
                getAllLoket: {
                    ...state.masterGet,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_ALL_LOKET_ERROR: {
            return {
                ...state,
                getAllLoket: {
                    ...state.masterGet,
                    loading: false,
                    error: action.payload,
                }
            }
        }


        default: return { ...state };
    }
}

export default Viewer