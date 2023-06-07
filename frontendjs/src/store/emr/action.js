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
    EMR_DIAGNOSAIX_SAVE_ERROR
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
    payload: { data, history},
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
    payload: { data, history},
});

export const emrSaveError = (error) => ({
    type: EMR_SAVE_ERROR,
    payload: error,
});

export const emrGet = (param,data) => ({
    type: EMR_GET,
    payload: { param ,data},
});

export const emrGetSuccess = (data) => ({
    type: EMR_GET_SUCCESS,
    payload: data,
});

export const emrGetError = (error) => ({
    type: EMR_GET_ERROR,
    payload: error,
});

export const emrComboGet = (param,data) => ({
    type: EMR_COMBO_GET,
    payload: { param ,data},
});

export const emrComboGetSuccess = (data) => ({
    type: EMR_COMBO_GET_SUCCESS,
    payload: data,
});

export const emrComboGetError = (error) => ({
    type: EMR_COMBO_GET_ERROR,
    payload: error,
});

export const emrDiagnosaxGet = (param,data) => ({
    type: EMR_DIAGNOSAX_GET,
    payload: { param ,data},
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
export const emrDiagnosaixGet = (param,data) => ({
    type: EMR_DIAGNOSAIX_GET,
    payload: { param ,data},
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
    payload: { data, history},
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
    payload: { data, history},
});

export const emrDiagnosaixSaveError = (error) => ({
    type: EMR_DIAGNOSAIX_SAVE_ERROR,
    payload: error,
});