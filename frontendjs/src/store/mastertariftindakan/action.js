import {
    GET_TOTAL_HARGA_PRODUK,
    GET_TOTAL_HARGA_PRODUK_SUCCESS,
    GET_TOTAL_HARGA_PRODUK_ERROR,
    GET_COMBO_TARIF_TINDAKAN,
    GET_COMBO_TARIF_TINDAKAN_SUCCESS,
    GET_COMBO_TARIF_TINDAKAN_ERROR
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
