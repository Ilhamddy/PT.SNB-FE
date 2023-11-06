import {
    OBAT_GUDANG_SAVE,
    OBAT_GUDANG_SAVE_SUCCESS,
    OBAT_GUDANG_SAVE_ERROR,
    LAIN_LAIN_GET,
    LAIN_LAIN_GET_SUCCESS,
    LAIN_LAIN_GET_ERROR,
    DETAIL_PRODUK_SAVE_OR_UPDATE,
    DETAIL_PRODUK_SAVE_OR_UPDATE_SUCCESS,
    DETAIL_PRODUK_SAVE_OR_UPDATE_ERROR,
    SEDIAAN_SAVE_OR_UPDATE,
    SEDIAAN_SAVE_OR_UPDATE_SUCCESS,
    SEDIAAN_SAVE_OR_UPDATE_ERROR,
    SATUAN_SAVE_OR_UPDATE,
    SATUAN_SAVE_OR_UPDATE_SUCCESS,
    SATUAN_SAVE_OR_UPDATE_ERROR,
    KONVERSI_PRODUK_QUERY_GET,
    KONVERSI_PRODUK_QUERY_GET_SUCCESS,
    KONVERSI_PRODUK_QUERY_GET_ERROR,
    KONVERSI_KEMASAN_QUERY_GET,
    KONVERSI_KEMASAN_QUERY_GET_SUCCESS,
    KONVERSI_KEMASAN_QUERY_GET_ERROR,
    KEMASAN_SAVE_OR_UPDATE,
    KEMASAN_SAVE_OR_UPDATE_SUCCESS,
    KEMASAN_SAVE_OR_UPDATE_ERROR,
    PRODUK_MASTER_GET,
    PRODUK_MASTER_GET_SUCCESS,
    PRODUK_MASTER_GET_ERROR,
    PRODUK_EDIT_GET,
    PRODUK_EDIT_GET_SUCCESS,
    PRODUK_EDIT_GET_ERROR,
    KEMASAN_FROM_PRODUK_GET,
    KEMASAN_FROM_PRODUK_GET_SUCCESS,
    KEMASAN_FROM_PRODUK_GET_ERROR,
    PENERIMAAN_SAVE_OR_UPDATE,
    PENERIMAAN_SAVE_OR_UPDATE_SUCCESS,
    PENERIMAAN_SAVE_OR_UPDATE_ERROR,
    PENERIMAAN_QUERY_GET,
    PENERIMAAN_QUERY_GET_SUCCESS,
    PENERIMAAN_QUERY_GET_ERROR,
    PENERIMAAN_LIST_QUERY_GET,
    PENERIMAAN_LIST_QUERY_GET_SUCCESS,
    PENERIMAAN_LIST_QUERY_GET_ERROR,
    KARTU_STOK_QUERY_GET,
    KARTU_STOK_QUERY_GET_SUCCESS,
    KARTU_STOK_QUERY_GET_ERROR,
    GET_STOK_UNIT_GUDANG,
    GET_STOK_UNIT_GUDANG_SUCCESS,
    GET_STOK_UNIT_GUDANG_ERROR,
    CREATE_OR_UPDATE_STOK_OPNAME,
    CREATE_OR_UPDATE_STOK_OPNAME_SUCCESS,
    CREATE_OR_UPDATE_STOK_OPNAME_ERROR,
    GET_STOK_OPNAME,
    GET_STOK_OPNAME_SUCCESS,
    GET_STOK_OPNAME_ERROR,
    GET_STOK_OPNAME_DETAIL,
    GET_STOK_OPNAME_DETAIL_SUCCESS,
    GET_STOK_OPNAME_DETAIL_ERROR,
    UPDATE_STOK_OPNAME_DETAILS,
    UPDATE_STOK_OPNAME_DETAILS_SUCCESS,
    UPDATE_STOK_OPNAME_DETAILS_ERROR,
    CREATE_OR_UPDATE_PEMESANAN,
    CREATE_OR_UPDATE_PEMESANAN_SUCCESS,
    CREATE_OR_UPDATE_PEMESANAN_ERROR,
    GET_PEMESANAN,
    GET_PEMESANAN_SUCCESS,
    GET_PEMESANAN_ERROR,
    GET_LIST_PEMESANAN,
    GET_LIST_PEMESANAN_SUCCESS,
    GET_LIST_PEMESANAN_ERROR,
    GET_UNIT_USER,
    GET_UNIT_USER_SUCCESS,
    GET_UNIT_USER_ERROR
} from "./actionType";



export const obatGudangSave = (data,) => ({
    type: OBAT_GUDANG_SAVE,
    payload: { data: data },
});

export const obatGudangSaveSuccess = (data) => ({
    type: OBAT_GUDANG_SAVE_SUCCESS,
    payload: { data: data },
});

export const obatGudangSaveError = (data) => ({
    type: OBAT_GUDANG_SAVE_ERROR,
    payload: { data },
});

export const lainLainGet = () => ({
    type: LAIN_LAIN_GET,
})

export const lainLainGetSuccess = (data) => ({
    type: LAIN_LAIN_GET_SUCCESS,
    payload: { data: data },
})

export const lainLainGetError = (data) => ({
    type: LAIN_LAIN_GET_ERROR,
    payload: { data: data },
})

export const detailProdukSaveOrUpdate = (data, callback) => ({
    type: DETAIL_PRODUK_SAVE_OR_UPDATE,
    payload: { data: data, callback: callback },
})

export const detailProdukSaveOrUpdateSuccess = (data) => ({
    type: DETAIL_PRODUK_SAVE_OR_UPDATE_SUCCESS,
    payload: { data: data },
})

export const detailProdukSaveOrUpdateError = (data) => ({
    type: DETAIL_PRODUK_SAVE_OR_UPDATE_ERROR,
    payload: { data: data },
})

export const sediaanSaveOrUpdate = (data, callback) => ({
    type: SEDIAAN_SAVE_OR_UPDATE,
    payload: { data: data, callback: callback },
})

export const sediaanSaveOrUpdateSuccess = (data) => ({
    type: SEDIAAN_SAVE_OR_UPDATE_SUCCESS,
    payload: { data: data },
})

export const sediaanSaveOrUpdateError = (data) => ({
    type: SEDIAAN_SAVE_OR_UPDATE_ERROR,
    payload: { data: data },
})

export const satuanSaveOrUpdate = (data, callback) => ({
    type: SATUAN_SAVE_OR_UPDATE,
    payload: { data: data, callback: callback },
})

export const satuanSaveOrUpdateSuccess = (data) => ({
    type: SATUAN_SAVE_OR_UPDATE_SUCCESS,
    payload: { data: data },
})

export const satuanSaveOrUpdateError = (data) => ({
    type: SATUAN_SAVE_OR_UPDATE_ERROR,
    payload: { data: data },
})

export const konversiProdukQueryGet = (queries) => ({
    type: KONVERSI_PRODUK_QUERY_GET,
    payload: { queries: queries },
})

export const konversiProdukQueryGetSuccess = (data) => ({
    type: KONVERSI_PRODUK_QUERY_GET_SUCCESS,
    payload: { data: data },
})

export const konversiProdukQueryGetError = (data) => ({
    type: KONVERSI_PRODUK_QUERY_GET_ERROR,
    payload: { data: data },
})

export const konversiKemasanQueryGet = (queries) => ({
    type: KONVERSI_KEMASAN_QUERY_GET,
    payload: { queries: queries },
})

export const konversiKemasanQueryGetSuccess = (data) => ({
    type: KONVERSI_KEMASAN_QUERY_GET_SUCCESS,
    payload: { data: data },
})

export const konversiKemasanQueryGetError = (data) => ({
    type: KONVERSI_KEMASAN_QUERY_GET_ERROR,
    payload: { data: data },
})

export const kemasanSaveOrUpdate = (data, callback) => ({
    type: KEMASAN_SAVE_OR_UPDATE,
    payload: { data: data, callback: callback },
})

export const kemasanSaveOrUpdateSuccess = (data) => ({
    type: KEMASAN_SAVE_OR_UPDATE_SUCCESS,
    payload: { data: data },
})

export const kemasanSaveOrUpdateError = (data) => ({
    type: KEMASAN_SAVE_OR_UPDATE_ERROR,
    payload: { data: data },
})

export const produkMasterGet = (queries) => ({
    type: PRODUK_MASTER_GET,
    payload: { queries: queries },
})

export const produkMasterGetSuccess = (data) => ({
    type: PRODUK_MASTER_GET_SUCCESS,
    payload: { data: data },
})

export const produkMasterGetError = (data) => ({
    type: PRODUK_MASTER_GET_ERROR,
    payload: { data: data },
})

export const produkEditGet = (queries) => ({
    type: PRODUK_EDIT_GET,
    payload: { queries: queries },
})

export const produkEditGetSuccess = (data) => ({
    type: PRODUK_EDIT_GET_SUCCESS,
    payload: { data: data },
})

export const produkEditGetError = (data) => ({
    type: PRODUK_EDIT_GET_ERROR,
    payload: { data: data },
})

export const kemasanFromProdukGet = (queries, callback) => ({
    type: KEMASAN_FROM_PRODUK_GET,
    payload: { queries: queries, callback: callback },
})

export const kemasanFromProdukGetSuccess = (data) => ({
    type: KEMASAN_FROM_PRODUK_GET_SUCCESS,
    payload: { data: data },
})

export const kemasanFromProdukGetError = (data) => ({
    type: KEMASAN_FROM_PRODUK_GET_ERROR,
    payload: { data: data },
})

export const penerimaanSaveOrUpdate = (data, callback) => ({
    type: PENERIMAAN_SAVE_OR_UPDATE,
    payload: { data: data, callback: callback },
})

export const penerimaanSaveOrUpdateSuccess = (data) => ({
    type: PENERIMAAN_SAVE_OR_UPDATE_SUCCESS,
    payload: { data: data },
})

export const penerimaanSaveOrUpdateError = (data) => ({
    type: PENERIMAAN_SAVE_OR_UPDATE_ERROR,
    payload: { data: data },
})

export const penerimaanQueryGet = (queries) => ({
    type: PENERIMAAN_QUERY_GET,
    payload: { queries: queries },
})

export const penerimaanQueryGetSuccess = (data) => ({
    type: PENERIMAAN_QUERY_GET_SUCCESS,
    payload: { data: data },
})

export const penerimaanQueryGetError = (data) => ({
    type: PENERIMAAN_QUERY_GET_ERROR,
    payload: { data: data },
})

export const penerimaanListQueryGet = (queries) => ({
    type: PENERIMAAN_LIST_QUERY_GET,
    payload: { queries: queries },
})

export const penerimaanListQueryGetSuccess = (data) => ({
    type: PENERIMAAN_LIST_QUERY_GET_SUCCESS,
    payload: { data: data },
})

export const penerimaanListQueryGetError = (data) => ({
    type: PENERIMAAN_LIST_QUERY_GET_ERROR,
    payload: { data: data },
})

export const kartuStokQueryGet = (queries) => ({
    type: KARTU_STOK_QUERY_GET,
    payload: { queries: queries },
})

export const kartuStokQueryGetSuccess = (data) => ({
    type: KARTU_STOK_QUERY_GET_SUCCESS,
    payload: { data: data },
})

export const kartuStokQueryGetError = (data) => ({
    type: KARTU_STOK_QUERY_GET_ERROR,
    payload: { data: data },
})

export const getStokUnitGudang = (queries) => ({
    type: GET_STOK_UNIT_GUDANG,
    payload: { queries: queries },
})

export const getStokUnitGudangSuccess = (data) => ({
    type: GET_STOK_UNIT_GUDANG_SUCCESS,
    payload: { data: data },
})

export const getStokUnitGudangError = (data) => ({
    type: GET_STOK_UNIT_GUDANG_ERROR,
    payload: { data: data },
})

export const createOrUpdateStokOpname = (data, callback) => ({
    type: CREATE_OR_UPDATE_STOK_OPNAME,
    payload: { data: data, callback: callback },
})

export const createOrUpdateStokOpnameSuccess = (data) => ({
    type: CREATE_OR_UPDATE_STOK_OPNAME_SUCCESS,
    payload: { data: data },
})

export const createOrUpdateStokOpnameError = (data) => ({
    type: CREATE_OR_UPDATE_STOK_OPNAME_ERROR,
    payload: { data: data },
})

export const getStokOpname = (queries) => ({
    type: GET_STOK_OPNAME,
    payload: { queries: queries },
})

export const getStokOpnameSuccess = (data) => ({
    type: GET_STOK_OPNAME_SUCCESS,
    payload: { data: data },
})

export const getStokOpnameError = (data) => ({
    type: GET_STOK_OPNAME_ERROR,
    payload: { data: data },
})

export const getStokOpnameDetail = (queries) => ({
    type: GET_STOK_OPNAME_DETAIL,
    payload: { queries: queries },
})

export const getStokOpnameDetailSuccess = (data) => ({
    type: GET_STOK_OPNAME_DETAIL_SUCCESS,
    payload: { data: data },
})

export const getStokOpnameDetailError = (data) => ({
    type: GET_STOK_OPNAME_DETAIL_ERROR,
    payload: { data: data },
})

export const updateStokOpnameDetails = (data, callback) => ({
    type: UPDATE_STOK_OPNAME_DETAILS,
    payload: { data: data, callback: callback },
})

export const updateStokOpnameDetailsSuccess = (data) => ({
    type: UPDATE_STOK_OPNAME_DETAILS_SUCCESS,
    payload: { data: data },
})

export const updateStokOpnameDetailsError = (data) => ({
    type: UPDATE_STOK_OPNAME_DETAILS_ERROR,
    payload: { data: data },
})

export const createOrUpdatePemesanan = (data, callback) => ({
    type: CREATE_OR_UPDATE_PEMESANAN,
    payload: { data: data, callback: callback },
})

export const createOrUpdatePemesananSuccess = (data) => ({
    type: CREATE_OR_UPDATE_PEMESANAN_SUCCESS,
    payload: { data: data },
})

export const createOrUpdatePemesananError = (data) => ({
    type: CREATE_OR_UPDATE_PEMESANAN_ERROR,
    payload: { data: data },
})

export const getPemesanan = (queries) => ({
    type: GET_PEMESANAN,
    payload: { queries: queries },
})

export const getPemesananSuccess = (data) => ({
    type: GET_PEMESANAN_SUCCESS,
    payload: { data: data },
})

export const getPemesananError = (data) => ({
    type: GET_PEMESANAN_ERROR,
    payload: { data: data },
})

export const getListPemesanan = (queries) => ({
    type: GET_LIST_PEMESANAN,
    payload: { queries: queries },
})

export const getListPemesananSuccess = (data) => ({
    type: GET_LIST_PEMESANAN_SUCCESS,
    payload: { data: data },
})

export const getListPemesananError = (data) => ({
    type: GET_LIST_PEMESANAN_ERROR,
    payload: { data: data },
})

export const getUnitUser = (queries) => ({
    type: GET_UNIT_USER,
    payload: { queries: queries }
})

export const getUnitUserSuccess = (data) => ({
    type: GET_UNIT_USER_SUCCESS,
    payload: { data: data }
})

export const getUnitUserError = (data) => ({
    type: GET_UNIT_USER_ERROR,
    payload: { data: data }
})

