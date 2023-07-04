import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRegistrasi from "../../services/service-registrasi";

import {
    DAFTARPASIEN_RJ_GET, WIDGET_DAFTARPASIEN_RJ_GET,
    WIDGET_DAFTARPASIEN_RI_GET, DAFTARPASIEN_RI_GET,
    DAFTARPASIEN_PULANG_GET,
    DAFTARPASIEN_PULANG_GET_SUCCESS,
    DAFTARPASIEN_PULANG_GET_ERROR
} from "./actionType";

import {
    daftarPasienRJGetSuccess, daftarPasienRJGetError, widgetdaftarPasienRJGetSuccess, widgetdaftarPasienRJGetError,
    widgetdaftarPasienRIGetSuccess, widgetdaftarPasienRIGetError,
    daftarPasienRIGetSuccess, daftarPasienRIGetError
} from "./action";

const serviceRegistrasi = new ServiceRegistrasi();

function* onGetDaftarPasienRJ({ payload: { param } }) {
    try {
        const response = yield call(serviceRegistrasi.getDaftarPasienRJ, param);
        yield put(daftarPasienRJGetSuccess(response.data));
    } catch (error) {
        yield put(daftarPasienRJGetError(error));
    }
}

function* onGetWidgetDaftarPasienRJ({ payload: { param } }) {
    try {
        const response = yield call(serviceRegistrasi.getWidgetDaftarPasienRJ, param);
        yield put(widgetdaftarPasienRJGetSuccess(response.data));
    } catch (error) {
        yield put(widgetdaftarPasienRJGetError(error));
    }
}

function* onGetWidgetDaftarPasienRI({ payload: { param } }) {
    try {
        const response = yield call(serviceRegistrasi.getWidgetDaftarPasienRI, param);
        yield put(widgetdaftarPasienRIGetSuccess(response.data));
    } catch (error) {
        yield put(widgetdaftarPasienRIGetError(error));
    }
}

function* onGetDaftarPasienRI({ payload: { param } }) {
    try {
        const response = yield call(serviceRegistrasi.getDaftarPasienRI, param);
        yield put(daftarPasienRIGetSuccess(response.data));
    } catch (error) {
        yield put(daftarPasienRIGetError(error));
    }
}

function* onGetDaftarPasienPulang({ payload: { dateStart, dateEnd, instalasi, unit, search }}) {
    try {
        const response = yield call(serviceRegistrasi.getDaftarPasienPulang, [dateStart, dateEnd, instalasi, unit, search]);
        yield put({ type: DAFTARPASIEN_PULANG_GET_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: DAFTARPASIEN_PULANG_GET_ERROR, payload: error });
    }
}

export function* watchGetDaftarPasienRJ() {
    yield takeEvery(DAFTARPASIEN_RJ_GET, onGetDaftarPasienRJ);
}

export function* watchGetWidgetDaftarPasienRJ() {
    yield takeEvery(WIDGET_DAFTARPASIEN_RJ_GET, onGetWidgetDaftarPasienRJ);
}


export function* watchGetWidgetDaftarPasienRI() {
    yield takeEvery(WIDGET_DAFTARPASIEN_RI_GET, onGetWidgetDaftarPasienRI);
}

export function* watchGetDaftarPasienRI() {
    yield takeEvery(DAFTARPASIEN_RI_GET, onGetDaftarPasienRI);
}

export function* watchGetDaftarPasienPulang() {
    yield takeEvery(DAFTARPASIEN_PULANG_GET, onGetDaftarPasienPulang);
}


function* daftarPasienSaga() {
    yield all([
        fork(watchGetDaftarPasienRJ),
        fork(watchGetWidgetDaftarPasienRJ),
        fork(watchGetWidgetDaftarPasienRI),
        fork(watchGetDaftarPasienRI),
        fork(watchGetDaftarPasienPulang)
    ]);
}

export default daftarPasienSaga;