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