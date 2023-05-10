import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRegistrasi from "../../services/service-registrasi";
// Task Redux States
import {
    REGISTRASI_CREATE,
} from "./actionType";
import {
    registrasiCreateError,
    registrasiCreateSuccess,
} from "./action";

const serviceRegistrasi = new ServiceRegistrasi();

function* onCreateRegistrasi({payload: registrasi}) {
    try {
        const { data } = yield call(serviceRegistrasi.createPasienBaru(registrasi));
        yield put(registrasiCreateSuccess(data));
    } catch (error) {
        yield put(registrasiCreateError(error));
    }
}

export function* watchCreateRegistrasi() {
    yield takeEvery(REGISTRASI_CREATE, onCreateRegistrasi);
}

function* registrasiSaga() {
    yield all([
        fork(watchCreateRegistrasi),
    ]);
}

export default registrasiSaga;
