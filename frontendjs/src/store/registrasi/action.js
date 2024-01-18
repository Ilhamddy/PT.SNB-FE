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
    PASIEN_FORM_QUERIES_GET,
    PASIEN_FORM_QUERIES_GET_SUCCESS,
    PASIEN_FORM_QUERIES_GET_ERROR,
    SAVE_BATAL_REGISTRASI,
    SAVE_BATAL_REGISTRASI_SUCCESS,
    SAVE_BATAL_REGISTRASI_ERROR,
    SAVE_REGISTRASI_MUTASI,
    SAVE_REGISTRASI_MUTASI_SUCCESS,
    SAVE_REGISTRASI_MUTASI_ERROR,
    GET_HISTORY_REGISTRASI,GET_HISTORY_REGISTRASI_SUCCESS,GET_HISTORY_REGISTRASI_ERROR,
    SAVE_MERGE_NOREGISTRASI,SAVE_MERGE_NOREGISTRASI_SUCCESS,SAVE_MERGE_NOREGISTRASI_ERROR,
    GET_NO_REGISTRASI_PASIEN,
    GET_NO_REGISTRASI_PASIEN_SUCCESS,
    GET_NO_REGISTRASI_PASIEN_ERROR,
    SAVE_REGISTRASI_BAYI,SAVE_REGISTRASI_BAYI_SUCCESS,SAVE_REGISTRASI_BAYI_ERROR
} from "./actionType";

export const registrasiResetForm = () => ({
    type: REGISTRASI_RESET_FORM,
});

// common success
export const registrasiSave = (data, callback) => ({
    type: REGISTRASI_SAVE,
    payload: { data, callback },
});
// common error
export const registrasiSaveSuccess = (data, history,norectriage) => ({
    type: REGISTRASI_SAVE_SUCCESS,
    payload: { data, history,norectriage},
});

export const registrasiSaveError = (error) => ({
    type: REGISTRASI_SAVE_ERROR,
    payload: error,
});


export const registrasiGetList = (queries) => ({
    type: REGISTRASI_LIST_GET,
    payload: { queries },
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
export const registrasiSaveRuangan = (data, callback) => ({
    type: REGISTRASI_SAVE_RUANGAN,
    payload: { data, callback },
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

export const pasienFormQueriesGet = (queries) => ({
    type: PASIEN_FORM_QUERIES_GET,
    payload: {queries},
});

export const pasienFormQueriesGetSuccess = (data) => ({
    type: PASIEN_FORM_QUERIES_GET_SUCCESS,
    payload: data,
});

export const pasienFormQueriesGetError = (error) => ({
    type: PASIEN_FORM_QUERIES_GET_ERROR,
    payload: error,
});

export const saveBatalRegistrasi = (data, callback) => ({
    type: SAVE_BATAL_REGISTRASI,
    payload: { data, callback },
});

export const saveBatalRegistrasiSuccess = (data) => ({
    type: SAVE_BATAL_REGISTRASI_SUCCESS,
    payload: data,
});

export const saveBatalRegistrasiError = (error) => ({
    type: SAVE_BATAL_REGISTRASI_ERROR,
    payload: error,
});

export const saveRegistrasiMutasi = (data, history) => ({
    type: SAVE_REGISTRASI_MUTASI,
    payload: { data, history },
});
// common error
export const saveRegistrasiMutasiSuccess = (data, history) => ({
    type: SAVE_REGISTRASI_MUTASI_SUCCESS,
    payload: { data, history},
});

export const saveRegistrasiMutasiError = (error) => ({
    type: SAVE_REGISTRASI_MUTASI_ERROR,
    payload: error,
});

export const getHistoryRegistrasi = (data, callback) => ({
    type: GET_HISTORY_REGISTRASI,
    payload: {
        data,
        callback
    },
});

export const getHistoryRegistrasiSuccess = (data) => ({
    type: GET_HISTORY_REGISTRASI_SUCCESS,
    payload: data,
});

export const getHistoryRegistrasiError = (error) => ({
    type: GET_HISTORY_REGISTRASI_ERROR,
    payload: error,
});

export const saveMergeNoRegistrasi = (data, callback) => ({
    type: SAVE_MERGE_NOREGISTRASI,
    payload: {
        data: data,
        callback: callback
    }
});

export const saveMergeNoRegistrasiSuccess = (data) => ({
    type: SAVE_MERGE_NOREGISTRASI_SUCCESS,
    payload: data
});

export const saveMergeNoRegistrasiError = (error) => ({
    type: SAVE_MERGE_NOREGISTRASI_ERROR,
    payload: error
});

export const getNoRegistrasiPasien = (queries) => ({
    type: GET_NO_REGISTRASI_PASIEN,
    payload: { queries }
});

export const getNoRegistrasiPasienSuccess = (data) => ({
    type: GET_NO_REGISTRASI_PASIEN_SUCCESS,
    payload: data
});

export const getNoRegistrasiPasienError = (error) => ({
    type: GET_NO_REGISTRASI_PASIEN_ERROR,
    payload: error
});

export const saveRegistrasiBayi = (data, callback) => ({
    type: SAVE_REGISTRASI_BAYI,
    payload: {
        data,
        callback
    },
});

export const saveRegistrasiBayiSuccess = (data) => ({
    type: SAVE_REGISTRASI_BAYI_SUCCESS,
    payload: data,
});

export const saveRegistrasiBayiError = (error) => ({
    type: SAVE_REGISTRASI_BAYI_ERROR,
    payload: error,
});