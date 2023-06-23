import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRadiologi from "../../services/service-radiologi";

import {
    SAVE_ORDER_PELAYANAN_RADIOLOGI,
    DAFTAR_ORDER_RADIOLOGI_GET,
    WIDGET_DAFTAR_ORDER_RADIOLOGI_GET
} from "./actionType";

import {
    saveOrderPelayananRadiologiSuccess,saveOrderPelayananRadiologiError,
    daftarOrderRadiologiGetSuccess,daftarOrderRadiologiGetError,
    widgetdaftarOrderRadiologiGetSuccess,widgetdaftarOrderRadiologiGetError
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

function* radiologiSaga() {
    yield all([
        fork(watchonsaveOrderPelayanan),
        fork(watchondaftarOrderRadiologi),
        fork(watchonwidgetdaftarOrderRadiologi)
    ]);
}

export default radiologiSaga;