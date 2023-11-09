import {
    DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    KENDALIDOKUMEN_RESET_FORM,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    SAVE_DOKUMEN_REKAMMEDIS,
    SAVE_DOKUMEN_REKAMMEDIS_SUCCESS,
    SAVE_DOKUMEN_REKAMMEDIS_ERROR,
    COMBO_LAPORAN_REKAMMEDIS_GET,
    COMBO_LAPORAN_REKAMMEDIS_GET_SUCCESS,
    COMBO_LAPORAN_REKAMMEDIS_GET_ERROR,
    LIST_LAPORAN_PASIEN_DAFTAR_GET,
    LIST_LAPORAN_PASIEN_DAFTAR_GET_SUCCESS,
    LIST_LAPORAN_PASIEN_DAFTAR_GET_ERROR,
    LIST_LAPORAN_PASIEN_BATAL_GET,
    LIST_LAPORAN_PASIEN_BATAL_GET_SUCCESS,
    LIST_LAPORAN_PASIEN_BATAL_GET_ERROR,
    LIST_LAPORAN_PASIEN_KUNJUNGAN_GET,
    LIST_LAPORAN_PASIEN_KUNJUNGAN_GET_SUCCESS,
    LIST_LAPORAN_PASIEN_KUNJUNGAN_GET_ERROR,
    LAPORAN_RL_3_1_GET,
    LAPORAN_RL_3_1_GET_SUCCESS,
    LAPORAN_RL_3_1_GET_ERROR,
    LAPORAN_RL_3_2_GET,
    LAPORAN_RL_3_2_GET_SUCCESS,
    LAPORAN_RL_3_2_GET_ERROR,
    GET_DETAIL_JENIS_PRODUK,
    GET_DETAIL_JENIS_PRODUK_SUCCESS,
    GET_DETAIL_JENIS_PRODUK_ERROR,
    GET_LAYANAN_JENIS,
    GET_LAYANAN_JENIS_SUCCESS,
    GET_LAYANAN_JENIS_ERROR,
    CREATE_OR_UPDATE_MAP_RL,
    CREATE_OR_UPDATE_MAP_RL_SUCCESS,
    CREATE_OR_UPDATE_MAP_RL_ERROR,
    GET_MASTER_RL_FROM_INDUK,
    GET_MASTER_RL_FROM_INDUK_SUCCESS,
    GET_MASTER_RL_FROM_INDUK_ERROR,
    GET_LAYANAN_FROM_MASTER_RL,
    GET_LAYANAN_FROM_MASTER_RL_SUCCESS,
    GET_LAYANAN_FROM_MASTER_RL_ERROR,
    DELETE_MAP_RL,
    DELETE_MAP_RL_SUCCESS,
    DELETE_MAP_RL_ERROR,
    UPDATE_PRINTED,
    UPDATE_PRINTED_SUCCESS,
    UPDATE_PRINTED_ERROR,
    LAPORAN_RL_3_3_GET,LAPORAN_RL_3_3_GET_SUCCESS,LAPORAN_RL_3_3_GET_ERROR,
    LAPORAN_RL_3_6_GET,LAPORAN_RL_3_6_GET_SUCCESS,LAPORAN_RL_3_6_GET_ERROR,
    LAPORAN_RL_3_14_GET,LAPORAN_RL_3_14_GET_SUCCESS,LAPORAN_RL_3_14_GET_ERROR,
    LAPORAN_RL_3_15_GET,LAPORAN_RL_3_15_GET_SUCCESS,LAPORAN_RL_3_15_GET_ERROR,
    LAPORAN_RL_3_11_GET,LAPORAN_RL_3_11_GET_SUCCESS,LAPORAN_RL_3_11_GET_ERROR,
    LAPORAN_RL_3_10_GET,LAPORAN_RL_3_10_GET_SUCCESS,LAPORAN_RL_3_10_GET_ERROR
} from "./actionType";

export const kendaliDokumenResetForm = () => ({
    type: KENDALIDOKUMEN_RESET_FORM,
});

export const daftarDokumenRekammedisGet = (param) => ({
    type: DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    payload: { param },
});

export const daftarDokumenRekammedisGetSuccess = (data) => ({
    type: DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    payload: data,
});

export const daftarDokumenRekammedisGetError = (error) => ({
    type: DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    payload: error,
});

export const widgetdaftarDokumenRekammedisGet = (param) => ({
    type: WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    payload: { param },
});

export const widgetdaftarDokumenRekammedisGetSuccess = (data) => ({
    type: WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    payload: data,
});

export const widgetdaftarDokumenRekammedisGetError = (error) => ({
    type: WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    payload: error,
});

export const saveDokumenRekammedis = (data, history) => ({
    type: SAVE_DOKUMEN_REKAMMEDIS,
    payload: { data, history },
});

// common error
export const saveDokumenRekammedisSuccess = (data, history) => ({
    type: SAVE_DOKUMEN_REKAMMEDIS_SUCCESS,
    payload: { data, history },
});

export const saveDokumenRekammedisError = (error) => ({
    type: SAVE_DOKUMEN_REKAMMEDIS_ERROR,
    payload: error,
});

export const comboLaporanRekammedisGet = (param) => ({
    type: COMBO_LAPORAN_REKAMMEDIS_GET,
    payload: { param },
});

export const comboLaporanRekammedisGetSuccess = (data) => ({
    type: COMBO_LAPORAN_REKAMMEDIS_GET_SUCCESS,
    payload: data,
});

export const comboLaporanRekammedisGetError = (error) => ({
    type: COMBO_LAPORAN_REKAMMEDIS_GET_ERROR,
    payload: error,
});

export const listLaporanPasienDaftarGet = (param) => ({
    type: LIST_LAPORAN_PASIEN_DAFTAR_GET,
    payload: { param },
});

export const listLaporanPasienDaftarGetSuccess = (data) => ({
    type: LIST_LAPORAN_PASIEN_DAFTAR_GET_SUCCESS,
    payload: data,
});

export const listLaporanPasienDaftarGetError = (error) => ({
    type: LIST_LAPORAN_PASIEN_DAFTAR_GET_ERROR,
    payload: error,
});

export const listLaporanPasienBatalGet = (param) => ({
    type: LIST_LAPORAN_PASIEN_BATAL_GET,
    payload: { param },
});

export const listLaporanPasienBatalGetSuccess = (data) => ({
    type: LIST_LAPORAN_PASIEN_BATAL_GET_SUCCESS,
    payload: data,
});

export const listLaporanPasienBatalGetError = (error) => ({
    type: LIST_LAPORAN_PASIEN_BATAL_GET_ERROR,
    payload: error,
});

export const listLaporanPasienKunjunganGet = (param) => ({
    type: LIST_LAPORAN_PASIEN_KUNJUNGAN_GET,
    payload: { param },
});

export const listLaporanPasienKunjunganGetSuccess = (data) => ({
    type: LIST_LAPORAN_PASIEN_KUNJUNGAN_GET_SUCCESS,
    payload: data,
});

export const listLaporanPasienKunjunganGetError = (error) => ({
    type: LIST_LAPORAN_PASIEN_KUNJUNGAN_GET_ERROR,
    payload: error,
});

export const laporanRL_3_1_Get = (queries) => ({
    type: LAPORAN_RL_3_1_GET,
    payload: { queries },
});

export const laporanRL_3_1_GetSuccess = (data) => ({
    type: LAPORAN_RL_3_1_GET_SUCCESS,
    payload: data,
});

export const laporanRL_3_1_GetError = (error) => ({
    type: LAPORAN_RL_3_1_GET_ERROR,
    payload: error,
});

export const laporanRL_3_2_Get = (queries) => ({
    type: LAPORAN_RL_3_2_GET,
    payload: { queries },
});

export const laporanRL_3_2_GetSuccess = (data) => ({
    type: LAPORAN_RL_3_2_GET_SUCCESS,
    payload: data,
});

export const laporanRL_3_2_GetError = (error) => ({
    type: LAPORAN_RL_3_2_GET_ERROR,
    payload: error,
});

export const getDetailJenisProduk = (queries) => ({
    type: GET_DETAIL_JENIS_PRODUK,
    payload: { queries: queries },
});

export const getDetailJenisProdukSuccess = (data) => ({
    type: GET_DETAIL_JENIS_PRODUK_SUCCESS,
    payload: data,
});

export const getDetailJenisProdukError = (error) => ({
    type: GET_DETAIL_JENIS_PRODUK_ERROR,
    payload: error,
});

export const getLayananJenis = (queries) => ({
    type: GET_LAYANAN_JENIS,
    payload: { queries: queries },
});

export const getLayananJenisSuccess = (data) => ({
    type: GET_LAYANAN_JENIS_SUCCESS,
    payload: data,
});

export const getLayananJenisError = (error) => ({
    type: GET_LAYANAN_JENIS_ERROR,
    payload: error,
});

export const createOrUpdateMapRL = (data, callback) => ({
    type: CREATE_OR_UPDATE_MAP_RL,
    payload: { 
        data: data, 
        callback: callback 
    },
});

export const createOrUpdateMapRLSuccess = (data) => ({
    type: CREATE_OR_UPDATE_MAP_RL_SUCCESS,
    payload: data,
});

export const createOrUpdateMapRLError = (error) => ({
    type: CREATE_OR_UPDATE_MAP_RL_ERROR,
    payload: error,
});

export const getMasterRLFromInduk = (queries) => ({
    type: GET_MASTER_RL_FROM_INDUK,
    payload: { queries: queries },
});

export const getMasterRLFromIndukSuccess = (data) => ({
    type: GET_MASTER_RL_FROM_INDUK_SUCCESS,
    payload: data,
});

export const getMasterRLFromIndukError = (error) => ({
    type: GET_MASTER_RL_FROM_INDUK_ERROR,
    payload: error,
});

export const getLayananFromMasterRL = (queries) => ({
    type: GET_LAYANAN_FROM_MASTER_RL,
    payload: { queries: queries },
});

export const getLayananFromMasterRLSuccess = (data) => ({
    type: GET_LAYANAN_FROM_MASTER_RL_SUCCESS,
    payload: data,
});

export const getLayananFromMasterRLError = (error) => ({
    type: GET_LAYANAN_FROM_MASTER_RL_ERROR,
    payload: error,
});

export const deleteMapRL = (params, callback) => ({
    type: DELETE_MAP_RL,
    payload: {params, callback},
});

export const deleteMapRLSuccess = (data) => ({
    type: DELETE_MAP_RL_SUCCESS,
    payload: data,
});

export const deleteMapRLError = (error) => ({
    type: DELETE_MAP_RL_ERROR,
    payload: error,
});

export const updatePrinted = (data) => ({
    type: UPDATE_PRINTED,
    payload: { data     }
})

export const updatePrintedSuccess = (data) => ({
    type: UPDATE_PRINTED_SUCCESS,
    payload: data
})

export const updatePrintedError = (error) => ({
    type: UPDATE_PRINTED_ERROR,
    payload: error
})

export const getLaporanRl_3_3 = (queries) => ({
    type: LAPORAN_RL_3_3_GET,
    payload: {
        queries,
    },
});

export const getLaporanRl_3_3Success = (data) => ({
    type: LAPORAN_RL_3_3_GET_SUCCESS,
    payload: data,
});

export const getLaporanRl_3_3Error = (error) => ({
    type: LAPORAN_RL_3_3_GET_ERROR,
    payload: error,
});

export const getLaporanRl_3_6 = (queries) => ({
    type: LAPORAN_RL_3_6_GET,
    payload: {
        queries,
    },
});

export const getLaporanRl_3_6Success = (data) => ({
    type: LAPORAN_RL_3_6_GET_SUCCESS,
    payload: data,
});

export const getLaporanRl_3_6Error = (error) => ({
    type: LAPORAN_RL_3_6_GET_ERROR,
    payload: error,
});

export const getLaporanRl_3_14 = (queries) => ({
    type: LAPORAN_RL_3_14_GET,
    payload: {
        queries,
    },
});

export const getLaporanRl_3_14Success = (data) => ({
    type: LAPORAN_RL_3_14_GET_SUCCESS,
    payload: data,
});

export const getLaporanRl_3_14Error = (error) => ({
    type: LAPORAN_RL_3_14_GET_ERROR,
    payload: error,
});

export const getLaporanRl_3_15 = (queries) => ({
    type: LAPORAN_RL_3_15_GET,
    payload: {
        queries,
    },
});

export const getLaporanRl_3_15Success = (data) => ({
    type: LAPORAN_RL_3_15_GET_SUCCESS,
    payload: data,
});

export const getLaporanRl_3_15Error = (error) => ({
    type: LAPORAN_RL_3_15_GET_ERROR,
    payload: error,
});

export const getLaporanRl_3_11 = (queries) => ({
    type: LAPORAN_RL_3_11_GET,
    payload: {
        queries,
    },
});

export const getLaporanRl_3_11Success = (data) => ({
    type: LAPORAN_RL_3_11_GET_SUCCESS,
    payload: data,
});

export const getLaporanRl_3_11Error = (error) => ({
    type: LAPORAN_RL_3_11_GET_ERROR,
    payload: error,
});

export const getLaporanRl_3_10 = (queries) => ({
    type: LAPORAN_RL_3_10_GET,
    payload: {
        queries,
    },
});

export const getLaporanRl_3_10Success = (data) => ({
    type: LAPORAN_RL_3_10_GET_SUCCESS,
    payload: data,
});

export const getLaporanRl_3_10Error = (error) => ({
    type: LAPORAN_RL_3_10_GET_ERROR,
    payload: error,
});