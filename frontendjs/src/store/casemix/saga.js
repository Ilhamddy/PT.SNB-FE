import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceCasemix from "../../services/service-casemix";

import {
    LIST_CARI_PASIEN_GET,
    LIST_DAFTAR_PASIEN_GET,
    LIST_TARIF_PASIEN_GET,
    LISTDIAGNOSAX_GET,
    LISTDIAGNOSAIX_GET
} from "./actionType";

import {
    listCariPasienGetSuccess, listCariPasienGetError,
    listDaftarPasienGetSuccess, listDaftarPasienGetError,
    listTarifPasienGetSuccess, listTarifPasienGetError,
    listDiagnosaxGetSuccess, listDiagnosaxGetError,
    listDiagnosaixGetSuccess, listDiagnosaixGetError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceCasemix = new ServiceCasemix();

function* onListCariPasienGet({ payload: { param } }) {
    try {
        const response = yield call(serviceCasemix.getListCariPasien, param);
        yield put(listCariPasienGetSuccess(response.data));
    } catch (error) {
        yield put(listCariPasienGetError(error));
    }
}

export function* watchonListCariPasienGet() {
    yield takeEvery(LIST_CARI_PASIEN_GET, onListCariPasienGet);
}

function* onListDaftarPasienGet({ payload: { param } }) {
    try {
        const response = yield call(serviceCasemix.getListDaftarPasien, param);
        yield put(listDaftarPasienGetSuccess(response.data));
    } catch (error) {
        yield put(listDaftarPasienGetError(error));
    }
}

export function* watchonListDaftarPasienGet() {
    yield takeEvery(LIST_DAFTAR_PASIEN_GET, onListDaftarPasienGet);
}

function* onListTarifPasienGet({ payload: { param } }) {
    try {
        const response = yield call(serviceCasemix.getListTarifPasien, param);
        yield put(listTarifPasienGetSuccess(response.data));
    } catch (error) {
        yield put(listTarifPasienGetError(error));
    }
}

export function* watchonListTarifPasienGet() {
    yield takeEvery(LIST_TARIF_PASIEN_GET, onListTarifPasienGet);
}

function* onListDiagnosax({ payload: { param } }) {
    try {
        let response = null;
        response = yield call(serviceCasemix.getListDiagnosa10, param);

        yield put(listDiagnosaxGetSuccess(response.data));
    } catch (error) {
        yield put(listDiagnosaxGetError(error));
    }
}

export function* watchListDiagnosax() {
    yield takeEvery(LISTDIAGNOSAX_GET, onListDiagnosax);
}

function* onListDiagnosaix({ payload: { param } }) {
    try {
        let response = null;
        response = yield call(serviceCasemix.getListDiagnosa9, param);

        yield put(listDiagnosaixGetSuccess(response.data));
    } catch (error) {
        yield put(listDiagnosaixGetError(error));
    }
}

export function* watchListDiagnosaix() {
    yield takeEvery(LISTDIAGNOSAIX_GET, onListDiagnosaix);
}

function* casemixSaga() {
    yield all([
        fork(watchonListCariPasienGet),
        fork(watchonListDaftarPasienGet),
        fork(watchonListTarifPasienGet),
        fork(watchListDiagnosax),
        fork(watchListDiagnosaix)
    ]);
}

export default casemixSaga;