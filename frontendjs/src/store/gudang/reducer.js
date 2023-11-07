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
    KEMASAN_FROM_PRODUK_GET,
    KEMASAN_FROM_PRODUK_GET_SUCCESS,
    KEMASAN_FROM_PRODUK_GET_ERROR,
    PENERIMAAN_SAVE_OR_UPDATE,
    PENERIMAAN_SAVE_OR_UPDATE_SUCCESS,
    PENERIMAAN_SAVE_OR_UPDATE_ERROR,
    UPSERT_RETUR_BARANG,
    UPSERT_RETUR_BARANG_SUCCESS,
    UPSERT_RETUR_BARANG_ERROR,
    PENERIMAAN_QUERY_GET,
    PENERIMAAN_QUERY_GET_SUCCESS,
    PENERIMAAN_QUERY_GET_ERROR,
    PENERIMAAN_LIST_QUERY_GET,
    PENERIMAAN_LIST_QUERY_GET_SUCCESS,
    PENERIMAAN_LIST_QUERY_GET_ERROR,
    KARTU_STOK_QUERY_GET,
    KARTU_STOK_QUERY_GET_SUCCESS,
    KARTU_STOK_QUERY_GET_ERROR,
    GET_STOK_UNIT_GUDANG,
    GET_STOK_UNIT_GUDANG_SUCCESS,
    GET_STOK_UNIT_GUDANG_ERROR,
    CREATE_OR_UPDATE_STOK_OPNAME,
    CREATE_OR_UPDATE_STOK_OPNAME_SUCCESS,
    CREATE_OR_UPDATE_STOK_OPNAME_ERROR,
    GET_STOK_OPNAME,
    GET_STOK_OPNAME_SUCCESS,
    GET_STOK_OPNAME_ERROR,
    GET_STOK_OPNAME_DETAIL,
    GET_STOK_OPNAME_DETAIL_SUCCESS,
    GET_STOK_OPNAME_DETAIL_ERROR,
    UPDATE_STOK_OPNAME_DETAILS,
    UPDATE_STOK_OPNAME_DETAILS_SUCCESS,
    UPDATE_STOK_OPNAME_DETAILS_ERROR,
    CREATE_OR_UPDATE_PEMESANAN,
    CREATE_OR_UPDATE_PEMESANAN_SUCCESS,
    CREATE_OR_UPDATE_PEMESANAN_ERROR,
    GET_PEMESANAN,
    GET_PEMESANAN_SUCCESS,
    GET_PEMESANAN_ERROR,
    GET_LIST_PEMESANAN,
    GET_LIST_PEMESANAN_SUCCESS,
    GET_LIST_PEMESANAN_ERROR,
    GET_UNIT_USER,
    GET_UNIT_USER_SUCCESS,
    GET_UNIT_USER_ERROR,
    GET_COMBO_KARTU_STOK,
    GET_COMBO_KARTU_STOK_SUCCESS,
    GET_COMBO_KARTU_STOK_ERROR,
    GET_COMBO_STOK_UNIT,
    GET_COMBO_STOK_UNIT_SUCCESS,
    GET_COMBO_STOK_UNIT_ERROR
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
    kemasanFromProdukGet: {
        data: [],
        loading: false,
        error: null,
    },
    penerimaanSaveOrUpdate: {
        data: [],
        loading: false,
        error: null,
    },
    upsertReturBarang: {
        data: [],
        loading: false,
        error: null
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
    },
    getStokUnitGudang: {
        data: [],
        loading: false,
        error: null,
    },
    createOrUpdateStokOpname: {
        data: [],
        loading: false,
        error: null,
    },
    getStokOpname: {
        data: [],
        loading: false,
        error: null,
    },
    getStokOpnameDetail: {
        data: [],
        loading: false,
        error: null,
    },
    updateStokOpnameDetails: {
        data: [],
        loading: false,
        error: null,
    },
    createOrUpdatePemesanan: {
        data: [],
        loading: false,
        error: null,
    },
    getPemesanan: {
        data: [],
        loading: false,
        error: null,
    },
    getListPemesanan: {
        data: [],
        loading: false,
        error: null,
    },
    getUnitUser: {
        data: [],
        loading: false,
        error: null,
    },
    getComboKartuStok: {
        data: [],
        loading: false,
        error: null
    },
    getComboStokUnit: {
        data: [],
        loading: false,
        error: null
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

        case KEMASAN_FROM_PRODUK_GET: {
            return {
                ...state,
                kemasanFromProdukGet: {
                    ...state.kemasanFromProdukGet,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case KEMASAN_FROM_PRODUK_GET_SUCCESS: {
            return {
                ...state,
                kemasanFromProdukGet: {
                    ...state.kemasanFromProdukGet,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case KEMASAN_FROM_PRODUK_GET_ERROR: {
            return {
                ...state,
                kemasanFromProdukGet: {
                    ...state.kemasanFromProdukGet,
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

        case UPSERT_RETUR_BARANG: {
            return {
                ...state,
                upsertReturBarang: {
                    ...state.upsertReturBarang,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case UPSERT_RETUR_BARANG_SUCCESS: {
            return {
                ...state,
                upsertReturBarang: {
                    ...state.upsertReturBarang,
                    loading: true,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case UPSERT_RETUR_BARANG_ERROR: {
            return {
                ...state,
                upsertReturBarang: {
                    ...state.upsertReturBarang,
                    loading: true,
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

        case GET_STOK_UNIT_GUDANG: {
            return {
                ...state,
                getStokUnitGudang: {
                    ...state.getStokUnitGudang,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_STOK_UNIT_GUDANG_SUCCESS: {
            return {
                ...state,
                getStokUnitGudang: {
                    ...state.getStokUnitGudang,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case GET_STOK_UNIT_GUDANG_ERROR: {
            return {
                ...state,
                getStokUnitGudang: {
                    ...state.getStokUnitGudang,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case CREATE_OR_UPDATE_STOK_OPNAME: {
            return {
                ...state,
                createOrUpdateStokOpname: {
                    ...state.createOrUpdateStokOpname,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case CREATE_OR_UPDATE_STOK_OPNAME_SUCCESS: {
            return {
                ...state,
                createOrUpdateStokOpname: {
                    ...state.createOrUpdateStokOpname,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case CREATE_OR_UPDATE_STOK_OPNAME_ERROR: {
            return {
                ...state,
                createOrUpdateStokOpname: {
                    ...state.createOrUpdateStokOpname,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case GET_STOK_OPNAME: {
            return {
                ...state,
                getStokOpname: {
                    ...state.getStokOpname,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_STOK_OPNAME_SUCCESS: {
            return {
                ...state,
                getStokOpname: {
                    ...state.getStokOpname,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case GET_STOK_OPNAME_ERROR: {
            return {
                ...state,
                getStokOpname: {
                    ...state.getStokOpname,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case GET_STOK_OPNAME_DETAIL: {
            return {
                ...state,
                getStokOpnameDetail: {
                    ...state.getStokOpnameDetail,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_STOK_OPNAME_DETAIL_SUCCESS: {
            return {
                ...state,
                getStokOpnameDetail: {
                    ...state.getStokOpnameDetail,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case GET_STOK_OPNAME_DETAIL_ERROR: {
            return {
                ...state,
                getStokOpnameDetail: {
                    ...state.getStokOpnameDetail,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case UPDATE_STOK_OPNAME_DETAILS: {
            return {
                ...state,
                updateStokOpnameDetails: {
                    ...state.updateStokOpnameDetails,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case UPDATE_STOK_OPNAME_DETAILS_SUCCESS: {
            return {
                ...state,
                updateStokOpnameDetails: {
                    ...state.updateStokOpnameDetails,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case UPDATE_STOK_OPNAME_DETAILS_ERROR: {
            return {
                ...state,
                updateStokOpnameDetails: {
                    ...state.updateStokOpnameDetails,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case CREATE_OR_UPDATE_PEMESANAN: {
            return {
                ...state,
                createOrUpdatePemesanan: {
                    ...state.createOrUpdatePemesanan,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case CREATE_OR_UPDATE_PEMESANAN_SUCCESS: {
            return {
                ...state,
                createOrUpdatePemesanan: {
                    ...state.createOrUpdatePemesanan,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case CREATE_OR_UPDATE_PEMESANAN_ERROR: {
            return {
                ...state,
                createOrUpdatePemesanan: {
                    ...state.createOrUpdatePemesanan,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case GET_PEMESANAN: {
            return {
                ...state,
                getPemesanan: {
                    ...state.getPemesanan,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_PEMESANAN_SUCCESS: {
            return {
                ...state,
                getPemesanan: {
                    ...state.getPemesanan,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case GET_PEMESANAN_ERROR: {
            return {
                ...state,
                getPemesanan: {
                    ...state.getPemesanan,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case GET_LIST_PEMESANAN: {
            return {
                ...state,
                getListPemesanan: {
                    ...state.getListPemesanan,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_LIST_PEMESANAN_SUCCESS: {
            return {
                ...state,
                getListPemesanan: {
                    ...state.getListPemesanan,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case GET_LIST_PEMESANAN_ERROR: {
            return {
                ...state,
                getListPemesanan: {
                    ...state.getListPemesanan,
                    loading: false,
                    data: [],
                    error: action.payload.data
                }
            }
        }

        case GET_UNIT_USER: {
            return {
                ...state,
                getUnitUser: {
                    ...state.getUnitUser,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_UNIT_USER_SUCCESS: {
            return {
                ...state,
                getUnitUser: {
                    ...state.getUnitUser,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case GET_UNIT_USER_ERROR: {
            return {
                ...state,
                getUnitUser: {
                    ...state.getUnitUser,
                    loading: false,
                    error: action.payload.data
                }
            }
        }

        case GET_COMBO_KARTU_STOK: {
            return {
                ...state,
                getComboKartuStok: {
                    ...state.getComboKartuStok,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_COMBO_KARTU_STOK_SUCCESS: {
            return {
                ...state,
                getComboKartuStok: {
                    ...state.getComboKartuStok,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case GET_COMBO_KARTU_STOK_ERROR: {
            return {
                ...state,
                getComboKartuStok: {
                    ...state.getComboKartuStok,
                    loading: false,
                    error: action.payload.data
                }
            }
        }
        
        case GET_COMBO_STOK_UNIT: {
            return {
                ...state,
                getComboStokUnit: {
                    ...state.getComboStokUnit,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_COMBO_STOK_UNIT_SUCCESS: {
            return {
                ...state,
                getComboStokUnit: {
                    ...state.getComboStokUnit,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            }
        }

        case GET_COMBO_STOK_UNIT_ERROR: {
            return {
                ...state,
                getComboStokUnit: {
                    ...state.getComboStokUnit,
                    loading: false,
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