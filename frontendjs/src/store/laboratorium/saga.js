import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceLaboratorium from "../../services/service-laboratorium";

import {
    WIDGET_DETAIL_JENIS_PRODUK_GET,
    SAVE_ORDER_PELAYANAN_LABORATORIUM,
    DAFTAR_ORDER_LABORATORIUM_GET,
    WIDGET_DAFTAR_ORDER_LABORATORIUM_GET,
    LIST_DAFTAR_ORDER_LABORATORIUM_GET,
    LIST_ORDER_LABORATORIUM_BY_NOREC_GET,
    UPDATE_TGLRENCANA_LABORATORIUM,
    SAVE_VERIFIKASI_LABORATORIUM,
    DAFTAR_PASIEN_LABORATORIUM,
    LIST_PELAYANAN_LABORATORIUM_GET
} from "./actionType";

import {
    widgetDetailJenisProdukGetSuccess, widgetDetailJenisProdukGetError,
    saveOrderPelayananLaboratoriumSuccess, saveOrderPelayananLaboratoriumError,
    daftarOrderLaboratoriumGetSuccess, daftarOrderLaboratoriumGetError,
    widgetdaftarOrderLaboratoriumGetSuccess, widgetdaftarOrderLaboratoriumGetError,
    listdaftarOrderLaboratoriumGetSuccess, listdaftarOrderLaboratoriumGetError,
    listOrderLaboratoriumByNorecGetSuccess, listOrderLaboratoriumByNorecGetError,
    updateTglRencanaLaboratoriumSuccess, updateTglRencanaLaboratoriumError,
    saveVerifikasiLaboratoriumSuccess, saveVerifikasiLaboratoriumError,
    daftarPasienLaboratoriumSuccess, daftarPasienLaboratoriumError,
    listPelayananLaboratoriumGetSuccess, listPelayananLaboratoriumGetError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceLaboratorium = new ServiceLaboratorium();

function* onwidgetDetailJenisProdukGet({ payload: { param } }) {
    try {
        const response = yield call(serviceLaboratorium.getWidgetDetailJenisProdukLab, param);
        yield put(widgetDetailJenisProdukGetSuccess(response.data));
    } catch (error) {
        yield put(widgetDetailJenisProdukGetError(error));
    }
}


export function* watchonwidgetDetailJenisProdukGet() {
    yield takeEvery(WIDGET_DETAIL_JENIS_PRODUK_GET, onwidgetDetailJenisProdukGet);
}

function* onsaveOrderPelayanan({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceLaboratorium.saveOrderPelayanan, data);
        } else {
            response = yield call(serviceLaboratorium.saveOrderPelayanan, data);
        }



        yield put(saveOrderPelayananLaboratoriumSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(saveOrderPelayananLaboratoriumError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonsaveOrderPelayanan() {
    yield takeEvery(SAVE_ORDER_PELAYANAN_LABORATORIUM, onsaveOrderPelayanan);
}

function* ondaftarOrderLaboratorium({ payload: { param } }) {
    try {
        const response = yield call(serviceLaboratorium.getDaftarOrderLaboratorium, param);
        yield put(daftarOrderLaboratoriumGetSuccess(response.data));
    } catch (error) {
        yield put(daftarOrderLaboratoriumGetError(error));
    }
}


export function* watchondaftarOrderLaboratorium() {
    yield takeEvery(DAFTAR_ORDER_LABORATORIUM_GET, ondaftarOrderLaboratorium);
}

function* onwidgetdaftarOrderLaboratorium({ payload: { param } }) {
    try {
        const response = yield call(serviceLaboratorium.getWidgetDaftarOrderLaboratorium, param);
        yield put(widgetdaftarOrderLaboratoriumGetSuccess(response.data));
    } catch (error) {
        yield put(widgetdaftarOrderLaboratoriumGetError(error));
    }
}


export function* watchonwidgetdaftarOrderLaboratorium() {
    yield takeEvery(WIDGET_DAFTAR_ORDER_LABORATORIUM_GET, onwidgetdaftarOrderLaboratorium);
}

function* onlistDaftarOrderLaboratorium({ payload: { param } }) {
    try {
        const response = yield call(serviceLaboratorium.getListDaftarOrderLaboratorium, param);
        yield put(listdaftarOrderLaboratoriumGetSuccess(response.data));
    } catch (error) {
        yield put(listdaftarOrderLaboratoriumGetError(error));
    }
}


export function* watchonlistDaftarOrderLaboratorium() {
    yield takeEvery(LIST_DAFTAR_ORDER_LABORATORIUM_GET, onlistDaftarOrderLaboratorium);
}

function* onListOrderLaboratoriumByNorec({ payload: { param } }) {
    try {
        const response = yield call(serviceLaboratorium.getListOrderLaboratoriumByNorec, param);
        yield put(listOrderLaboratoriumByNorecGetSuccess(response.data));
    } catch (error) {
        yield put(listOrderLaboratoriumByNorecGetError(error));
    }
}


export function* watchonListOrderLaboratoriumByNorec() {
    yield takeEvery(LIST_ORDER_LABORATORIUM_BY_NOREC_GET, onListOrderLaboratoriumByNorec);
}

function* onUpdateTglRencanaLaboratorium({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceLaboratorium.updateTglRencanaLaboratorium, data);
        } else {
            response = yield call(serviceLaboratorium.updateTglRencanaLaboratorium, data);
        }

        yield put(updateTglRencanaLaboratoriumSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(updateTglRencanaLaboratoriumError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonUpdateTglRencanaLaboratorium() {
    yield takeEvery(UPDATE_TGLRENCANA_LABORATORIUM, onUpdateTglRencanaLaboratorium);
}

function* onSaveVerifikasiLaboratorium({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceLaboratorium.saveVerifikasiLaboratoriumUser, data);
        } else {
            response = yield call(serviceLaboratorium.saveVerifikasiLaboratoriumUser, data);
        }

        yield put(saveVerifikasiLaboratoriumSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(saveVerifikasiLaboratoriumError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonSaveVerifikasiLaboratorium() {
    yield takeEvery(SAVE_VERIFIKASI_LABORATORIUM, onSaveVerifikasiLaboratorium);
}

function* onDaftarPasienLaboratorium({ payload: { param } }) {
    try {
        const response = yield call(serviceLaboratorium.getListDaftarPasienLaboratorium, param);
        yield put(daftarPasienLaboratoriumSuccess(response.data));
    } catch (error) {
        yield put(daftarPasienLaboratoriumError(error));
    }
}


export function* watchonDaftarPasienLaboratorium() {
    yield takeEvery(DAFTAR_PASIEN_LABORATORIUM, onDaftarPasienLaboratorium);
}

function* onListPelayananLaboratoriumGet({ payload: { param } }) {
    try {
        const response = yield call(serviceLaboratorium.getListTransaksiPelayananLaboratorium, param);
        yield put(listPelayananLaboratoriumGetSuccess(response.data));
    } catch (error) {
        yield put(listPelayananLaboratoriumGetError(error));
    }
}


export function* watchonListPelayananLaboratoriumGet() {
    yield takeEvery(LIST_PELAYANAN_LABORATORIUM_GET, onListPelayananLaboratoriumGet);
}

function* laboratoriumSaga() {
    yield all([
        fork(watchonwidgetDetailJenisProdukGet),
        fork(watchonsaveOrderPelayanan),
        fork(watchondaftarOrderLaboratorium),
        fork(watchonwidgetdaftarOrderLaboratorium),
        fork(watchonlistDaftarOrderLaboratorium),
        fork(watchonListOrderLaboratoriumByNorec),
        fork(watchonUpdateTglRencanaLaboratorium),
        fork(watchonSaveVerifikasiLaboratorium),
        fork(watchonDaftarPasienLaboratorium),
        fork(watchonListPelayananLaboratoriumGet)
    ]);
}

export default laboratoriumSaga;