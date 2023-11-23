import {
    GET_TOTAL_HARGA_PRODUK,
    GET_TOTAL_HARGA_PRODUK_SUCCESS,
    GET_TOTAL_HARGA_PRODUK_ERROR,
    GET_COMBO_TARIF_TINDAKAN,
    GET_COMBO_TARIF_TINDAKAN_SUCCESS,
    GET_COMBO_TARIF_TINDAKAN_ERROR,
    UPSERT_TARIF_TINDAKAN,
    UPSERT_TARIF_TINDAKAN_SUCCESS,
    UPSERT_TARIF_TINDAKAN_ERROR,
    GET_TOTAL_TARIF,
    GET_TOTAL_TARIF_SUCCESS,
    GET_TOTAL_TARIF_ERROR
} from "./actionType";


export const getTotalHargaProduk = (queries) => ({
    type: GET_TOTAL_HARGA_PRODUK,
    payload: {
        queries
    },
});

export const getTotalHargaProdukSuccess = (data) => ({
    type: GET_TOTAL_HARGA_PRODUK_SUCCESS,
    payload: data,
});

export const getTotalHargaProdukError = (error) => ({
    type: GET_TOTAL_HARGA_PRODUK_ERROR,
    payload: error
});

export const getComboTarifTindakan = (queries) => ({
    type: GET_COMBO_TARIF_TINDAKAN,
    payload: {
        queries
    },
});

export const getComboTarifTindakanSuccess = (data) => ({
    type: GET_COMBO_TARIF_TINDAKAN_SUCCESS,
    payload: data,
});

export const getComboTarifTindakanError = (error) => ({
    type: GET_COMBO_TARIF_TINDAKAN_ERROR,
    payload: error
});

export const upsertTarifTindakan = (data, callback) => ({
    type: UPSERT_TARIF_TINDAKAN,
    payload: {
        data: data,
        callback: callback
    },
});

export const upsertTarifTindakanSuccess = (data) => ({
    type: UPSERT_TARIF_TINDAKAN_SUCCESS,
    payload: data,
});

export const upsertTarifTindakanError = (error) => ({
    type: UPSERT_TARIF_TINDAKAN_ERROR,
    payload: error
});

export const getTotalTarif = (queries) => ({
    type: GET_TOTAL_TARIF,
    payload: {
        queries
    },
});

export const getTotalTarifSuccess = (data) => ({
    type: GET_TOTAL_TARIF_SUCCESS,
    payload: data,
});

export const getTotalTarifError = (error) => ({
    type: GET_TOTAL_TARIF_ERROR,
    payload: error
});