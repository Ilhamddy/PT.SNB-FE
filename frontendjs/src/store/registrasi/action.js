import {
    REGISTRASI_SAVE, 
    REGISTRASI_SAVE_ERROR, 
    REGISTRASI_SAVE_SUCCESS,
    REGISTRASI_LIST_GET,
    REGISTRASI_LIST_GET_ERROR,
    REGISTRASI_LIST_GET_SUCCESS,
    REGISTRASI_RESET_FORM,
    REGISTRASI_GET,
    REGISTRASI_GET_SUCCESS,
    REGISTRASI_GET_ERROR,
    REGISTRASI_GET_RESET,
    REGISTRASI_LIST_BYOR_GET,
    REGISTRASI_LIST_BYOR_GET_SUCCESS,
    REGISTRASI_LIST_BYOR_GET_ERROR,
    REGISTRASI_SAVE_RUANGAN, 
    REGISTRASI_SAVE_RUANGAN_ERROR, 
    REGISTRASI_SAVE_RUANGAN_SUCCESS,
    REGISTRASI_SAVE_RUANGAN_RESET,
    REGISTRASI_NOREGISTRASI_GET,
    REGISTRASI_NOREGISTRASI_GET_SUCCESS,
    REGISTRASI_NOREGISTRASI_GET_ERROR,
    REGISTRASI_NOREGISTRASI_RESET_FORM,
    REGISTRASI_RUANGAN_NOREC_GET,
    REGISTRASI_RUANGAN_NOREC_GET_SUCCESS,
    REGISTRASI_RUANGAN_NOREC_GET_ERROR,
    REGISTRASI_RUANGAN_NOREC_GET_RESET,
    REGISTRASI_NO_BPJS_GET,
    REGISTRASI_NO_BPJS_GET_SUCCESS,
    REGISTRASI_NO_BPJS_GET_ERROR,
    REGISTRASI_SAVE_PENJAMIN_FK,
    REGISTRASI_SAVE_PENJAMIN_FK_SUCCESS,
    REGISTRASI_SAVE_PENJAMIN_FK_ERROR,
} from "./actionType";

export const registrasiResetForm = () => ({
    type: REGISTRASI_RESET_FORM,
});

// common success
export const registrasiSave = (data, history) => ({
    type: REGISTRASI_SAVE,
    payload: { data, history },
});
// common error
export const registrasiSaveSuccess = (data, history) => ({
    type: REGISTRASI_SAVE_SUCCESS,
    payload: { data, history},
});

export const registrasiSaveError = (error) => ({
    type: REGISTRASI_SAVE_ERROR,
    payload: error,
});


export const registrasiGetList = (nocm) => ({
    type: REGISTRASI_LIST_GET,
    payload: {nocm},
});

export const registrasiGetListSuccess = (data) => ({
    type: REGISTRASI_LIST_GET_SUCCESS,
    payload: data,
});

export const registrasiGetListError = (error) => ({
    type: REGISTRASI_LIST_GET_ERROR,
    payload: error,
});

export const registrasiGetListByOr = (nocm) => ({
    type: REGISTRASI_LIST_BYOR_GET,
    payload: {nocm},
});

export const registrasiGetListByOrSuccess = (data) => ({
    type: REGISTRASI_LIST_BYOR_GET_SUCCESS,
    payload: data,
});

export const registrasiGetListByOrError = (error) => ({
    type: REGISTRASI_LIST_BYOR_GET_ERROR,
    payload: error,
});

export const registrasiGet = (id) => ({
    type: REGISTRASI_GET,
    payload: {id},
});

export const registrasiGetSuccess = (data) => ({
    type: REGISTRASI_GET_SUCCESS,
    payload: data,
});

export const registrasiGetError = (error) => ({
    type: REGISTRASI_GET_ERROR,
    payload: error,
});

export const registrasiGetReset = () => ({
    type: REGISTRASI_GET_RESET,
});

export const registrasiNoregistrasiGet = (noregistrasi) => ({
    type: REGISTRASI_NOREGISTRASI_GET,
    payload: {noregistrasi},
});

export const registrasiNoregistrasiGetSuccess = (data) => ({
    type: REGISTRASI_NOREGISTRASI_GET_SUCCESS,
    payload: data,
});

export const registrasiNoregistrasiGetError = (error) => ({
    type: REGISTRASI_NOREGISTRASI_GET_ERROR,
    payload: error,
});

export const registrasiNoregistrasiResetForm = () => ({
    type: REGISTRASI_NOREGISTRASI_RESET_FORM,
});

// common success
export const registrasiSaveRuangan = (data, history) => ({
    type: REGISTRASI_SAVE_RUANGAN,
    payload: { data, history },
});
// common error
export const registrasiSaveRuanganSuccess = (data, history) => ({
    type: REGISTRASI_SAVE_RUANGAN_SUCCESS,
    payload: { data, history},
});

export const registrasiSaveRuanganError = (error) => ({
    type: REGISTRASI_SAVE_RUANGAN_ERROR,
    payload: error,
});

export const registrasiSaveRuanganReset = () => ({
    type: REGISTRASI_SAVE_RUANGAN_RESET,
});

export const registrasiRuanganNorecGet = (norec) => ({
    type: REGISTRASI_RUANGAN_NOREC_GET,
    payload: {norec: norec}
});

export const registrasiRuanganNorecGetSuccess = (data) => ({
    type: REGISTRASI_RUANGAN_NOREC_GET_SUCCESS,
    payload: data,
});

export const registrasiRuanganNorecGetError = (error) => ({
    type: REGISTRASI_RUANGAN_NOREC_GET_ERROR,
    payload: error,
});

export const registrasiRuanganNorecGetReset = () => ({
    type: REGISTRASI_RUANGAN_NOREC_GET_RESET,
});

export const registrasiNoBPJSGet = (nobpjs) => ({
    type: REGISTRASI_NO_BPJS_GET,
    payload: {nobpjs: nobpjs},
});

export const registrasiNoBPJSGetSuccess = (data) => ({
    type: REGISTRASI_NO_BPJS_GET_SUCCESS,
    payload: data,
});

export const registrasiNoBPJSGetError = (error) => ({
    type: REGISTRASI_NO_BPJS_GET_ERROR,
    payload: error,
});

export const registrasiSavePenjaminFK = (data, callback) => ({
    type: REGISTRASI_SAVE_PENJAMIN_FK,
    payload: { data, callback },
});

export const registrasiSavePenjaminFKSuccess = (data) => ({
    type: REGISTRASI_SAVE_PENJAMIN_FK_SUCCESS,
    payload: data,
});

export const registrasiSavePenjaminFKError = (error) => ({
    type: REGISTRASI_SAVE_PENJAMIN_FK_ERROR,
    payload: error,
});
