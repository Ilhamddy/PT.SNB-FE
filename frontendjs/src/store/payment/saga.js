import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    pelayananFromAntreanGetError, 
    pelayananFromAntreanGetSuccess,
    notaVerifCreateSuccess,
    notaVerifCreateError,
    daftarTagihanPasienGetSuccess,
    daftarTagihanPasienGetError,
    pelayananFromVerifGetSuccess,
    pelayananFromVerifGetError,
} from "./action";

import {
    PELAYANAN_FROM_ANTREAN_GET, 
    NOTA_VERIF_CREATE,
    DAFTAR_TAGIHAN_PASIEN_GET,
    PELAYANAN_FROM_VERIF_GET,
} from "./actionType";

import ServicePayment from "../../services/service-payment";
import { toast } from "react-toastify";

const servicePayment = new ServicePayment();


function* onGetPelayananFromAntrean( {payload: {norecap}}) {
    try {
        const response = yield call(servicePayment.getPelayananFromAntrean, norecap);
        yield put(pelayananFromAntreanGetSuccess(response.data));
    } catch (error) {
        yield put(pelayananFromAntreanGetError(error));
    }
}

function* onGetNotaVerifCreate( {payload: {body, callback}}) {
    try {
        const response = yield call(servicePayment.createNotaVerif, body);
        yield put(notaVerifCreateSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 });
        callback();
    } catch (error) {
        console.error(error)
        yield put(notaVerifCreateError(error));
    }
}

function* onGetDaftarTagihanPasien( {payload: {body}}) {
    try {
        const response = yield call(servicePayment.getDaftarTagihanPasien, body);
        yield put(daftarTagihanPasienGetSuccess(response.data));
    } catch (error) {
        yield put(daftarTagihanPasienGetError(error));
    }
}

function* onGetPelayananFromVerif( {payload: {norecnota}}) {
    try {
        const response = yield call(servicePayment.getPelayananFromVerif, norecnota);
        yield put(pelayananFromVerifGetSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(pelayananFromVerifGetError(error));
    }
}

export function* watchGetPelayananFromAntrean() {
    yield takeEvery(PELAYANAN_FROM_ANTREAN_GET, onGetPelayananFromAntrean);
}

export function* watchGetNotaVerifCreate() {
    yield takeEvery(NOTA_VERIF_CREATE, onGetNotaVerifCreate);
}

export function* watchGetDaftarTagihanPasien() {
    yield takeEvery(DAFTAR_TAGIHAN_PASIEN_GET, onGetDaftarTagihanPasien);
}

export function* watchGetPelayananFromVerif() {
    yield takeEvery(PELAYANAN_FROM_VERIF_GET, onGetPelayananFromVerif);
}

export default function* masterSaga() {
    yield all([
        fork(watchGetPelayananFromAntrean),
        fork(watchGetNotaVerifCreate),
        fork(watchGetDaftarTagihanPasien),
        fork(watchGetPelayananFromVerif),
    ]);
}