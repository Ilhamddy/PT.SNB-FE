import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_ERROR
} from "./actionType";

const INIT_STATE = {
    loginUser: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
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

        default:
            return { ...state };
    }
};


export default login;