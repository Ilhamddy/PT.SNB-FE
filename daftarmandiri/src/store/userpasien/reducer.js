import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_ERROR,
    GET_RIWAYAT_REGISTRASI,
    GET_RIWAYAT_REGISTRASI_SUCCESS,
    GET_RIWAYAT_REGISTRASI_ERROR,
    BATAL_REGIS,
    BATAL_REGIS_SUCCESS,
    BATAL_REGIS_ERROR,
    GET_PASIEN_EDIT,
    GET_PASIEN_EDIT_SUCCESS,
    GET_PASIEN_EDIT_ERROR,
    UPDATE_PASIEN,
    UPDATE_PASIEN_SUCCESS,
    UPDATE_PASIEN_ERROR,
    GET_PASIEN_AKUN,
    GET_PASIEN_AKUN_SUCCESS,
    GET_PASIEN_AKUN_ERROR,
    GET_COMBO_PENJAMIN,
    GET_COMBO_PENJAMIN_SUCCESS,
    GET_COMBO_PENJAMIN_ERROR,
    UPSERT_PENJAMIN,
    UPSERT_PENJAMIN_SUCCESS,
    UPSERT_PENJAMIN_ERROR,
    GET_PENJAMIN_PASIEN,
    GET_PENJAMIN_PASIEN_SUCCESS,
    GET_PENJAMIN_PASIEN_ERROR
} from "./actionType";

const INIT_STATE = {
    loginUser: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    signupUser: {
        data: [],
        loading: false,
        error: null
    },
    getRiwayatRegistrasi: {
        data: [],
        loading: false,
        error: null
    },
    batalRegis: {
        data: [],
        loading: false,
        error: null
    },
    getPasienEdit: {
        data: [],
        loading: false,
        error: null
    },
    updatePasien: {
        data: [],
        loading: false,
        error: null
    },
    getPasienAkun: {
        data: [],
        loading: false,
        error: null
    },
    getComboPenjamin: {
        data: [],
        loading: false,
        error: null
    },
    upsertPenjamin: {
        data: [],
        loading: false,
        error: null
    },
    getPenjaminPasien: {
        data: [],
        loading: false,
        error: null
    }
}

const login = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER: 
            return {
                ...state,
                loginUser: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
            
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginUser: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case LOGIN_USER_ERROR:
            return {
                ...state,
                loginUser: {
                    ...state.loginUser,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                loginUser: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case SIGNUP_USER: 
            return {
                ...state,
                signupUser: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
            
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                signupUser: {
                    ...state.signupUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case SIGNUP_USER_ERROR:
            return {
                ...state,
                signupUser: {
                    ...state.signupUser,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_RIWAYAT_REGISTRASI:
            return {
                ...state,
                getRiwayatRegistrasi: {
                    ...state.getRiwayatRegistrasi,
                    data: [],
                    loading: true,
                    error: null,
                },
            }
        
        case GET_RIWAYAT_REGISTRASI_SUCCESS:
            return {
                ...state,
                getRiwayatRegistrasi: {
                    ...state.getRiwayatRegistrasi,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            }
        
        case GET_RIWAYAT_REGISTRASI_ERROR:
            return {
                ...state,
                getRiwayatRegistrasi: {
                    ...state.getRiwayatRegistrasi,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            }

        case BATAL_REGIS:
            return {
                ...state,
                batalRegis: {
                    ...state.batalRegis,
                    data: [],
                    loading: true,
                    error: null,
                },
            }

        case BATAL_REGIS_SUCCESS:
            return {
                ...state,
                batalRegis: {
                    ...state.batalRegis,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            }

        case BATAL_REGIS_ERROR:
            return {
                ...state,
                batalRegis: {
                    ...state.batalRegis,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            }

        case GET_PASIEN_EDIT:
            return {
                ...state,
                getPasienEdit: {
                    ...state.getPasienEdit,
                    data: [],
                    loading: true,
                    error: null,
                },
            }

        case GET_PASIEN_EDIT_SUCCESS:
            return {
                ...state,
                getPasienEdit: {
                    ...state.getPasienEdit,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            }
        
        case GET_PASIEN_EDIT_ERROR:
            return {
                ...state,
                getPasienEdit: {
                    ...state.getPasienEdit,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            }

        case UPDATE_PASIEN:
            return {
                ...state,
                updatePasien: {
                    ...state.updatePasien,
                    data: [],
                    loading: true,
                    error: null,
                },
            }

        case UPDATE_PASIEN_SUCCESS:
            return {
                ...state,
                updatePasien: {
                    ...state.updatePasien,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            }

        case UPDATE_PASIEN_ERROR:
            return {
                ...state,
                updatePasien: {
                    ...state.updatePasien,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            }

        case GET_PASIEN_AKUN:
            return {
                ...state,
                getPasienAkun: {
                    ...state.getPasienAkun,
                    data: [],
                    loading: true,
                    error: null,
                },
            }

        case GET_PASIEN_AKUN_SUCCESS:
            return {
                ...state,
                getPasienAkun: {
                    ...state.getPasienAkun,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            }
        
        case GET_PASIEN_AKUN_ERROR:
            return {
                ...state,
                getPasienAkun: {
                    ...state.getPasienAkun,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            }

        case GET_COMBO_PENJAMIN: 
            return {
                ...state,
                getComboPenjamin: {
                    ...state.getComboPenjamin,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_COMBO_PENJAMIN_SUCCESS:
            return {
                ...state,
                getComboPenjamin: {
                    ...state.getComboPenjamin,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_COMBO_PENJAMIN_ERROR:
            return {
                ...state,
                getComboPenjamin: {
                    ...state.getComboPenjamin,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case UPSERT_PENJAMIN:
            return {
                ...state,
                upsertPenjamin: {
                    ...state.upsertPenjamin,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case UPSERT_PENJAMIN_SUCCESS:
            return {
                ...state,
                upsertPenjamin: {
                    ...state.upsertPenjamin,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case UPSERT_PENJAMIN_ERROR:
            return {
                ...state,
                upsertPenjamin: {
                    ...state.upsertPenjamin,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_PENJAMIN_PASIEN:
            return {
                ...state,
                getPenjaminPasien: {
                    ...state.getPenjaminPasien,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        
        case GET_PENJAMIN_PASIEN_SUCCESS:
            return {
                ...state,
                getPenjaminPasien: {
                    ...state.getPenjaminPasien,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_PENJAMIN_PASIEN_ERROR:
            return {
                ...state,
                getPenjaminPasien: {
                    ...state.getPenjaminPasien,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        default:
            return { ...state };
    }
};


export default login;