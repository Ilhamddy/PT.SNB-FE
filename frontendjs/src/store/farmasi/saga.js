import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceFarmasi from "../../services/service-farmasi";

import {
    getOrderResepQuerySuccess,
    getOrderResepQueryError,
    getOrderResepFromNorecSuccess,
    getOrderResepFromNorecError,
    createOrUpdateVerifResepSuccess,
    createOrUpdateVerifResepError,
    createOrUpdatePenjualanBebasSuccess,
    createOrUpdatePenjualanBebasError,
    getPasienFromNoCmSuccess,
    getPasienFromNoCmError,
    getAllVerifResepSuccess,
    getAllVerifResepError,
    createOrUpdateReturSuccess,
    createOrUpdateReturError,
    getAntreanFromDPSuccess,
    getAntreanFromDPError,
    createOrUpdateOrderPlusVerifSuccess,
    createOrUpdateOrderPlusVerifError,
    createAntreanFarmasiSuccess,
    createAntreanFarmasiError,
    getComboLaporanPengadaanSuccess,
    getComboLaporanPengadaanError,
    getPenjualanBebasSuccess,
    getPenjualanBebasError,
    getPenjualanBebasFromNorecSuccess,
    getPenjualanBebasFromNorecError,
    getObatFromUnitFarmasiSuccess,
    getObatFromUnitFarmasiError
} from "./action";

import {
    GET_ORDER_RESEP_QUERY,
    GET_ORDER_RESEP_FROM_NOREC,
    CREATE_OR_UPDATE_VERIF_RESEP,
    CREATE_OR_UPDATE_PENJUALAN_BEBAS,
    GET_PASIEN_FROM_NOCM,
    GET_ALL_VERIF_RESEP,
    CREATE_OR_UPDATE_RETUR,
    GET_ANTREAN_FROM_DP,
    CREATE_OR_UPDATE_ORDER_PLUS_VERIF,
    CREATE_ANTREAN_FARMASI,
    GET_COMBO_LAPORAN_PENGADAAN,
    GET_PENJUALAN_BEBAS,
    GET_PENJUALAN_BEBAS_FROM_NOREC,
    GET_OBAT_FROM_UNIT
} from "./actionType";

import {
    
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceFarmasi = new ServiceFarmasi();

function* onGetOrderResepQuery({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getOrderResepQuery, queries);
        yield put(getOrderResepQuerySuccess(response.data));
    } catch (error) {
        yield put(getOrderResepQueryError(error));
    }
}

function* onGetOrderResepFromNorec({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getOrderResepFromNorec, queries);
        yield put(getOrderResepFromNorecSuccess(response.data));
    } catch (error) {
        yield put(getOrderResepFromNorecError(error));
    }
}

function* onCreateOrUpdateVerifResep({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceFarmasi.createOrUpdateVerifResep, body);
        yield put(createOrUpdateVerifResepSuccess(response.data));
        toast.success("Sukses update verif resep", { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        yield put(createOrUpdateVerifResepError(error));
        toast.error("Gagal update verif resep", { autoClose: 3000 });
    }
}

function* onCreateOrUpdatePenjualanBebas({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceFarmasi.createOrUpdatePenjualanBebas, body);
        yield put(createOrUpdatePenjualanBebasSuccess(response.data));
        toast.success("Sukses update penjualan bebas", { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        yield put(createOrUpdatePenjualanBebasError(error));
        toast.error("Gagal update penjualan bebas", { autoClose: 3000 });
    }
}

function* onGetPasienFromNoCm({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getPasienFromNoCm, queries);
        yield put(getPasienFromNoCmSuccess(response.data));
    } catch (error) {
        yield put(getPasienFromNoCmError(error));
    }
}

function* onGetAllVerifResep({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getAllVerifResep, queries);
        yield put(getAllVerifResepSuccess(response.data));
    } catch (error) {
        yield put(getAllVerifResepError(error));
    }
}

function* onCreateOrUpdateRetur({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceFarmasi.createOrUpdateRetur, body);
        yield put(createOrUpdateReturSuccess(response.data));
        toast.success("Sukses update retur", { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        yield put(createOrUpdateReturError(error));
        console.error(error)
        toast.error("Gagal update retur", { autoClose: 3000 });
    }
}

function* onGetAntreanFromDP({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getAntreanFromDp, queries);
        yield put(getAntreanFromDPSuccess(response.data));
    } catch (error) {
        yield put(getAntreanFromDPError(error));
    }
}

function* onCreateOrUpdateOrderPlusVerif({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceFarmasi.createOrUpdateOrderPlusVerif, body);
        yield put(createOrUpdateOrderPlusVerifSuccess(response.data));
        toast.success("Sukses update order plus verif", { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        yield put(createOrUpdateOrderPlusVerifError(error));
        toast.error("Gagal update order plus verif", { autoClose: 3000 });
    }
}

function* onCreateAntreanFarmasi({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceFarmasi.createAntreanFarmasi, body);
        yield put(createAntreanFarmasiSuccess(response.data));
        toast.success("Sukses insert antrean farmasi", { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        yield put(createAntreanFarmasiError(error));
        toast.error("Gagal insert antrean farmasi", { autoClose: 3000 });
    }
}


function* onGetComboLaporanPengadaan({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getComboLaporanPengadaan, queries);
        yield put(getComboLaporanPengadaanSuccess(response.data));
    } catch (error) {
        yield put(getComboLaporanPengadaanError(error));
    }
}

function* onGetPenjualanBebas({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getPenjualanBebas, queries);
        yield put(getPenjualanBebasSuccess(response.data));
    } catch (error) {
        yield put(getPenjualanBebasError(error));
    }
}

function* onGetPenjualanBebasFromNorec({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getPenjualanBebasFromNorec, queries);
        yield put(getPenjualanBebasFromNorecSuccess(response.data));
    } catch (error) {
        yield put(getPenjualanBebasFromNorecError(error));
    }
}

function* onGetObatFromUnit({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getObatFromUnit, queries);
        yield put(getObatFromUnitFarmasiSuccess(response.data));
    } catch (error) {
        yield put(getObatFromUnitFarmasiError(error));
    }
}


export function* watchGetOrderResepQuery() {
    yield takeEvery(GET_ORDER_RESEP_QUERY, onGetOrderResepQuery);
}

export function* watchGetOrderResepFromNorec() {
    yield takeEvery(GET_ORDER_RESEP_FROM_NOREC, onGetOrderResepFromNorec);
}

export function* watchCreateOrUpdateVerifResep() {
    yield takeEvery(CREATE_OR_UPDATE_VERIF_RESEP, onCreateOrUpdateVerifResep);
}

export function* watchCreateOrUpdatePenjualanBebas() {
    yield takeEvery(CREATE_OR_UPDATE_PENJUALAN_BEBAS, onCreateOrUpdatePenjualanBebas);
}

export function* watchGetPasienFromNoCm() {
    yield takeEvery(GET_PASIEN_FROM_NOCM, onGetPasienFromNoCm);
}

export function* watchGetAllVerifResep(){
    yield takeEvery(GET_ALL_VERIF_RESEP, onGetAllVerifResep);
}

export function* watchCreateOrUpdateRetur(){
    yield takeEvery(CREATE_OR_UPDATE_RETUR, onCreateOrUpdateRetur);
}

export function* watchGetAntreanFromDP(){
    yield takeEvery(GET_ANTREAN_FROM_DP, onGetAntreanFromDP);
}

export function* watchCreateOrUpdateOrderPlusVerif(){
    yield takeEvery(CREATE_OR_UPDATE_ORDER_PLUS_VERIF, onCreateOrUpdateOrderPlusVerif);
}

export function* watchCreateAntreanFarmasi(){
    yield takeEvery(CREATE_ANTREAN_FARMASI, onCreateAntreanFarmasi);
}

export function* watchGetComboLaporanPengadaan(){
    yield takeEvery(GET_COMBO_LAPORAN_PENGADAAN, onGetComboLaporanPengadaan);
}

export function* watchGetPenjualanBebas(){
    yield takeEvery(GET_PENJUALAN_BEBAS, onGetPenjualanBebas);
}

export function* watchGetPenjualanBebasFromNorec(){
    yield takeEvery(GET_PENJUALAN_BEBAS_FROM_NOREC, onGetPenjualanBebasFromNorec);
}

export function* watchGetObatFromUnit(){
    yield takeEvery(GET_OBAT_FROM_UNIT, onGetObatFromUnit)
}


function* farmasiSaga() {
    yield all([
        fork(watchGetOrderResepQuery),
        fork(watchGetOrderResepFromNorec),
        fork(watchCreateOrUpdateVerifResep),
        fork(watchCreateOrUpdatePenjualanBebas),
        fork(watchGetPasienFromNoCm),
        fork(watchGetAllVerifResep),
        fork(watchCreateOrUpdateRetur),
        fork(watchGetAntreanFromDP),
        fork(watchCreateOrUpdateOrderPlusVerif),
        fork(watchCreateAntreanFarmasi),
        fork(watchGetComboLaporanPengadaan),
        fork(watchGetPenjualanBebas),
        fork(watchGetPenjualanBebasFromNorec),
        fork(watchGetObatFromUnit)
    ]);
}

export default farmasiSaga;
