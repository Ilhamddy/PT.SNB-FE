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
    REGISTRASI_GET_RESET,
    REGISTRASI_SAVE_RUANGAN,
    REGISTRASI_SAVE_RUANGAN_SUCCESS,
    REGISTRASI_SAVE_RUANGAN_ERROR,
    REGISTRASI_SAVE_RUANGAN_RESET,
    REGISTRASI_NOREGISTRASI_GET,
    REGISTRASI_NOREGISTRASI_GET_SUCCESS,
    REGISTRASI_NOREGISTRASI_GET_ERROR,
    REGISTRASI_NOREGISTRASI_RESET_FORM,
    REGISTRASI_RUANGAN_NOREC_GET,
    REGISTRASI_RUANGAN_NOREC_GET_SUCCESS,
    REGISTRASI_RUANGAN_NOREC_GET_ERROR,
    REGISTRASI_RUANGAN_NOREC_GET_RESET,
    REGISTRASI_NO_BPJS_GET,
    REGISTRASI_NO_BPJS_GET_SUCCESS,
    REGISTRASI_NO_BPJS_GET_ERROR,
    REGISTRASI_SAVE_PENJAMIN_FK,
    REGISTRASI_SAVE_PENJAMIN_FK_SUCCESS,
    REGISTRASI_SAVE_PENJAMIN_FK_ERROR,
    PASIEN_FORM_QUERIES_GET,
    PASIEN_FORM_QUERIES_GET_SUCCESS,
    PASIEN_FORM_QUERIES_GET_ERROR,
    SAVE_BATAL_REGISTRASI,
    SAVE_BATAL_REGISTRASI_SUCCESS,
    SAVE_BATAL_REGISTRASI_ERROR,
    SAVE_REGISTRASI_MUTASI,
    SAVE_REGISTRASI_MUTASI_SUCCESS,
    SAVE_REGISTRASI_MUTASI_ERROR,
    GET_HISTORY_REGISTRASI,GET_HISTORY_REGISTRASI_SUCCESS,GET_HISTORY_REGISTRASI_ERROR
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
    pasienFormQueriesGet: {
        data: null,
        loading: false,
        error: null,
    },
    saveBatalRegistrasi:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    saveRegistrasiMutasi:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getHistoryRegistrasi:{
        data: [],
        loading: false,
        error: null,
    }
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
                },
                saveBatalRegistrasi:{
                    ...INIT_STATE.saveBatalRegistrasi
                },
                saveRegistrasiMutasi:{
                    ...INIT_STATE.saveRegistrasiMutasi
                },
                getHistoryRegistrasi:{
                    ...INIT_STATE.getHistoryRegistrasi
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

        case REGISTRASI_GET_RESET: {
            return {
                ...state,
                registrasiGet: {
                    ...INIT_STATE.registrasiGet,
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

        case REGISTRASI_SAVE_RUANGAN_RESET: {
            return {
                ...state,
                registrasiSaveRuangan: {
                    ...INIT_STATE.registrasiSaveRuangan,
                    newData: [],
                    loading: false,
                    error: null,
                    success: false,
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

        case REGISTRASI_RUANGAN_NOREC_GET_RESET: {
            return {
                ...state,
                registrasiRuangNorecGet: {
                    ...INIT_STATE.registrasiRuangNorecGet,
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
                    data: null
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

        case PASIEN_FORM_QUERIES_GET: {
            return {
                ...state,
                pasienFormQueriesGet: {
                    ...state.pasienFormQueriesGet,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case PASIEN_FORM_QUERIES_GET_SUCCESS: {
            return {
                ...state,
                pasienFormQueriesGet: {
                    ...state.pasienFormQueriesGet,
                    data: action.payload,
                    loading: false,
                    error: null
                }
            }
        }

        case PASIEN_FORM_QUERIES_GET_ERROR: {
            return {
                ...state,
                pasienFormQueriesGet: {
                    ...state.pasienFormQueriesGet,
                    data: [],
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_BATAL_REGISTRASI: {
            return {
                ...state,
                saveBatalRegistrasi: {
                    ...state.saveBatalRegistrasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_BATAL_REGISTRASI_SUCCESS: {
            return {
                ...state,
                saveBatalRegistrasi: {
                    ...state.saveBatalRegistrasi,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_BATAL_REGISTRASI_ERROR: {
            return {
                ...state,
                saveBatalRegistrasi: {
                    ...state.saveBatalRegistrasi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_REGISTRASI_MUTASI: {
            return {
                ...state,
                saveRegistrasiMutasi: {
                    ...state.saveRegistrasiMutasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_REGISTRASI_MUTASI_SUCCESS: {
            return {
                ...state,
                saveRegistrasiMutasi: {
                    ...state.saveRegistrasiMutasi,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_REGISTRASI_MUTASI_ERROR: {
            return {
                ...state,
                saveRegistrasiMutasi: {
                    ...state.saveRegistrasiMutasi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_HISTORY_REGISTRASI: {
            return {
                ...state,
                getHistoryRegistrasi: {
                    ...state.getHistoryRegistrasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_HISTORY_REGISTRASI_SUCCESS: {
            return {
                ...state,
                getHistoryRegistrasi: {
                    ...state.getHistoryRegistrasi,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_HISTORY_REGISTRASI_ERROR: {
            return {
                ...state,
                getHistoryRegistrasi: {
                    ...state.getHistoryRegistrasi,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        default: {
            return { ...state };
        }
    }
};

export default Registrasi;