import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceLaboratorium from "../../services/service-laboratorium";

import {
    WIDGET_DETAIL_JENIS_PRODUK_GET
} from "./actionType";

import {
    widgetDetailJenisProdukGetSuccess, widgetDetailJenisProdukGetError
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

function* laboratoriumSaga() {
    yield all([
        fork(watchonwidgetDetailJenisProdukGet),
       
    ]);
}

export default laboratoriumSaga;