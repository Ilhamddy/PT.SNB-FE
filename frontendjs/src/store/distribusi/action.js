import {
    GET_STOK_BATCH,
    GET_STOK_BATCH_SUCCESS,
    GET_STOK_BATCH_ERROR,
    CREATE_OR_UPDATE_ORDER_BARANG,
    CREATE_OR_UPDATE_ORDER_BARANG_SUCCESS,
    CREATE_OR_UPDATE_ORDER_BARANG_ERROR,
    GET_ORDER_BARANG,
    GET_ORDER_BARANG_SUCCESS,
    GET_ORDER_BARANG_ERROR,
    GET_ORDER_STOK_BATCH,
    GET_ORDER_STOK_BATCH_SUCCESS,
    GET_ORDER_STOK_BATCH_ERROR,
    CREATE_OR_UPDATE_KIRIM_BARANG,
    CREATE_OR_UPDATE_KIRIM_BARANG_SUCCESS,
    CREATE_OR_UPDATE_KIRIM_BARANG_ERROR,
} from "./actionType"


export const getStokBatch = (queries) => ({
    type: GET_STOK_BATCH,
    payload: {queries: queries}
})

export const getStokBatchSuccess = (data) => ({
    type: GET_STOK_BATCH_SUCCESS,
    payload: data
})

export const getStokBatchError = (error) => ({
    type: GET_STOK_BATCH_ERROR,
    payload: error
})

export const createOrUpdateOrderbarang = (body) => ({
    type: CREATE_OR_UPDATE_ORDER_BARANG,
    payload: {body: body}
})

export const createOrUpdateOrderbarangSuccess = (data) => ({
    type: CREATE_OR_UPDATE_ORDER_BARANG_SUCCESS,
    payload: data
})

export const createOrUpdateOrderbarangError = (error) => ({
    type: CREATE_OR_UPDATE_ORDER_BARANG_ERROR,
    payload: error
})

export const getOrderBarang = (queries) => ({
    type: GET_ORDER_BARANG,
    payload: {queries: queries}
})

export const getOrderBarangSuccess = (data) => ({
    type: GET_ORDER_BARANG_SUCCESS,
    payload: data
})

export const getOrderBarangError = (error) => ({
    type: GET_ORDER_BARANG_ERROR,
    payload: error
})

export const getOrderStokBatch = (queries) => ({
    type: GET_ORDER_STOK_BATCH,
    payload: {queries: queries}
})

export const getOrderStokBatchSuccess = (data) => ({
    type: GET_ORDER_STOK_BATCH_SUCCESS,
    payload: data
})

export const getOrderStokBatchError = (error) => ({
    type: GET_ORDER_STOK_BATCH_ERROR,
    payload: error
})

export const createOrUpdateKirimBarang = (body) => ({
    type: CREATE_OR_UPDATE_KIRIM_BARANG,
    payload: {body: body}
})

export const createOrUpdateKirimBarangSuccess = (data) => ({
    type: CREATE_OR_UPDATE_KIRIM_BARANG_SUCCESS,
    payload: data
})

export const createOrUpdateKirimBarangError = (error) => ({
    type: CREATE_OR_UPDATE_KIRIM_BARANG_ERROR,
    payload: error
})