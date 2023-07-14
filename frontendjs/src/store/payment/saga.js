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
    buktiBayarCreateSuccess,
    buktiBayarCreateError,
    verifNotaCancelSuccess,
    verifNotaCancelError,
    buktiBayarCancelSuccess,
    buktiBayarCancelError,
    daftarPiutangPasienGetSuccess,
    daftarPiutangPasienGetError,
} from "./action";

import {
    PELAYANAN_FROM_ANTREAN_GET, 
    NOTA_VERIF_CREATE,
    DAFTAR_TAGIHAN_PASIEN_GET,
    PELAYANAN_FROM_VERIF_GET,
    BUKTI_BAYAR_CREATE,
    VERIF_NOTA_CANCEL,
    BUKTI_BAYAR_CANCEL,
    DAFTAR_PIUTANG_PASIEN_GET,
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

function* onGetBuktiBayarCreate({payload: {body, callback}}) {
    try {
        const response = yield call(servicePayment.createBuktiBayar, body);
        yield put(buktiBayarCreateSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        console.error(error)
        yield put(buktiBayarCreateError(error));
    }
}

function* onVerifNotaCancel({payload: {norecnota, norecdp, callback}}) {
    try {
        const response = yield call(servicePayment.cancelNotaVerif, [norecnota, norecdp]);
        yield put(verifNotaCancelSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        console.error(error)
        toast.error("error", { autoClose: 3000 });
        yield put(verifNotaCancelError(error));
    }
}

function* onBuktiBayarCancel({payload: {norecnota, norecbayar, callback}}) {
    try {
        const response = yield call(servicePayment.cancelBayar, [norecnota, norecbayar]);
        yield put(buktiBayarCancelSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        console.error(error)
        toast.error("terjadi kesalahan", { autoClose: 3000 })
        yield put(buktiBayarCancelError(error));
    }
}

function* onGetDaftarPiutangPasien({payload: {location}}) {
    try {
        const response = yield call(servicePayment.getAllPiutang, location);
        yield put(daftarPiutangPasienGetSuccess(response.data));
    } catch (error) {
        yield put(daftarPiutangPasienGetError(error));
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

export function* watchGetBuktiBayarCreate() {
    yield takeEvery(BUKTI_BAYAR_CREATE, onGetBuktiBayarCreate);
}

export function* watchVerifNotaCancel() {
    yield takeEvery(VERIF_NOTA_CANCEL, onVerifNotaCancel);
}

export function* watchBuktiBayarCancel() {
    yield takeEvery(BUKTI_BAYAR_CANCEL, onBuktiBayarCancel);
}

export function* watchGetDaftarPiutangPasien() {
    yield takeEvery(DAFTAR_PIUTANG_PASIEN_GET, onGetDaftarPiutangPasien);
}

export default function* masterSaga() {
    yield all([
        fork(watchGetPelayananFromAntrean),
        fork(watchGetNotaVerifCreate),
        fork(watchGetDaftarTagihanPasien),
        fork(watchGetPelayananFromVerif),
        fork(watchGetBuktiBayarCreate),
        fork(watchVerifNotaCancel),
        fork(watchBuktiBayarCancel),
        fork(watchGetDaftarPiutangPasien),
    ]);
}