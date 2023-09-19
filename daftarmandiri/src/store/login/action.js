import { 
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from "./actionType";

export const loginUser = (body, callback) => {
    return {
        type: LOGIN_USER,
        payload: {body, callback}
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
