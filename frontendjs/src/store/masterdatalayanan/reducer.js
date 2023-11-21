import {
    GET_COMBO_TAMBAH_LAYANAN,
    GET_COMBO_TAMBAH_LAYANAN_SUCCESS,
    GET_COMBO_TAMBAH_LAYANAN_ERROR,
    UPSERT_LAYANAN,
    UPSERT_LAYANAN_SUCCESS,
    UPSERT_LAYANAN_ERROR
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

        default: {
            return { ...state };
        }
    }
}
export default MasterDataLayanan;