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
    BATAL_REGIS_ERROR
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

        default:
            return { ...state };
    }
};


export default login;