import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceBedahSentral from "../../services/service-bedahsentral";

import {
    WIDGET_ORDER_OPERASI_GET
} from "./actionType";

import {
    widgetOrderOperasiGetSuccess, widgetOrderOperasiGetError
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

function* bedahSentralSaga() {
    yield all([
        fork(watchonwidgetOrderOperasiGet),
    ]);
}

export default bedahSentralSaga;