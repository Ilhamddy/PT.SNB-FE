import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    pelayananFromDpGetError, 
    pelayananFromDpGetSuccess,
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
    paymentPiutangPasienGetSuccess,
    paymentPiutangPasienGetError,
    laporanPendapatanKasirGetSuccess,
    laporanPendapatanKasirGetError,
    getPiutangAfterDateSuccess,
    getPiutangAfterDateError,
    getDaftarVerifikasiRemunerasiSuccess,
    getDaftarVerifikasiRemunerasiError,
    upsertVerifikasiRemunerasiSuccess,
    upsertVerifikasiRemunerasiError,
    getDaftarSudahVerifikasiRemunerasiSuccess, 
    getDaftarSudahVerifikasiRemunerasiError,
} from "./action";

import {
    PELAYANAN_FROM_DP_GET, 
    NOTA_VERIF_CREATE,
    DAFTAR_TAGIHAN_PASIEN_GET,
    PELAYANAN_FROM_VERIF_GET,
    BUKTI_BAYAR_CREATE,
    VERIF_NOTA_CANCEL,
    BUKTI_BAYAR_CANCEL,
    DAFTAR_PIUTANG_PASIEN_GET,
    PAYMENT_PIUTANG_PASIEN_GET,
    LAPORAN_PENDAPATAN_KASIR_GET,
    GET_PIUTANG_AFTER_DATE,
    GET_DAFTAR_VERIFIKASI_REMUNERASI,
    UPSERT_VERIFIKASI_REMUNERASI,
    GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI,
} from "./actionType";

import ServicePayment from "../../services/service-payment";
import { toast } from "react-toastify";

const servicePayment = new ServicePayment();


function* onGetPelayananFromAntrean( {payload: {norecap}}) {
    try {
        const response = yield call(servicePayment.getPelayananFromAntrean, norecap);
        yield put(pelayananFromDpGetSuccess(response.data));
    } catch (error) {
        yield put(pelayananFromDpGetError(error));
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

function* onGetPaymentForPiutang({payload: {norecpiutang}}) {
    try {
        const response = yield call(servicePayment.getPaymentForPiutang, norecpiutang);
        yield put(paymentPiutangPasienGetSuccess(response.data));
    } catch (error) {
        yield put(paymentPiutangPasienGetError(error));
    }
}

function* onGetLaporanPendapatanKasir({payload: {param}}) {
    try {
        const response = yield call(servicePayment.getLaporanPendapatanKasir, param);
        yield put(laporanPendapatanKasirGetSuccess(response.data));
    } catch (error) {
        yield put(laporanPendapatanKasirGetError(error));
    }
}

function* onGetPiutangAfterDate({payload: {queries}}){
    try {
        const response = yield call(servicePayment.getPiutangAfterDate, queries);
        yield put(getPiutangAfterDateSuccess(response.data));
    } catch (error) {
        yield put(getPiutangAfterDateError(error));
    }
}

function* ongetDaftarVerifikasiRemunerasi({payload: {queries}}) {
    try{
        const response = yield call(servicePayment.getDaftarVerifikasiRemunerasi, queries);
        yield put(getDaftarVerifikasiRemunerasiSuccess(response.data));
    } catch (error) {
        yield put(getDaftarVerifikasiRemunerasiError(error));
    }
}

function* onupsertVerifikasiRemunerasi({ payload: { body, callback } }) {
    try {
        const response = yield call(servicePayment.upsertVerifikasiRemunerasi, body);
        yield put(upsertVerifikasiRemunerasiSuccess(response.data || null));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
        // console.log(callback)
        callback && callback();
    } catch (error) {
        yield put(upsertVerifikasiRemunerasiError(error));
        toast.error("Gagal Simpan ", { autoClose: 3000 });
    }
}

function* ongetDaftarSudahVerifikasiRemunerasi({payload: {queries}}) {
    try{
        const response = yield call(servicePayment.getDaftarSudahVerifikasiRemunerasi, queries);
        yield put(getDaftarSudahVerifikasiRemunerasiSuccess(response.data));
    } catch (error) {
        yield put(getDaftarSudahVerifikasiRemunerasiError(error));
    }
}


export function* watchGetPelayananFromAntrean() {
    yield takeEvery(PELAYANAN_FROM_DP_GET, onGetPelayananFromAntrean);
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

export function* watchGetPaymentForPiutang() {
    yield takeEvery(PAYMENT_PIUTANG_PASIEN_GET, onGetPaymentForPiutang);
}

export function* watchonGetLaporanPendapatanKasir() {
    yield takeEvery(LAPORAN_PENDAPATAN_KASIR_GET, onGetLaporanPendapatanKasir);
}

export function* watchGetPiutangAfterDate() {
    yield takeEvery(GET_PIUTANG_AFTER_DATE, onGetPiutangAfterDate);
}

export function* watchgetDaftarVerifikasiRemunerasi() {
    yield takeEvery(GET_DAFTAR_VERIFIKASI_REMUNERASI, ongetDaftarVerifikasiRemunerasi);
}

export function* watchupsertVerifikasiRemunerasi() {
    yield takeEvery(UPSERT_VERIFIKASI_REMUNERASI, onupsertVerifikasiRemunerasi);
}

export function* watchgetDaftarSudahVerifikasiRemunerasi() {
    yield takeEvery(GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI, ongetDaftarSudahVerifikasiRemunerasi);
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
        fork(watchGetPaymentForPiutang),
        fork(watchonGetLaporanPendapatanKasir),
        fork(watchGetPiutangAfterDate),
        fork(watchgetDaftarVerifikasiRemunerasi),
        fork(watchupsertVerifikasiRemunerasi),
        fork(watchgetDaftarSudahVerifikasiRemunerasi),
    ]);
}