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
    TINDAKAN_SAVE, LIST_TAGIHAN, LIST_TAGIHAN_PRINT,
    COMBO_TINDAKAN_RADIOLOGI_GET,
    GET_OBAT_FROM_UNIT,
    CREATE_OR_UPDATE_RESEP_ORDER,
    GET_ORDER_RESEP_FROM_DP,
    EMR_JENIS_PELAYANAN_SAVE,
    GET_HISTORI_JENIS_PELAYANAN,
    SAVE_EMR_TRIAGE_IGD, GET_COMBO_TRIAGE_IGD,
    GET_HISTORI_TRIAGE_BYNOREC,
    SAVE_ORDER_OPERASI,
    GET_HISTORI_ORDER_OPERASI,
    SAVE_PELAYANAN_PASIEN_TEMP, GET_LIST_PELAYANAN_PASIEN_TEMP,
    DELETE_PELAYANAN_PASIEN_TEMP, GET_WIDGET_EFISIENSI_KLAIM,
    UPDATE_ESTIMASI_KLAIM, COMBO_ALL_TINDAKAN_GET,
    SAVE_EMR_PASIEN,
    GET_ASESMENBAYILAHIR_BYNOREC, GET_COMBO_ASESMENBAYILAHIR,
    GET_HISTORY_ASESMENBAYILAHIR,
    GET_ANTREAN_PEMERIKSAAN_OBAT,
    DELETE_ORDER_RESEP,
    GET_COMBO_ASESMENAWALKEPERAWATAN,
    UPSERT_ASESMENAWALKEPERAWATAN,
    GET_LIST_PENGKAJIANAWALKEPERAWATAN,
    GET_COMBO_KFA,
    GET_COMBO_ASESMEN_AWAL_IGD,
    GET_COMBO_RIWAYATPENYAKIT_PRIBADI,
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
    tindakanSaveSuccess,tindakanSaveError,
    listTagihanGetSuccess,listTagihanGetError, listTagihanPrintGet, listTagihanPrintGetSuccess, listTagihanPrintGetError,
    comboTindakanRadiologiGetGetSuccess, comboTindakanRadiologiGetGetError,
    getObatFromUnitSuccess,
    getObatFromUnitError,
    createOrUpdateResepOrderSuccess,
    createOrUpdateResepOrderError,
    getOrderResepFromDpSuccess,
    getOrderResepFromDpError,
    emrJenisPelayananSaveSuccess, emrJenisPelayananSaveError,
    getHistoriJenisPelayananSuccess, getHistoriJenisPelayananError,
    saveEmrTriageIgdSuccess,saveEmrTriageIgdError,
    getGetComboTriageIgdSuccess,getGetComboTriageIgdError,
    getHistoriTriagiByNorecSuccess, getHistoriTriagiByNorecError,
    saveOrderOperasiSuccess,saveOrderOperasiError,
    getHistoriOrderOperasiSuccess, getHistoriOrderOperasiError,
    savePelayananPasienTempSuccess, savePelayananPasienTempError,
    getListPelayananPasienTempSuccess, getListPelayananPasienTempError,
    deletePelayananPasienTempSuccess, deletePelayananPasienTempError,
    getWidgetEfisiensiKlaimSuccess, getWidgetEfisiensiKlaimError,
    updateEstimasiKlaimSuccess, updateEstimasiKlaimError,
    comboAllTindakanSuccess, comboAllTindakanError,
    saveEmrPasienSuccess, saveEmrPasienError,
    getAsesmenBayiLahirByNorecSuccess, getAsesmenBayiLahirByNorecError,
    getComboAsesmenBayiLahirSuccess, getComboAsesmenBayiLahirError,
    getHistoryAsesmenBayiLahirSuccess, getHistoryAsesmenBayiLahirError,
    getAntreanPemeriksaanObatSuccess,
    getAntreanPemeriksaanObatError,
    deleteOrderResepSuccess,
    deleteOrderResepError,
    getComboAsesmenAwalKeperawatanSuccess,getComboAsesmenAwalKeperawatanError,
    upsertAsesmenAwalKeperawatanSuccess,upsertAsesmenAwalKeperawatanError,
    getListPengkajianAwalKeperawatanSuccess,getListPengkajianAwalKeperawatanError,
    getComboKfaSuccess,getComboKfaError,
    getComboAsesmenAwalIGDSuccess,
    getComboAsesmenAwalIGDError,
    getComboRiwayatPenyakitPribadiSuccess,getComboRiwayatPenyakitPribadiError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceSatuSehat from "../../services/service-satusehat";
import { 
    getAsesmenAwalIGD,
    getAsesmenAwalIGDError,
    getAsesmenAwalIGDSuccess,
    upsertAsesmenAwalIGD, 
    upsertAsesmenAwalIGDError, 
    upsertAsesmenAwalIGDSuccess,
    upsertSkriningIGD,
    upsertSkriningIGDError,
    upsertSkriningIGDSuccess,
    getHistorySkriningIGD,
    getHistorySkriningIGDError,
    getHistorySkriningIGDSuccess
} from "./emrSlice";

const serviceEmr = new ServiceEmr();
const serviceSatuSehat = new ServiceSatuSehat();

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

function* onSaveEmrTtv({ payload: { data, callback } }) {
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
        callback && callback()

    } catch (error) {
        yield put(emrTtvSaveError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
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
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
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
        } else {
            response = yield call(serviceEmr.saveDiagnosa, data);
        }



        yield put(emrDiagnosaxSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
            data.norec = response.data.diagnosapasien.norec
            data.ihs_diagnosa=''
            data.codestatus='active'
            data.displaystatus='Active'
            const responsesatusehat = yield call(serviceSatuSehat.upsertCondition, data);
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(emrDiagnosaxSaveError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchSaveEmrDiagnosax() {
    yield takeEvery(EMR_DIAGNOSAX_SAVE, onSaveEmrDiagnosax);
}

function* onSaveEmrDiagnosaix({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceEmr.saveDiagnosaix, data);
            // console.log('testiiinng')
        } else {
            response = yield call(serviceEmr.saveDiagnosaix, data);
        }



        yield put(emrDiagnosaixSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
            toast.success(response.msg, { autoClose: 3000 });
            data.norec = response.data.diagnosatindakan.norec
            data.ihs_diagnosa=''
            data.codestatus='active'
            data.displaystatus='Active'
            const responsesatusehat = yield call(serviceSatuSehat.upsertProcedure, data);
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(emrDiagnosaixSaveError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
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

function* onKonsulSave({ payload: { data, history, callback } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceEmr.saveKonsul, data);
        } else {
            response = yield call(serviceEmr.saveKonsul, data);
        }

        callback && callback()
        yield put(konsulSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(konsulSaveError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchonKonsulSave() {
    yield takeEvery(KONSUL_SAVE, onKonsulSave);
}

function* onUpdateTaskId({ payload: { data, callback } }) {
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
        callback && callback()
    } catch (error) {
        yield put(updateTaskIdError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchonUpdateTaskId() {
    yield takeEvery(UPDATE_TASKID, onUpdateTaskId);
}

function* onUpdateStatusPulangRJ({ payload: { data, callback } }) {
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
        callback && callback()
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(updateStatusPulangRJError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
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

function* onGetComboTindakanRadiologi({ payload: { param, data } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getComboTindakan, param);

        yield put(comboTindakanRadiologiGetGetSuccess(response.data));
    } catch (error) {
        yield put(comboTindakanRadiologiGetGetError(error));
    }
}

export function* watchonGetComboTindakanRadiologi() {
    yield takeEvery(COMBO_TINDAKAN_RADIOLOGI_GET, onGetComboTindakanRadiologi);
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
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchonTindakanSave() {
    yield takeEvery(TINDAKAN_SAVE, onTindakanSave);
}

function* onListTagihan({ payload: { param } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getListTagihan, param);

        yield put(listTagihanGetSuccess(response.data));
    } catch (error) {
        yield put(listTagihanGetError(error));
    }
}

export function* watchonListTagihan() {
    yield takeEvery(LIST_TAGIHAN, onListTagihan);
}

function* onListTagihanPrint({payload: { norecdp}}) {
    try {
        let response = null;
        response = yield call(serviceEmr.getListTagihanPrint, norecdp);
        yield put(listTagihanPrintGetSuccess(response.data));
    } catch (error) {
        yield put(listTagihanPrintGetError(error));
    }
}

export function* watchonListTagihanPrint() {
    yield takeEvery(LIST_TAGIHAN_PRINT, onListTagihanPrint);
}

function* onGetObatFromUnit({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getObatFromUnit, queries);
        yield put(getObatFromUnitSuccess(response.data));
    } catch (error) {
        yield put(getObatFromUnitError(error));
    }
}

export function* watchGetObatFromUnit() {
    yield takeEvery(GET_OBAT_FROM_UNIT, onGetObatFromUnit);
}

function* onCreateOrUpdateResepOrder({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceEmr.createOrUpdateResepOrder, data);
        yield put(createOrUpdateResepOrderSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.msg, { autoClose: 3000 });
    } catch (error) {
        yield put(createOrUpdateResepOrderError(error));
        console.error(error)
        toast.error("error", { autoClose: 3000 })
    }
}

export function* watchCreateOrUpdateResepOrder() {
    yield takeEvery(CREATE_OR_UPDATE_RESEP_ORDER, onCreateOrUpdateResepOrder);
}

function* onGetOrderResepFromDp({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getOrderResepFromDp, queries);
        yield put(getOrderResepFromDpSuccess(response.data));
    } catch (error) {
        yield put(getOrderResepFromDpError(error));
    }
}

export function* watchGetOrderResepFromDp() {
    yield takeEvery(GET_ORDER_RESEP_FROM_DP, onGetOrderResepFromDp);
}

function* onemrJenisPelayananSave({ payload: { data, history } }) {
    try {
        let response = yield call(serviceEmr.saveJenisPelayanan, data);

        yield put(emrJenisPelayananSaveSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(emrJenisPelayananSaveError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchemrJenisPelayananSave() {
    yield takeEvery(EMR_JENIS_PELAYANAN_SAVE, onemrJenisPelayananSave);
}

function* ongetHistoriJenisPelayanan({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getHistoriJenisPelayanan, queries);
        yield put(getHistoriJenisPelayananSuccess(response.data));
    } catch (error) {
        yield put(getHistoriJenisPelayananError(error));
    }
}

export function* watchgetHistoriJenisPelayanan() {
    yield takeEvery(GET_HISTORI_JENIS_PELAYANAN, ongetHistoriJenisPelayanan);
}

function* onsaveEmrTriageIgd({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceEmr.saveEmerTriageIgd, body);
        yield put(saveEmrTriageIgdSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
    } catch (error) {
        yield put(saveEmrTriageIgdError(error));
        toast.error("Gagal Simpan Triage", { autoClose: 3000 });
    }
}
export function* watchonsaveEmrTriageIgd() {
    yield takeEvery(SAVE_EMR_TRIAGE_IGD, onsaveEmrTriageIgd);
}

function* ongetGetComboTriageIgd({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getComboTriageIgd, queries);
        yield put(getGetComboTriageIgdSuccess(response.data));
    } catch (error) {
        yield put(getGetComboTriageIgdError(error));
    }
}

export function* watchgetGetComboTriageIgd() {
    yield takeEvery(GET_COMBO_TRIAGE_IGD, ongetGetComboTriageIgd);
}

function* ongetHistoriTriagiByNorec({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getHistoriTriagiByNorec, queries);
        yield put(getHistoriTriagiByNorecSuccess(response.data));
    } catch (error) {
        yield put(getHistoriTriagiByNorecError(error));
    }
}

export function* watchgetHistoriTriagiByNorec() {
    yield takeEvery(GET_HISTORI_TRIAGE_BYNOREC, ongetHistoriTriagiByNorec);
}

function* onsaveOrderOperasi({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceEmr.saveOrderOperasi, body);
        yield put(saveOrderOperasiSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
    } catch (error) {
        yield put(saveOrderOperasiError(error));
        toast.error("Gagal Simpan Order Operasi", { autoClose: 3000 });
    }
}
export function* watchonsaveOrderOperasi() {
    yield takeEvery(SAVE_ORDER_OPERASI, onsaveOrderOperasi);
}

function* ongetHistoriOrderOperasi({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getHistoriOrderOperasi, queries);
        yield put(getHistoriOrderOperasiSuccess(response.data));
    } catch (error) {
        yield put(getHistoriOrderOperasiError(error));
    }
}

export function* watchgetHistoriOrderOperasi() {
    yield takeEvery(GET_HISTORI_ORDER_OPERASI, ongetHistoriOrderOperasi);
}

function* onsavePelayananPasienTemp({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceEmr.savePelayananPasienTemp, body);
        yield put(savePelayananPasienTempSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
    } catch (error) {
        yield put(savePelayananPasienTempError(error));
        toast.error("Gagal Simpan", { autoClose: 3000 });
    }
}
export function* watchonsavePelayananPasienTemp() {
    yield takeEvery(SAVE_PELAYANAN_PASIEN_TEMP, onsavePelayananPasienTemp);
}

function* ongetListPelayananPasienTemp({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getListPelayananPasienTemp, queries);
        yield put(getListPelayananPasienTempSuccess(response.data));
    } catch (error) {
        yield put(getListPelayananPasienTempError(error));
    }
}

export function* watchgetListPelayananPasienTemp() {
    yield takeEvery(GET_LIST_PELAYANAN_PASIEN_TEMP, ongetListPelayananPasienTemp);
}

function* ondeletePelayananPasienTemp({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceEmr.deletePelayananPasienTemp, body);
        yield put(deletePelayananPasienTempSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
    } catch (error) {
        yield put(deletePelayananPasienTempError(error));
        toast.error("Gagal Simpan", { autoClose: 3000 });
    }
}
export function* watchondeletePelayananPasienTemp() {
    yield takeEvery(DELETE_PELAYANAN_PASIEN_TEMP, ondeletePelayananPasienTemp);
}

function* ongetWidgetEfisiensiKlaim({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceEmr.getWidgetEfisiensiKlaim, queries);
        yield put(getWidgetEfisiensiKlaimSuccess(response.data));
    } catch (error) {
        yield put(getWidgetEfisiensiKlaimError(error));
    }
}

function* onupdateEstimasiKlaim({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceEmr.updateEstimasiKlaim, body);
        yield put(updateEstimasiKlaimSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
    } catch (error) {
        yield put(updateEstimasiKlaimError(error));
        toast.error("Gagal Simpan", { autoClose: 3000 });
    }
}
export function* watchonupdateEstimasiKlaim() {
    yield takeEvery(UPDATE_ESTIMASI_KLAIM, onupdateEstimasiKlaim);
}

export function* watchgetWidgetEfisiensiKlaim() {
    yield takeEvery(GET_WIDGET_EFISIENSI_KLAIM, ongetWidgetEfisiensiKlaim);
}

function* oncomboAllTindakan({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceEmr.comboAllTindakan, queries);
        yield put(comboAllTindakanSuccess(response.data));
    } catch (error) {
        yield put(comboAllTindakanError(error));
    }
}

export function* watchcomboAllTindakan() {
    yield takeEvery(COMBO_ALL_TINDAKAN_GET, oncomboAllTindakan);
}

function* onsaveEmrPasien({payload: {body, callback}}) {
    try{
        const response = yield call(serviceEmr.saveEmrPasien, body);
        yield put(saveEmrPasienSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(saveEmrPasienError(error));
        toast.error(error.msg || "Gagal");
    }
}

export function* watchonsaveEmrPasien() {
    yield takeEvery(SAVE_EMR_PASIEN, onsaveEmrPasien);
}


function* ongetAsesmenBayiLahirByNorec({payload: {data, callback}}) {
    try{
        const response = yield call(serviceEmr.getAsesmenBayiLahirByNorec, data);
        yield put(getAsesmenBayiLahirByNorecSuccess(response.data));
        // toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(getAsesmenBayiLahirByNorecError(error));
        // toast.error(error.msg || "Gagal");
    }
}

export function* watchongetAsesmenBayiLahirByNorec() {
    yield takeEvery(GET_ASESMENBAYILAHIR_BYNOREC, ongetAsesmenBayiLahirByNorec);
}

function* ongetComboAsesmenBayiLahir({payload: {data, callback}}) {
    try{
        const response = yield call(serviceEmr.getComboAsesmenBayiLahir, data);
        yield put(getComboAsesmenBayiLahirSuccess(response.data));
        // toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(getComboAsesmenBayiLahirError(error));
        // toast.error(error.msg || "Gagal");
    }
}

export function* watchongetComboAsesmenBayiLahir() {
    yield takeEvery(GET_COMBO_ASESMENBAYILAHIR, ongetComboAsesmenBayiLahir);
}

function* ongetHistoryAsesmenBayiLahir({payload: {data, callback}}) {
    try{
        const response = yield call(serviceEmr.getHistoryAsesmenBayiLahir, data);
        yield put(getHistoryAsesmenBayiLahirSuccess(response.data));
        // toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(getHistoryAsesmenBayiLahirError(error));
        // toast.error(error.msg || "Gagal");
    }
}

export function* watchongetHistoryAsesmenBayiLahir() {
    yield takeEvery(GET_HISTORY_ASESMENBAYILAHIR, ongetHistoryAsesmenBayiLahir);
}

function* onGetAntreanPemeriksaanObat({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getAntreanPemeriksaanObat, queries);
        yield put(getAntreanPemeriksaanObatSuccess(response.data));
    } catch (error) {
        yield put(getAntreanPemeriksaanObatError(error));
    }
}

export function* watchOnGetAntreanPemeriksaanObat() {
    yield takeEvery(GET_ANTREAN_PEMERIKSAAN_OBAT, onGetAntreanPemeriksaanObat);
}

function* onDeleteOrderResep({payload: {data, callback}}) {
    try{
        const response = yield call(serviceEmr.deleteOrderResep, data);
        yield put(deleteOrderResepSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(deleteOrderResepError(error));
        toast.error(error?.response?.msg || "Gagal");
    }
}

export function* watchDeleteOrderResep() {
    yield takeEvery(DELETE_ORDER_RESEP, onDeleteOrderResep);
}

function* ongetComboAsesmenAwalKeperawatan({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getComboAsesmenAwalKeperawatan, queries);
        yield put(getComboAsesmenAwalKeperawatanSuccess(response.data));
    } catch (error) {
        yield put(getComboAsesmenAwalKeperawatanError(error));
    }
}

export function* watchOngetComboAsesmenAwalKeperawatan() {
    yield takeEvery(GET_COMBO_ASESMENAWALKEPERAWATAN, ongetComboAsesmenAwalKeperawatan);
}

function* onupsertAsesmenAwalKeperawatan({payload: {data, callback}}) {
    try{
        const response = yield call(serviceEmr.upsertAsesmenAwalKeperawatan, data);
        yield put(upsertAsesmenAwalKeperawatanSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertAsesmenAwalKeperawatanError(error));
        toast.error(error.msg || "Gagal");
    }
}

export function* watchonupsertAsesmenAwalKeperawatan() {
    yield takeEvery(UPSERT_ASESMENAWALKEPERAWATAN, onupsertAsesmenAwalKeperawatan);
}

function* ongetListPengkajianAwalKeperawatan({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getListPengkajianAwalKeperawatan, queries);
        yield put(getListPengkajianAwalKeperawatanSuccess(response.data));
    } catch (error) {
        yield put(getListPengkajianAwalKeperawatanError(error));
    }
}

export function* watchOngetListPengkajianAwalKeperawatan() {
    yield takeEvery(GET_LIST_PENGKAJIANAWALKEPERAWATAN, ongetListPengkajianAwalKeperawatan);
}

function* ongetComboKfa({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getComboKfa, queries);
        yield put(getComboKfaSuccess(response.data));
    } catch (error) {
        yield put(getComboKfaError(error));
    }
}

export function* watchOngetComboKfa() {
    yield takeEvery(GET_COMBO_KFA, ongetComboKfa);
}

function* onGetComboAsesmenAwalIGD({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getComboAsesmenAwalIGD, queries);
        yield put(getComboAsesmenAwalIGDSuccess(response.data));
    } catch (error) {
        yield put(getComboAsesmenAwalIGDError(error));
    }
}

export function* watchOngetComboAsesmenAwalIGD() {
    yield takeEvery(GET_COMBO_ASESMEN_AWAL_IGD, onGetComboAsesmenAwalIGD);
}


function* ongetComboRiwayatPenyakitPribadi({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getComboRiwayatPenyakitPribadi, queries);
        yield put(getComboRiwayatPenyakitPribadiSuccess(response.data));
    } catch (error) {
        yield put(getComboRiwayatPenyakitPribadiError(error));
    }
}

export function* watchOngetComboRiwayatPenyakitPribadi() {
    yield takeEvery(GET_COMBO_RIWAYATPENYAKIT_PRIBADI, ongetComboRiwayatPenyakitPribadi);
}


function* onUpsertAsesmenAwalIGD({payload: {data, callback}}) {
    try{
        const response = yield call(serviceEmr.upsertAsesmenAwalIGD, data);
        yield put(upsertAsesmenAwalIGDSuccess(response.data));
        callback && callback()
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(upsertAsesmenAwalIGDError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });

    }
}

export function* watchOnUpsertAsesmenAwalIGD() {
    yield takeEvery(upsertAsesmenAwalIGD.type, onUpsertAsesmenAwalIGD);
}


function* onGetAsesmenAwalIGD({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getAsesmenAwalIGD, queries);
        yield put(getAsesmenAwalIGDSuccess(response.data));
    } catch (error) {
        yield put(getAsesmenAwalIGDError(error));
    }
}

export function* watchOnGetAsesmenAwalIGD() {
    yield takeEvery(getAsesmenAwalIGD.type, onGetAsesmenAwalIGD);
}

function* onupsertSkriningIGD({payload: {data, callback}}) {
    try{
        const response = yield call(serviceEmr.upsertSkriningIGD, data);
        yield put(upsertSkriningIGDSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(upsertSkriningIGDError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });

    }
}
export function* watchOnupsertSkriningIGD() {
    yield takeEvery(upsertSkriningIGD.type, onupsertSkriningIGD);
}

function* ongetHistorySkriningIGD({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getHistorySkriningIGD, queries);
        yield put(getHistorySkriningIGDSuccess(response.data));
    } catch (error) {
        yield put(getHistorySkriningIGDError(error));
    }
}

export function* watchOngetHistorySkriningIGD() {
    yield takeEvery(getHistorySkriningIGD.type, ongetHistorySkriningIGD);
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
        fork(watchonTindakanSave),
        fork(watchonListTagihan),
        fork(watchonListTagihanPrint),
        fork(watchonGetComboTindakanRadiologi),
        fork(watchGetObatFromUnit),
        fork(watchCreateOrUpdateResepOrder),
        fork(watchGetOrderResepFromDp),
        fork(watchemrJenisPelayananSave),
        fork(watchgetHistoriJenisPelayanan),
        fork(watchonsaveEmrTriageIgd),
        fork(watchgetGetComboTriageIgd),
        fork(watchgetHistoriTriagiByNorec),
        fork(watchonsaveOrderOperasi),
        fork(watchgetHistoriOrderOperasi),
        fork(watchonsavePelayananPasienTemp),
        fork(watchgetListPelayananPasienTemp),
        fork(watchondeletePelayananPasienTemp),
        fork(watchgetWidgetEfisiensiKlaim),
        fork(watchonupdateEstimasiKlaim),
        fork(watchcomboAllTindakan),
        fork(watchonsaveEmrPasien),
        fork(watchongetAsesmenBayiLahirByNorec),
        fork(watchongetComboAsesmenBayiLahir),
        fork(watchongetHistoryAsesmenBayiLahir),
        fork(watchOnGetAntreanPemeriksaanObat),
        fork(watchDeleteOrderResep),
        fork(watchOngetComboAsesmenAwalKeperawatan),
        fork(watchonupsertAsesmenAwalKeperawatan),
        fork(watchOngetListPengkajianAwalKeperawatan),
        fork(watchOngetComboKfa),
        fork(watchOngetComboAsesmenAwalIGD),
        fork(watchOngetComboRiwayatPenyakitPribadi),
        fork(watchOnUpsertAsesmenAwalIGD),
        fork(watchOnGetAsesmenAwalIGD),
        fork(watchOnupsertSkriningIGD),
        fork(watchOngetHistorySkriningIGD)
    ]);
}

export default emrSaga;
