import {
    MASTER_GET,
    MASTER_GET_SUCCESS,
    MASTER_GET_ERROR,
    DESA_GET,
    DESA_GET_SUCCESS,
    DESA_GET_ERROR,
    KECAMATAN_GET,
    KECAMATAN_GET_SUCCESS,
    KECAMATAN_GET_ERROR,
    COMBO_REGISTRASI_GET,
    COMBO_REGISTRASI_GET_SUCCESS,
    COMBO_REGISTRASI_GET_ERROR,
    COMBO_ASURANSI_GET,
    COMBO_ASURANSI_GET_SUCCESS,
    COMBO_ASURANSI_GET_ERROR,
    PROVINSI_GET_BPJS,
    PROVINSI_GET_BPJS_SUCCESS,
    PROVINSI_GET_BPJS_ERROR,
    KABUPATEN_GET_BPJS,
    KABUPATEN_GET_BPJS_SUCCESS,
    KABUPATEN_GET_BPJS_ERROR,
    KECAMATAN_GET_BPJS,
    KECAMATAN_GET_BPJS_SUCCESS,
    KECAMATAN_GET_BPJS_ERROR,
    COMBO_PULANG_GET,
    COMBO_PULANG_GET_SUCCESS,
    COMBO_PULANG_GET_ERROR,
    COMBO_PAYMENT_GET,
    COMBO_PAYMENT_GET_SUCCESS,
    COMBO_PAYMENT_GET_ERROR,
    COMBO_SETTING_PRODUK_GET,
    COMBO_SETTING_PRODUK_GET_SUCCESS,
    COMBO_SETTING_PRODUK_GET_ERROR,
    COMBO_PENERIMAAN_BARANG_GET,
    COMBO_PENERIMAAN_BARANG_GET_SUCCESS,
    COMBO_PENERIMAAN_BARANG_GET_ERROR,
    COMBO_DISTRIBUSI_ORDER_GET,
    COMBO_DISTRIBUSI_ORDER_GET_SUCCESS,
    COMBO_DISTRIBUSI_ORDER_GET_ERROR,
    GET_COMBO_STOK_OPNAME,
    GET_COMBO_STOK_OPNAME_SUCCESS,
    GET_COMBO_STOK_OPNAME_ERROR,
    GET_COMBO_RESEP,
    GET_COMBO_RESEP_SUCCESS,
    GET_COMBO_RESEP_ERROR,
    GET_COMBO_VERIF_RESEP,
    GET_COMBO_VERIF_RESEP_SUCCESS,
    GET_COMBO_VERIF_RESEP_ERROR,
    GET_COMBO_PENJUALAN_BEBAS,
    GET_COMBO_PENJUALAN_BEBAS_SUCCESS,
    GET_COMBO_PENJUALAN_BEBAS_ERROR,
    GET_COMBO_RETUR_OBAT,
    GET_COMBO_RETUR_OBAT_SUCCESS,
    GET_COMBO_RETUR_OBAT_ERROR,
    GET_COMBO_MAPPING_PRODUK,
    GET_COMBO_MAPPING_PRODUK_SUCCESS,
    GET_COMBO_MAPPING_PRODUK_ERROR,
    GET_COMBO_VIEWER,
    GET_COMBO_VIEWER_SUCCESS,
    GET_COMBO_VIEWER_ERROR,
    GET_COMBO_RESEP_GLOBAL,
    GET_COMBO_RESEP_GLOBAL_SUCCESS,
    GET_COMBO_RESEP_GLOBAL_ERROR
} from "./actionType";

export const masterGet = () => ({
    type: MASTER_GET,
});

export const masterGetSuccess = (data) => ({
    type: MASTER_GET_SUCCESS,
    payload: data,
});

export const masterGetError = (error) => ({
    type: MASTER_GET_ERROR,
    payload: error,
});

export const desaGet = (desa) => ({
    type: DESA_GET,
    payload:{desa}
});

export const desaGetSuccess = (data) => ({
    type: DESA_GET_SUCCESS,
    payload: data,
});

export const desaGetError = (error) => ({
    type: DESA_GET_ERROR,
    payload: error,
});

export const kecamatanGet = () => ({
    type: KECAMATAN_GET
});

export const kecamatanGetSuccess = (data) => ({
    type: KECAMATAN_GET_SUCCESS,
    payload: data,
});

export const kecamatanGetError = (error) => ({
    type: KECAMATAN_GET_ERROR,
    payload: error,
});

export const comboRegistrasiGet = () => ({
    type: COMBO_REGISTRASI_GET
});

export const comboRegistrasiGetSuccess = (data) => ({
    type: COMBO_REGISTRASI_GET_SUCCESS,
    payload: data,
});

export const comboRegistrasiGetError = (error) => ({
    type: COMBO_REGISTRASI_GET_ERROR,
    payload: error,
});

export const comboAsuransiGet = () => ({
    type: COMBO_ASURANSI_GET,
});

export const comboAsuransiGetSuccess = (data) => ({
    type: COMBO_ASURANSI_GET_SUCCESS,
    payload: data,
});

export const comboAsuransiGetError = (error) => ({
    type: COMBO_ASURANSI_GET_ERROR,
    payload: error,
});

export const provinsiGetBpjs = () => ({
    type: PROVINSI_GET_BPJS,
});

export const provinsiGetBpjsSuccess = (data) => ({
    type: PROVINSI_GET_BPJS_SUCCESS,
    payload: data,
});

export const provinsiGetBpjsError = (error) => ({
    type: PROVINSI_GET_BPJS_ERROR,
    payload: error,
});

export const kabupatenGetBpjs = (provinsi) => ({
    type: KABUPATEN_GET_BPJS,
    payload: {provinsi}
});

export const kabupatenGetBpjsSuccess = (data) => ({
    type: KABUPATEN_GET_BPJS_SUCCESS,
    payload: data,
});

export const kabupatenGetBpjsError = (error) => ({
    type: KABUPATEN_GET_BPJS_ERROR,
    payload: error,
});

export const kecamatanGetBpjs = (kabupaten) => ({
    type: KECAMATAN_GET_BPJS,
    payload: {kabupaten}
});

export const kecamatanGetBpjsSuccess = (data) => ({
    type: KECAMATAN_GET_BPJS_SUCCESS,
    payload: data,
});

export const kecamatanGetBpjsError = (error) => ({
    type: KECAMATAN_GET_BPJS_ERROR,
    payload: error,
});

export const comboPulangGet = () => ({
    type: COMBO_PULANG_GET,
});

export const comboPulangGetSuccess = (data) => ({
    type: COMBO_PULANG_GET_SUCCESS,
    payload: data,
});

export const comboPulangGetError = (error) => ({
    type: COMBO_PULANG_GET_ERROR,
    payload: error,
});

export const comboPaymentGet = () => ({
    type: COMBO_PAYMENT_GET,
});

export const comboPaymentGetSuccess = (data) => ({
    type: COMBO_PAYMENT_GET_SUCCESS,
    payload: data,
});

export const comboPaymentGetError = (error) => ({
    type: COMBO_PAYMENT_GET_ERROR,
    payload: error,
});

export const comboSettingProdukGet = () => ({
    type: COMBO_SETTING_PRODUK_GET,
});

export const comboSettingProdukGetSuccess = (data) => ({
    type: COMBO_SETTING_PRODUK_GET_SUCCESS,
    payload: data,
});

export const comboSettingProdukGetError = (error) => ({
    type: COMBO_SETTING_PRODUK_GET_ERROR,
    payload: error,
});

export const comboPenerimaanBarangGet = (queries) => ({
    type: COMBO_PENERIMAAN_BARANG_GET,
    payload: {
        queries: queries
    },
});

export const comboPenerimaanBarangGetSuccess = (data) => ({
    type: COMBO_PENERIMAAN_BARANG_GET_SUCCESS,
    payload: data,
});

export const comboPenerimaanBarangGetError = (error) => ({
    type: COMBO_PENERIMAAN_BARANG_GET_ERROR,
    payload: error,
});

export const comboDistribusiOrderGet = () => ({
    type: COMBO_DISTRIBUSI_ORDER_GET,
});

export const comboDistribusiOrderGetSuccess = (data) => ({
    type: COMBO_DISTRIBUSI_ORDER_GET_SUCCESS,
    payload: data,
});

export const comboDistribusiOrderGetError = (error) => ({
    type: COMBO_DISTRIBUSI_ORDER_GET_ERROR,
    payload: error,
});

export const getComboStokOpname = () => ({
    type: GET_COMBO_STOK_OPNAME,
});

export const getComboStokOpnameSuccess = (data) => ({
    type: GET_COMBO_STOK_OPNAME_SUCCESS,
    payload: data,
});

export const getComboStokOpnameError = (error) => ({
    type: GET_COMBO_STOK_OPNAME_ERROR,
    payload: error,
});

export const getComboResep = () => ({
    type: GET_COMBO_RESEP,
});

export const getComboResepSuccess = (data) => ({
    type: GET_COMBO_RESEP_SUCCESS,
    payload: data,
});

export const getComboResepError = (error) => ({
    type: GET_COMBO_RESEP_ERROR,
    payload: error,
});

export const getComboVerifResep = () => ({
    type: GET_COMBO_VERIF_RESEP,
});

export const getComboVerifResepSuccess = (data) => ({
    type: GET_COMBO_VERIF_RESEP_SUCCESS,
    payload: data,
});

export const getComboVerifResepError = (error) => ({
    type: GET_COMBO_VERIF_RESEP_ERROR,
    payload: error,
});

export const getComboPenjualanBebas = () => ({
    type: GET_COMBO_PENJUALAN_BEBAS,
});

export const getComboPenjualanBebasSuccess = (data) => ({
    type: GET_COMBO_PENJUALAN_BEBAS_SUCCESS,
    payload: data,
});

export const getComboPenjualanBebasError = (error) => ({
    type: GET_COMBO_PENJUALAN_BEBAS_ERROR,
    payload: error,
});

export const getComboReturObat = () => ({
    type: GET_COMBO_RETUR_OBAT,
});

export const getComboReturObatSuccess = (data) => ({
    type: GET_COMBO_RETUR_OBAT_SUCCESS,
    payload: data,
});

export const getComboReturObatError = (error) => ({
    type: GET_COMBO_RETUR_OBAT_ERROR,
    payload: error,
});

export const getComboMappingProduk = () => ({
    type: GET_COMBO_MAPPING_PRODUK,
});

export const getComboMappingProdukSuccess = (data) => ({
    type: GET_COMBO_MAPPING_PRODUK_SUCCESS,
    payload: data,
});

export const getComboMappingProdukError = (error) => ({
    type: GET_COMBO_MAPPING_PRODUK_ERROR,
    payload: error,
});

export const getComboViewer = () => ({
    type: GET_COMBO_VIEWER,
});

export const getComboViewerSuccess = (data) => ({
    type: GET_COMBO_VIEWER_SUCCESS,
    payload: data,
});

export const getComboViewerError = (error) => ({
    type: GET_COMBO_VIEWER_ERROR,
    payload: error,
});


export const getComboResepGlobal = () => ({
    type: GET_COMBO_RESEP_GLOBAL,
});

export const getComboResepGlobalSuccess = (data) => ({
    type: GET_COMBO_RESEP_GLOBAL_SUCCESS,
    payload: data,
});

export const getComboResepGlobalError = (error) => ({
    type: GET_COMBO_RESEP_GLOBAL_ERROR,
    payload: error,
});
