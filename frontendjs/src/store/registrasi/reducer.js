import {
    REGISTRASI_SAVE,
    REGISTRASI_SAVE_SUCCESS,
    REGISTRASI_SAVE_ERROR,
    REGISTRASI_LIST_GET,
    REGISTRASI_LIST_GET_ERROR,
    REGISTRASI_LIST_GET_SUCCESS,
    REGISTRASI_RESET_FORM,
    REGISTRASI_GET,
    REGISTRASI_GET_SUCCESS,
    REGISTRASI_GET_ERROR,
    REGISTRASI_SAVE_RUANGAN,
    REGISTRASI_SAVE_RUANGAN_SUCCESS,
    REGISTRASI_SAVE_RUANGAN_ERROR,
    REGISTRASI_NOREGISTRASI_GET,
    REGISTRASI_NOREGISTRASI_GET_SUCCESS,
    REGISTRASI_NOREGISTRASI_GET_ERROR,
    REGISTRASI_NOREGISTRASI_RESET_FORM,
    REGISTRASI_RUANGAN_NOREC_GET,
    REGISTRASI_RUANGAN_NOREC_GET_SUCCESS,
    REGISTRASI_RUANGAN_NOREC_GET_ERROR,
    REGISTRASI_NO_BPJS_GET,
    REGISTRASI_NO_BPJS_GET_SUCCESS,
    REGISTRASI_NO_BPJS_GET_ERROR,
    REGISTRASI_SAVE_PENJAMIN_FK,
    REGISTRASI_SAVE_PENJAMIN_FK_SUCCESS,
    REGISTRASI_SAVE_PENJAMIN_FK_ERROR,
} from "./actionType";

const INIT_STATE = {
    registrasiGet: {
        data: null,
        loading: false,
        error: null,
    },
    registrasiSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    registrasiList:{
        data: [],
        loading: false,
        error: null,
    },
    registrasiSaveRuangan: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    registrasiNoregistrasiGet: {
        data: null,
        loading: false,
        error: null,
    },
    registrasiRuangNorecGet: {
        data: null,
        loading: false,
        error: null,
    },
    registrasiNoBpjsGet: {
        data: null,
        loading: false,
        error: null,
    },
    registrasiSavePenjaminFK: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
};

const Registrasi = (state = INIT_STATE, action) => {
    switch (action.type) {
        case REGISTRASI_RESET_FORM: {
            return {
                ...state,
                registrasiGet:{
                    ...INIT_STATE.registrasiGet,
                },
                registrasiSave: {
                    ...INIT_STATE.registrasiSave,
                }
            }
        }

        case REGISTRASI_LIST_GET: {
            return {
                ...state,
                registrasiList: {
                    ...state.registrasiList,
                    loading: true,
                    error: null,
                }
            }
        }

        case REGISTRASI_LIST_GET_SUCCESS: {
            return {
                ...state,
                registrasiList: {
                    ...state.registrasiList,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case REGISTRASI_LIST_GET_ERROR: {
            return {
                ...state,
                registrasiList: {
                    ...state.registrasiList,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case REGISTRASI_GET: {
            return {
                ...state,
                registrasiGet: {
                    ...state.registrasiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case REGISTRASI_GET_SUCCESS: {
            return {
                ...state,
                registrasiGet: {
                    ...state.registrasiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case REGISTRASI_GET_ERROR: {
            return {
                ...state,
                registrasiGet: {
                    ...state.registrasiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case REGISTRASI_SAVE: {
            return {
                ...state,
                registrasiSave: {
                    ...state.registrasiSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case REGISTRASI_SAVE_SUCCESS: {
            return {
                ...state,
                registrasiSave: {
                    ...state.registrasiSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case REGISTRASI_SAVE_ERROR: {
            return {
                ...state,
                registrasiSave: {
                    ...state.registrasiSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case REGISTRASI_SAVE_RUANGAN: {
            return {
                ...state,
                registrasiSaveRuangan: {
                    ...state.registrasiSaveRuangan,
                    loading: true,
                    error: null,
                }
            }
        }

        case REGISTRASI_SAVE_RUANGAN_SUCCESS: {
            return {
                ...state,
                registrasiSaveRuangan: {
                    ...state.registrasiSaveRuangan,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case REGISTRASI_SAVE_RUANGAN_ERROR: {
            return {
                ...state,
                registrasiSaveRuangan: {
                    ...state.registrasiSaveRuangan,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case REGISTRASI_NOREGISTRASI_GET: {
            return {
                ...state,
                registrasiNoregistrasiGet: {
                    ...state.registrasiNoregistrasiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case REGISTRASI_NOREGISTRASI_GET_SUCCESS: {
            return {
                ...state,
                registrasiNoregistrasiGet: {
                    ...state.registrasiNoregistrasiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case REGISTRASI_NOREGISTRASI_GET_ERROR: {
            return {
                ...state,
                registrasiNoregistrasiGet: {
                    ...state.registrasiNoregistrasiGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case REGISTRASI_NOREGISTRASI_RESET_FORM: {
            return {
                ...state,
                registrasiNoregistrasiGet:{
                    ...INIT_STATE.registrasiNoregistrasiGet,
                },
                registrasiSaveRuangan: {
                    ...INIT_STATE.registrasiSaveRuangan,
                }
            }
        }

        case REGISTRASI_RUANGAN_NOREC_GET: {
            return {
                ...state,
                registrasiRuangNorecGet: {
                    ...state.registrasiRuangNorecGet,
                    loading: true,
                    error: null
                }
            }
        }

        case REGISTRASI_RUANGAN_NOREC_GET_SUCCESS: {
            return {
                ...state,
                registrasiRuangNorecGet: {
                    ...state.registrasiRuangNorecGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case REGISTRASI_RUANGAN_NOREC_GET_ERROR: {
            return {
                ...state,
                registrasiRuangNorecGet: {
                    ...state.registrasiRuangNorecGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case REGISTRASI_NO_BPJS_GET:{
            return {
                ...state,
                registrasiNoBpjsGet: {
                    ...state.registrasiNoBpjsGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case REGISTRASI_NO_BPJS_GET_SUCCESS:{
            return {
                ...state,
                registrasiNoBpjsGet: {
                    ...state.registrasiNoBpjsGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case REGISTRASI_NO_BPJS_GET_ERROR:{
            return {
                ...state,
                registrasiNoBpjsGet: {
                    ...state.registrasiNoBpjsGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case REGISTRASI_SAVE_PENJAMIN_FK: {
            return {
                ...state,
                registrasiSavePenjaminFK: {
                    ...state.registrasiSavePenjaminFK,
                    loading: true,
                    error: null,
                }
            }
        }

        case REGISTRASI_SAVE_PENJAMIN_FK_SUCCESS: {
            return {
                ...state,
                registrasiSavePenjaminFK: {
                    ...state.registrasiSavePenjaminFK,
                    data: action.payload,
                    loading: false,
                    success: true
                }
            }
        }

        case REGISTRASI_SAVE_PENJAMIN_FK_ERROR: {
            return {
                ...state,
                registrasiSavePenjaminFK: {
                    ...state.registrasiSavePenjaminFK,
                    loading: false,
                    success: false,
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