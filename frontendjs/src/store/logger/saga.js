import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceFiles from "../../services/service-files";
import ServiceAdminDaftarMandiri from "../../services/service-admindaftarmandiri";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLog, getLogSuccess, getLogError, getLastUpdated, getLastUpdatedError, getLastUpdatedSuccess } from "./loggerSlice";
import ServiceSystem from "../../services/service-system";

const serviceFiles = new ServiceFiles();
const serviceSystem = new ServiceSystem();


function* onGetLog({ payload: { queries } }) {
    try {
        const response = yield call(serviceFiles.getLog, queries);
        yield put(getLogSuccess(response.data, ));
    } catch (error) {
        yield put(getLogError(error));
    }
}

function* onGetLastUpdated({payload: {queries}}) {
    try{
        const response = yield call(serviceSystem.getLastUpdated, queries);
        yield put(getLastUpdatedSuccess(response.data));
    } catch (error) {
        yield put(getLastUpdatedError(error));
    }
}

export function* watchGetLastUpdated() {
    yield takeEvery(getLastUpdated.type, onGetLastUpdated);
}



export default function* loggerSaga() {
    yield all([
        takeEvery(getLog.type, onGetLog),
        fork(watchGetLastUpdated)
    ])
}