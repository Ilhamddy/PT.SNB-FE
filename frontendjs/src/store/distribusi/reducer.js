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
    },
    getOrderBarang: {
        data: [],
        loading: false,
        error: null
    },
    getOrderStokBatch: {
        data: [],
        loading: false,
        error: null
    },
    createOrUpdateKirimBarang: {
        data: [],
        loading: false,
        error: null
    },
    verifyKirim: {
        data: [],
        loading: false,
        error: null,
    },
    tolakOrder: {
        data: [],
        loading: false,
        error: null,
    },
    tolakKirim: {
        data: [],
        loading: false,
        error: null,
    },
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

        case GET_ORDER_BARANG: {
            return {
                ...state,
                getOrderBarang: {
                    ...state.getOrderBarang,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }
        case GET_ORDER_BARANG_SUCCESS: {
            return {
                ...state,
                getOrderBarang: {
                    ...state.getOrderBarang,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }
        case GET_ORDER_BARANG_ERROR: {
            return {
                ...state,
                getOrderBarang: {
                    ...state.getOrderBarang,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_ORDER_STOK_BATCH: {
            return {
                ...state,
                getOrderStokBatch: {
                    ...state.getOrderStokBatch,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }
        case GET_ORDER_STOK_BATCH_SUCCESS: {
            return {
                ...state,
                getOrderStokBatch: {
                    ...state.getOrderStokBatch,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }
        case GET_ORDER_STOK_BATCH_ERROR: {
            return {
                ...state,
                getOrderStokBatch: {
                    ...state.getOrderStokBatch,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case CREATE_OR_UPDATE_KIRIM_BARANG: {
            return {
                ...state,
                createOrUpdateKirimBarang: {
                    ...state.createOrUpdateKirimBarang,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }
        case CREATE_OR_UPDATE_KIRIM_BARANG_SUCCESS: {
            return {
                ...state,
                createOrUpdateKirimBarang: {
                    ...state.createOrUpdateKirimBarang,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }
        case CREATE_OR_UPDATE_KIRIM_BARANG_ERROR: {
            return {
                ...state,
                createOrUpdateKirimBarang: {
                    ...state.createOrUpdateKirimBarang,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case VERIFY_KIRIM: {
            return {
                ...state,
                verifyKirim: {
                    ...state.verifyKirim,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case VERIFY_KIRIM_SUCCESS: {
            return {
                ...state,
                verifyKirim: {
                    ...state.verifyKirim,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case VERIFY_KIRIM_ERROR: {
            return {
                ...state,
                verifyKirim: {
                    ...state.verifyKirim,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case TOLAK_ORDER: {
            return {
                ...state,
                tolakOrder: {
                    ...state.tolakOrder,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case TOLAK_ORDER_SUCCESS: {
            return {
                ...state,
                tolakOrder: {
                    ...state.tolakOrder,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case TOLAK_ORDER_ERROR: {
            return {
                ...state,
                tolakOrder: {
                    ...state.tolakOrder,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case TOLAK_KIRIM: {
            return {
                ...state,
                tolakKirim: {
                    ...state.tolakKirim,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case TOLAK_KIRIM_SUCCESS: {
            return {
                ...state,
                tolakKirim: {
                    ...state.tolakKirim,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case TOLAK_KIRIM_ERROR: {
            return {
                ...state,
                tolakKirim: {
                    ...state.tolakKirim,
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