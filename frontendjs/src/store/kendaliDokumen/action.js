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

