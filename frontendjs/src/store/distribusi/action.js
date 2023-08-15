import {
    GET_STOK_BATCH,
    GET_STOK_BATCH_SUCCESS,
    GET_STOK_BATCH_ERROR
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