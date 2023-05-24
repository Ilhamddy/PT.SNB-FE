import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRegistrasi from "../../services/service-registrasi";
// Task Redux States
import {
    REGISTRASI_GET,
    REGISTRASI_LIST_GET,
    REGISTRASI_SAVE,
    REGISTRASI_LIST_BYOR_GET,
    REGISTRASI_SAVE_RUANGAN
} from "./actionType";
import {
    registrasiGetError,
    registrasiGetSuccess,
    registrasiGetListError,
    registrasiGetListSuccess,
    registrasiSaveError,
    registrasiSaveSuccess,
    registrasiGetListByOrError,
    registrasiGetListByOrSuccess,
    registrasiSaveRuanganSuccess,
    registrasiSaveRuanganError
} from "./action";

const serviceRegistrasi = new ServiceRegistrasi();

function* onSaveRegistrasi({payload: { data, history}}) {
    try {
        let response = null;
        if (data.id) {
            response = yield call(serviceRegistrasi.updatePasien, data);
        } else {
            response = yield call(serviceRegistrasi.createPasienBaru, data);
        }
        
        yield put(registrasiSaveSuccess(response.data));
        history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(registrasiSaveError(error));
    }
}

function* onGetRegistrasiList({payload: {nocm}}) {
    try {
        const response = yield call(serviceRegistrasi.getAllPasienByOr, nocm);
        yield put(registrasiGetListSuccess(response.data));
    } catch (error) {
        yield put(registrasiGetListError(error));
    }
}

function* onGetRegistrasiListByOr({payload: {nocm}}) {
    try {
        const response = yield call(serviceRegistrasi.getAllPasienByOr, nocm);
        yield put(registrasiGetListByOrSuccess(response.data));
    } catch (error) {
        yield put(registrasiGetListByOrError(error));
    }
}

function* onGetRegistrasi({payload: {id}}) {
    try {
        const response = yield call(serviceRegistrasi.getPasien, id);
        yield put(registrasiGetSuccess(response.data));
    } catch (error) {
        yield put(registrasiGetError(error));
    }
}

function* onSaveRegistrasiRuangan({ payload: { data, history} }) {
    try {
        let response = null;
        if (data.id) {
            response = yield call(serviceRegistrasi.saveRegistrasiDaftarPasien, data);
        } else {
            response = yield call(serviceRegistrasi.createPasienBaru, data);
        }
        
        yield put(registrasiSaveRuanganSuccess(response.data));
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(registrasiSaveRuanganError(error));
    }
}

export function* watchSaveRegistrasi() {
    yield takeEvery(REGISTRASI_SAVE, onSaveRegistrasi);
}

export function* watchGetRegistrasiList() {
    yield takeEvery(REGISTRASI_LIST_GET, onGetRegistrasiList);
}

export function* watchGetRegistrasi() {
    yield takeEvery(REGISTRASI_GET, onGetRegistrasi);
}

export function* watchGetRegistrasiListByOr() {
    yield takeEvery(REGISTRASI_LIST_BYOR_GET, onGetRegistrasiListByOr);
}

export function* watchSaveRegistrasiRuangan() {
    yield takeEvery(REGISTRASI_SAVE_RUANGAN, onSaveRegistrasiRuangan);
}

function* registrasiSaga() {
    yield all([
        fork(watchSaveRegistrasi),
        fork(watchGetRegistrasiList),
        fork(watchGetRegistrasi),
        fork(watchGetRegistrasiListByOr),
        fork(watchSaveRegistrasiRuangan)
    ]);
}

export default registrasiSaga;
