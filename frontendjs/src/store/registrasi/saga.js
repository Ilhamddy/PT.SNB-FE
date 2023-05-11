import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRegistrasi from "../../services/service-registrasi";
// Task Redux States
import {
    REGISTRASI_GET,
    REGISTRASI_LIST_GET,
    REGISTRASI_SAVE,
} from "./actionType";
import {
    registrasiGetError,
    registrasiGetSuccess,
    registrasiGetListError,
    registrasiGetListSuccess,
    registrasiSaveError,
    registrasiSaveSuccess,
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

function* onGetRegistrasiList() {
    try {
        const response = yield call(serviceRegistrasi.getAllPasien);
        yield put(registrasiGetListSuccess(response.data));
    } catch (error) {
        yield put(registrasiGetListError(error));
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

export function* watchSaveRegistrasi() {
    yield takeEvery(REGISTRASI_SAVE, onSaveRegistrasi);
}

export function* watchGetRegistrasiList() {
    yield takeEvery(REGISTRASI_LIST_GET, onGetRegistrasiList);
}

export function* watchGetRegistrasi() {
    yield takeEvery(REGISTRASI_GET, onGetRegistrasi);
}

function* registrasiSaga() {
    yield all([
        fork(watchSaveRegistrasi),
        fork(watchGetRegistrasiList),
        fork(watchGetRegistrasi),
    ]);
}

export default registrasiSaga;
