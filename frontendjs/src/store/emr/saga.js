import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceEmr from "../../services/service-emr";

import {
    EMR_HEADER_GET, EMR_TTV_SAVE, EMR_TTV_GET, EMR_SAVE, EMR_GET,
    EMR_COMBO_GET, EMR_DIAGNOSAX_GET, EMR_DIAGNOSAIX_GET,
    EMR_DIAGNOSAX_SAVE, EMR_DIAGNOSAIX_SAVE,
    EMR_LISTDIAGNOSAX_GET, EMR_LISTDIAGNOSAIX_GET,
    DELETE_DIAGNOSAX, DELETE_DIAGNOSAIX,
    KONSUL_SAVE, UPDATE_TASKID, UPDATE_STATUSPULANGRJ,
    COMBO_HISTORY_UNIT_GET, COMBO_TINDAKAN_GET,
    COMBO_JENIS_PELAKSANA_GET,COMBO_NAMA_PELAKSANA_GET,
    TINDAKAN_SAVE
} from "./actionType";

import {
    emrHeaderGetSuccess, emrHeaderGetError, emrTtvSaveSuccess, emrTtvSaveError,
    emrTtvGetSuccess, emrTtvGetError, emrSaveSuccess, emrSaveError,
    emrGetSuccess, emrGetError, emrComboGetSuccess, emrComboGetError,
    emrDiagnosaxGetSuccess, emrDiagnosaxGetError,
    emrDiagnosaixGetSuccess, emrDiagnosaixGetError,
    emrDiagnosaxSaveSuccess, emrDiagnosaxSaveError,
    emrDiagnosaixSaveSuccess, emrDiagnosaixSaveError,
    emrListDiagnosaxGetSuccess, emrListDiagnosaxGetError,
    emrListDiagnosaixGetSuccess, emrListDiagnosaixGetError,
    deleteDiagnosaxSuccess, deleteDiagnosaxError,
    deleteDiagnosaixSuccess, deleteDiagnosaixError,
    konsulSaveSuccess, konsulSaveError,
    updateTaskIdSuccess, updateTaskIdError,
    updateStatusPulangRJSuccess, updateStatusPulangRJError,
    comboHistoryUnitGetSuccess, comboHistoryUnitGetError,
    comboTindakanGetGetSuccess, comboTindakanGetGetError,
    comboJenisPelaksanaGetSuccess,comboJenisPelaksanaGetError,
    comboNamaPelaksanaGetSuccess,comboNamaPelaksanaGetError,
    tindakanSaveSuccess,tindakanSaveError
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
        if (data.norec !== '') {
            response = yield call(serviceEmr.editTTV, data);
            // console.log('testiiinng')
        } else {
            response = yield call(serviceEmr.saveTTV, data);
        }

        yield put(emrTtvSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
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
        if (data.idlabel === 2) {
            if (data.norec !== '') {
                response = yield call(serviceEmr.editCPPT, data);
                // console.log('testiiinng')
            } else {
                response = yield call(serviceEmr.saveCPPT, data);
            }
        }


        yield put(emrSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
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
        if (data.norec !== '') {
            response = yield call(serviceEmr.saveDiagnosa, data);
            // console.log('testiiinng')
        } else {
            response = yield call(serviceEmr.saveDiagnosa, data);
        }



        yield put(emrDiagnosaxSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
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
            response = yield call(serviceEmr.saveDiagnosaix, data);
            // console.log('testiiinng')
        } else {
            response = yield call(serviceEmr.saveDiagnosaix, data);
        }



        yield put(emrDiagnosaixSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
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

function* onGetEmrListDiagnosax({ payload: { param } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getListDiagnosa10, param);

        yield put(emrListDiagnosaxGetSuccess(response.data));
    } catch (error) {
        yield put(emrListDiagnosaxGetError(error));
    }
}

export function* watchGetEmrListDiagnosax() {
    yield takeEvery(EMR_LISTDIAGNOSAX_GET, onGetEmrListDiagnosax);
}

function* onGetEmrListDiagnosaix({ payload: { param } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getListDiagnosa9, param);

        yield put(emrListDiagnosaixGetSuccess(response.data));
    } catch (error) {
        yield put(emrListDiagnosaixGetError(error));
    }
}

export function* watchGetEmrListDiagnosaix() {
    yield takeEvery(EMR_LISTDIAGNOSAIX_GET, onGetEmrListDiagnosaix);
}

function* deleteDiagnosax({ payload: product }) {
    try {
        const response = yield call(serviceEmr.deleteDiagnosax, product);
        yield put(deleteDiagnosaxSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(deleteDiagnosaxError(error));
        toast.error("Delete Gagal", { autoClose: 3000 });
    }
}

export function* watchDeleteDiagnosax() {
    yield takeEvery(DELETE_DIAGNOSAX, deleteDiagnosax);
}

function* deleteDiagnosaix({ payload: product }) {
    try {
        const response = yield call(serviceEmr.deleteDiagnosaix, product);
        yield put(deleteDiagnosaixSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
    } catch (error) {
        yield put(deleteDiagnosaixError(error));
        toast.error("Delete Gagal", { autoClose: 3000 });
    }
}

export function* watchdeleteDiagnosaix() {
    yield takeEvery(DELETE_DIAGNOSAIX, deleteDiagnosaix);
}

function* onKonsulSave({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceEmr.saveKonsul, data);
        } else {
            response = yield call(serviceEmr.saveKonsul, data);
        }



        yield put(konsulSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(konsulSaveError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonKonsulSave() {
    yield takeEvery(KONSUL_SAVE, onKonsulSave);
}

function* onUpdateTaskId({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceEmr.updateTaskId, data);
        } else {
            response = yield call(serviceEmr.updateTaskId, data);
        }

        yield put(updateTaskIdSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(updateTaskIdError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonUpdateTaskId() {
    yield takeEvery(UPDATE_TASKID, onUpdateTaskId);
}

function* onUpdateStatusPulangRJ({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceEmr.updateStatusPulangRJ, data);
        } else {
            response = yield call(serviceEmr.updateStatusPulangRJ, data);
        }

        yield put(updateStatusPulangRJSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(updateStatusPulangRJError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonUpdateStatusPulangRJ() {
    yield takeEvery(UPDATE_STATUSPULANGRJ, onUpdateStatusPulangRJ);
}

function* onGetComboHistoryUnit({ payload: { param, data } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getComboHistoryUnit, param);

        yield put(comboHistoryUnitGetSuccess(response.data));
    } catch (error) {
        yield put(comboHistoryUnitGetError(error));
    }
}

export function* watchonGetComboHistoryUnit() {
    yield takeEvery(COMBO_HISTORY_UNIT_GET, onGetComboHistoryUnit);
}

function* onGetComboTindakan({ payload: { param, data } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getComboTindakan, param);

        yield put(comboTindakanGetGetSuccess(response.data));
    } catch (error) {
        yield put(comboTindakanGetGetError(error));
    }
}

export function* watchonGetComboTindakan() {
    yield takeEvery(COMBO_TINDAKAN_GET, onGetComboTindakan);
}

function* onGetComboJenisPelaksana({ payload: { param, data } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getComboJenisPelaksana, param);

        yield put(comboJenisPelaksanaGetSuccess(response.data));
    } catch (error) {
        yield put(comboJenisPelaksanaGetError(error));
    }
}

export function* watchonGetComboJenisPelaksana() {
    yield takeEvery(COMBO_JENIS_PELAKSANA_GET, onGetComboJenisPelaksana);
}

function* onGetComboNamaPelaksana({ payload: { param, data } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getComboNamaPelaksana, param);

        yield put(comboNamaPelaksanaGetSuccess(response.data));
    } catch (error) {
        yield put(comboNamaPelaksanaGetError(error));
    }
}

export function* watchonGetComboNamaPelaksana() {
    yield takeEvery(COMBO_NAMA_PELAKSANA_GET, onGetComboNamaPelaksana);
}

function* onTindakanSave({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceEmr.saveTindakan, data);
        } else {
            response = yield call(serviceEmr.saveTindakan, data);
        }



        yield put(tindakanSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(tindakanSaveError(error));
        toast.error(error, { autoClose: 3000 });
    }
}

export function* watchonTindakanSave() {
    yield takeEvery(TINDAKAN_SAVE, onTindakanSave);
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
        fork(watchSaveEmrDiagnosaix),
        fork(watchGetEmrListDiagnosax),
        fork(watchGetEmrListDiagnosaix),
        fork(watchDeleteDiagnosax),
        fork(watchdeleteDiagnosaix),
        fork(watchonKonsulSave),
        fork(watchonUpdateTaskId),
        fork(watchonUpdateStatusPulangRJ),
        fork(watchonGetComboHistoryUnit),
        fork(watchonGetComboTindakan),
        fork(watchonGetComboJenisPelaksana),
        fork(watchonGetComboNamaPelaksana),
        fork(watchonTindakanSave)
    ]);
}

export default emrSaga;
