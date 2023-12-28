import { getPenjualanBebas } from "./action";
import {
    GET_ORDER_RESEP_QUERY,
    GET_ORDER_RESEP_QUERY_ERROR,
    GET_ORDER_RESEP_QUERY_SUCCESS,
    GET_ORDER_RESEP_FROM_NOREC,
    GET_ORDER_RESEP_FROM_NOREC_ERROR,
    GET_ORDER_RESEP_FROM_NOREC_SUCCESS,
    CREATE_OR_UPDATE_VERIF_RESEP,
    CREATE_OR_UPDATE_VERIF_RESEP_SUCCESS,
    CREATE_OR_UPDATE_VERIF_RESEP_ERROR,
    CREATE_OR_UPDATE_PENJUALAN_BEBAS,
    CREATE_OR_UPDATE_PENJUALAN_BEBAS_SUCCESS,
    CREATE_OR_UPDATE_PENJUALAN_BEBAS_ERROR,
    GET_PASIEN_FROM_NOCM,
    GET_PASIEN_FROM_NOCM_SUCCESS,
    GET_PASIEN_FROM_NOCM_ERROR,
    GET_ALL_VERIF_RESEP,
    GET_ALL_VERIF_RESEP_SUCCESS,
    GET_ALL_VERIF_RESEP_ERROR,
    CREATE_OR_UPDATE_RETUR,
    CREATE_OR_UPDATE_RETUR_SUCCESS,
    CREATE_OR_UPDATE_RETUR_ERROR,
    GET_ANTREAN_FROM_DP,
    GET_ANTREAN_FROM_DP_SUCCESS,
    GET_ANTREAN_FROM_DP_ERROR,
    CREATE_OR_UPDATE_ORDER_PLUS_VERIF,
    CREATE_OR_UPDATE_ORDER_PLUS_VERIF_SUCCESS,
    CREATE_OR_UPDATE_ORDER_PLUS_VERIF_ERROR,
    CREATE_ANTREAN_FARMASI,
    CREATE_ANTREAN_FARMASI_SUCCESS,
    CREATE_ANTREAN_FARMASI_ERROR,
    GET_COMBO_LAPORAN_PENGADAAN,
    GET_COMBO_LAPORAN_PENGADAAN_SUCCESS,
    GET_COMBO_LAPORAN_PENGADAAN_ERROR,
    GET_PENJUALAN_BEBAS,
    GET_PENJUALAN_BEBAS_SUCCESS,
    GET_PENJUALAN_BEBAS_ERROR,
    GET_PENJUALAN_BEBAS_FROM_NOREC,
    GET_PENJUALAN_BEBAS_FROM_NOREC_SUCCESS,
    GET_PENJUALAN_BEBAS_FROM_NOREC_ERROR,
    GET_OBAT_FROM_UNIT,
    GET_OBAT_FROM_UNIT_SUCCESS,
    GET_OBAT_FROM_UNIT_ERROR
} from "./actionType";

const INIT_STATE = {
    getOrderResepQuery: {
        data: [],
        loading: false,
        error: null,
    },
    getOrderResepFromNorec: {
        data: null,
        loading: false,
        error: null,
    },
    createOrUpdateVerifResep: {
        data: [],
        loading: false,
        error: null,
    },
    createOrUpdatePenjualanBebas: {
        data: [],
        loading: false,
        error: null,
    },
    getPasienFromNoCm: {
        data: [],
        loading: false,
        error: null,
    },
    createOrUpdateRetur: {
        data: [],
        loading: false,
        error: null,
    },
    getAntreanFromDP: {
        data: [],
        loading: false,
        error: null,
    },
    createOrUpdateOrderPlusVerif: {
        data: [],
        loading: false,
        error: null,
    },
    createAntreanFarmasi: {
        data: [],
        loading: false,
        error: null,
    },
    getComboLaporanPengadaan: {
        data: [],
        loading: false,
        error: null,
    },
    getPenjualanBebas: {
        data: [],
        loading: false,
        error: null,
    },
    getPenjualanBebasFromNorec: {
        data: null,
        loading: false,
        error: null,
    },
    getObatFromUnit: {
        data: null,
        loading: false,
        error: null,
    }
};

const Farmasi = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ORDER_RESEP_QUERY: {
            return {
                ...state,
                getOrderResepQuery: {
                    ...state.getOrderResepQuery,
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_ORDER_RESEP_QUERY_SUCCESS: {
            return {
                ...state,
                getOrderResepQuery: {
                    ...state.getOrderResepQuery,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_ORDER_RESEP_QUERY_ERROR: {
            return {
                ...state,
                getOrderResepQuery: {
                    ...state.getOrderResepQuery,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_ORDER_RESEP_FROM_NOREC: {
            return {
                ...state,
                getOrderResepFromNorec: {
                    ...state.getOrderResepFromNorec,
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_ORDER_RESEP_FROM_NOREC_SUCCESS: {
            return {
                ...state,
                getOrderResepFromNorec: {
                    ...state.getOrderResepFromNorec,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_ORDER_RESEP_FROM_NOREC_ERROR: {
            return {
                ...state,
                getOrderResepFromNorec: {
                    ...state.getOrderResepFromNorec,
                    data: null,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_VERIF_RESEP: {
            return {
                ...state,
                createOrUpdateVerifResep: {
                    ...state.createOrUpdateVerifResep,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case CREATE_OR_UPDATE_VERIF_RESEP_SUCCESS: {
            return {
                ...state,
                createOrUpdateVerifResep: {
                    ...state.createOrUpdateVerifResep,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_VERIF_RESEP_ERROR: {
            return {
                ...state,
                createOrUpdateVerifResep: {
                    ...state.createOrUpdateVerifResep,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_PENJUALAN_BEBAS: {
            return {
                ...state,
                createOrUpdatePenjualanBebas: {
                    ...state.createOrUpdatePenjualanBebas,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case CREATE_OR_UPDATE_PENJUALAN_BEBAS_SUCCESS: {
            return {
                ...state,
                createOrUpdatePenjualanBebas: {
                    ...state.createOrUpdatePenjualanBebas,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_PENJUALAN_BEBAS_ERROR: {
            return {
                ...state,
                createOrUpdatePenjualanBebas: {
                    ...state.createOrUpdatePenjualanBebas,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_PASIEN_FROM_NOCM: {
            return {
                ...state,
                getPasienFromNoCm: {
                    ...state.getPasienFromNoCm,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_PASIEN_FROM_NOCM_SUCCESS: {
            return {
                ...state,
                getPasienFromNoCm: {
                    ...state.getPasienFromNoCm,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_PASIEN_FROM_NOCM_ERROR: {
            return {
                ...state,
                getPasienFromNoCm: {
                    ...state.getPasienFromNoCm,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_ALL_VERIF_RESEP: {
            return {
                ...state,
                getAllVerifResep: {
                    ...state.getAllVerifResep,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_ALL_VERIF_RESEP_SUCCESS: {
            return {
                ...state,
                getAllVerifResep: {
                    ...state.getAllVerifResep,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_ALL_VERIF_RESEP_ERROR: {
            return {
                ...state,
                getAllVerifResep: {
                    ...state.getAllVerifResep,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_RETUR: {
            return {
                ...state,
                createOrUpdateRetur: {
                    ...state.createOrUpdateRetur,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case CREATE_OR_UPDATE_RETUR_SUCCESS: {
            return {
                ...state,
                createOrUpdateRetur: {
                    ...state.createOrUpdateRetur,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_RETUR_ERROR: {
            return {
                ...state,
                createOrUpdateRetur: {
                    ...state.createOrUpdateRetur,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_ANTREAN_FROM_DP: {
            return {
                ...state,
                getAntreanFromDP: {
                    ...state.getAntreanFromDP,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_ANTREAN_FROM_DP_SUCCESS: {
            return {
                ...state,
                getAntreanFromDP: {
                    ...state.getAntreanFromDP,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_ANTREAN_FROM_DP_ERROR: {
            return {
                ...state,
                getAntreanFromDP: {
                    ...state.getAntreanFromDP,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_ORDER_PLUS_VERIF: {
            return {
                ...state,
                createOrUpdateOrderPlusVerif: {
                    ...state.createOrUpdateOrderPlusVerif,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case CREATE_OR_UPDATE_ORDER_PLUS_VERIF_SUCCESS: {
            return {
                ...state,
                createOrUpdateOrderPlusVerif: {
                    ...state.createOrUpdateOrderPlusVerif,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_ORDER_PLUS_VERIF_ERROR: {
            return {
                ...state,
                createOrUpdateOrderPlusVerif: {
                    ...state.createOrUpdateOrderPlusVerif,
                    loading: false,
                    error: action.payload,
                },
            };
        }
        
        case CREATE_ANTREAN_FARMASI: {
            return {
                ...state,
                createAntreanFarmasi: {
                    ...state.createAntreanFarmasi,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case CREATE_ANTREAN_FARMASI_SUCCESS: {
            return {
                ...state,
                createAntreanFarmasi: {
                    ...state.createAntreanFarmasi,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case CREATE_ANTREAN_FARMASI_ERROR: {
            return {
                ...state,
                createAntreanFarmasi: {
                    ...state.createAntreanFarmasi,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_COMBO_LAPORAN_PENGADAAN: {
            return {
                ...state,
                getComboLaporanPengadaan: {
                    ...state.getComboLaporanPengadaan,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_COMBO_LAPORAN_PENGADAAN_SUCCESS: {
            return {
                ...state,
                getComboLaporanPengadaan: {
                    ...state.getComboLaporanPengadaan,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_COMBO_LAPORAN_PENGADAAN_ERROR: {
            return {
                ...state,
                getComboLaporanPengadaan: {
                    ...state.getComboLaporanPengadaan,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_PENJUALAN_BEBAS: {
            return {
                ...state,
                getPenjualanBebas: {
                    ...state.getPenjualanBebas,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_PENJUALAN_BEBAS_SUCCESS: {
            return {
                ...state,
                getPenjualanBebas: {
                    ...state.getPenjualanBebas,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_PENJUALAN_BEBAS_ERROR: {
            return {
                ...state,
                getPenjualanBebas: {
                    ...state.getPenjualanBebas,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_PENJUALAN_BEBAS_FROM_NOREC: {
            return {
                ...state,
                getPenjualanBebasFromNorec: {
                    ...state.getPenjualanBebasFromNorec,
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_PENJUALAN_BEBAS_FROM_NOREC_SUCCESS: {
            return {
                ...state,
                getPenjualanBebasFromNorec: {
                    ...state.getPenjualanBebasFromNorec,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_PENJUALAN_BEBAS_FROM_NOREC_ERROR: {
            return {
                ...state,
                getPenjualanBebasFromNorec: {
                    ...state.getPenjualanBebasFromNorec,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_OBAT_FROM_UNIT: {
            return {
                ...state,
                getObatFromUnit: {
                    ...state.getObatFromUnit,
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_OBAT_FROM_UNIT_SUCCESS: {
            return {
                ...state,
                getObatFromUnit: {
                    ...state.getObatFromUnit,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_OBAT_FROM_UNIT_ERROR: {
            return {
                ...state,
                getObatFromUnit: {
                    ...state.getObatFromUnit,
                    loading: false,
                    error: action.payload,
                },
            };
        }
        
        default: {
            return { ...state };
        }
    }
};

export default Farmasi;