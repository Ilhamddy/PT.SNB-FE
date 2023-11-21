import {
    GET_COMBO_TAMBAH_LAYANAN,
    GET_COMBO_TAMBAH_LAYANAN_SUCCESS,
    GET_COMBO_TAMBAH_LAYANAN_ERROR,
    UPSERT_LAYANAN,
    UPSERT_LAYANAN_SUCCESS,
    UPSERT_LAYANAN_ERROR,
    GET_LAYANAN,
    GET_LAYANAN_SUCCESS,
    GET_LAYANAN_ERROR,
    GET_COMBO_MAP_RUANG_PELAYANAN,
    GET_COMBO_MAP_RUANG_PELAYANAN_SUCCESS,
    GET_COMBO_MAP_RUANG_PELAYANAN_ERROR,
    GET_MAP_UNIT_TO_PRODUK,
    GET_MAP_UNIT_TO_PRODUK_SUCCESS,
    GET_MAP_UNIT_TO_PRODUK_ERROR,
    GET_LAYANAN_MAPPING,
    GET_LAYANAN_MAPPING_SUCCESS,
    GET_LAYANAN_MAPPING_ERROR,
    SAVE_OR_DELETE_MAPPING,
    SAVE_OR_DELETE_MAPPING_SUCCESS,
    SAVE_OR_DELETE_MAPPING_ERROR
} from "./actionType";


export const getComboTambahLayanan = (queries) => ({
    type: GET_COMBO_TAMBAH_LAYANAN,
    payload: {
        queries
    },
});

export const getComboTambahLayananSuccess = (data) => ({
    type: GET_COMBO_TAMBAH_LAYANAN_SUCCESS,
    payload: data,
});

export const getComboTambahLayananError = (error) => ({
    type: GET_COMBO_TAMBAH_LAYANAN_ERROR,
    payload: error
});

export const upsertLayanan = (data, callback) => ({
    type: UPSERT_LAYANAN,
    payload: {
        data,
        callback
    },
});

export const upsertLayananSuccess = (data) => ({
    type: UPSERT_LAYANAN_SUCCESS,
    payload: data,
});

export const upsertLayananError = (error) => ({
    type: UPSERT_LAYANAN_ERROR,
    payload: error
});

export const getLayanan = (queries) => ({
    type: GET_LAYANAN,
    payload: {
        queries
    },
});

export const getLayananSuccess = (data) => ({
    type: GET_LAYANAN_SUCCESS,
    payload: data,
});

export const getLayananError = (error) => ({
    type: GET_LAYANAN_ERROR,
    payload: error
});

export const getComboMapRuangPelayanan = (queries) => ({
    type: GET_COMBO_MAP_RUANG_PELAYANAN,
    payload: {
        queries
    },
});

export const getComboMapRuangPelayananSuccess = (data) => ({
    type: GET_COMBO_MAP_RUANG_PELAYANAN_SUCCESS,
    payload: data,
});

export const getComboMapRuangPelayananError = (error) => ({
    type: GET_COMBO_MAP_RUANG_PELAYANAN_ERROR,
    payload: error
});

export const getMapUnitToProduk = (queries) => ({
    type: GET_MAP_UNIT_TO_PRODUK,
    payload: {
        queries
    },
});

export const getMapUnitToProdukSuccess = (data) => ({
    type: GET_MAP_UNIT_TO_PRODUK_SUCCESS,
    payload: data,
});

export const getMapUnitToProdukError = (error) => ({
    type: GET_MAP_UNIT_TO_PRODUK_ERROR,
    payload: error
});

export const getLayananMapping = (queries) => ({
    type: GET_LAYANAN_MAPPING,
    payload: {
        queries
    },
});

export const getLayananMappingSuccess = (data) => ({
    type: GET_LAYANAN_MAPPING_SUCCESS,
    payload: data,
});

export const getLayananMappingError = (error) => ({
    type: GET_LAYANAN_MAPPING_ERROR,
    payload: error
});

export const saveOrDeleteMapping = ({idproduk, idunit, idmapping, callback}) => ({
    type: SAVE_OR_DELETE_MAPPING,
    payload: {
        data: {
            idproduk: idproduk || '',
            idunit: idunit || '',
            idmapping: idmapping || '',
        },
        callback: callback
    },
});

export const saveOrDeleteMappingSuccess = (data) => ({
    type: SAVE_OR_DELETE_MAPPING_SUCCESS,
    payload: data,
});

export const saveOrDeleteMappingError = (error) => ({
    type: SAVE_OR_DELETE_MAPPING_ERROR,
    payload: error
});