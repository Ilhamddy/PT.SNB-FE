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
    SATUAN_FROM_PRODUK_GET,
    SATUAN_FROM_PRODUK_GET_SUCCESS,
    SATUAN_FROM_PRODUK_GET_ERROR,
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

export const satuanFromProdukGet = (queries) => ({
    type: SATUAN_FROM_PRODUK_GET,
    payload: { queries: queries },
})

export const satuanFromProdukGetSuccess = (data) => ({
    type: SATUAN_FROM_PRODUK_GET_SUCCESS,
    payload: { data: data },
})

export const satuanFromProdukGetError = (data) => ({
    type: SATUAN_FROM_PRODUK_GET_ERROR,
    payload: { data: data },
})
