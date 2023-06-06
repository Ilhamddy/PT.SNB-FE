import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceEmr from "../../services/service-emr";

import { EMR_HEADER_GET, EMR_TTV_SAVE, EMR_TTV_GET, EMR_SAVE, EMR_GET } from "./actionType";

import {
    emrHeaderGetSuccess, emrHeaderGetError, emrTtvSaveSuccess, emrTtvSaveError,
    emrTtvGetSuccess, emrTtvGetError, emrSaveSuccess, emrSaveError,
    emrGetSuccess, emrGetError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceEmr = new ServiceEmr();

function* onGetEmrHeader({ payload: { param } }) {
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

function* onSaveEmrTtv({ payload: { data, history } }) {
    let response = null;
    try {
        
        console.log(data)
        if (data.norec !== '') {
            response = yield call(serviceEmr.editTTV, data);
            // console.log('testiiinng')
        } else {
            response = yield call(serviceEmr.saveTTV, data);
        }

        yield put(emrTtvSaveSuccess(response.data));
        if(response.code===200){
            toast.success(response.msg, { autoClose: 3000 });
        }else{
            toast.error(response.msg, { autoClose: 3000 });
        }
        
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(emrTtvSaveError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchSaveEmrTtv() {
    yield takeEvery(EMR_TTV_SAVE, onSaveEmrTtv);
}

function* onGetEmrTtv({ payload: { param } }) {
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

function* onSaveEmr({ payload: { data, history } }) {
    try {
        let response = null;
        console.log(data)
        if (data.idlabel === 2) {
            if (data.norec !== '') {
                response = yield call(serviceEmr.editCPPT, data);
                // console.log('testiiinng')
            } else {
                response = yield call(serviceEmr.saveCPPT, data);
            }
        }

        
        yield put(emrSaveSuccess(response.data));
        if(response.code===200){
            toast.success(response.msg, { autoClose: 3000 });
        }else{
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(emrSaveError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchSaveEmr() {
    yield takeEvery(EMR_SAVE, onSaveEmr);
}

function* onGetEmr({ payload: { param, data } }) {
    try {
        let response = null;
        if (data === 'cppt') {
            response = yield call(serviceEmr.getCpptList, param);

        }
        yield put(emrGetSuccess(response.data));
    } catch (error) {
        yield put(emrGetError(error));
    }
}

export function* watchGetEmr() {
    yield takeEvery(EMR_GET, onGetEmr);
}

function* emrSaga() {
    yield all([
        fork(watchGetEmrHeader),
        fork(watchSaveEmrTtv),
        fork(watchGetEmrTtv),
        fork(watchSaveEmr),
        fork(watchGetEmr)
    ]);
}

export default emrSaga;
