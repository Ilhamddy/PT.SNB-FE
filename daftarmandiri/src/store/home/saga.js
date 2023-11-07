import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    getJadwalDokterSuccess,
    getJadwalDokterError,
    getComboJadwalSuccess,
    getComboJadwalError,
    getBeritaHomeSuccess,
    getBeritaHomeError,
    getBeritaQueryError,
    getBeritaQuerySuccess,
    getCaptchaSuccess,
    getCaptchaError
} from "./action";
import * as uuid from 'uuid'

import {
    GET_JADWAL_DOKTER,
    GET_COMBO_JADWAL,
    GET_BERITA_HOME,
    GET_BERITA_QUERY,
    GET_CAPTCHA
} from "./actionType";

import ServiceHome from "../../service/service-home";
import { toast } from "react-toastify";

const serviceHome = new ServiceHome();

function* onGetJadwalDokter({payload: {queries}}) {
    try {
        const response = yield call(serviceHome.getJadwalDokter, queries);
        yield put(getJadwalDokterSuccess(response.data));
    } catch (error) {
        yield put(getJadwalDokterError(error));
    }
}

function* onGetComboJadwal({payload: {queries}}) {
    try {
        const response = yield call(serviceHome.getComboJadwal, queries);
        yield put(getComboJadwalSuccess(response.data));
    } catch (error) {
        yield put(getComboJadwalError(error));
    }
}

function* onGetBeritaHome() {
    try {
        const response = yield call(serviceHome.getBeritaHome);
        yield put(getBeritaHomeSuccess(response.data));
    } catch (error) {
        yield put(getBeritaHomeError(error));
    }
}

function* onGetBeritaQuery({payload: {queries}}){
    try{
        const response = yield call(serviceHome.getBerita, queries);
        yield put(getBeritaQuerySuccess(response.data));
    } catch (error){
        yield put(getBeritaQueryError(error));
    }
}

function* onGetCaptcha({payload: {queries}}){
    try{
        const response = yield call(serviceHome.getCaptcha, queries);
        yield put(getCaptchaSuccess(response.data));
    } catch (error){
        yield put(getCaptchaError(error));
    }
}

export default function* watchLoginUser() {
    yield all([
        takeEvery(GET_JADWAL_DOKTER, onGetJadwalDokter),
        takeEvery(GET_COMBO_JADWAL, onGetComboJadwal),
        takeEvery(GET_BERITA_HOME, onGetBeritaHome),
        takeEvery(GET_BERITA_QUERY, onGetBeritaQuery),
        takeEvery(GET_CAPTCHA, onGetCaptcha)
    ])
}