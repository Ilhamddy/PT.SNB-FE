import {
    GET_STOK_BATCH,
    GET_STOK_BATCH_SUCCESS,
    GET_STOK_BATCH_ERROR,
  } from "./actionType";
  
const INIT_STATE = {
    getStokBatch: {
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
        default: {
            return { ...state };
        }
    }
}

export default Distribusi;