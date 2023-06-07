import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceEmr from "../../services/service-emr";

import { EMR_HEADER_GET, EMR_TTV_SAVE, EMR_TTV_GET, EMR_SAVE, EMR_GET,
EMR_COMBO_GET, EMR_DIAGNOSAX_GET, EMR_DIAGNOSAIX_GET,
EMR_DIAGNOSAX_SAVE,EMR_DIAGNOSAIX_SAVE } from "./actionType";

import {
    emrHeaderGetSuccess, emrHeaderGetError, emrTtvSaveSuccess, emrTtvSaveError,
    emrTtvGetSuccess, emrTtvGetError, emrSaveSuccess, emrSaveError,
    emrGetSuccess, emrGetError,emrComboGetSuccess,emrComboGetError,
    emrDiagnosaxGetSuccess,emrDiagnosaxGetError,
    emrDiagnosaixGetSuccess,emrDiagnosaixGetError,
    emrDiagnosaxSaveSuccess,emrDiagnosaxSaveError,
    emrDiagnosaixSaveSuccess,emrDiagnosaixSaveError
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

function* onGetComboEmr({ payload: { param, data } }) {
    try {
        let response = null;
        if (data === 'combo') {
            response = yield call(serviceEmr.getComboEmr, param);
        }
        yield put(emrComboGetSuccess(response.data));
    } catch (error) {
        yield put(emrComboGetError(error));
    }
}

export function* watchGetComboEmr() {
    yield takeEvery(EMR_COMBO_GET, onGetComboEmr);
}

function* onGetDiagnosaxEmr({ payload: { param, data } }) {
    try {
        let response = null;
       
            response = yield call(serviceEmr.getDiagnosa10, param);
       
        yield put(emrDiagnosaxGetSuccess(response.data));
    } catch (error) {
        yield put(emrDiagnosaxGetError(error));
    }
}

export function* watchGetDiagnosaxEmr() {
    yield takeEvery(EMR_DIAGNOSAX_GET, onGetDiagnosaxEmr);
}

function* onGetDiagnosaxiEmr({ payload: { param, data } }) {
    try {
        let response = null;
       
            response = yield call(serviceEmr.getDiagnosa9, param);
       
        yield put(emrDiagnosaixGetSuccess(response.data));
    } catch (error) {
        yield put(emrDiagnosaixGetError(error));
    }
}

export function* watchGetDiagnosaxiEmr() {
    yield takeEvery(EMR_DIAGNOSAIX_GET, onGetDiagnosaxiEmr);
}

function* onSaveEmrDiagnosax({ payload: { data, history } }) {
    try {
        let response = null;
        console.log(data)
            if (data.norec !== '') {
                response = yield call(serviceEmr.saveDiagnosa, data);
                // console.log('testiiinng')
            } else {
                response = yield call(serviceEmr.saveDiagnosa, data);
            }
        

        
        yield put(emrDiagnosaxSaveSuccess(response.data));
        if(response.code===200){
            toast.success(response.msg, { autoClose: 3000 });
        }else{
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(emrDiagnosaxSaveError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchSaveEmrDiagnosax() {
    yield takeEvery(EMR_DIAGNOSAX_SAVE, onSaveEmrDiagnosax);
}

function* onSaveEmrDiagnosaix({ payload: { data, history } }) {
    try {
        let response = null;
        console.log(data)
            if (data.norec !== '') {
                response = yield call(serviceEmr.saveDiagnosa, data);
                // console.log('testiiinng')
            } else {
                response = yield call(serviceEmr.saveDiagnosa, data);
            }
        

        
        yield put(emrDiagnosaixSaveSuccess(response.data));
        if(response.code===200){
            toast.success(response.msg, { autoClose: 3000 });
        }else{
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(emrDiagnosaixSaveError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchSaveEmrDiagnosaix() {
    yield takeEvery(EMR_DIAGNOSAIX_SAVE, onSaveEmrDiagnosaix);
}

function* emrSaga() {
    yield all([
        fork(watchGetEmrHeader),
        fork(watchSaveEmrTtv),
        fork(watchGetEmrTtv),
        fork(watchSaveEmr),
        fork(watchGetEmr),
        fork(watchGetComboEmr),
        fork(watchGetDiagnosaxEmr),
        fork(watchGetDiagnosaxiEmr),
        fork(watchSaveEmrDiagnosax),
        fork(watchSaveEmrDiagnosaix)
    ]);
}

export default emrSaga;
