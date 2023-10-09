import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceBedahSentral from "../../services/service-bedahsentral";

import {
    WIDGET_ORDER_OPERASI_GET, GET_DAFTAR_ORDER_OPERASI,
    GET_COMBO_ORDER_OPERASI, UPDATE_ORDER_OPERASI
} from "./actionType";

import {
    widgetOrderOperasiGetSuccess, widgetOrderOperasiGetError,
    getDaftarOrderOperasiSuccess, getDaftarOrderOperasiError,
    getComboOrderOperasiSuccess, getComboOrderOperasiError,
    updateOrderOperasiSuccess, updateOrderOperasiError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceBedahSentral = new ServiceBedahSentral();

function* onwidgetOrderOperasiGet({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceBedahSentral.getwidgetOrderOperasi, queries);
        yield put(widgetOrderOperasiGetSuccess(response.data));
    } catch (error) {
        yield put(widgetOrderOperasiGetError(error));
    }
}

export function* watchonwidgetOrderOperasiGet() {
    yield takeEvery(WIDGET_ORDER_OPERASI_GET, onwidgetOrderOperasiGet);
}

function* ongetDaftarOrderOperasi({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceBedahSentral.getDaftarOrderOperasi, queries);
        yield put(getDaftarOrderOperasiSuccess(response.data));
    } catch (error) {
        yield put(getDaftarOrderOperasiError(error));
    }
}

export function* watchongetDaftarOrderOperasi() {
    yield takeEvery(GET_DAFTAR_ORDER_OPERASI, ongetDaftarOrderOperasi);
}

function* ongetComboOrderOperasi({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceBedahSentral.getComboOrderOperasi, queries);
        yield put(getComboOrderOperasiSuccess(response.data));
    } catch (error) {
        yield put(getComboOrderOperasiError(error));

    }
}

export function* watchongetComboOrderOperasi() {
    yield takeEvery(GET_COMBO_ORDER_OPERASI, ongetComboOrderOperasi);
}

function* onupdateOrderOperasi({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceBedahSentral.updateOrderOperasi, body);
        yield put(updateOrderOperasiSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
    } catch (error) {
        yield put(updateOrderOperasiError(error));
        toast.error("Gagal Simpan Order Operasi", { autoClose: 3000 });
    }
}
export function* watchonupdateOrderOperasi() {
    yield takeEvery(UPDATE_ORDER_OPERASI, onupdateOrderOperasi);
}

function* bedahSentralSaga() {
    yield all([
        fork(watchonwidgetOrderOperasiGet),
        fork(watchongetDaftarOrderOperasi),
        fork(watchongetComboOrderOperasi),
        fork(watchonupdateOrderOperasi)
    ]);
}

export default bedahSentralSaga;