import {
    KIOSK_RESET_FORM,
    GET_COMBO_KIOSK,
    GET_COMBO_KIOSK_SUCCESS,
    GET_COMBO_KIOSK_ERROR,
    GET_CARI_PASIEN_KIOSK,
    GET_CARI_PASIEN_KIOSK_SUCCESS,
    GET_CARI_PASIEN_KIOSK_ERROR,
    SAVE_REGISTRASI_PASIEN_KIOSK,
    SAVE_REGISTRASI_PASIEN_KIOSK_SUCCESS,
    SAVE_REGISTRASI_PASIEN_KIOSK_ERROR
} from "./actionType";

const INIT_STATE = {
    getComboKiosk: {
        data: [],
        loading: false,
        error: null,
    },
    getCariPasienKiosk: {
        data: [],
        loading: false,
        error: null,
    },
    saveRegistrasiPasienKiosk: {
        data: [],
        loading: false,
        error: null,
        success: false
    }
}

const Kiosk = (state = INIT_STATE, action) => {
    switch (action.type) {
        case KIOSK_RESET_FORM: {
            return {
                ...state,
                getComboKiosk:{
                    ...INIT_STATE.getComboKiosk,
                },
                getCariPasienKiosk:{
                    ...INIT_STATE.getCariPasienKiosk
                },
                saveRegistrasiPasienKiosk:{
                    ...INIT_STATE.saveRegistrasiPasienKiosk
                }
            }
        }

        case GET_COMBO_KIOSK: {
            return {
                ...state,
                getComboKiosk: {
                    ...state.getComboKiosk,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_KIOSK_SUCCESS: {
            return {
                ...state,
                getComboKiosk: {
                    ...state.getComboKiosk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_KIOSK_ERROR: {
            return {
                ...state,
                getComboKiosk: {
                    ...state.getComboKiosk,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_CARI_PASIEN_KIOSK: {
            return {
                ...state,
                getCariPasienKiosk: {
                    ...state.getCariPasienKiosk,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_CARI_PASIEN_KIOSK_SUCCESS: {
            return {
                ...state,
                getCariPasienKiosk: {
                    ...state.getCariPasienKiosk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_CARI_PASIEN_KIOSK_ERROR: {
            return {
                ...state,
                getCariPasienKiosk: {
                    ...state.getCariPasienKiosk,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_REGISTRASI_PASIEN_KIOSK: {
            return {
                ...state,
                saveRegistrasiPasienKiosk: {
                    ...state.saveRegistrasiPasienKiosk,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case SAVE_REGISTRASI_PASIEN_KIOSK_SUCCESS: {
            return {
                ...state,
                saveRegistrasiPasienKiosk: {
                    ...state.saveRegistrasiPasienKiosk,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case SAVE_REGISTRASI_PASIEN_KIOSK_ERROR: {
            return {
                ...state,
                saveRegistrasiPasienKiosk: {
                    ...state.saveRegistrasiPasienKiosk,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        default: {
            return { ...state };
        }
    }
}

export default Kiosk;