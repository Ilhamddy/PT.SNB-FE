import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRegistrasi from "../../services/service-registrasi";
// Task Redux States
import {
    REGISTRASI_GET,
    REGISTRASI_LIST_GET,
    REGISTRASI_SAVE,
    REGISTRASI_LIST_BYOR_GET,
    REGISTRASI_SAVE_RUANGAN,
    REGISTRASI_NOREGISTRASI_GET,
    REGISTRASI_RUANGAN_NOREC_GET,
    REGISTRASI_NO_BPJS_GET,
    REGISTRASI_SAVE_PENJAMIN_FK,
    PASIEN_FORM_QUERIES_GET,
    SAVE_BATAL_REGISTRASI,
    SAVE_REGISTRASI_MUTASI,
    GET_HISTORY_REGISTRASI
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
    registrasiSaveRuanganError,
    registrasiNoregistrasiGetError,
    registrasiNoregistrasiGetSuccess,
    registrasiRuanganNorecGetSuccess,
    registrasiRuanganNorecGetError,
    registrasiNoBPJSGetSuccess,
    registrasiNoBPJSGetError,
    registrasiSavePenjaminFKSuccess,
    registrasiSavePenjaminFKError,
    pasienFormQueriesGetSuccess,
    pasienFormQueriesGetError,
    saveBatalRegistrasiSuccess,
    saveBatalRegistrasiError,
    saveRegistrasiMutasiSuccess, saveRegistrasiMutasiError,
    getHistoryRegistrasiSuccess, getHistoryRegistrasiError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceRegistrasi = new ServiceRegistrasi();

function* onSaveRegistrasi({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceRegistrasi.createPasienBaru, data);

        yield put(registrasiSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
            callback && callback(response);
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(registrasiSaveError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

function* onGetRegistrasiList({ payload: { nocm } }) {
    try {
        const response = yield call(serviceRegistrasi.getAllPasienByOr, nocm);
        yield put(registrasiGetListSuccess(response.data));
    } catch (error) {
        yield put(registrasiGetListError(error));
    }
}

function* onGetRegistrasiListByOr({ payload: { nocm } }) {
    try {
        const response = yield call(serviceRegistrasi.getAllPasienByOr, nocm);
        yield put(registrasiGetListByOrSuccess(response.data));
    } catch (error) {
        yield put(registrasiGetListByOrError(error));
    }
}

function* onGetRegistrasi({ payload: { id } }) {
    try {
        const response = yield call(serviceRegistrasi.getPasien, id);
        yield put(registrasiGetSuccess(response.data));
    } catch (error) {
        yield put(registrasiGetError(error));
    }
}

function* onGetRegistrasiNorec({ payload: { norec } }) {
    try {
        const response = yield call(serviceRegistrasi.getRegistrasiPasienNorec, norec);
        yield put(registrasiRuanganNorecGetSuccess(response.data));
    } catch (error) {
        yield put(registrasiRuanganNorecGetError(error));
    }
}


function* onSaveRegistrasiRuangan({ payload: { data, callback } }) {
    try {
        let response = null;
        if (data.id) {
            response = yield call(serviceRegistrasi.saveRegistrasiDaftarPasien, data);
        } else {
            response = yield call(serviceRegistrasi.createPasienBaru, data);
        }

        yield put(registrasiSaveRuanganSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback()
    } catch (error) {
        yield put(registrasiSaveRuanganError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

function* onRegistrasiSavePenjaminFK({ payload: { data, callback } }) {
    try {
        const response = yield call(serviceRegistrasi.saveRegistrasiPenjaminFK, data);
        yield put(registrasiSavePenjaminFKSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
            callback && callback();
            console.log("success")
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(registrasiSavePenjaminFKError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

function* onGetRegistrasiNoregistrasi({ payload: { noregistrasi } }) {
    try {
        const response = yield call(serviceRegistrasi.getPasienByNoregistrasi, noregistrasi);
        yield put(registrasiNoregistrasiGetSuccess(response.data));
    } catch (error) {
        yield put(registrasiNoregistrasiGetError(error));
    }
}

function* onGetRegistrasiNoBPJS({ payload: { nobpjs } }) {
    try {
        const response = yield call(serviceRegistrasi.getListBPJS, nobpjs);
        yield put(registrasiNoBPJSGetSuccess(response.data));
    } catch (error) {
        yield put(registrasiNoBPJSGetError(error));
    }
}

function* onGetPasienFormQueries({ payload: { queries } }) {
    try {
        const response = yield call(serviceRegistrasi.getPasienFormById, queries);
        yield put(pasienFormQueriesGetSuccess(response.data));
    } catch (error) {
        yield put(pasienFormQueriesGetError(error));
    }
}

function* onsaveBatalRegistrasi({ payload: { data, callback } }) {
    try {
        const response = yield call(serviceRegistrasi.saveBatalRegistrasi, data);
        yield put(saveBatalRegistrasiSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
            callback && callback();
            console.log("success")
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(saveBatalRegistrasiError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

function* onsaveRegistrasiMutasi({ payload: { data, callback } }) {
    try {
        const response = yield call(serviceRegistrasi.saveRegistrasiMutasi, data);
        yield put(saveRegistrasiMutasiSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
            callback && callback();
            console.log("success")
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(saveRegistrasiMutasiError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}


function* ongetHistoryRegistrasi({payload: {data, callback}}) {
    try{
        const response = yield call(serviceRegistrasi.getHistoryRegistrasi, data);
        yield put(getHistoryRegistrasiSuccess(response.data));
        // toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(getHistoryRegistrasiError(error));
        // toast.error(error.msg || "Gagal");
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

export function* watchGetRegistrasiNoregistrasi() {
    yield takeEvery(REGISTRASI_NOREGISTRASI_GET, onGetRegistrasiNoregistrasi);
}

export function* watchGetRegistrasiNorec() {
    yield takeEvery(REGISTRASI_RUANGAN_NOREC_GET, onGetRegistrasiNorec);
}

export function* watchGetRegistrasiNoBPJS() {
    yield takeEvery(REGISTRASI_NO_BPJS_GET, onGetRegistrasiNoBPJS);
}

export function* watchRegistrasiSavePenjaminFK() {
    yield takeEvery(REGISTRASI_SAVE_PENJAMIN_FK, onRegistrasiSavePenjaminFK);
}

export function* watchGetPasienFormQueries() {
    yield takeEvery(PASIEN_FORM_QUERIES_GET, onGetPasienFormQueries);
}

export function* watchsaveBatalRegistrasi() {
    yield takeEvery(SAVE_BATAL_REGISTRASI, onsaveBatalRegistrasi);
}

export function* watchonsaveRegistrasiMutasi() {
    yield takeEvery(SAVE_REGISTRASI_MUTASI, onsaveRegistrasiMutasi);
}
export function* watchongetHistoryRegistrasi() {
    yield takeEvery(GET_HISTORY_REGISTRASI, ongetHistoryRegistrasi);
}

function* registrasiSaga() {
    yield all([
        fork(watchSaveRegistrasi),
        fork(watchGetRegistrasiList),
        fork(watchGetRegistrasi),
        fork(watchGetRegistrasiListByOr),
        fork(watchSaveRegistrasiRuangan),
        fork(watchGetRegistrasiNoregistrasi),
        fork(watchGetRegistrasiNorec),
        fork(watchGetRegistrasiNoBPJS),
        fork(watchRegistrasiSavePenjaminFK),
        fork(watchGetPasienFormQueries),
        fork(watchsaveBatalRegistrasi),
        fork(watchonsaveRegistrasiMutasi),
        fork(watchongetHistoryRegistrasi)
    ]);
}

export default registrasiSaga
