import {
    GET_STOK_BATCH,
    GET_STOK_BATCH_SUCCESS,
    GET_STOK_BATCH_ERROR,
    CREATE_OR_UPDATE_ORDER_BARANG,
    CREATE_OR_UPDATE_ORDER_BARANG_SUCCESS,
    CREATE_OR_UPDATE_ORDER_BARANG_ERROR
  } from "./actionType";
  
const INIT_STATE = {
    getStokBatch: {
        data: [],
        loading: false,
        error: null
    },
    createOrUpdateOrderbarang: {
        data: [],
        loading: false,
        error: null
    }
};
  
const Distribusi = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_STOK_BATCH: {
            return {
                ...state,
                getStokBatch: {
                    ...state.getStokBatch,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }
        case GET_STOK_BATCH_SUCCESS: {
            return {
                ...state,
                getStokBatch: {
                    ...state.getStokBatch,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }
        case GET_STOK_BATCH_ERROR: {
            return {
                ...state,
                getStokBatch: {
                    ...state.getStokBatch,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case CREATE_OR_UPDATE_ORDER_BARANG: {
            return {
                ...state,
                createOrUpdateOrderbarang: {
                    ...state.createOrUpdateOrderbarang,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }
        case CREATE_OR_UPDATE_ORDER_BARANG_SUCCESS: {
            return {
                ...state,
                createOrUpdateOrderbarang: {
                    ...state.createOrUpdateOrderbarang,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }
        case CREATE_OR_UPDATE_ORDER_BARANG_ERROR: {
            return {
                ...state,
                createOrUpdateOrderbarang: {
                    ...state.createOrUpdateOrderbarang,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        default: {
            return { ...state };
        }
    }
}

export default Distribusi;