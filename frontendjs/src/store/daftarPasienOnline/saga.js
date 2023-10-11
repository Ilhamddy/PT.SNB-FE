import { call, put, takeEvery } from "redux-saga/effects";
import ServiceRegistrasi from "../../services/service-registrasi";

import {
    GET_COMBO_VERIFIKASI_ONLINE,
    GET_DAFTAR_PASIEN_ONLINE
} from "./actionType";

import {
    getComboVerifikasiOnlineSuccess,
    getComboVerifikasiOnlineError,
    getDaftarPasienOnlineSuccess,
    getDaftarPasienOnlineError
} from "./action";
import { toast } from "react-toastify";

const serviceRegistrasi = new ServiceRegistrasi();

function* onGetDaftarPasienRJ() {
    try {
        const response = yield call(serviceRegistrasi.getComboVerifikasiOnline);
        yield put(getComboVerifikasiOnlineSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(getComboVerifikasiOnlineError(error));
    }
}

function* onGetDaftarPasienOnline({payload: {queries}}){
    try {
        const response = yield call(serviceRegistrasi.getDaftarPasienOnline, queries);
        yield put(getDaftarPasienOnlineSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(getDaftarPasienOnlineError(error));
    }
}

export default function* watchDaftarPasienOnlineSaga() {
    yield takeEvery(GET_COMBO_VERIFIKASI_ONLINE, onGetDaftarPasienRJ);
    yield takeEvery(GET_DAFTAR_PASIEN_ONLINE, onGetDaftarPasienOnline);
}