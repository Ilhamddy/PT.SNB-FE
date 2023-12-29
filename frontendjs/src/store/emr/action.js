import { GET_ALL_LOKET } from "../viewer/actionType";
import {
    EMR_RESET_FORM,
    EMR_HEADER_GET,
    EMR_HEADER_GET_SUCCESS,
    EMR_HEADER_GET_ERROR,
    EMR_TTV_SAVE,
    EMR_TTV_SAVE_SUCCESS,
    EMR_TTV_SAVE_ERROR,
    EMR_TTV_GET,
    EMR_TTV_GET_SUCCESS,
    EMR_TTV_GET_ERROR,
    EMR_SAVE,
    EMR_SAVE_SUCCESS,
    EMR_SAVE_ERROR,
    EMR_GET,
    EMR_GET_SUCCESS,
    EMR_GET_ERROR,
    EMR_COMBO_GET,
    EMR_COMBO_GET_SUCCESS,
    EMR_COMBO_GET_ERROR,
    EMR_DIAGNOSAX_GET,
    EMR_DIAGNOSAX_GET_SUCCESS,
    EMR_DIAGNOSAX_GET_ERROR,
    EMR_DIAGNOSAIX_GET,
    EMR_DIAGNOSAIX_GET_SUCCESS,
    EMR_DIAGNOSAIX_GET_ERROR,
    EMR_DIAGNOSAX_SAVE,
    EMR_DIAGNOSAX_SAVE_SUCCESS,
    EMR_DIAGNOSAX_SAVE_ERROR,
    EMR_DIAGNOSAIX_SAVE,
    EMR_DIAGNOSAIX_SAVE_SUCCESS,
    EMR_DIAGNOSAIX_SAVE_ERROR,
    EMR_LISTDIAGNOSAX_GET,
    EMR_LISTDIAGNOSAX_GET_SUCCESS,
    EMR_LISTDIAGNOSAX_GET_ERROR,
    EMR_LISTDIAGNOSAIX_GET,
    EMR_LISTDIAGNOSAIX_GET_SUCCESS,
    EMR_LISTDIAGNOSAIX_GET_ERROR,
    DELETE_DIAGNOSAX,
    DELETE_DIAGNOSAX_SUCCESS,
    DELETE_DIAGNOSAX_ERROR,
    DELETE_DIAGNOSAIX,
    DELETE_DIAGNOSAIX_SUCCESS,
    DELETE_DIAGNOSAIX_ERROR,
    KONSUL_SAVE,
    KONSUL_SAVE_SUCCESS,
    KONSUL_SAVE_ERROR,
    UPDATE_TASKID,
    UPDATE_TASKID_SUCCESS,
    UPDATE_TASKID_ERROR,
    UPDATE_STATUSPULANGRJ,
    UPDATE_STATUSPULANGRJ_SUCCESS,
    UPDATE_STATUSPULANGRJ_ERROR,
    COMBO_HISTORY_UNIT_GET,
    COMBO_HISTORY_UNIT_GET_SUCCESS,
    COMBO_HISTORY_UNIT_GET_ERROR,
    COMBO_TINDAKAN_GET,
    COMBO_TINDAKAN_GET_SUCCESS,
    COMBO_TINDAKAN_GET_ERROR,
    COMBO_TINDAKAN_RADIOLOGI_GET,
    COMBO_TINDAKAN_RADIOLOGI_GET_SUCCESS,
    COMBO_TINDAKAN_RADIOLOGI_GET_ERROR,
    COMBO_JENIS_PELAKSANA_GET,
    COMBO_JENIS_PELAKSANA_GET_SUCCESS,
    COMBO_JENIS_PELAKSANA_GET_ERROR,
    COMBO_NAMA_PELAKSANA_GET,
    COMBO_NAMA_PELAKSANA_GET_SUCCESS,
    COMBO_NAMA_PELAKSANA_GET_ERROR,
    TINDAKAN_SAVE,
    TINDAKAN_SAVE_SUCCESS,
    TINDAKAN_SAVE_ERROR,
    LIST_TAGIHAN,
    LIST_TAGIHAN_SUCCESS,
    LIST_TAGIHAN_ERROR,
    LIST_TAGIHAN_PRINT,
    LIST_TAGIHAN_PRINT_SUCCESS,
    LIST_TAGIHAN_PRINT_ERROR,
    GET_OBAT_FROM_UNIT,
    GET_OBAT_FROM_UNIT_SUCCESS,
    GET_OBAT_FROM_UNIT_ERROR,
    CREATE_OR_UPDATE_RESEP_ORDER,
    CREATE_OR_UPDATE_RESEP_ORDER_SUCCESS,
    CREATE_OR_UPDATE_RESEP_ORDER_ERROR,
    GET_ORDER_RESEP_FROM_DP,
    GET_ORDER_RESEP_FROM_DP_SUCCESS,
    GET_ORDER_RESEP_FROM_DP_ERROR,
    EMR_JENIS_PELAYANAN_SAVE,
    EMR_JENIS_PELAYANAN_SAVE_SUCCESS,
    EMR_JENIS_PELAYANAN_SAVE_ERROR,
    GET_HISTORI_JENIS_PELAYANAN,
    GET_HISTORI_JENIS_PELAYANAN_SUCCESS,
    GET_HISTORI_JENIS_PELAYANAN_ERROR,
    SAVE_EMR_TRIAGE_IGD,
    SAVE_EMR_TRIAGE_IGD_SUCCESS,
    SAVE_EMR_TRIAGE_IGD_ERROR,
    GET_COMBO_TRIAGE_IGD,
    GET_COMBO_TRIAGE_IGD_SUCCESS,
    GET_COMBO_TRIAGE_IGD_ERROR,
    GET_HISTORI_TRIAGE_BYNOREC,
    GET_HISTORI_TRIAGE_BYNOREC_SUCCESS,
    GET_HISTORI_TRIAGE_BYNOREC_ERROR,
    SAVE_ORDER_OPERASI,
    SAVE_ORDER_OPERASI_SUCCESS,
    SAVE_ORDER_OPERASI_ERROR,
    GET_HISTORI_ORDER_OPERASI,
    GET_HISTORI_ORDER_OPERASI_SUCCESS,
    GET_HISTORI_ORDER_OPERASI_ERROR,
    SAVE_PELAYANAN_PASIEN_TEMP,
    SAVE_PELAYANAN_PASIEN_TEMP_SUCCESS,
    SAVE_PELAYANAN_PASIEN_TEMP_ERROR,
    GET_LIST_PELAYANAN_PASIEN_TEMP,
    GET_LIST_PELAYANAN_PASIEN_TEMP_SUCCESS,
    GET_LIST_PELAYANAN_PASIEN_TEMP_ERROR,
    DELETE_PELAYANAN_PASIEN_TEMP,
    DELETE_PELAYANAN_PASIEN_TEMP_SUCCESS,
    DELETE_PELAYANAN_PASIEN_TEMP_ERROR,
    GET_WIDGET_EFISIENSI_KLAIM,
    GET_WIDGET_EFISIENSI_KLAIM_SUCCESS,
    GET_WIDGET_EFISIENSI_KLAIM_ERROR,
    UPDATE_ESTIMASI_KLAIM,
    UPDATE_ESTIMASI_KLAIM_SUCCESS,
    UPDATE_ESTIMASI_KLAIM_ERROR,
    COMBO_ALL_TINDAKAN_GET,COMBO_ALL_TINDAKAN_GET_SUCCESS,COMBO_ALL_TINDAKAN_GET_ERROR,
    SAVE_EMR_PASIEN,SAVE_EMR_PASIEN_SUCCESS,SAVE_EMR_PASIEN_ERROR,
    GET_ASESMENBAYILAHIR_BYNOREC,GET_ASESMENBAYILAHIR_BYNOREC_SUCCESS,GET_ASESMENBAYILAHIR_BYNOREC_ERROR,
    GET_COMBO_ASESMENBAYILAHIR,GET_COMBO_ASESMENBAYILAHIR_SUCCESS,GET_COMBO_ASESMENBAYILAHIR_ERROR,
    GET_HISTORY_ASESMENBAYILAHIR,GET_HISTORY_ASESMENBAYILAHIR_SUCCESS,GET_HISTORY_ASESMENBAYILAHIR_ERROR,
    GET_ANTREAN_PEMERIKSAAN_OBAT,
    GET_ANTREAN_PEMERIKSAAN_OBAT_SUCCESS,
    GET_ANTREAN_PEMERIKSAAN_OBAT_ERROR,
    DELETE_ORDER_RESEP,
    DELETE_ORDER_RESEP_SUCCESS,
    DELETE_ORDER_RESEP_ERROR,
    GET_COMBO_ASESMENAWALKEPERAWATAN,GET_COMBO_ASESMENAWALKEPERAWATAN_SUCCESS,GET_COMBO_ASESMENAWALKEPERAWATAN_ERROR,
    UPSERT_ASESMENAWALKEPERAWATAN,UPSERT_ASESMENAWALKEPERAWATAN_SUCCESS,UPSERT_ASESMENAWALKEPERAWATAN_ERROR,
    GET_LIST_PENGKAJIANAWALKEPERAWATAN,GET_LIST_PENGKAJIANAWALKEPERAWATAN_SUCCESS,GET_LIST_PENGKAJIANAWALKEPERAWATAN_ERROR,
    GET_COMBO_KFA,GET_COMBO_KFA_SUCCESS,GET_COMBO_KFA_ERROR
} from "./actionType";

export const emrResetForm = () => ({
    type: EMR_RESET_FORM,
});

export const emrHeaderGet = (param) => ({
    type: EMR_HEADER_GET,
    payload: { param },
});

export const emrHeaderGetSuccess = (data) => ({
    type: EMR_HEADER_GET_SUCCESS,
    payload: data,
});

export const emrHeaderGetError = (error) => ({
    type: EMR_HEADER_GET_ERROR,
    payload: error,
});

// common success
export const emrTtvSave = (data, history) => ({
    type: EMR_TTV_SAVE,
    payload: { data, history },
});

// common error
export const emrTtvSaveSuccess = (data, history) => ({
    type: EMR_TTV_SAVE_SUCCESS,
    payload: { data, history },
});

export const emrTtvSaveError = (error) => ({
    type: EMR_TTV_SAVE_ERROR,
    payload: error,
});

export const emrTtvGet = (param) => ({
    type: EMR_TTV_GET,
    payload: { param },
});

export const emrTtvGetSuccess = (data) => ({
    type: EMR_TTV_GET_SUCCESS,
    payload: data,
});

export const emrTtvGetError = (error) => ({
    type: EMR_TTV_GET_ERROR,
    payload: error,
});

// common success
export const emrSave = (data, history) => ({
    type: EMR_SAVE,
    payload: { data, history },
});
// common error
export const emrSaveSuccess = (data, history) => ({
    type: EMR_SAVE_SUCCESS,
    payload: { data, history },
});

export const emrSaveError = (error) => ({
    type: EMR_SAVE_ERROR,
    payload: error,
});

export const emrGet = (param, data) => ({
    type: EMR_GET,
    payload: { param, data },
});

export const emrGetSuccess = (data) => ({
    type: EMR_GET_SUCCESS,
    payload: data,
});

export const emrGetError = (error) => ({
    type: EMR_GET_ERROR,
    payload: error,
});

export const emrComboGet = (param, data) => ({
    type: EMR_COMBO_GET,
    payload: { param, data },
});

export const emrComboGetSuccess = (data) => ({
    type: EMR_COMBO_GET_SUCCESS,
    payload: data,
});

export const emrComboGetError = (error) => ({
    type: EMR_COMBO_GET_ERROR,
    payload: error,
});

export const emrDiagnosaxGet = (param, data) => ({
    type: EMR_DIAGNOSAX_GET,
    payload: { param, data },
});

export const emrDiagnosaxGetSuccess = (data) => ({
    type: EMR_DIAGNOSAX_GET_SUCCESS,
    payload: data,
});

export const emrDiagnosaxGetError = (error) => ({
    type: EMR_DIAGNOSAX_GET_ERROR,
    payload: error,
});
// Diagnosaxi
export const emrDiagnosaixGet = (param, data) => ({
    type: EMR_DIAGNOSAIX_GET,
    payload: { param, data },
});

export const emrDiagnosaixGetSuccess = (data) => ({
    type: EMR_DIAGNOSAIX_GET_SUCCESS,
    payload: data,
});

export const emrDiagnosaixGetError = (error) => ({
    type: EMR_DIAGNOSAIX_GET_ERROR,
    payload: error,
});

// common success
export const emrDiagnosaxSave = (data, history) => ({
    type: EMR_DIAGNOSAX_SAVE,
    payload: { data, history },
});

// common error
export const emrDiagnosaxSaveSuccess = (data, history) => ({
    type: EMR_DIAGNOSAX_SAVE_SUCCESS,
    payload: { data, history },
});

export const emrDiagnosaxSaveError = (error) => ({
    type: EMR_DIAGNOSAX_SAVE_ERROR,
    payload: error,
});

// common success
export const emrDiagnosaixSave = (data, history) => ({
    type: EMR_DIAGNOSAIX_SAVE,
    payload: { data, history },
});

// common error
export const emrDiagnosaixSaveSuccess = (data, history) => ({
    type: EMR_DIAGNOSAIX_SAVE_SUCCESS,
    payload: { data, history },
});

export const emrDiagnosaixSaveError = (error) => ({
    type: EMR_DIAGNOSAIX_SAVE_ERROR,
    payload: error,
});

export const emrListDiagnosaxGet = (param) => ({
    type: EMR_LISTDIAGNOSAX_GET,
    payload: { param },
});

export const emrListDiagnosaxGetSuccess = (data) => ({
    type: EMR_LISTDIAGNOSAX_GET_SUCCESS,
    payload: data,
});

export const emrListDiagnosaxGetError = (error) => ({
    type: EMR_LISTDIAGNOSAX_GET_ERROR,
    payload: error,
});

export const emrListDiagnosaixGet = (param) => ({
    type: EMR_LISTDIAGNOSAIX_GET,
    payload: { param },
});

export const emrListDiagnosaixGetSuccess = (data) => ({
    type: EMR_LISTDIAGNOSAIX_GET_SUCCESS,
    payload: data,
});

export const emrListDiagnosaixGetError = (error) => ({
    type: EMR_LISTDIAGNOSAIX_GET_ERROR,
    payload: error,
});

// delete
export const deleteDiagnosax = param => ({
    type: DELETE_DIAGNOSAX,
    payload: param,
});
// common error
export const deleteDiagnosaxSuccess = (data, history) => ({
    type: DELETE_DIAGNOSAX_SUCCESS,
    payload: { data, history },
});

export const deleteDiagnosaxError = error => ({
    type: DELETE_DIAGNOSAX_ERROR,
    payload: error,
});

// delete
export const deleteDiagnosaix = param => ({
    type: DELETE_DIAGNOSAIX,
    payload: param,
});
// common error
export const deleteDiagnosaixSuccess = (data, history) => ({
    type: DELETE_DIAGNOSAIX_SUCCESS,
    payload: { data, history },
});

export const deleteDiagnosaixError = error => ({
    type: DELETE_DIAGNOSAIX_ERROR,
    payload: error,
});
// Konsul
// common success
export const konsulSave = (data, history, callback) => ({
    type: KONSUL_SAVE,
    payload: { data, history, callback },
});

// common error
export const konsulSaveSuccess = (data, history) => ({
    type: KONSUL_SAVE_SUCCESS,
    payload: { data, history },
});

export const konsulSaveError = (error) => ({
    type: KONSUL_SAVE_ERROR,
    payload: error,
});

// common success
export const updateTaskId = (data, callback) => ({
    type: UPDATE_TASKID,
    payload: { data, callback },
});

// common error
export const updateTaskIdSuccess = (data, history) => ({
    type: UPDATE_TASKID_SUCCESS,
    payload: { data, history },
});

export const updateTaskIdError = (error) => ({
    type: UPDATE_TASKID_ERROR,
    payload: error,
});


// common success
export const updateStatusPulangRJ = (data, callback) => ({
    type: UPDATE_STATUSPULANGRJ,
    payload: { data, callback },
});

// common error
export const updateStatusPulangRJSuccess = (data, history) => ({
    type: UPDATE_STATUSPULANGRJ_SUCCESS,
    payload: { data, history },
});

export const updateStatusPulangRJError = (error) => ({
    type: UPDATE_STATUSPULANGRJ_ERROR,
    payload: error,
});

export const comboHistoryUnitGet = (param, data) => ({
    type: COMBO_HISTORY_UNIT_GET,
    payload: { param, data },
});

export const comboHistoryUnitGetSuccess = (data) => ({
    type: COMBO_HISTORY_UNIT_GET_SUCCESS,
    payload: data,
});

export const comboHistoryUnitGetError = (error) => ({
    type: COMBO_HISTORY_UNIT_GET_ERROR,
    payload: error,
});

export const comboTindakanGet = (param, data) => ({
    type: COMBO_TINDAKAN_GET,
    payload: { param, data },
});

export const comboTindakanGetGetSuccess = (data) => ({
    type: COMBO_TINDAKAN_GET_SUCCESS,
    payload: data,
});

export const comboTindakanGetGetError = (error) => ({
    type: COMBO_TINDAKAN_GET_ERROR,
    payload: error,
});

export const comboTindakanRadiologiGet = (param, data) => ({
    type: COMBO_TINDAKAN_RADIOLOGI_GET,
    payload: { param, data },
});

export const comboTindakanRadiologiGetGetSuccess = (data) => ({
    type: COMBO_TINDAKAN_RADIOLOGI_GET_SUCCESS,
    payload: data,
});

export const comboTindakanRadiologiGetGetError = (error) => ({
    type: COMBO_TINDAKAN_RADIOLOGI_GET_ERROR,
    payload: error,
});

export const comboJenisPelaksanaGet = (param, data) => ({
    type: COMBO_JENIS_PELAKSANA_GET,
    payload: { param, data },
});

export const comboJenisPelaksanaGetSuccess = (data) => ({
    type: COMBO_JENIS_PELAKSANA_GET_SUCCESS,
    payload: data,
});

export const comboJenisPelaksanaGetError = (error) => ({
    type: COMBO_JENIS_PELAKSANA_GET_ERROR,
    payload: error,
});

export const comboNamaPelaksanaGet = (param, data) => ({
    type: COMBO_NAMA_PELAKSANA_GET,
    payload: { param, data },
});

export const comboNamaPelaksanaGetSuccess = (data) => ({
    type: COMBO_NAMA_PELAKSANA_GET_SUCCESS,
    payload: data,
});

export const comboNamaPelaksanaGetError = (error) => ({
    type: COMBO_NAMA_PELAKSANA_GET_ERROR,
    payload: error,
});

// SAVE TINDAKAN
// common success
export const tindakanSave = (data, history) => ({
    type: TINDAKAN_SAVE,
    payload: { data, history },
});

// common error
export const tindakanSaveSuccess = (data, history) => ({
    type: TINDAKAN_SAVE_SUCCESS,
    payload: { data, history },
});

export const tindakanSaveError = (error) => ({
    type: TINDAKAN_SAVE_ERROR,
    payload: error,
});

export const listTagihanGet = (param) => ({
    type: LIST_TAGIHAN,
    payload: { param },
});

export const listTagihanGetSuccess = (data) => ({
    type: LIST_TAGIHAN_SUCCESS,
    payload: data,
});

export const listTagihanGetError = (error) => ({
    type: LIST_TAGIHAN_ERROR,
    payload: error,
});

export const listTagihanPrintGet = (norecdp) => ({
    type: LIST_TAGIHAN_PRINT,
    payload: { norecdp },
});

export const listTagihanPrintGetSuccess = (data) => ({
    type: LIST_TAGIHAN_PRINT_SUCCESS,
    payload: data,
});

export const listTagihanPrintGetError = (error) => ({
    type: LIST_TAGIHAN_PRINT_ERROR,
    payload: error,
});

export const getObatFromUnit = (queries) => ({
    type: GET_OBAT_FROM_UNIT,
    payload: { queries: queries },
});

export const getObatFromUnitSuccess = (data) => ({
    type: GET_OBAT_FROM_UNIT_SUCCESS,
    payload: data,
});

export const getObatFromUnitError = (error) => ({
    type: GET_OBAT_FROM_UNIT_ERROR,
    payload: error,
});

export const createOrUpdateResepOrder = (data, callback) => ({
    type: CREATE_OR_UPDATE_RESEP_ORDER,
    payload: { data: data, callback: callback },
});

export const createOrUpdateResepOrderSuccess = (data, callback) => ({
    type: CREATE_OR_UPDATE_RESEP_ORDER_SUCCESS,
    payload: { data: data, callback: callback },
});

export const createOrUpdateResepOrderError = (error) => ({
    type: CREATE_OR_UPDATE_RESEP_ORDER_ERROR,
    payload: error,
});

export const getOrderResepFromDp = (queries) => ({
    type: GET_ORDER_RESEP_FROM_DP,
    payload: { queries: queries },
});

export const getOrderResepFromDpSuccess = (data) => ({
    type: GET_ORDER_RESEP_FROM_DP_SUCCESS,
    payload: data,
});

export const getOrderResepFromDpError = (error) => ({
    type: GET_ORDER_RESEP_FROM_DP_ERROR,
    payload: error,
});

export const emrJenisPelayananSave = (data, history) => ({
    type: EMR_JENIS_PELAYANAN_SAVE,
    payload: { data, history },
});

// common error
export const emrJenisPelayananSaveSuccess = (data, history) => ({
    type: EMR_JENIS_PELAYANAN_SAVE_SUCCESS,
    payload: { data, history },
});

export const emrJenisPelayananSaveError = (error) => ({
    type: EMR_JENIS_PELAYANAN_SAVE_ERROR,
    payload: error,
});

export const getHistoriJenisPelayanan = (queries) => ({
    type: GET_HISTORI_JENIS_PELAYANAN,
    payload: { queries: queries },
});

export const getHistoriJenisPelayananSuccess = (data) => ({
    type: GET_HISTORI_JENIS_PELAYANAN_SUCCESS,
    payload: data,
});

export const getHistoriJenisPelayananError = (error) => ({
    type: GET_HISTORI_JENIS_PELAYANAN_ERROR,
    payload: error,
});

export const saveEmrTriageIgd = (body, callback) => ({
    type: SAVE_EMR_TRIAGE_IGD,
    payload: {
        body: body,
        callback: callback
    }
});

export const saveEmrTriageIgdSuccess = (data) => ({
    type: SAVE_EMR_TRIAGE_IGD_SUCCESS,
    payload: data
});

export const saveEmrTriageIgdError = (error) => ({
    type: SAVE_EMR_TRIAGE_IGD_ERROR,
    payload: error
});

export const getGetComboTriageIgd = (queries) => ({
    type: GET_COMBO_TRIAGE_IGD,
    payload: { queries: queries },
});

export const getGetComboTriageIgdSuccess = (data) => ({
    type: GET_COMBO_TRIAGE_IGD_SUCCESS,
    payload: data,
});

export const getGetComboTriageIgdError = (error) => ({
    type: GET_COMBO_TRIAGE_IGD_ERROR,
    payload: error,
});

export const getHistoriTriagiByNorec = (queries) => ({
    type: GET_HISTORI_TRIAGE_BYNOREC,
    payload: { queries: queries },
});

export const getHistoriTriagiByNorecSuccess = (data) => ({
    type: GET_HISTORI_TRIAGE_BYNOREC_SUCCESS,
    payload: data,
});

export const getHistoriTriagiByNorecError = (error) => ({
    type: GET_HISTORI_TRIAGE_BYNOREC_ERROR,
    payload: error,
});

export const saveOrderOperasi = (body, callback) => ({
    type: SAVE_ORDER_OPERASI,
    payload: {
        body: body,
        callback: callback
    }
});

export const saveOrderOperasiSuccess = (data) => ({
    type: SAVE_ORDER_OPERASI_SUCCESS,
    payload: data
});

export const saveOrderOperasiError = (error) => ({
    type: SAVE_ORDER_OPERASI_ERROR,
    payload: error
});

export const getHistoriOrderOperasi = (queries) => ({
    type: GET_HISTORI_ORDER_OPERASI,
    payload: { queries: queries },
});

export const getHistoriOrderOperasiSuccess = (data) => ({
    type: GET_HISTORI_ORDER_OPERASI_SUCCESS,
    payload: data,
});

export const getHistoriOrderOperasiError = (error) => ({
    type: GET_HISTORI_ORDER_OPERASI_ERROR,
    payload: error,
});

export const savePelayananPasienTemp = (body, callback) => ({
    type: SAVE_PELAYANAN_PASIEN_TEMP,
    payload: {
        body: body,
        callback: callback
    }
});

export const savePelayananPasienTempSuccess = (data) => ({
    type: SAVE_PELAYANAN_PASIEN_TEMP_SUCCESS,
    payload: data
});

export const savePelayananPasienTempError = (error) => ({
    type: SAVE_PELAYANAN_PASIEN_TEMP_ERROR,
    payload: error
});

export const getListPelayananPasienTemp = (queries) => ({
    type: GET_LIST_PELAYANAN_PASIEN_TEMP,
    payload: { queries: queries },
});

export const getListPelayananPasienTempSuccess = (data) => ({
    type: GET_LIST_PELAYANAN_PASIEN_TEMP_SUCCESS,
    payload: data,
});

export const getListPelayananPasienTempError = (error) => ({
    type: GET_LIST_PELAYANAN_PASIEN_TEMP_ERROR,
    payload: error,
});

export const deletePelayananPasienTemp = (body, callback) => ({
    type: DELETE_PELAYANAN_PASIEN_TEMP,
    payload: {
        body: body,
        callback: callback
    }
});

export const deletePelayananPasienTempSuccess = (data) => ({
    type: DELETE_PELAYANAN_PASIEN_TEMP_SUCCESS,
    payload: data
});

export const deletePelayananPasienTempError = (error) => ({
    type: DELETE_PELAYANAN_PASIEN_TEMP_ERROR,
    payload: error
});

export const getWidgetEfisiensiKlaim = (queries) => ({
    type: GET_WIDGET_EFISIENSI_KLAIM,
    payload: { queries: queries },
});

export const getWidgetEfisiensiKlaimSuccess = (data) => ({
    type: GET_WIDGET_EFISIENSI_KLAIM_SUCCESS,
    payload: data,
});

export const getWidgetEfisiensiKlaimError = (error) => ({
    type: GET_WIDGET_EFISIENSI_KLAIM_ERROR,
    payload: error,
});

export const updateEstimasiKlaim = (body, callback) => ({
    type: UPDATE_ESTIMASI_KLAIM,
    payload: {
        body: body,
        callback: callback
    }
});

export const updateEstimasiKlaimSuccess = (data) => ({
    type: UPDATE_ESTIMASI_KLAIM_SUCCESS,
    payload: data
});

export const updateEstimasiKlaimError = (error) => ({
    type: UPDATE_ESTIMASI_KLAIM_ERROR,
    payload: error
});

export const comboAllTindakan = (queries) => ({
    type: COMBO_ALL_TINDAKAN_GET,
    payload: { queries: queries },
});

export const comboAllTindakanSuccess = (data) => ({
    type: COMBO_ALL_TINDAKAN_GET_SUCCESS,
    payload: data,
});

export const comboAllTindakanError = (error) => ({
    type: COMBO_ALL_TINDAKAN_GET_ERROR,
    payload: error,
});


export const saveEmrPasien = (body, callback) => ({
    type: SAVE_EMR_PASIEN,
    payload: {
        body: body,
        callback: callback
    }
});

export const saveEmrPasienSuccess = (data) => ({
    type: SAVE_EMR_PASIEN_SUCCESS,
    payload: data
});

export const saveEmrPasienError = (error) => ({
    type: SAVE_EMR_PASIEN_ERROR,
    payload: error
});

export const getAsesmenBayiLahirByNorec = (data, callback) => ({
    type: GET_ASESMENBAYILAHIR_BYNOREC,
    payload: {
        data,
        callback
    },
});

export const getAsesmenBayiLahirByNorecSuccess = (data) => ({
    type: GET_ASESMENBAYILAHIR_BYNOREC_SUCCESS,
    payload: data,
});

export const getAsesmenBayiLahirByNorecError = (error) => ({
    type: GET_ASESMENBAYILAHIR_BYNOREC_ERROR,
    payload: error,
});

export const getComboAsesmenBayiLahir = (data, callback) => ({
    type: GET_COMBO_ASESMENBAYILAHIR,
    payload: {
        data,
        callback
    },
});

export const getComboAsesmenBayiLahirSuccess = (data) => ({
    type: GET_COMBO_ASESMENBAYILAHIR_SUCCESS,
    payload: data,
});

export const getComboAsesmenBayiLahirError = (error) => ({
    type: GET_COMBO_ASESMENBAYILAHIR_ERROR,
    payload: error,
});

export const getHistoryAsesmenBayiLahir = (data, callback) => ({
    type: GET_HISTORY_ASESMENBAYILAHIR,
    payload: {
        data,
        callback
    },
});

export const getHistoryAsesmenBayiLahirSuccess = (data) => ({
    type: GET_HISTORY_ASESMENBAYILAHIR_SUCCESS,
    payload: data,
});

export const getHistoryAsesmenBayiLahirError = (error) => ({
    type: GET_HISTORY_ASESMENBAYILAHIR_ERROR,
    payload: error,
});

export const getAntreanPemeriksaanObat = (queries) => ({
    type: GET_ANTREAN_PEMERIKSAAN_OBAT,
    payload: {
        queries,
    },
});

export const getAntreanPemeriksaanObatSuccess = (data) => ({
    type: GET_ANTREAN_PEMERIKSAAN_OBAT_SUCCESS,
    payload: data,
});

export const getAntreanPemeriksaanObatError = (error) => ({
    type: GET_ANTREAN_PEMERIKSAAN_OBAT_ERROR,
    payload: error,
});

export const deleteOrderResep = (data, callback) => ({
    type: DELETE_ORDER_RESEP,
    payload: {
        data,
        callback
    },
});

export const deleteOrderResepSuccess = (data) => ({
    type: DELETE_ORDER_RESEP_SUCCESS,
    payload: data,
});

export const deleteOrderResepError = (error) => ({
    type: DELETE_ORDER_RESEP_ERROR,
    payload: error,
});

export const getComboAsesmenAwalKeperawatan = (queries) => ({
    type: GET_COMBO_ASESMENAWALKEPERAWATAN,
    payload: {
        queries,
    },
});

export const getComboAsesmenAwalKeperawatanSuccess = (data) => ({
    type: GET_COMBO_ASESMENAWALKEPERAWATAN_SUCCESS,
    payload: data,
});

export const getComboAsesmenAwalKeperawatanError = (error) => ({
    type: GET_COMBO_ASESMENAWALKEPERAWATAN_ERROR,
    payload: error,
});

export const upsertAsesmenAwalKeperawatan = (data, callback) => ({
    type: UPSERT_ASESMENAWALKEPERAWATAN,
    payload: {
        data,
        callback
    },
});

export const upsertAsesmenAwalKeperawatanSuccess = (data) => ({
    type: UPSERT_ASESMENAWALKEPERAWATAN_SUCCESS,
    payload: data,
});

export const upsertAsesmenAwalKeperawatanError = (error) => ({
    type: UPSERT_ASESMENAWALKEPERAWATAN_ERROR,
    payload: error,
});

export const getListPengkajianAwalKeperawatan = (queries) => ({
    type: GET_LIST_PENGKAJIANAWALKEPERAWATAN,
    payload: {
        queries,
    },
});

export const getListPengkajianAwalKeperawatanSuccess = (data) => ({
    type: GET_LIST_PENGKAJIANAWALKEPERAWATAN_SUCCESS,
    payload: data,
});

export const getListPengkajianAwalKeperawatanError = (error) => ({
    type: GET_LIST_PENGKAJIANAWALKEPERAWATAN_ERROR,
    payload: error,
});

export const getComboKfa = (queries) => ({
    type: GET_COMBO_KFA,
    payload: {
        queries,
    },
});

export const getComboKfaSuccess = (data) => ({
    type: GET_COMBO_KFA_SUCCESS,
    payload: data,
});

export const getComboKfaError = (error) => ({
    type: GET_COMBO_KFA_ERROR,
    payload: error,
});