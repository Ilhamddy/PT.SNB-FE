import {
    DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    KENDALIDOKUMEN_RESET_FORM,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR,
    SAVE_DOKUMEN_REKAMMEDIS,
    SAVE_DOKUMEN_REKAMMEDIS_SUCCESS,
    SAVE_DOKUMEN_REKAMMEDIS_ERROR,
    COMBO_LAPORAN_REKAMMEDIS_GET,
    COMBO_LAPORAN_REKAMMEDIS_GET_SUCCESS,
    COMBO_LAPORAN_REKAMMEDIS_GET_ERROR,
    LIST_LAPORAN_PASIEN_DAFTAR_GET,
    LIST_LAPORAN_PASIEN_DAFTAR_GET_SUCCESS,
    LIST_LAPORAN_PASIEN_DAFTAR_GET_ERROR,
    LIST_LAPORAN_PASIEN_BATAL_GET,
    LIST_LAPORAN_PASIEN_BATAL_GET_SUCCESS,
    LIST_LAPORAN_PASIEN_BATAL_GET_ERROR,
    LIST_LAPORAN_PASIEN_KUNJUNGAN_GET,
    LIST_LAPORAN_PASIEN_KUNJUNGAN_GET_SUCCESS,
    LIST_LAPORAN_PASIEN_KUNJUNGAN_GET_ERROR,
    LAPORAN_RL_3_1_GET,
    LAPORAN_RL_3_1_GET_SUCCESS,
    LAPORAN_RL_3_1_GET_ERROR,
    LAPORAN_RL_3_2_GET,
    LAPORAN_RL_3_2_GET_SUCCESS,
    LAPORAN_RL_3_2_GET_ERROR,
    GET_DETAIL_JENIS_PRODUK,
    GET_DETAIL_JENIS_PRODUK_SUCCESS,
    GET_DETAIL_JENIS_PRODUK_ERROR,
    GET_LAYANAN_JENIS,
    GET_LAYANAN_JENIS_SUCCESS,
    GET_LAYANAN_JENIS_ERROR,
    GET_MASTER_RL_FROM_INDUK,
    GET_MASTER_RL_FROM_INDUK_SUCCESS,
    GET_MASTER_RL_FROM_INDUK_ERROR,
    CREATE_OR_UPDATE_MAP_RL,
    CREATE_OR_UPDATE_MAP_RL_SUCCESS,
    CREATE_OR_UPDATE_MAP_RL_ERROR,
    GET_LAYANAN_FROM_MASTER_RL,
    GET_LAYANAN_FROM_MASTER_RL_SUCCESS,
    GET_LAYANAN_FROM_MASTER_RL_ERROR,
    DELETE_MAP_RL,
    DELETE_MAP_RL_SUCCESS,
    DELETE_MAP_RL_ERROR,
    UPDATE_PRINTED,
    UPDATE_PRINTED_ERROR,
    UPDATE_PRINTED_SUCCESS,
    LAPORAN_RL_3_3_GET,LAPORAN_RL_3_3_GET_SUCCESS,LAPORAN_RL_3_3_GET_ERROR,
    LAPORAN_RL_3_6_GET,LAPORAN_RL_3_6_GET_SUCCESS,LAPORAN_RL_3_6_GET_ERROR,
    LAPORAN_RL_3_14_GET,LAPORAN_RL_3_14_GET_SUCCESS,LAPORAN_RL_3_14_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    daftarDokumenRekammedisGet: {
        data: [],
        loading: false,
        error: null,
    },
    widgetdaftarDokumenRekammedisGet: {
        data: [],
        loading: false,
        error: null,
    },
    saveDokumenRekammedis: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    comboLaporanRekammedisGet: {
        data: [],
        loading: false,
        error: null,
    },
    listLaporanPasienDaftarGet: {
        data: [],
        loading: false,
        error: null,
    },
    listLaporanPasienBatalGet:{
        data: [],
        loading: false,
        error: null,
    },
    listLaporanPasienKunjunganGet:{
        data: [],
        loading: false,
        error: null,
    },
    laporanRL_3_1_Get:{
        data: [],
        loading: false,
        error: null,
    },
    laporanRL_3_2_Get:{
        data: [],
        loading: false,
        error: null,
    },
    getDetailJenisProduk: {
        data: [],
        loading: false,
        error: null,
    },
    getLayananJenis: {
        data: [],
        loading: false,
        error: null,
    },
    getMasterRLFromInduk: {
        data: [],
        loading: false,
        error: null,
    },
    createOrUpdateMapRL: {
        data: [],
        loading: false,
        error: null,
    },
    getLayananFromMasterRL: {
        data: [],
        loading: false,
        error: null,
    },
    deleteMapRL: {
        data: [],
        loading: false,
        error: null,
    },
    updatePrinted: {
        data: [],
        loading: false,
        error: null
    },
    getLaporanRl_3_3:{
        data: [],
        loading: false,
        error: null,
    },
    getLaporanRl_3_6:{
        data: [],
        loading: false,
        error: null,
    },
    getLaporanRl_3_14:{
        data: [],
        loading: false,
        error: null,
    },
}

const KendaliDokumen = (state = INIT_STATE, action) => {
    switch (action.type) {
        case KENDALIDOKUMEN_RESET_FORM: {
            return {
                ...state,
                daftarDokumenRekammedisGet:{
                    ...INIT_STATE.daftarDokumenRekammedisGet,
                },
                widgetdaftarDokumenRekammedisGet:{
                    ...INIT_STATE.widgetdaftarDokumenRekammedisGet,
                },
                saveDokumenRekammedis:{
                    ...INIT_STATE.saveDokumenRekammedis
                },
                comboLaporanRekammedisGet:{
                    ...INIT_STATE.comboLaporanRekammedisGet
                },
                listLaporanPasienDaftarGet:{
                    ...INIT_STATE.listLaporanPasienDaftarGet
                },
                listLaporanPasienBatalGet:{
                    ...INIT_STATE.listLaporanPasienBatalGet
                },
                listLaporanPasienKunjunganGet:{
                    ...INIT_STATE.listLaporanPasienKunjunganGet
                },
                laporanRL_3_1_Get:{
                    ...INIT_STATE.laporanRL_3_1_Get
                },
                laporanRL_3_2_Get:{
                    ...INIT_STATE.laporanRL_3_2_Get
                },
                getLaporanRl_3_3:{
                    ...INIT_STATE.getLaporanRl_3_3
                },
                getLaporanRl_3_6:{
                    ...INIT_STATE.getLaporanRl_3_6
                },
                getLaporanRl_3_14:{
                    ...INIT_STATE.getLaporanRl_3_14
                }
            }
        }

        case DAFTAR_DOKUMEN_REKAMMEDIS_GET: {
            return {
                ...state,
                daftarDokumenRekammedisGet: {
                    ...state.daftarDokumenRekammedisGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS: {
            return {
                ...state,
                daftarDokumenRekammedisGet: {
                    ...state.daftarDokumenRekammedisGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR: {
            return {
                ...state,
                daftarDokumenRekammedisGet: {
                    ...state.daftarDokumenRekammedisGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET: {
            return {
                ...state,
                widgetdaftarDokumenRekammedisGet: {
                    ...state.widgetdaftarDokumenRekammedisGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_SUCCESS: {
            return {
                ...state,
                widgetdaftarDokumenRekammedisGet: {
                    ...state.widgetdaftarDokumenRekammedisGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET_ERROR: {
            return {
                ...state,
                widgetdaftarDokumenRekammedisGet: {
                    ...state.widgetdaftarDokumenRekammedisGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_DOKUMEN_REKAMMEDIS: {
            return {
                ...state,
                saveDokumenRekammedis: {
                    ...state.saveDokumenRekammedis,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_DOKUMEN_REKAMMEDIS_SUCCESS: {
            return {
                ...state,
                saveDokumenRekammedis: {
                    ...state.saveDokumenRekammedis,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_DOKUMEN_REKAMMEDIS_ERROR: {
            return {
                ...state,
                saveDokumenRekammedis: {
                    ...state.saveDokumenRekammedis,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_LAPORAN_REKAMMEDIS_GET: {
            return {
                ...state,
                comboLaporanRekammedisGet: {
                    ...state.comboLaporanRekammedisGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_LAPORAN_REKAMMEDIS_GET_SUCCESS: {
            return {
                ...state,
                comboLaporanRekammedisGet: {
                    ...state.comboLaporanRekammedisGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_LAPORAN_REKAMMEDIS_GET_ERROR: {
            return {
                ...state,
                comboLaporanRekammedisGet: {
                    ...state.comboLaporanRekammedisGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_DAFTAR_GET: {
            return {
                ...state,
                listLaporanPasienDaftarGet: {
                    ...state.listLaporanPasienDaftarGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_DAFTAR_GET_SUCCESS: {
            return {
                ...state,
                listLaporanPasienDaftarGet: {
                    ...state.listLaporanPasienDaftarGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_DAFTAR_GET_ERROR: {
            return {
                ...state,
                listLaporanPasienDaftarGet: {
                    ...state.listLaporanPasienDaftarGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_BATAL_GET: {
            return {
                ...state,
                listLaporanPasienBatalGet: {
                    ...state.listLaporanPasienBatalGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_BATAL_GET_SUCCESS: {
            return {
                ...state,
                listLaporanPasienBatalGet: {
                    ...state.listLaporanPasienBatalGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_BATAL_GET_ERROR: {
            return {
                ...state,
                listLaporanPasienBatalGet: {
                    ...state.listLaporanPasienBatalGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_KUNJUNGAN_GET: {
            return {
                ...state,
                listLaporanPasienKunjunganGet: {
                    ...state.listLaporanPasienKunjunganGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_KUNJUNGAN_GET_SUCCESS: {
            return {
                ...state,
                listLaporanPasienKunjunganGet: {
                    ...state.listLaporanPasienKunjunganGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_LAPORAN_PASIEN_KUNJUNGAN_GET_ERROR: {
            return {
                ...state,
                listLaporanPasienKunjunganGet: {
                    ...state.listLaporanPasienKunjunganGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LAPORAN_RL_3_1_GET: {
            return {
                ...state,
                laporanRL_3_1_Get: {
                    ...state.laporanRL_3_1_Get,
                    loading: true,
                    error: null,
                }
            }
        }

        case LAPORAN_RL_3_1_GET_SUCCESS: {
            return {
                ...state,
                laporanRL_3_1_Get: {
                    ...state.laporanRL_3_1_Get,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LAPORAN_RL_3_1_GET_ERROR: {
            return {
                ...state,
                laporanRL_3_1_Get: {
                    ...state.laporanRL_3_1_Get,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LAPORAN_RL_3_2_GET: {
            return {
                ...state,
                laporanRL_3_2_Get: {
                    ...state.laporanRL_3_2_Get,
                    loading: true,
                    error: null,
                }
            }
        }

        case LAPORAN_RL_3_2_GET_SUCCESS: {
            return {
                ...state,
                laporanRL_3_2_Get: {
                    ...state.laporanRL_3_2_Get,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LAPORAN_RL_3_2_GET_ERROR: {
            return {
                ...state,
                laporanRL_3_2_Get: {
                    ...state.laporanRL_3_2_Get,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_DETAIL_JENIS_PRODUK: {
            return {
                ...state,
                getDetailJenisProduk: {
                    ...state.getDetailJenisProduk,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_DETAIL_JENIS_PRODUK_SUCCESS: {
            return {
                ...state,
                getDetailJenisProduk: {
                    ...state.getDetailJenisProduk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_DETAIL_JENIS_PRODUK_ERROR: {
            return {
                ...state,
                getDetailJenisProduk: {
                    ...state.getDetailJenisProduk,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_LAYANAN_JENIS: {
            return {
                ...state,
                getLayananJenis: {
                    ...state.getLayananJenis,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LAYANAN_JENIS_SUCCESS: {
            return {
                ...state,
                getLayananJenis: {
                    ...state.getLayananJenis,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_LAYANAN_JENIS_ERROR: {
            return {
                ...state,
                getLayananJenis: {
                    ...state.getLayananJenis,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_MASTER_RL_FROM_INDUK: {
            return {
                ...state,
                getMasterRLFromInduk: {
                    ...state.getMasterRLFromInduk,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_MASTER_RL_FROM_INDUK_SUCCESS: {
            return {
                ...state,
                getMasterRLFromInduk: {
                    ...state.getMasterRLFromInduk,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_MASTER_RL_FROM_INDUK_ERROR: {
            return {
                ...state,
                getMasterRLFromInduk: {
                    ...state.getMasterRLFromInduk,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case CREATE_OR_UPDATE_MAP_RL: {
            return {
                ...state,
                createOrUpdateMapRL: {
                    ...state.createOrUpdateMapRL,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case CREATE_OR_UPDATE_MAP_RL_SUCCESS: {
            return {
                ...state,
                createOrUpdateMapRL: {
                    ...state.createOrUpdateMapRL,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case CREATE_OR_UPDATE_MAP_RL_ERROR: {
            return {
                ...state,
                createOrUpdateMapRL: {
                    ...state.createOrUpdateMapRL,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_LAYANAN_FROM_MASTER_RL: {
            return {
                ...state,
                getLayananFromMasterRL: {
                    ...state.getLayananFromMasterRL,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LAYANAN_FROM_MASTER_RL_SUCCESS: {
            return {
                ...state,
                getLayananFromMasterRL: {
                    ...state.getLayananFromMasterRL,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_LAYANAN_FROM_MASTER_RL_ERROR: {
            return {
                ...state,
                getLayananFromMasterRL: {
                    ...state.getLayananFromMasterRL,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DELETE_MAP_RL: {
            return {
                ...state,
                deleteMapRL: {
                    ...state.deleteMapRL,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case DELETE_MAP_RL_SUCCESS: {
            return {
                ...state,
                deleteMapRL: {
                    ...state.deleteMapRL,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DELETE_MAP_RL_ERROR: {
            return {
                ...state,
                deleteMapRL: {
                    ...state.deleteMapRL,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPDATE_PRINTED: {
            return {
                ...state,
                updatePrinted: {
                    ...state.updatePrinted,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case UPDATE_PRINTED_SUCCESS: {
            return {
                ...state,
                updatePrinted: {
                    ...state.updatePrinted,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case UPDATE_PRINTED_ERROR: {
            return {
                ...state,
                updatePrinted: {
                    ...state.updatePrinted,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LAPORAN_RL_3_3_GET: {
            return {
                ...state,
                getLaporanRl_3_3: {
                    ...state.getLaporanRl_3_3,
                    loading: true,
                    error: null,
                }
            }
        }

        case LAPORAN_RL_3_3_GET_SUCCESS: {
            return {
                ...state,
                getLaporanRl_3_3: {
                    ...state.getLaporanRl_3_3,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case LAPORAN_RL_3_3_GET_ERROR: {
            return {
                ...state,
                getLaporanRl_3_3: {
                    ...state.getLaporanRl_3_3,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case LAPORAN_RL_3_6_GET: {
            return {
                ...state,
                getLaporanRl_3_6: {
                    ...state.getLaporanRl_3_6,
                    loading: true,
                    error: null,
                }
            }
        }

        case LAPORAN_RL_3_6_GET_SUCCESS: {
            return {
                ...state,
                getLaporanRl_3_6: {
                    ...state.getLaporanRl_3_6,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case LAPORAN_RL_3_6_GET_ERROR: {
            return {
                ...state,
                getLaporanRl_3_6: {
                    ...state.getLaporanRl_3_6,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case LAPORAN_RL_3_14_GET: {
            return {
                ...state,
                getLaporanRl_3_14: {
                    ...state.getLaporanRl_3_14,
                    loading: true,
                    error: null,
                }
            }
        }

        case LAPORAN_RL_3_14_GET_SUCCESS: {
            return {
                ...state,
                getLaporanRl_3_14: {
                    ...state.getLaporanRl_3_14,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case LAPORAN_RL_3_14_GET_ERROR: {
            return {
                ...state,
                getLaporanRl_3_14: {
                    ...state.getLaporanRl_3_14,
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
export default KendaliDokumen;