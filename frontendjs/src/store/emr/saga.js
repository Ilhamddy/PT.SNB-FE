import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceEmr from "../../services/service-emr";

import { EMR_HEADER_GET } from "./actionType";

import { emrHeaderGetSuccess,emrHeaderGetError } from "./action";

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


function* emrSaga() {
    yield all([
        fork(watchGetEmrHeader)
    ]);
}

export default emrSaga;
