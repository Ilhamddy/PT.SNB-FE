import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRegistrasi from "../../services/service-registrasi";

import {
    DAFTARPASIEN_RJ_GET, WIDGET_DAFTARPASIEN_RJ_GET,
    WIDGET_DAFTARPASIEN_RI_GET, DAFTARPASIEN_RI_GET,
    DAFTARPASIEN_PULANG_GET,
    DAFTARPASIEN_PULANG_GET_SUCCESS,
    DAFTARPASIEN_PULANG_GET_ERROR,
    DAFTARPASIEN_RI_PULANG_SAVE_ERROR,
    DAFTARPASIEN_RI_PULANG_SAVE,
    LIST_FASKES_GET,
    DAFTARPASIEN_NOREC_GET,
    ANTREAN_NOREC_GET,
    DAFTARPASIEN_REGISTRASI_GET,
    WIDGET_DAFTARPASIEN_REGISTRASI_GET
} from "./actionType";

import {
    daftarPasienRJGetSuccess, daftarPasienRJGetError, widgetdaftarPasienRJGetSuccess, widgetdaftarPasienRJGetError,
    widgetdaftarPasienRIGetSuccess, widgetdaftarPasienRIGetError,
    daftarPasienRIGetSuccess, daftarPasienRIGetError, 
    daftarPasienRIPulangSaveSuccess,
    listFaskesSuccess,
    listFaskesError,
    daftarPasienNorecGetSuccess,
    daftarPasienNorecGetError,
    antreanPasienNorecGetSuccess,
    antreanPasienNorecGetError,
    daftarPasienRegistrasiGetSuccess,
    daftarPasienRegistrasiGetError,
    widgetdaftarPasienRegistrasiGetSuccess,
    widgetdaftarPasienRegistrasiGetError
} from "./action";
import { toast } from "react-toastify";

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

function* saveDaftarPasienPulang({ payload: {data, callback} }) {
    try {
        const response = yield call(serviceRegistrasi.saveDaftarPasienPulang, data);
        toast.success(response.msg, { autoClose: 3000 });
        callback();
        yield put(daftarPasienRIPulangSaveSuccess(response.data));
    } catch (error) {
        console.error(error)
        toast.error(error.msg || error.message, { autoClose: 3000 });
        yield put({ type: DAFTARPASIEN_RI_PULANG_SAVE_ERROR, payload: error });
    }
}

function* daftarPasienNorecGet({ payload: { norec } }) {
    try {
        const response = yield call(serviceRegistrasi.getDaftarPasienNorec, norec);
        yield put(daftarPasienNorecGetSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(daftarPasienNorecGetError(error));
    }
}



function* onGetListFaskes({ payload: { qfaskes, faskesType } }) {
    try {
        const response = yield call(serviceRegistrasi.getListFaskes, [qfaskes, faskesType]);
        yield put(listFaskesSuccess(response.data));
    } catch (error) {
        yield put(listFaskesError(error));
    }
}

function* onAntreanNorecGet({ payload: { norec } }) {
    try {
        const response = yield call(serviceRegistrasi.getAntreanByNorec, norec);
        yield put(antreanPasienNorecGetSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(antreanPasienNorecGetError(error));
    }
}

function* ondaftarPasienRegistrasiGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRegistrasi.getDaftarPasienRegistrasi, param);
        yield put(daftarPasienRegistrasiGetSuccess(response.data));
    } catch (error) {
        yield put(daftarPasienRegistrasiGetError(error));
    }
}

function* onwidgetdaftarPasienRegistrasiGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRegistrasi.getWidgetDaftarPasienRegistrasi, param);
        yield put(widgetdaftarPasienRegistrasiGetSuccess(response.data));
    } catch (error) {
        yield put(widgetdaftarPasienRegistrasiGetError(error));
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

export function* watchSaveDaftarPasienPulang() {
    yield takeEvery(DAFTARPASIEN_RI_PULANG_SAVE, saveDaftarPasienPulang);
}

export function* watchGetListFaskes() {
    yield takeEvery(LIST_FASKES_GET, onGetListFaskes);
}

export function* watchDaftarPasienNorecGet(){
    yield takeEvery(DAFTARPASIEN_NOREC_GET, daftarPasienNorecGet);
}

export function* watchAntreanNorecGet(){
    yield takeEvery(ANTREAN_NOREC_GET, onAntreanNorecGet);
}

export function* watchondaftarPasienRegistrasiGet(){
    yield takeEvery(DAFTARPASIEN_REGISTRASI_GET, ondaftarPasienRegistrasiGet);
}

export function* watchonwidgetdaftarPasienRegistrasiGet(){
    yield takeEvery(WIDGET_DAFTARPASIEN_REGISTRASI_GET, onwidgetdaftarPasienRegistrasiGet);
}


function* daftarPasienSaga() {
    yield all([
        fork(watchGetDaftarPasienRJ),
        fork(watchGetWidgetDaftarPasienRJ),
        fork(watchGetWidgetDaftarPasienRI),
        fork(watchGetDaftarPasienRI),
        fork(watchGetDaftarPasienPulang),
        fork(watchSaveDaftarPasienPulang),
        fork(watchGetListFaskes),
        fork(watchDaftarPasienNorecGet),
        fork(watchAntreanNorecGet),
        fork(watchondaftarPasienRegistrasiGet),
        fork(watchonwidgetdaftarPasienRegistrasiGet)
    ]);
}

export default daftarPasienSaga;