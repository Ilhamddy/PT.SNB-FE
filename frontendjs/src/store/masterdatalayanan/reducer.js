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
    SAVE_OR_DELETE_MAPPING_ERROR
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
                    error: action.error,
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
                    error: action.error,
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
                    error: action.error,
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
                    error: action.error,
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
                    error: action.error,
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
                    error: action.error,
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
                    error: action.error,
                }
            }
        }

        default: {
            return { ...state };
        }
    }
}
export default MasterDataLayanan;