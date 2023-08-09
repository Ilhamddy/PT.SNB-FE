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
    KONVERSI_PRODUK_QUERY_GET,
    KONVERSI_PRODUK_QUERY_GET_SUCCESS,
    KONVERSI_PRODUK_QUERY_GET_ERROR,
    KONVERSI_KEMASAN_QUERY_GET,
    KONVERSI_KEMASAN_QUERY_GET_SUCCESS,
    KONVERSI_KEMASAN_QUERY_GET_ERROR,
    KEMASAN_SAVE_OR_UPDATE,
    KEMASAN_SAVE_OR_UPDATE_SUCCESS,
    KEMASAN_SAVE_OR_UPDATE_ERROR,
    PRODUK_MASTER_GET,
    PRODUK_MASTER_GET_SUCCESS,
    PRODUK_MASTER_GET_ERROR,
    PRODUK_EDIT_GET,
    PRODUK_EDIT_GET_SUCCESS,
    PRODUK_EDIT_GET_ERROR,
    SATUAN_FROM_PRODUK_GET,
    SATUAN_FROM_PRODUK_GET_SUCCESS,
    SATUAN_FROM_PRODUK_GET_ERROR,
    PENERIMAAN_SAVE_OR_UPDATE,
    PENERIMAAN_SAVE_OR_UPDATE_SUCCESS,
    PENERIMAAN_SAVE_OR_UPDATE_ERROR,
    PENERIMAAN_QUERY_GET,
    PENERIMAAN_QUERY_GET_SUCCESS,
    PENERIMAAN_QUERY_GET_ERROR,
    PENERIMAAN_LIST_QUERY_GET,
    PENERIMAAN_LIST_QUERY_GET_SUCCESS,
    PENERIMAAN_LIST_QUERY_GET_ERROR,
    KARTU_STOK_QUERY_GET,
    KARTU_STOK_QUERY_GET_SUCCESS,
    KARTU_STOK_QUERY_GET_ERROR,
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
    konversiProdukQueryGet: {
        data: [],
        loading: false,
        error: null,
    },
    konversiKemasanQueryGet: {
        data: [],
        loading: false,
        error: null,
    },
    kemasanSaveOrUpdate: {
        data: [],
        loading: false,
        error: null,
    },
    produkMasterGet: {
        data: [],
        loading: false,
        error: null,
    },
    produkEditGet: {
        data: [],
        loading: false,
        error: null,
    },
    satuanFromProdukGet: {
        data: [],
        loading: false,
        error: null,
    },
    penerimaanSaveOrUpdate: {
        data: [],
        loading: false,
        error: null,
    },
    penerimaanQueryGet: {
        data: [],
        loading: false,
        error: null,
    },
    penerimaanListQueryGet: {
        data: [],
        loading: false,
        error: null,
    },
    kartuStokQueryGet: {
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

        case KONVERSI_PRODUK_QUERY_GET: {
            return {
                ...state,
                konversiProdukQueryGet: {
                    ...state.konversiProdukQueryGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case KONVERSI_PRODUK_QUERY_GET_SUCCESS: {
            return {
                ...state,
                konversiProdukQueryGet: {
                    ...state.konversiProdukQueryGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case KONVERSI_PRODUK_QUERY_GET_ERROR: {
            return {
                ...state,
                konversiProdukQueryGet: {
                    ...state.konversiProdukQueryGet,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case KONVERSI_KEMASAN_QUERY_GET: {
            return {
                ...state,
                konversiKemasanQueryGet: {
                    ...state.konversiKemasanQueryGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case KONVERSI_KEMASAN_QUERY_GET_SUCCESS: {
            return {
                ...state,
                konversiKemasanQueryGet: {
                    ...state.konversiKemasanQueryGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case KONVERSI_KEMASAN_QUERY_GET_ERROR: {
            return {
                ...state,
                konversiKemasanQueryGet: {
                    ...state.konversiKemasanQueryGet,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case KEMASAN_SAVE_OR_UPDATE: {
            return {
                ...state,
                kemasanSaveOrUpdate: {
                    ...state.kemasanSaveOrUpdate,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case KEMASAN_SAVE_OR_UPDATE_SUCCESS: {
            return {
                ...state,
                kemasanSaveOrUpdate: {
                    ...state.kemasanSaveOrUpdate,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case KEMASAN_SAVE_OR_UPDATE_ERROR: {
            return {
                ...state,
                kemasanSaveOrUpdate: {
                    ...state.kemasanSaveOrUpdate,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case PRODUK_MASTER_GET: {
            return {
                ...state,
                produkMasterGet: {
                    ...state.produkMasterGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case PRODUK_MASTER_GET_SUCCESS: {
            return {
                ...state,
                produkMasterGet: {
                    ...state.produkMasterGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case PRODUK_MASTER_GET_ERROR: {
            return {
                ...state,
                produkMasterGet: {
                    ...state.produkMasterGet,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case PRODUK_EDIT_GET: {
            return {
                ...state,
                produkEditGet: {
                    ...state.produkEditGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case PRODUK_EDIT_GET_SUCCESS: {
            return {
                ...state,
                produkEditGet: {
                    ...state.produkEditGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case PRODUK_EDIT_GET_ERROR: {
            return {
                ...state,
                produkEditGet: {
                    ...state.produkEditGet,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case SATUAN_FROM_PRODUK_GET: {
            return {
                ...state,
                satuanFromProdukGet: {
                    ...state.satuanFromProdukGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case SATUAN_FROM_PRODUK_GET_SUCCESS: {
            return {
                ...state,
                satuanFromProdukGet: {
                    ...state.satuanFromProdukGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case SATUAN_FROM_PRODUK_GET_ERROR: {
            return {
                ...state,
                satuanFromProdukGet: {
                    ...state.satuanFromProdukGet,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case PENERIMAAN_SAVE_OR_UPDATE: {
            return {
                ...state,
                penerimaanSaveOrUpdate: {
                    ...state.penerimaanSaveOrUpdate,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case PENERIMAAN_SAVE_OR_UPDATE_SUCCESS: {
            return {
                ...state,
                penerimaanSaveOrUpdate: {
                    ...state.penerimaanSaveOrUpdate,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case PENERIMAAN_SAVE_OR_UPDATE_ERROR: {
            return {
                ...state,
                penerimaanSaveOrUpdate: {
                    ...state.penerimaanSaveOrUpdate,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }
        
        case PENERIMAAN_QUERY_GET: {
            return {
                ...state,
                penerimaanQueryGet: {
                    ...state.penerimaanQueryGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case PENERIMAAN_QUERY_GET_SUCCESS: {
            return {
                ...state,
                penerimaanQueryGet: {
                    ...state.penerimaanQueryGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case PENERIMAAN_QUERY_GET_ERROR: {
            return {
                ...state,
                penerimaanQueryGet: {
                    ...state.penerimaanQueryGet,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case PENERIMAAN_LIST_QUERY_GET: {
            return {
                ...state,
                penerimaanListQueryGet: {
                    ...state.penerimaanListQueryGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case PENERIMAAN_LIST_QUERY_GET_SUCCESS: {
            return {
                ...state,
                penerimaanListQueryGet: {
                    ...state.penerimaanListQueryGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case PENERIMAAN_LIST_QUERY_GET_ERROR: {
            return {
                ...state,
                penerimaanListQueryGet: {
                    ...state.penerimaanListQueryGet,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case KARTU_STOK_QUERY_GET: {
            return {
                ...state,
                kartuStokQueryGet: {
                    ...state.kartuStokQueryGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case KARTU_STOK_QUERY_GET_SUCCESS: {
            return {
                ...state,
                kartuStokQueryGet: {
                    ...state.kartuStokQueryGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case KARTU_STOK_QUERY_GET_ERROR: {
            return {
                ...state,
                kartuStokQueryGet: {
                    ...state.kartuStokQueryGet,
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