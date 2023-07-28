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
    KONVERSI_QUERY_GET,
    KONVERSI_QUERY_GET_SUCCESS,
    KONVERSI_QUERY_GET_ERROR,
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

export const konversiQueryGet = (queries) => ({
    type: KONVERSI_QUERY_GET,
    payload: { queries: queries },
})

export const konversiQueryGetSuccess = (data) => ({
    type: KONVERSI_QUERY_GET_SUCCESS,
    payload: { data: data },
})

export const konversiQueryGetError = (data) => ({
    type: KONVERSI_QUERY_GET_ERROR,
    payload: { data: data },
})


