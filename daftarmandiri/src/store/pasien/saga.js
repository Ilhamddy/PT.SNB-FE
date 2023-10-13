import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    loginUserSuccess,
    loginUserError,
    logoutUserSuccess,
    logoutUserError,
    signUpUserSuccess,
    signUpUserError
} from "./action";
import * as uuid from 'uuid'

import {
    GET_USER_LOGIN,
    LOGIN_USER,
    LOGOUT_USER,
    SIGNUP_USER
} from "./actionType";

import ServiceAuth from "../../service/service-userpasien";
import { toast } from "react-toastify";
import { setAuthorization } from "../../helpers/api_helper";

const servicePayment = new ServiceAuth();

function* onLoginUser({payload: {data, callback}}) {
    try {
        const newData = {...data}
        newData.clientSecret = uuid.v4().substring(0, 32)
        localStorage.setItem("clientSecret", JSON.stringify(newData.clientSecret || null));
        const response = yield call(servicePayment.loginUser, newData);
        localStorage.setItem("authUserMandiri", JSON.stringify(response.data || null));
        // hanya dikirim sekali pada saat login
        setAuthorization(response?.data?.accessToken)
        console.log(response.data)
        yield put(loginUserSuccess(response.data));
        callback && callback()
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.msg || "error")
        yield put(loginUserError(error));
    }
}

function* onLogoutUser({payload: {callback}}) {
    try{
        localStorage.removeItem("authUserMandiri");
        localStorage.removeItem("clientSecret");
        setAuthorization(null)
        callback && callback()
        yield put(logoutUserSuccess({}))
    }catch(error){
        yield put(logoutUserError(error))
    }
}

function* onGetUserLogin() {
    try{
        const user = JSON.parse(localStorage.getItem("authUserMandiri")) 
        ? JSON.parse(localStorage.getItem("authUserMandiri")) : null;
        yield put(loginUserSuccess(user))
    }catch(error){
        console.error(error)
    }
}

function* onSignUpUser({payload: {data, callback}}) {
    try{
        let newData = {...data}
        newData.clientSecret = uuid.v4().substring(0, 32)
        localStorage.setItem("clientSecret", JSON.stringify(newData.clientSecret || null));
        const response = yield call(servicePayment.signUpUser, newData);
        console.log(response)
        yield put(signUpUserSuccess(response.user));
        localStorage.setItem("authUserMandiri", JSON.stringify(response.user || null));
        callback && callback()
    }catch(error){
        yield put(signUpUserError(error))
        toast.error(error?.response?.msg || "error")
    }
}

export default function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, onLoginUser);
    yield takeEvery(LOGOUT_USER, onLogoutUser);
    yield takeEvery(GET_USER_LOGIN, onGetUserLogin);
    yield takeEvery(SIGNUP_USER, onSignUpUser);
}