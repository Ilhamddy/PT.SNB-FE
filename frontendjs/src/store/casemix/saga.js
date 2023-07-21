import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceCasemix from "../../services/service-casemix";

import {
    LIST_CARI_PASIEN_GET,
    LIST_DAFTAR_PASIEN_GET,
    LIST_TARIF_PASIEN_GET,
    LISTDIAGNOSAX_GET,
    LISTDIAGNOSAIX_GET,
    BRIDGING_INACBG_SAVE,
    TARIF_KLAIM_SAVE
} from "./actionType";

import {
    listCariPasienGetSuccess, listCariPasienGetError,
    listDaftarPasienGetSuccess, listDaftarPasienGetError,
    listTarifPasienGetSuccess, listTarifPasienGetError,
    listDiagnosaxGetSuccess, listDiagnosaxGetError,
    listDiagnosaixGetSuccess, listDiagnosaixGetError,
    bridgingInacbgSaveSuccess, bridgingInacbgSaveError,
    tarifKlaimSaveSuccess,tarifKlaimSaveError
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

function* onbridgingInacbgSave({ payload: { data, history } }) {
    try {
        let response = yield call(serviceCasemix.postBridgingInacbg, data);

        yield put(bridgingInacbgSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(bridgingInacbgSaveError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonbridgingInacbgSave() {
    yield takeEvery(BRIDGING_INACBG_SAVE, onbridgingInacbgSave);
}

function* ontarifKlaimSave({ payload: { data, history } }) {
    try {
        let response = yield call(serviceCasemix.postTarifKlaim, data);

        yield put(tarifKlaimSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(tarifKlaimSaveError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchontarifKlaimSave() {
    yield takeEvery(TARIF_KLAIM_SAVE, ontarifKlaimSave);
}

function* casemixSaga() {
    yield all([
        fork(watchonListCariPasienGet),
        fork(watchonListDaftarPasienGet),
        fork(watchonListTarifPasienGet),
        fork(watchListDiagnosax),
        fork(watchListDiagnosaix),
        fork(watchonbridgingInacbgSave),
        fork(watchontarifKlaimSave)
    ]);
}

export default casemixSaga;