import { 
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
    GET_USER_LOGIN
} from "./actionType";

export const loginUser = (data, callback) => {
    return {
        type: LOGIN_USER,
        payload: {data, callback}
    }
}

export const loginUserSuccess = (data) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: data
    }
}

export const loginUserError = (error) => {
    return {
        type: LOGIN_USER_ERROR,
        payload: error
    }
}

export const logoutUser = (callback) => {
    return {
        type: LOGOUT_USER,
        payload: {callback}
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: {}
    }
}

export const logoutUserError = (error) => {
    return {
        type: LOGOUT_USER_ERROR,
        payload: error
    }
}

export const getUserLogin = (userData) => {
    return {
        type: GET_USER_LOGIN,
        payload: userData
    }
}