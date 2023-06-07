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
    EMR_GET_ERROR,
    EMR_COMBO_GET,
    EMR_COMBO_GET_SUCCESS,
    EMR_COMBO_GET_ERROR,
    EMR_DIAGNOSAX_GET,
    EMR_DIAGNOSAX_GET_SUCCESS,
    EMR_DIAGNOSAX_GET_ERROR,
    EMR_DIAGNOSAIX_GET,
    EMR_DIAGNOSAIX_GET_SUCCESS,
    EMR_DIAGNOSAIX_GET_ERROR,
    EMR_DIAGNOSAX_SAVE,
    EMR_DIAGNOSAX_SAVE_SUCCESS,
    EMR_DIAGNOSAX_SAVE_ERROR,
    EMR_DIAGNOSAIX_SAVE,
    EMR_DIAGNOSAIX_SAVE_SUCCESS,
    EMR_DIAGNOSAIX_SAVE_ERROR
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
    emrComboGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrDiagnosaxGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrDiagnosaixGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrDiagnosaxSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    emrDiagnosaixSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
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
                emrComboGet:{
                    ...INIT_STATE.emrComboGet,
                },
                emrDiagnosaxGet:{
                    ...INIT_STATE.emrDiagnosaxGet,
                },
                emrDiagnosaixGet:{
                    ...INIT_STATE.emrDiagnosaixGet,
                },
                emrDiagnosaxSave:{
                    ...INIT_STATE.emrDiagnosaxSave
                },
                emrDiagnosaixSave:{
                    ...INIT_STATE.emrDiagnosaixSave
                }
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

        case EMR_COMBO_GET: {
            return {
                ...state,
                emrComboGet: {
                    ...state.emrComboGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_COMBO_GET_SUCCESS: {
            return {
                ...state,
                emrComboGet: {
                    ...state.emrComboGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_COMBO_GET_ERROR: {
            return {
                ...state,
                emrComboGet: {
                    ...state.emrComboGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_DIAGNOSAX_GET: {
            return {
                ...state,
                emrDiagnosaxGet: {
                    ...state.emrDiagnosaxGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_DIAGNOSAX_GET_SUCCESS: {
            return {
                ...state,
                emrDiagnosaxGet: {
                    ...state.emrDiagnosaxGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_DIAGNOSAX_GET_ERROR: {
            return {
                ...state,
                emrDiagnosaxGet: {
                    ...state.emrDiagnosaxGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_DIAGNOSAIX_GET: {
            return {
                ...state,
                emrDiagnosaixGet: {
                    ...state.emrDiagnosaixGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_DIAGNOSAIX_GET_SUCCESS: {
            return {
                ...state,
                emrDiagnosaixGet: {
                    ...state.emrDiagnosaixGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_DIAGNOSAIX_GET_ERROR: {
            return {
                ...state,
                emrDiagnosaixGet: {
                    ...state.emrDiagnosaixGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_DIAGNOSAX_SAVE: {
            return {
                ...state,
                emrDiagnosaxSave: {
                    ...state.emrDiagnosaxSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_DIAGNOSAX_SAVE_SUCCESS: {
            return {
                ...state,
                emrDiagnosaxSave: {
                    ...state.emrDiagnosaxSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_DIAGNOSAX_SAVE_ERROR: {
            return {
                ...state,
                emrDiagnosaxSave: {
                    ...state.emrDiagnosaxSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_DIAGNOSAIX_SAVE: {
            return {
                ...state,
                emrDiagnosaixSave: {
                    ...state.emrDiagnosaixSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_DIAGNOSAIX_SAVE_SUCCESS: {
            return {
                ...state,
                emrDiagnosaixSave: {
                    ...state.emrDiagnosaixSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_DIAGNOSAIX_SAVE_ERROR: {
            return {
                ...state,
                emrDiagnosaixSave: {
                    ...state.emrDiagnosaixSave,
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