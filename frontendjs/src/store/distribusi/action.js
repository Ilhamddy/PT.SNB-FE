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
    VERIFY_KIRIM,
    VERIFY_KIRIM_SUCCESS,
    VERIFY_KIRIM_ERROR,
    TOLAK_ORDER,
    TOLAK_ORDER_SUCCESS,
    TOLAK_ORDER_ERROR,
    TOLAK_KIRIM,
    TOLAK_KIRIM_SUCCESS,
    TOLAK_KIRIM_ERROR
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

export const createOrUpdateOrderbarang = (body, callback) => ({
    type: CREATE_OR_UPDATE_ORDER_BARANG,
    payload: {body: body, callback: callback}
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

export const createOrUpdateKirimBarang = (body, callback) => ({
    type: CREATE_OR_UPDATE_KIRIM_BARANG,
    payload: {body: body, callback: callback}
})

export const createOrUpdateKirimBarangSuccess = (data) => ({
    type: CREATE_OR_UPDATE_KIRIM_BARANG_SUCCESS,
    payload: data
})

export const createOrUpdateKirimBarangError = (error) => ({
    type: CREATE_OR_UPDATE_KIRIM_BARANG_ERROR,
    payload: error
})

export const verifyKirim = (data, callback) => ({
    type: VERIFY_KIRIM,
    payload: {
        data: data, 
        callback: callback
    }
})

export const verifyKirimSuccess = (data) => ({
    type: VERIFY_KIRIM_SUCCESS,
    payload: data
})

export const verifyKirimError = (error) => ({
    type: VERIFY_KIRIM_ERROR,
    payload: error
})

export const tolakOrder = (data, callback) => ({
    type: TOLAK_ORDER,
    payload: {
        data: data, 
        callback: callback
    }
})

export const tolakOrderSuccess = (data) => ({
    type: TOLAK_ORDER_SUCCESS,
    payload: data
})

export const tolakOrderError = (error) => ({
    type: TOLAK_ORDER_ERROR,
    payload: error
})

export const tolakKirim = (data, callback) => ({
    type: TOLAK_KIRIM,
    payload: {
        data: data, 
        callback: callback
    }
})

export const tolakKirimSuccess = (data) => ({
    type: TOLAK_KIRIM_SUCCESS,
    payload: data
})

export const tolakKirimError = (error) => ({
    type: TOLAK_KIRIM_ERROR,
    payload: error
})