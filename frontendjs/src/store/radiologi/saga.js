import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRadiologi from "../../services/service-radiologi";

import {
    SAVE_ORDER_PELAYANAN_RADIOLOGI,
    DAFTAR_ORDER_RADIOLOGI_GET,
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET,
    LIST_DAFTAR_ORDER_RADIOLOGI_GET,
    LIST_ORDER_BY_NOREC_GET,
    LIST_KAMAR_RADIOLOGI_GET,
    UPDATE_TGLRENCANA_RADIOLOGI,
    SAVE_VERIFIKASI_RADIOLOGI,
    DELETE_ORDER_PELAYANAN,
    DELETE_DETAIL_ORDER_PELAYANAN,
    DAFTAR_PASIEN_RADIOLOGI,
    LIST_PELAYANAN_RADIOLOGI_GET,
    LIST_COMBO_RADIOLOGI_GET
} from "./actionType";

import {
    saveOrderPelayananRadiologiSuccess,saveOrderPelayananRadiologiError,
    daftarOrderRadiologiGetSuccess,daftarOrderRadiologiGetError,
    widgetdaftarOrderRadiologiGetSuccess,widgetdaftarOrderRadiologiGetError,
    listdaftarOrderRadiologiGetSuccess,listdaftarOrderRadiologiGetError,
    listOrderByNorecGetSuccess, listOrderByNorecGetError,
    listKamarRadiologiGetSuccess, listKamarRadiologiGetError,
    updateTglRencanaRadiologiSuccess,updateTglRencanaRadiologiError,
    saveVerifikasiRadiologiSuccess,saveVerifikasiRadiologiError,
    deleteOrderPelayananSuccess,deleteOrderPelayananError,
    deleteDetailOrderPelayananSuccess,deleteDetailOrderPelayananError,
    daftarPasienRadiologiSuccess,daftarPasienRadiologiError,
    listPelayananRadiologiGetSuccess, listPelayananRadiologiGetError,
    listComboRadiologiGetSuccess, listComboRadiologiGetError
} from "./action";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceRadiologi = new ServiceRadiologi();

function* onsaveOrderPelayanan({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceRadiologi.saveOrderPelayanan, data);
        } else {
            response = yield call(serviceRadiologi.saveOrderPelayanan, data);
        }



        yield put(saveOrderPelayananRadiologiSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(saveOrderPelayananRadiologiError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonsaveOrderPelayanan() {
    yield takeEvery(SAVE_ORDER_PELAYANAN_RADIOLOGI, onsaveOrderPelayanan);
}

function* ondaftarOrderRadiologi({ payload: { param } }) {
    try {
        const response = yield call(serviceRadiologi.getDaftarOrderRadiologi, param);
        yield put(daftarOrderRadiologiGetSuccess(response.data));
    } catch (error) {
        yield put(daftarOrderRadiologiGetError(error));
    }
}


export function* watchondaftarOrderRadiologi() {
    yield takeEvery(DAFTAR_ORDER_RADIOLOGI_GET, ondaftarOrderRadiologi);
}

function* onwidgetdaftarOrderRadiologi({ payload: { param } }) {
    try {
        const response = yield call(serviceRadiologi.getWidgetDaftarOrderRadiologi, param);
        yield put(widgetdaftarOrderRadiologiGetSuccess(response.data));
    } catch (error) {
        yield put(widgetdaftarOrderRadiologiGetError(error));
    }
}


export function* watchonwidgetdaftarOrderRadiologi() {
    yield takeEvery(WIDGET_DAFTAR_ORDER_RADIOLOGI_GET, onwidgetdaftarOrderRadiologi);
}

function* onlistDaftarOrderRadiologi({ payload: { param } }) {
    try {
        const response = yield call(serviceRadiologi.getListDaftarOrderRadiologi, param);
        yield put(listdaftarOrderRadiologiGetSuccess(response.data));
    } catch (error) {
        yield put(listdaftarOrderRadiologiGetError(error));
    }
}


export function* watchonlistDaftarOrderRadiologi() {
    yield takeEvery(LIST_DAFTAR_ORDER_RADIOLOGI_GET, onlistDaftarOrderRadiologi);
}

function* onListOrderByNorec({ payload: { param } }) {
    try {
        const response = yield call(serviceRadiologi.getListOrderByNorec, param);
        yield put(listOrderByNorecGetSuccess(response.data));
    } catch (error) {
        yield put(listOrderByNorecGetError(error));
    }
}


export function* watchonListOrderByNorec() {
    yield takeEvery(LIST_ORDER_BY_NOREC_GET, onListOrderByNorec);
}

function* onListKamarRadiologiGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRadiologi.getListKamarRadiologi, param);
        yield put(listKamarRadiologiGetSuccess(response.data));
    } catch (error) {
        yield put(listKamarRadiologiGetError(error));
    }
}


export function* watchonListKamarRadiologiGet() {
    yield takeEvery(LIST_KAMAR_RADIOLOGI_GET, onListKamarRadiologiGet);
}

function* onUpdateTglRencanaRadiologi({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceRadiologi.updateTglRencanaRadiologi, data);
        } else {
            response = yield call(serviceRadiologi.updateTglRencanaRadiologi, data);
        }

        yield put(updateTglRencanaRadiologiSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(updateTglRencanaRadiologiError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonUpdateTglRencanaRadiologi() {
    yield takeEvery(UPDATE_TGLRENCANA_RADIOLOGI, onUpdateTglRencanaRadiologi);
}

function* onSaveVerifikasiRadiologi({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceRadiologi.saveVerifikasiRadiologiUser, data);
        } else {
            response = yield call(serviceRadiologi.saveVerifikasiRadiologiUser, data);
        }

        yield put(saveVerifikasiRadiologiSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(saveVerifikasiRadiologiError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonSaveVerifikasiRadiologi() {
    yield takeEvery(SAVE_VERIFIKASI_RADIOLOGI, onSaveVerifikasiRadiologi);
}

function* onDeleteOrderPelayanan({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceRadiologi.deleteOrderPelayananService, data);
        } else {
            response = yield call(serviceRadiologi.deleteOrderPelayananService, data);
        }

        yield put(deleteOrderPelayananSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(deleteOrderPelayananError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonDeleteOrderPelayanan() {
    yield takeEvery(DELETE_ORDER_PELAYANAN, onDeleteOrderPelayanan);
}

function* onDeleteDetailOrderPelayanan({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceRadiologi.deleteDetailOrderPelayananService, data);
        } else {
            response = yield call(serviceRadiologi.deleteDetailOrderPelayananService, data);
        }

        yield put(deleteDetailOrderPelayananSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(deleteDetailOrderPelayananError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonDeleteDetailOrderPelayanan() {
    yield takeEvery(DELETE_DETAIL_ORDER_PELAYANAN, onDeleteDetailOrderPelayanan);
}

function* onDaftarPasienRadiologi({ payload: { param } }) {
    try {
        const response = yield call(serviceRadiologi.getListDaftarPasienRadiologi, param);
        yield put(daftarPasienRadiologiSuccess(response.data));
    } catch (error) {
        yield put(daftarPasienRadiologiError(error));
    }
}


export function* watchonDaftarPasienRadiologi() {
    yield takeEvery(DAFTAR_PASIEN_RADIOLOGI, onDaftarPasienRadiologi);
}

function* onListPelayananRadiologiGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRadiologi.getListTransaksiPelayananRadiologi, param);
        yield put(listPelayananRadiologiGetSuccess(response.data));
    } catch (error) {
        yield put(listPelayananRadiologiGetError(error));
    }
}


export function* watchonListPelayananRadiologiGet() {
    yield takeEvery(LIST_PELAYANAN_RADIOLOGI_GET, onListPelayananRadiologiGet);
}

function* onlistComboRadiologiGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRadiologi.getListComboRadiologi, param);
        yield put(listComboRadiologiGetSuccess(response.data));
    } catch (error) {
        yield put(listComboRadiologiGetError(error));
    }
}


export function* watchonlistComboRadiologiGet() {
    yield takeEvery(LIST_COMBO_RADIOLOGI_GET, onlistComboRadiologiGet);
}

function* radiologiSaga() {
    yield all([
        fork(watchonsaveOrderPelayanan),
        fork(watchondaftarOrderRadiologi),
        fork(watchonwidgetdaftarOrderRadiologi),
        fork(watchonlistDaftarOrderRadiologi),
        fork(watchonListOrderByNorec),
        fork(watchonListKamarRadiologiGet),
        fork(watchonUpdateTglRencanaRadiologi),
        fork(watchonSaveVerifikasiRadiologi),
        fork(watchonDeleteOrderPelayanan),
        fork(watchonDeleteDetailOrderPelayanan),
        fork(watchonDaftarPasienRadiologi),
        fork(watchonListPelayananRadiologiGet),
        fork(watchonlistComboRadiologiGet)
    ]);
}

export default radiologiSaga;