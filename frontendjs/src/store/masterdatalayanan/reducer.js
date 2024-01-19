import {
    GET_COMBO_TAMBAH_LAYANAN,
    GET_COMBO_TAMBAH_LAYANAN_SUCCESS,
    GET_COMBO_TAMBAH_LAYANAN_ERROR,
    UPSERT_LAYANAN,
    UPSERT_LAYANAN_SUCCESS,
    UPSERT_LAYANAN_ERROR,
    GET_LAYANAN,
    GET_LAYANAN_SUCCESS,
    GET_LAYANAN_ERROR,
    GET_COMBO_MAP_RUANG_PELAYANAN,
    GET_COMBO_MAP_RUANG_PELAYANAN_SUCCESS,
    GET_COMBO_MAP_RUANG_PELAYANAN_ERROR,
    GET_MAP_UNIT_TO_PRODUK,
    GET_MAP_UNIT_TO_PRODUK_SUCCESS,
    GET_MAP_UNIT_TO_PRODUK_ERROR,
    GET_LAYANAN_MAPPING,
    GET_LAYANAN_MAPPING_SUCCESS,
    GET_LAYANAN_MAPPING_ERROR,
    SAVE_OR_DELETE_MAPPING,
    SAVE_OR_DELETE_MAPPING_SUCCESS,
    SAVE_OR_DELETE_MAPPING_ERROR,
    GET_LAIN_LAIN,
    GET_LAIN_LAIN_ERROR,
    GET_LAIN_LAIN_SUCCESS,
    UPSERT_JENIS_PRODUK,
    UPSERT_JENIS_PRODUK_SUCCESS,
    UPSERT_JENIS_PRODUK_ERROR,
    UPSERT_DETAIL_JENIS_PRODUK,
    UPSERT_DETAIL_JENIS_PRODUK_SUCCESS,
    UPSERT_DETAIL_JENIS_PRODUK_ERROR,
    GET_MASTER_TARIF_LAYANAN,
    GET_MASTER_TARIF_LAYANAN_SUCCESS,
    GET_MASTER_TARIF_LAYANAN_ERROR,
    SET_VARIABEL_BPJS,
    SET_VARIABEL_BPJS_SUCCESS,
    SET_VARIABEL_BPJS_ERROR,
    UPDATE_STATUS_LAYANAN,UPDATE_STATUS_LAYANAN_ERROR,UPDATE_STATUS_LAYANAN_SUCCESS
} from "./actionType";

const INIT_STATE = {
    getComboTambahLayanan: {
        data: [],
        loading: false,
        error: null,
    },
    upsertLayanan: {
        data: [],
        loading: false,
        error: null,
    },
    getLayanan: {
        data: [],
        loading: false,
        error: null
    },
    getComboMapRuangPelayanan: {
        data: [],
        loading: false,
        error: null
    },
    getMapUnitToProduk: {
        data: [],
        loading: false,
        error: null
    },
    getLayananMapping: {
        data: [],
        loading: false,
        error: null
    },
    saveOrDeleteMapping: {
        data: [],
        loading: false,
        error: null
    },
    getLainLain: {
        data: [],
        loading: false,
        error: null
    },
    upsertJenisProduk: {
        data: [],
        loading: false,
        error: null
    },
    upsertDetailJenisProduk: {
        data: [],
        loading: false,
        error: null
    },
    getMasterTarifLayanan: {
        data: [],
        loading: false,
        error: null,
    },
    setVariabelBPJS: {
        data: [],
        loading: false,
        error: null
    },
    updateStatusLayanan: {
        data: [],
        loading: false,
        error: null
    }
}

const MasterDataLayanan = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_COMBO_TAMBAH_LAYANAN: {
            return {
                ...state,
                getComboTambahLayanan: {
                    ...state.getComboTambahLayanan,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_TAMBAH_LAYANAN_SUCCESS: {
            return {
                ...state,
                getComboTambahLayanan: {
                    ...state.getComboTambahLayanan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_TAMBAH_LAYANAN_ERROR: {
            return {
                ...state,
                getComboTambahLayanan: {
                    ...state.getComboTambahLayanan,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_LAYANAN: {
            return {
                ...state,
                upsertLayanan: {
                    ...state.getComboTambahLayanan,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_LAYANAN_SUCCESS: {
            return {
                ...state,
                upsertLayanan: {
                    ...state.upsertLayanan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case UPSERT_LAYANAN_ERROR: {
            return {
                ...state,
                upsertLayanan: {
                    ...state.upsertLayanan,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_LAYANAN: {
            return {
                ...state,
                getLayanan: {
                    ...state.getLayanan,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LAYANAN_SUCCESS: {
            return {
                ...state,
                getLayanan: {
                    ...state.getLayanan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_LAYANAN_ERROR: {
            return {
                ...state,
                getLayanan: {
                    ...state.getLayanan,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_COMBO_MAP_RUANG_PELAYANAN: {
            return {
                ...state,
                getComboMapRuangPelayanan: {
                    ...state.getComboMapRuangPelayanan,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_MAP_RUANG_PELAYANAN_SUCCESS: {
            return {
                ...state,
                getComboMapRuangPelayanan: {
                    ...state.getComboMapRuangPelayanan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_MAP_RUANG_PELAYANAN_ERROR: {
            return {
                ...state,
                getComboMapRuangPelayanan: {
                    ...state.getComboMapRuangPelayanan,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_MAP_UNIT_TO_PRODUK: {
            return {
                ...state,
                getMapUnitToProduk: {
                    ...state.getMapUnitToProduk,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_MAP_UNIT_TO_PRODUK_SUCCESS: {
            return {
                ...state,
                getMapUnitToProduk: {
                    ...state.getMapUnitToProduk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_MAP_UNIT_TO_PRODUK_ERROR: {
            return {
                ...state,
                getMapUnitToProduk: {
                    ...state.getMapUnitToProduk,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_LAYANAN_MAPPING: {
            return {
                ...state,
                getLayananMapping: {
                    ...state.getLayananMapping,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LAYANAN_MAPPING_SUCCESS: {
            return {
                ...state,
                getLayananMapping: {
                    ...state.getLayananMapping,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_LAYANAN_MAPPING_ERROR: {
            return {
                ...state,
                getLayananMapping: {
                    ...state.getLayananMapping,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case SAVE_OR_DELETE_MAPPING: {
            return {
                ...state,
                saveOrDeleteMapping: {
                    ...state.saveOrDeleteMapping,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_OR_DELETE_MAPPING_SUCCESS: {
            return {
                ...state,
                saveOrDeleteMapping: {
                    ...state.saveOrDeleteMapping,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case SAVE_OR_DELETE_MAPPING_ERROR: {
            return {
                ...state,
                saveOrDeleteMapping: {
                    ...state.saveOrDeleteMapping,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_LAIN_LAIN: {
            return {
                ...state,
                getLainLain: {
                    ...state.getLainLain,
                    data: [],
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case GET_LAIN_LAIN_SUCCESS: {
            return {
                ...state,
                getLainLain: {
                    ...state.getLainLain,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_LAIN_LAIN_ERROR: {
            return {
                ...state,
                getLainLain: {
                    ...state.getLainLain,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_JENIS_PRODUK: {
            return {
                ...state,
                upsertJenisProduk: {
                    ...state.upsertJenisProduk,
                    data: [],
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPSERT_JENIS_PRODUK_SUCCESS: {
            return {
                ...state,
                upsertJenisProduk: {
                    ...state.upsertJenisProduk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case UPSERT_JENIS_PRODUK_ERROR: {
            return {
                ...state,
                upsertJenisProduk: {
                    ...state.upsertJenisProduk,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_DETAIL_JENIS_PRODUK: {
            return {
                ...state,
                upsertDetailJenisProduk: {
                    ...state.upsertDetailJenisProduk,
                    data: [],
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPSERT_DETAIL_JENIS_PRODUK_SUCCESS: {
            return {
                ...state,
                upsertDetailJenisProduk: {
                    ...state.upsertDetailJenisProduk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case UPSERT_DETAIL_JENIS_PRODUK_ERROR: {
            return {
                ...state,
                upsertDetailJenisProduk: {
                    ...state.upsertDetailJenisProduk,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_MASTER_TARIF_LAYANAN: {
            return {
                ...state,
                getMasterTarifLayanan: {
                    ...state.getMasterTarifLayanan,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_MASTER_TARIF_LAYANAN_SUCCESS: {
            return {
                ...state,
                getMasterTarifLayanan: {
                    ...state.getMasterTarifLayanan,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_MASTER_TARIF_LAYANAN_ERROR: {
            return {
                ...state,
                getMasterTarifLayanan: {
                    ...state.getMasterTarifLayanan,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case SET_VARIABEL_BPJS: {
            return {
                ...state,
                setVariabelBPJS: {
                    ...state.setVariabelBPJS,
                    data: [],
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case SET_VARIABEL_BPJS_SUCCESS: {
            return {
                ...state,
                setVariabelBPJS: {
                    ...state.setVariabelBPJS,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case SET_VARIABEL_BPJS_ERROR: {
            return {
                ...state,
                setVariabelBPJS: {
                    ...state.setVariabelBPJS,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPDATE_STATUS_LAYANAN: {
            return {
                ...state,
                updateStatusLayanan: {
                    ...state.updateStatusLayanan,
                    data: [],
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPDATE_STATUS_LAYANAN_SUCCESS: {
            return {
                ...state,
                updateStatusLayanan: {
                    ...state.updateStatusLayanan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case UPDATE_STATUS_LAYANAN_ERROR: {
            return {
                ...state,
                updateStatusLayanan: {
                    ...state.updateStatusLayanan,
                    data: [],
                    loading: false,
                    error: action.payload,
                }
            }
        }

        default: {
            return { ...state };
        }
    }
}
export default MasterDataLayanan;