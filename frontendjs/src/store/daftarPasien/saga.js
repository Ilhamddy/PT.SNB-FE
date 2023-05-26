import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRegistrasi from "../../services/service-registrasi";

import { DAFTARPASIEN_RJ_GET,WIDGET_DAFTARPASIEN_RJ_GET } from "./actionType";

import { daftarPasienRJGetSuccess,daftarPasienRJGetError,widgetdaftarPasienRJGetSuccess,widgetdaftarPasienRJGetError } from "./action";

const serviceRegistrasi = new ServiceRegistrasi();

function* onGetDaftarPasienRJ({payload: {param}}) {
    try {
        const response = yield call(serviceRegistrasi.getDaftarPasienRJ, param);
        yield put(daftarPasienRJGetSuccess(response.data));
    } catch (error) {
        yield put(daftarPasienRJGetError(error));
    }
}


export function* watchGetDaftarPasienRJ() {
    yield takeEvery(DAFTARPASIEN_RJ_GET, onGetDaftarPasienRJ);
}

function* onGetWidgetDaftarPasienRJ({payload: {param}}) {
    try {
        const response = yield call(serviceRegistrasi.getWidgetDaftarPasienRJ, param);
        yield put(widgetdaftarPasienRJGetSuccess(response.data));
    } catch (error) {
        yield put(widgetdaftarPasienRJGetError(error));
    }
}


export function* watchGetWidgetDaftarPasienRJ() {
    yield takeEvery(WIDGET_DAFTARPASIEN_RJ_GET, onGetWidgetDaftarPasienRJ);
}


function* daftarPasienSaga() {
    yield all([
        fork(watchGetDaftarPasienRJ),
        fork(watchGetWidgetDaftarPasienRJ)
    ]);
}

export default daftarPasienSaga;