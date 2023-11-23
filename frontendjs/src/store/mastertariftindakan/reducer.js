import {
    GET_TOTAL_HARGA_PRODUK,
    GET_TOTAL_HARGA_PRODUK_SUCCESS,
    GET_TOTAL_HARGA_PRODUK_ERROR,
    GET_COMBO_TARIF_TINDAKAN,
    GET_COMBO_TARIF_TINDAKAN_SUCCESS,
    GET_COMBO_TARIF_TINDAKAN_ERROR,
    UPSERT_TARIF_TINDAKAN,
    UPSERT_TARIF_TINDAKAN_SUCCESS,
    UPSERT_TARIF_TINDAKAN_ERROR,
    GET_TOTAL_TARIF,
    GET_TOTAL_TARIF_SUCCESS,
    GET_TOTAL_TARIF_ERROR
} from "./actionType";

const INIT_STATE = {
    getTotalHargaProduk: {
        data: [],
        loading: false,
        error: null,
    },
    getComboTarifTindakan: {
        data: [],
        loading: false,
        error: null,
    },
    upsertTarifTindakan: {
        data: [],
        loading: false,
        error: null
    },
    getTotalTarif: {
        data: null,
        loading: false,
        error: null
    }
}

const MasterDataLayanan = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_TOTAL_HARGA_PRODUK: {
            return {
                ...state,
                getTotalHargaProduk: {
                    ...state.getTotalHargaProduk,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_TOTAL_HARGA_PRODUK_SUCCESS: {
            return {
                ...state,
                getTotalHargaProduk: {
                    ...state.getTotalHargaProduk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_TOTAL_HARGA_PRODUK_ERROR: {
            return {
                ...state,
                getTotalHargaProduk: {
                    ...state.getTotalHargaProduk,
                    loading: false,
                    error: action.payload,
                }
            }
        }
        case GET_COMBO_TARIF_TINDAKAN: {
            return {
                ...state,
                getComboTarifTindakan: {
                    ...state.getComboTarifTindakan,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_TARIF_TINDAKAN_SUCCESS: {
            return {
                ...state,
                getComboTarifTindakan: {
                    ...state.getComboTarifTindakan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_TARIF_TINDAKAN_ERROR: {
            return {
                ...state,
                getComboTarifTindakan: {
                    ...state.getComboTarifTindakan,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_TARIF_TINDAKAN: {
            return {
                ...state,
                upsertTarifTindakan: {
                    ...state.upsertTarifTindakan,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_TARIF_TINDAKAN_SUCCESS: {
            return {
                ...state,
                upsertTarifTindakan: {
                    ...state.upsertTarifTindakan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case UPSERT_TARIF_TINDAKAN_ERROR: {
            return {
                ...state,
                upsertTarifTindakan: {
                    ...state.upsertTarifTindakan,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_TOTAL_TARIF: {
            return {
                ...state,
                getTotalTarif: {
                    ...state.getTotalTarif,
                    data: null,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_TOTAL_TARIF_SUCCESS: {
            return {
                ...state,
                getTotalTarif: {
                    ...state.getTotalTarif,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_TOTAL_TARIF_ERROR: {
            return {
                ...state,
                getTotalTarif: {
                    ...state.getTotalTarif,
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