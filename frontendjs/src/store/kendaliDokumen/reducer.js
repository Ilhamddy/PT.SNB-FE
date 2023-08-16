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
    COMBO_LAPORAN_REKAMMEDIS_GET_ERROR
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

        default: {
            return { ...state };
        }
    }
}
export default KendaliDokumen;