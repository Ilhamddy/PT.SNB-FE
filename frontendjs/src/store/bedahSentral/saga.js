import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceBedahSentral from "../../services/service-bedahsentral";

import {
    WIDGET_ORDER_OPERASI_GET, GET_DAFTAR_ORDER_OPERASI
} from "./actionType";

import {
    widgetOrderOperasiGetSuccess, widgetOrderOperasiGetError,
    getDaftarOrderOperasiSuccess, getDaftarOrderOperasiError
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

function* bedahSentralSaga() {
    yield all([
        fork(watchonwidgetOrderOperasiGet),
        fork(watchongetDaftarOrderOperasi)
    ]);
}

export default bedahSentralSaga;