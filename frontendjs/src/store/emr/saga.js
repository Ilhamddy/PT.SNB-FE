import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceEmr from "../../services/service-emr";

import { EMR_HEADER_GET,EMR_TTV_SAVE,EMR_TTV_GET } from "./actionType";

import { emrHeaderGetSuccess,emrHeaderGetError,emrTtvSaveSuccess,emrTtvSaveError,
emrTtvGetSuccess,emrTtvGetError } from "./action";

const serviceEmr = new ServiceEmr();

function* onGetEmrHeader({payload: {param}}) {
    try {
        const response = yield call(serviceEmr.getHeaderEmr, param);
        yield put(emrHeaderGetSuccess(response.data));
    } catch (error) {
        yield put(emrHeaderGetError(error));
    }
}

export function* watchGetEmrHeader() {
    yield takeEvery(EMR_HEADER_GET, onGetEmrHeader);
}

function* onSaveEmrTtv({payload: { data, history}}) {
    try {
        let response = null;
        console.log(data)
        if (data.norec!=='') {
            response = yield call(serviceEmr.editTTV, data);
            // console.log('testiiinng')
        } else {
            response = yield call(serviceEmr.saveTTV, data);
        }
        
        yield put(emrTtvSaveSuccess(response.data));
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(emrTtvSaveError(error));
    }
}

export function* watchSaveEmrTtv() {
    yield takeEvery(EMR_TTV_SAVE, onSaveEmrTtv);
}

function* onGetEmrTtv({payload: {param}}) {
    try {
        const response = yield call(serviceEmr.getTtvList, param);
        yield put(emrTtvGetSuccess(response.data));
    } catch (error) {
        yield put(emrTtvGetError(error));
    }
}

export function* watchGetEmrTtv() {
    yield takeEvery(EMR_TTV_GET, onGetEmrTtv);
}

function* emrSaga() {
    yield all([
        fork(watchGetEmrHeader),
        fork(watchSaveEmrTtv),
        fork(watchGetEmrTtv)
    ]);
}

export default emrSaga;
