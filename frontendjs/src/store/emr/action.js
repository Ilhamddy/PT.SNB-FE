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
export const konsulSave = (data, history) => ({
    type: KONSUL_SAVE,
    payload: { data, history },
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
export const updateTaskId = (data, history) => ({
    type: UPDATE_TASKID,
    payload: { data, history },
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
export const updateStatusPulangRJ = (data, history) => ({
    type: UPDATE_STATUSPULANGRJ,
    payload: { data, history },
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