import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceFiles from "../../services/service-files";
import ServiceAdminDaftarMandiri from "../../services/service-admindaftarmandiri";

import {
    GET_LOG
} from "./actionType";

import {
    getLogSuccess, 
    getLogError,
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceFiles = new ServiceFiles();

function* onGetLog({ payload: { queries } }) {
    try {
        const response = yield call(serviceFiles.getLog, queries);
        yield put(getLogSuccess(response.data, ));
    } catch (error) {
        yield put(getLogError(error));
    }
}



export default function* loggerSaga() {
    yield all([
        takeEvery(GET_LOG, onGetLog),
    ])
}