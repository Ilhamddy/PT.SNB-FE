import {
    GUDANG_RESET,
    OBAT_GUDANG_SAVE,
    OBAT_GUDANG_SAVE_SUCCESS,
    OBAT_GUDANG_SAVE_ERROR,
    LAIN_LAIN_GET,
    LAIN_LAIN_GET_SUCCESS,
    LAIN_LAIN_GET_ERROR,
    DETAIL_PRODUK_SAVE_OR_UPDATE,
    DETAIL_PRODUK_SAVE_OR_UPDATE_SUCCESS,
    DETAIL_PRODUK_SAVE_OR_UPDATE_ERROR,
} from "./actionType";

const INIT_STATE = {
    obatGudangSave: {
        data: [],
        loading: false,
        error: null,
    },
    lainLainGet: {
        data: [],
        loading: false,
        error: null,
    },
    detailProdukSaveOrUpdate: {
        data: [],
        loading: false,
        error: null,
    }
};

const Registrasi = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GUDANG_RESET: {
            return {
                ...state,
                obatGudangSave: {
                    ...INIT_STATE.obatGudangSave,
                }
            }
        }

        case OBAT_GUDANG_SAVE: {
            return {
                ...state,
                obatGudangSave: {
                    ...state.obatGudangSave,
                    loading: true
                }
            }
        }

        case OBAT_GUDANG_SAVE_SUCCESS: {
            return {
                ...state,
                obatGudangSave: {
                    ...state.obatGudangSave,
                    data: action.payload.data,
                    loading: false,
                    error: null
                }
            }
        }

        case OBAT_GUDANG_SAVE_ERROR: {
            return {
                ...state,
                obatGudangSave: {
                    ...state.obatGudangSave,
                    loading: false,
                    error: action.payload.data
                }
            }
        }

        case LAIN_LAIN_GET: {
            return {
                ...state,
                lainLainGet: {
                    ...state.lainLainGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case LAIN_LAIN_GET_SUCCESS: {
            return {
                ...state,
                lainLainGet: {
                    ...state.lainLainGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case LAIN_LAIN_GET_ERROR: {
            return {
                ...state,
                lainLainGet: {
                    ...state.lainLainGet,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case DETAIL_PRODUK_SAVE_OR_UPDATE: {
            return {
                ...state,
                detailProdukSaveOrUpdate: {
                    ...state.detailProdukSaveOrUpdate,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case DETAIL_PRODUK_SAVE_OR_UPDATE_SUCCESS: {
            return {
                ...state,
                detailProdukSaveOrUpdate: {
                    ...state.detailProdukSaveOrUpdate,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case DETAIL_PRODUK_SAVE_OR_UPDATE_ERROR: {
            return {
                ...state,
                detailProdukSaveOrUpdate: {
                    ...state.detailProdukSaveOrUpdate,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }


        default: {
            return { ...state };
        }
    }
};

export default Registrasi;