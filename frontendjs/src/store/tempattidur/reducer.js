import {
    GET_TEMPAT_TIDUR,
    GET_TEMPAT_TIDUR_SUCCESS,
    GET_TEMPAT_TIDUR_ERROR,
    GET_UNIT_TEMPAT_TIDUR,
    GET_UNIT_TEMPAT_TIDUR_SUCCESS,
    GET_UNIT_TEMPAT_TIDUR_ERROR,
    GET_COMBO_TEMPAT_TIDUR,
    GET_COMBO_TEMPAT_TIDUR_SUCCESS,
    GET_COMBO_TEMPAT_TIDUR_ERROR,
    UPSERT_TEMPAT_TIDUR,
    UPSERT_TEMPAT_TIDUR_SUCCESS,
    UPSERT_TEMPAT_TIDUR_ERROR
} from "./actionType";

const INIT_STATE = {
    getTempatTidur: {
        data: [],
        loading: false,
        error: null,
    },
    getUnitTempatTidur: {
        data: [],
        loading: false,
        error: null,
    },
    getComboTempatTidur: {
        data: [],
        loading: false,
        error: null,
    },
    upsertTempatTidur: {
        data: [],
        loading: false,
        error: null,
    }
};

const TempatTidur = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_TEMPAT_TIDUR: {
            return {
                ...state,
                getTempatTidur: {
                    ...state.getTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_TEMPAT_TIDUR_SUCCESS: {
            return {
                ...state,
                getTempatTidur: {
                    ...state.getTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_TEMPAT_TIDUR_ERROR: {
            return {
                ...state,
                getTempatTidur: {
                    ...state.getTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_UNIT_TEMPAT_TIDUR: {
            return {
                ...state,
                getUnitTempatTidur: {
                    ...state.getUnitTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_UNIT_TEMPAT_TIDUR_SUCCESS: {
            return {
                ...state,
                getUnitTempatTidur: {
                    ...state.getUnitTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_UNIT_TEMPAT_TIDUR_ERROR: {
            return {
                ...state,
                getUnitTempatTidur: {
                    ...state.getUnitTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_COMBO_TEMPAT_TIDUR: {
            return {
                ...state,
                getComboTempatTidur: {
                    ...state.getComboTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_TEMPAT_TIDUR_SUCCESS: {
            return {
                ...state,
                getComboTempatTidur: {
                    ...state.getComboTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_COMBO_TEMPAT_TIDUR_ERROR: {
            return {
                ...state,
                getComboTempatTidur: {
                    ...state.getComboTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_TEMPAT_TIDUR: {
            return {
                ...state,
                upsertTempatTidur: {
                    ...state.upsertTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_TEMPAT_TIDUR_SUCCESS: {
            return {
                ...state,
                upsertTempatTidur: {
                    ...state.upsertTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_TEMPAT_TIDUR_ERROR: {
            return {
                ...state,
                upsertTempatTidur: {
                    ...state.upsertTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        default: return { ...state };
    }
}

export default TempatTidur