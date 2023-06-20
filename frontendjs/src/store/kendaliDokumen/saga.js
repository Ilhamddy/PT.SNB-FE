import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRekammedis from "../../services/service-rekammedis";

import {
    DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    SAVE_DOKUMEN_REKAMMEDIS
} from "./actionType";

import {
    daftarDokumenRekammedisGetSuccess,daftarDokumenRekammedisGetError,
    widgetdaftarDokumenRekammedisGetSuccess,widgetdaftarDokumenRekammedisGetError,
    saveDokumenRekammedisSuccess,saveDokumenRekammedisError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceRekammedis = new ServiceRekammedis();

function* onDaftarDokumenRekammedis({ payload: { param } }) {
    try {
        const response = yield call(serviceRekammedis.getDaftarDokumenRekammedis, param);
        yield put(daftarDokumenRekammedisGetSuccess(response.data));
    } catch (error) {
        yield put(daftarDokumenRekammedisGetError(error));
    }
}


export function* watchonDaftarDokumenRekammedis() {
    yield takeEvery(DAFTAR_DOKUMEN_REKAMMEDIS_GET, onDaftarDokumenRekammedis);
}

function* onWidgetDaftarDokumenRekammedis({ payload: { param } }) {
    try {
        const response = yield call(serviceRekammedis.getWidgetDaftarDokumenRekammedis, param);
        yield put(widgetdaftarDokumenRekammedisGetSuccess(response.data));
    } catch (error) {
        yield put(widgetdaftarDokumenRekammedisGetError(error));
    }
}


export function* watchonWidgetDaftarDokumenRekammedis() {
    yield takeEvery(WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET, onWidgetDaftarDokumenRekammedis);
}

function* onsaveDokumenRekammedis({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceRekammedis.saveDokumenRekammedis, data);
        } else {
            response = yield call(serviceRekammedis.saveDokumenRekammedis, data);
        }



        yield put(saveDokumenRekammedisSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(saveDokumenRekammedisError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonsaveDokumenRekammedis() {
    yield takeEvery(SAVE_DOKUMEN_REKAMMEDIS, onsaveDokumenRekammedis);
}

function* kendaliDokumenSaga() {
    yield all([
        fork(watchonDaftarDokumenRekammedis),
        fork(watchonWidgetDaftarDokumenRekammedis),
        fork(watchonsaveDokumenRekammedis)
    ]);
}

export default kendaliDokumenSaga;