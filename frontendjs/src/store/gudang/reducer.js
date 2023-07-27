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
    SEDIAAN_SAVE_OR_UPDATE,
    SEDIAAN_SAVE_OR_UPDATE_SUCCESS,
    SEDIAAN_SAVE_OR_UPDATE_ERROR,
    SATUAN_SAVE_OR_UPDATE,
    SATUAN_SAVE_OR_UPDATE_SUCCESS,
    SATUAN_SAVE_OR_UPDATE_ERROR,
    KONVERSI_QUERY_GET,
    KONVERSI_QUERY_GET_SUCCESS,
    KONVERSI_QUERY_GET_ERROR,
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
    },
    sediaanSaveOrUpdate: {
        data: [],
        loading: false,
        error: null,
    },
    satuanSaveOrUpdate: {
        data: [],
        loading: false,
        error: null,
    },
    konversiQueryGet: {
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

        case SEDIAAN_SAVE_OR_UPDATE: {
            return {
                ...state,
                sediaanSaveOrUpdate: {
                    ...state.sediaanSaveOrUpdate,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case SEDIAAN_SAVE_OR_UPDATE_SUCCESS: {
            return {
                ...state,
                sediaanSaveOrUpdate: {
                    ...state.sediaanSaveOrUpdate,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case SEDIAAN_SAVE_OR_UPDATE_ERROR: {
            return {
                ...state,
                sediaanSaveOrUpdate: {
                    ...state.sediaanSaveOrUpdate,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }


        case SATUAN_SAVE_OR_UPDATE: {
            return {
                ...state,
                satuanSaveOrUpdate: {
                    ...state.satuanSaveOrUpdate,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case SATUAN_SAVE_OR_UPDATE_SUCCESS: {
            return {
                ...state,
                satuanSaveOrUpdate: {
                    ...state.satuanSaveOrUpdate,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case SATUAN_SAVE_OR_UPDATE_ERROR: {
            return {
                ...state,
                satuanSaveOrUpdate: {
                    ...state.satuanSaveOrUpdate,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case KONVERSI_QUERY_GET: {
            return {
                ...state,
                konversiQueryGet: {
                    ...state.konversiQueryGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case KONVERSI_QUERY_GET_SUCCESS: {
            return {
                ...state,
                konversiQueryGet: {
                    ...state.konversiQueryGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case KONVERSI_QUERY_GET_ERROR: {
            return {
                ...state,
                konversiQueryGet: {
                    ...state.konversiQueryGet,
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