import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    loginUserSuccess,
    loginUserError,
    logoutUserSuccess,
    logoutUserError,
    signUpUserSuccess,
    signUpUserError,
    getRiwayatRegistrasiSuccess,
    getRiwayatRegistrasiError,
    batalRegisSuccess,
    batalRegisError,
    getPasienEditSuccess,
    getPasienEditError,
    updatePasienSuccess,
    updatePasienError,
    getPasienAkunSuccess,
    getPasienAkunError,
    getComboPenjaminSuccess,
    getComboPenjaminError,
    upsertPenjaminSuccess,
    upsertPenjaminError,
    getPenjaminPasienSuccess,
    getPenjaminPasienError
} from "./action";
import * as uuid from 'uuid'

import {
    GET_USER_LOGIN,
    LOGIN_USER,
    LOGOUT_USER,
    SIGNUP_USER,
    GET_RIWAYAT_REGISTRASI,
    BATAL_REGIS,
    GET_PASIEN_EDIT,
    UPDATE_PASIEN,
    GET_PASIEN_AKUN,
    GET_COMBO_PENJAMIN,
    UPSERT_PENJAMIN,
    GET_PENJAMIN_PASIEN
} from "./actionType";

import ServiceUserPasien from "../../service/service-userpasien";
import { toast } from "react-toastify";
import { setAuthorization } from "../../helpers/api_helper";

const serviceUserPasien = new ServiceUserPasien();

function* onLoginUser({payload: {data, callback}}) {
    try {
        const newData = {...data}
        newData.clientSecret = uuid.v4().substring(0, 32)
        localStorage.setItem("clientSecret", JSON.stringify(newData.clientSecret || null));
        const response = yield call(serviceUserPasien.loginUser, newData);
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
        const response = yield call(serviceUserPasien.signUpUser, newData);
        console.log(response)
        yield put(signUpUserSuccess(response.user));
        localStorage.setItem("authUserMandiri", JSON.stringify(response.user || null));
        callback && callback()
    }catch(error){
        yield put(signUpUserError(error))
        toast.error(error?.response?.msg || "error")
    }
}

function* onGetRiwayatRegistrasi({payload: {queries}}) {
    try{
        const response = yield call(serviceUserPasien.getRiwayatRegistrasi, queries);
        yield put(getRiwayatRegistrasiSuccess(response.data));
    }catch(error){
        yield put(getRiwayatRegistrasiError(error))
        toast.error(error?.response?.msg || "error")
    }
}

function* onBatalRegis({payload: {data, callback}}){
    try{
        const response = yield call(serviceUserPasien.batalRegis, data);
        yield put(batalRegisSuccess(response.data));
        toast.success(response.msg || "Sukses batal")
        callback && callback()
    }catch(error){
        console.error(error)
        yield put(batalRegisError(error))
        toast.error(error?.response?.msg || "error")
    }
}

function* onGetPasienEdit({payload: {queries}}){
    try{
        const response = yield call(serviceUserPasien.getPasienEdit, queries);
        yield put(getPasienEditSuccess(response.data)); 
    }catch(error){
        console.error(error)
        yield put(getPasienEditError(error))
    }
}

function* onUpdatePasien({payload: {data, callback}}){
    try{
        const response = yield call(serviceUserPasien.updatePasien, data);
        yield put(updatePasienSuccess(response.data)); 
        toast.success(response.msg || "Sukses update")
        callback && callback()
    }catch(error){
        console.error(error)
        yield put(updatePasienError(error))
        toast.error(error?.response?.msg || "error")
    }
}

function* onGetPasienAkun({payload: {queries}}){
    try{
        const response = yield call(serviceUserPasien.getPasienAkun, queries);
        yield put(getPasienAkunSuccess(response.data)); 
    }catch(error){
        console.error(error)
        yield put(getPasienAkunError(error))
    }
}

function* onGetComboPenjamin(){
    try{
        const response = yield call(serviceUserPasien.getComboPenjamin);
        yield put(getComboPenjaminSuccess(response.data)); 
    }catch(error){
        console.error(error)
        yield put(getComboPenjaminError(error))
    }
}

function* onUpsertPenjamin({payload: {data, callback}}){
    try{
        const response = yield call(serviceUserPasien.upsertPenjamin, data);
        yield put(upsertPenjaminSuccess(response.data)); 
        toast.success(response.msg || "Sukses update")
        callback && callback()
    }catch(error){
        console.error(error)
        yield put(upsertPenjaminError(error))
        toast.error(error?.response?.msg || "error")
    }
}

function* onGetPenjaminPasien(){
    try{
        const response = yield call(serviceUserPasien.getPenjaminPasien);
        yield put(getPenjaminPasienSuccess(response.data)); 
    }catch(error){
        console.error(error)
        yield put(getPenjaminPasienError(error))
    }
}

export default function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, onLoginUser);
    yield takeEvery(LOGOUT_USER, onLogoutUser);
    yield takeEvery(GET_USER_LOGIN, onGetUserLogin);
    yield takeEvery(SIGNUP_USER, onSignUpUser);
    yield takeEvery(GET_RIWAYAT_REGISTRASI, onGetRiwayatRegistrasi)
    yield takeEvery(BATAL_REGIS, onBatalRegis);
    yield takeEvery(GET_PASIEN_EDIT, onGetPasienEdit);
    yield takeEvery(UPDATE_PASIEN, onUpdatePasien);
    yield takeEvery(GET_PASIEN_AKUN, onGetPasienAkun);
    yield takeEvery(GET_COMBO_PENJAMIN, onGetComboPenjamin);
    yield takeEvery(UPSERT_PENJAMIN, onUpsertPenjamin);
    yield takeEvery(GET_PENJAMIN_PASIEN, onGetPenjaminPasien);
}