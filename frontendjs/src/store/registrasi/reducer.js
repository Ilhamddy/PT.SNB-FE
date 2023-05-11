import {
    REGISTRASI_SAVE,
    REGISTRASI_SAVE_SUCCESS,
    REGISTRASI_SAVE_ERROR,
    REGISTRASI_SET_DATA,
    REGISTRASI_LIST_GET,
    REGISTRASI_LIST_GET_ERROR,
    REGISTRASI_LIST_GET_SUCCESS,
    REGISTRASI_RESET_FORM,
    REGISTRASI_GET,
    REGISTRASI_GET_SUCCESS,
    REGISTRASI_GET_ERROR,
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
    },
    registrasiList:{
        data: [],
        loading: false,
        error: null,
    },
};

const Registrasi = (state = INIT_STATE, action) => {
    switch (action.type) {
        case REGISTRASI_RESET_FORM: {
            return {
                ...state.registrasiSave,
                newData: null,
            }
        }
        case REGISTRASI_SET_DATA: {
            console.log({action})
            return {
                ...state,
                editData: action.payload,
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

        default: {
            return { ...state };
        }
    }
};

export default Registrasi;