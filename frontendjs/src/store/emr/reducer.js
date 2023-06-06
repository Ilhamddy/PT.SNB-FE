import {
    EMR_RESET_FORM,
    EMR_HEADER_GET,
    EMR_HEADER_GET_SUCCESS,
    EMR_HEADER_GET_ERROR,
    EMR_TTV_SAVE,
    EMR_TTV_SAVE_SUCCESS,
    EMR_TTV_SAVE_ERROR,
    EMR_TTV_GET,
    EMR_TTV_GET_SUCCESS,
    EMR_TTV_GET_ERROR,
    EMR_SAVE,
    EMR_SAVE_SUCCESS,
    EMR_SAVE_ERROR,
    EMR_GET,
    EMR_GET_SUCCESS,
    EMR_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    emrHeaderGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrTtvSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    emrTtvGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    emrGet: {
        data: [],
        loading: false,
        error: null,
    },
};

const Emr = (state = INIT_STATE, action) => {
    switch (action.type) {
        case EMR_RESET_FORM: {
            return {
                ...state,
                emrHeaderGet:{
                    ...INIT_STATE.emrHeaderGet,
                },
                emrTtvSave: {
                    ...INIT_STATE.emrTtvSave,
                },
                emrTtvGet:{
                    ...INIT_STATE.emrTtvGet,
                },
                emrSave:{
                    ...INIT_STATE.emrSave
                },
                emrGet:{
                    ...INIT_STATE.emrGet,
                },
            }
        }

        case EMR_HEADER_GET: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_HEADER_GET_SUCCESS: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_HEADER_GET_ERROR: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_TTV_SAVE: {
            return {
                ...state,
                emrTtvSave: {
                    ...state.emrTtvSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_TTV_SAVE_SUCCESS: {
            return {
                ...state,
                emrTtvSave: {
                    ...state.emrTtvSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_TTV_SAVE_ERROR: {
            return {
                ...state,
                emrTtvSave: {
                    ...state.emrTtvSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_TTV_GET: {
            return {
                ...state,
                emrTtvGet: {
                    ...state.emrTtvGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_TTV_GET_SUCCESS: {
            return {
                ...state,
                emrTtvGet: {
                    ...state.emrTtvGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_TTV_GET_ERROR: {
            return {
                ...state,
                emrTtvGet: {
                    ...state.emrTtvGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_SAVE: {
            return {
                ...state,
                emrSave: {
                    ...state.emrSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_SAVE_SUCCESS: {
            return {
                ...state,
                emrSave: {
                    ...state.emrSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_SAVE_ERROR: {
            return {
                ...state,
                emrSave: {
                    ...state.emrSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_GET: {
            return {
                ...state,
                emrGet: {
                    ...state.emrGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_GET_SUCCESS: {
            return {
                ...state,
                emrGet: {
                    ...state.emrGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_GET_ERROR: {
            return {
                ...state,
                emrGet: {
                    ...state.emrGet,
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

export default Emr;