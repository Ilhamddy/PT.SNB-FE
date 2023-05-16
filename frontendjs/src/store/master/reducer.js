import {
    MASTER_GET,
    MASTER_GET_SUCCESS,
    MASTER_GET_ERROR,
    DESA_GET,
    DESA_GET_SUCCESS,
    DESA_GET_ERROR,
    KECAMATAN_GET,
    KECAMATAN_GET_SUCCESS,
    KECAMATAN_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    masterGet: {
        data: [],
        loading: false,
        error: null,
    },
    desaGet: {
        data: [],
        loading: false,
        error: null,
    },
    kecamatanGet: {
        data: [],
        loading: false,
        error: null,
    },
};

const Master = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MASTER_GET: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case MASTER_GET_SUCCESS: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case MASTER_GET_ERROR: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DESA_GET: {
            return {
                ...state,
                desaGet: {
                    ...state.desaGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DESA_GET_SUCCESS: {
            return {
                ...state,
                desaGet: {
                    ...state.desaGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DESA_GET_ERROR: {
            return {
                ...state,
                desaGet: {
                    ...state.desaGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case KECAMATAN_GET: {
            return {
                ...state,
                kecamatanGet: {
                    ...state.kecamatanGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case KECAMATAN_GET_SUCCESS: {
            return {
                ...state,
                kecamatanGet: {
                    ...state.kecamatanGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case KECAMATAN_GET_ERROR: {
            return {
                ...state,
                kecamatanGet: {
                    ...state.kecamatanGet,
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

export default Master;