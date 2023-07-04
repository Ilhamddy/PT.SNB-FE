import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceLaboratorium from "../../services/service-laboratorium";

import {
    WIDGET_DETAIL_JENIS_PRODUK_GET,
    SAVE_ORDER_PELAYANAN_LABORATORIUM,
    DAFTAR_ORDER_LABORATORIUM_GET
} from "./actionType";

import {
    widgetDetailJenisProdukGetSuccess, widgetDetailJenisProdukGetError,
    saveOrderPelayananLaboratoriumSuccess, saveOrderPelayananLaboratoriumError,
    daftarOrderLaboratoriumGetSuccess, daftarOrderLaboratoriumGetError
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


function* laboratoriumSaga() {
    yield all([
        fork(watchonwidgetDetailJenisProdukGet),
        fork(watchonsaveOrderPelayanan),
        fork(watchondaftarOrderLaboratorium)
       
    ]);
}

export default laboratoriumSaga;