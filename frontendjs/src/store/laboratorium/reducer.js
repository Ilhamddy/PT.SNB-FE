import { init } from "aos";
import {
    LABORATORIUM_RESET_FORM,
    WIDGET_DETAIL_JENIS_PRODUK_GET,
    WIDGET_DETAIL_JENIS_PRODUK_GET_SUCCESS,
    WIDGET_DETAIL_JENIS_PRODUK_GET_ERROR,
    SAVE_ORDER_PELAYANAN_LABORATORIUM,
    SAVE_ORDER_PELAYANAN_LABORATORIUM_SUCCESS,
    SAVE_ORDER_PELAYANAN_LABORATORIUM_ERROR,
    DAFTAR_ORDER_LABORATORIUM_GET,
    DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    WIDGET_DAFTAR_ORDER_LABORATORIUM_GET,
    WIDGET_DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    WIDGET_DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    LIST_DAFTAR_ORDER_LABORATORIUM_GET,
    LIST_DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS,
    LIST_DAFTAR_ORDER_LABORATORIUM_GET_ERROR,
    LIST_ORDER_LABORATORIUM_BY_NOREC_GET,
    LIST_ORDER_LABORATORIUM_BY_NOREC_GET_SUCCESS,
    LIST_ORDER_LABORATORIUM_BY_NOREC_GET_ERROR,
    UPDATE_TGLRENCANA_LABORATORIUM,
    UPDATE_TGLRENCANA_LABORATORIUM_SUCCESS,
    UPDATE_TGLRENCANA_LABORATORIUM_ERROR,
    SAVE_VERIFIKASI_LABORATORIUM,
    SAVE_VERIFIKASI_LABORATORIUM_SUCCESS,
    SAVE_VERIFIKASI_LABORATORIUM_ERROR,
    DAFTAR_PASIEN_LABORATORIUM,
    DAFTAR_PASIEN_LABORATORIUM_SUCCESS,
    DAFTAR_PASIEN_LABORATORIUM_ERROR,
    LIST_PELAYANAN_LABORATORIUM_GET,
    LIST_PELAYANAN_LABORATORIUM_GET_SUCCESS,
    LIST_PELAYANAN_LABORATORIUM_GET_ERROR,
    MASTER_PELAYANAN_LABORATORIUM_GET,
    MASTER_PELAYANAN_LABORATORIUM_GET_SUCCESS,
    MASTER_PELAYANAN_LABORATORIUM_GET_ERROR,
    COMBO_LABORATORIUM_GET,
    COMBO_LABORATORIUM_GET_SUCCESS,
    COMBO_LABORATORIUM_GET_ERROR,
    SAVE_NILAINORMAL_LABORATORIUM,
    SAVE_NILAINORMAL_LABORATORIUM_SUCCESS,
    SAVE_NILAINORMAL_LABORATORIUM_ERROR,
    SAVE_MASTER_KEL_UMUR_LABORATORIUM,
    SAVE_MASTER_KEL_UMUR_LABORATORIUM_SUCCESS,
    SAVE_MASTER_KEL_UMUR_LABORATORIUM_ERROR,
    LIST_DETAIL_KEL_UMUR_LABORATORIUM_GET,
    LIST_DETAIL_KEL_UMUR_LABORATORIUM_GET_SUCCESS,
    LIST_DETAIL_KEL_UMUR_LABORATORIUM_GET_ERROR,
} from "./actionType";

const INIT_STATE = {
    widgetDetailJenisProdukGet: {
        data: [],
        loading: false,
        error: null,
    },
    saveOrderPelayananLaboratorium: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    daftarOrderLaboratoriumGet: {
        data: [],
        loading: false,
        error: null,
    },
    widgetdaftarOrderLaboratoriumGet: {
        data: [],
        loading: false,
        error: null,
    },
    listdaftarOrderLaboratoriumGet: {
        data: [],
        loading: false,
        error: null,
    },
    listOrderLaboratoriumByNorecGet:{
        data:[],
        loading: false,
        error: null,
    },
    updateTglRencanaLaboratorium:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    saveVerifikasiLaboratorium:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    daftarPasienLaboratorium:{
        data: [],
        loading: false,
        error: null,
    },
    listPelayananLaboratoriumGet:{
        data:[],
        loading: false,
        error: null, 
    },
    masterPelayananLaboratoriumGet:{
        data:[],
        loading: false,
        error: null, 
    },
    comboLaboratoriumGet:{
        data:[],
        loading: false,
        error: null, 
    },
    saveNilaiNormalLaboratorium:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    saveMasterKelUmurLaboratorium:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    listDetailKelUmurGet:{
        data:[],
        loading: false,
        error: null, 
    },
}

const Laboratorium = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LABORATORIUM_RESET_FORM: {
            return {
                ...state,
                widgetDetailJenisProdukGet:{
                    ...INIT_STATE.widgetDetailJenisProdukGet
                },
                saveOrderPelayananLaboratorium:{
                    ...INIT_STATE.saveOrderPelayananLaboratorium
                },
                daftarOrderLaboratoriumGet:{
                    ...INIT_STATE.daftarOrderLaboratoriumGet
                },
                widgetdaftarOrderLaboratoriumGet:{
                    ...INIT_STATE.widgetdaftarOrderLaboratoriumGet
                },
                listdaftarOrderLaboratoriumGet:{
                    ...INIT_STATE.listdaftarOrderLaboratoriumGet
                },
                listOrderLaboratoriumByNorecGet:{
                    ...INIT_STATE.listOrderLaboratoriumByNorecGet
                },
                updateTglRencanaLaboratorium:{
                    ...INIT_STATE.updateTglRencanaLaboratorium
                },
                saveVerifikasiLaboratorium:{
                    ...INIT_STATE.saveVerifikasiLaboratorium
                },
                daftarPasienLaboratorium:{
                    ...INIT_STATE.daftarPasienLaboratorium
                },
                listPelayananLaboratoriumGet:{
                    ...INIT_STATE.listPelayananLaboratoriumGet
                },
                masterPelayananLaboratoriumGet:{
                    ...INIT_STATE.masterPelayananLaboratoriumGet
                },
                comboLaboratoriumGet:{
                    ...INIT_STATE.comboLaboratoriumGet
                },
                saveNilaiNormalLaboratorium:{
                    ...INIT_STATE.saveNilaiNormalLaboratorium
                },
                saveMasterKelUmurLaboratorium:{
                    ...INIT_STATE.saveMasterKelUmurLaboratorium
                },
                listDetailKelUmurGet:{
                    ...INIT_STATE.listDetailKelUmurGet
                },
            }
        }

        case WIDGET_DETAIL_JENIS_PRODUK_GET: {
            return {
                ...state,
                widgetDetailJenisProdukGet: {
                    ...state.widgetDetailJenisProdukGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_DETAIL_JENIS_PRODUK_GET_SUCCESS: {
            return {
                ...state,
                widgetDetailJenisProdukGet: {
                    ...state.widgetDetailJenisProdukGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_DETAIL_JENIS_PRODUK_GET_ERROR: {
            return {
                ...state,
                widgetDetailJenisProdukGet: {
                    ...state.widgetDetailJenisProdukGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_ORDER_PELAYANAN_LABORATORIUM: {
            return {
                ...state,
                saveOrderPelayananLaboratorium: {
                    ...state.saveOrderPelayananLaboratorium,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_ORDER_PELAYANAN_LABORATORIUM_SUCCESS: {
            return {
                ...state,
                saveOrderPelayananLaboratorium: {
                    ...state.saveOrderPelayananLaboratorium,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_ORDER_PELAYANAN_LABORATORIUM_ERROR: {
            return {
                ...state,
                saveOrderPelayananLaboratorium: {
                    ...state.saveOrderPelayananLaboratorium,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTAR_ORDER_LABORATORIUM_GET: {
            return {
                ...state,
                daftarOrderLaboratoriumGet: {
                    ...state.daftarOrderLaboratoriumGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS: {
            return {
                ...state,
                daftarOrderLaboratoriumGet: {
                    ...state.daftarOrderLaboratoriumGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTAR_ORDER_LABORATORIUM_GET_ERROR: {
            return {
                ...state,
                daftarOrderLaboratoriumGet: {
                    ...state.daftarOrderLaboratoriumGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case WIDGET_DAFTAR_ORDER_LABORATORIUM_GET: {
            return {
                ...state,
                widgetdaftarOrderLaboratoriumGet: {
                    ...state.widgetdaftarOrderLaboratoriumGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case WIDGET_DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS: {
            return {
                ...state,
                widgetdaftarOrderLaboratoriumGet: {
                    ...state.widgetdaftarOrderLaboratoriumGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case WIDGET_DAFTAR_ORDER_LABORATORIUM_GET_ERROR: {
            return {
                ...state,
                widgetdaftarOrderLaboratoriumGet: {
                    ...state.widgetdaftarOrderLaboratoriumGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_DAFTAR_ORDER_LABORATORIUM_GET: {
            return {
                ...state,
                listdaftarOrderLaboratoriumGet: {
                    ...state.listdaftarOrderLaboratoriumGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_DAFTAR_ORDER_LABORATORIUM_GET_SUCCESS: {
            return {
                ...state,
                listdaftarOrderLaboratoriumGet: {
                    ...state.listdaftarOrderLaboratoriumGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_DAFTAR_ORDER_LABORATORIUM_GET_ERROR: {
            return {
                ...state,
                listdaftarOrderLaboratoriumGet: {
                    ...state.listdaftarOrderLaboratoriumGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_ORDER_LABORATORIUM_BY_NOREC_GET: {
            return {
                ...state,
                listOrderLaboratoriumByNorecGet: {
                    ...state.listOrderLaboratoriumByNorecGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_ORDER_LABORATORIUM_BY_NOREC_GET_SUCCESS: {
            return {
                ...state,
                listOrderLaboratoriumByNorecGet: {
                    ...state.listOrderLaboratoriumByNorecGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_ORDER_LABORATORIUM_BY_NOREC_GET_ERROR: {
            return {
                ...state,
                listOrderLaboratoriumByNorecGet: {
                    ...state.listOrderLaboratoriumByNorecGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPDATE_TGLRENCANA_LABORATORIUM: {
            return {
                ...state,
                updateTglRencanaLaboratorium: {
                    ...state.updateTglRencanaLaboratorium,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPDATE_TGLRENCANA_LABORATORIUM_SUCCESS: {
            return {
                ...state,
                updateTglRencanaLaboratorium: {
                    ...state.updateTglRencanaLaboratorium,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case UPDATE_TGLRENCANA_LABORATORIUM_ERROR: {
            return {
                ...state,
                updateTglRencanaLaboratorium: {
                    ...state.updateTglRencanaLaboratorium,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_VERIFIKASI_LABORATORIUM: {
            return {
                ...state,
                saveVerifikasiLaboratorium: {
                    ...state.saveVerifikasiLaboratorium,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_VERIFIKASI_LABORATORIUM_SUCCESS: {
            return {
                ...state,
                saveVerifikasiLaboratorium: {
                    ...state.saveVerifikasiLaboratorium,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_VERIFIKASI_LABORATORIUM_ERROR: {
            return {
                ...state,
                saveVerifikasiLaboratorium: {
                    ...state.saveVerifikasiLaboratorium,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DAFTAR_PASIEN_LABORATORIUM: {
            return {
                ...state,
                daftarPasienLaboratorium: {
                    ...state.daftarPasienLaboratorium,
                    loading: true,
                    error: null,
                }
            }
        }

        case DAFTAR_PASIEN_LABORATORIUM_SUCCESS: {
            return {
                ...state,
                daftarPasienLaboratorium: {
                    ...state.daftarPasienLaboratorium,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case DAFTAR_PASIEN_LABORATORIUM_ERROR: {
            return {
                ...state,
                daftarPasienLaboratorium: {
                    ...state.daftarPasienLaboratorium,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_PELAYANAN_LABORATORIUM_GET: {
            return {
                ...state,
                listPelayananLaboratoriumGet: {
                    ...state.listPelayananLaboratoriumGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_PELAYANAN_LABORATORIUM_GET_SUCCESS: {
            return {
                ...state,
                listPelayananLaboratoriumGet: {
                    ...state.listPelayananLaboratoriumGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_PELAYANAN_LABORATORIUM_GET_ERROR: {
            return {
                ...state,
                listPelayananLaboratoriumGet: {
                    ...state.listPelayananLaboratoriumGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case MASTER_PELAYANAN_LABORATORIUM_GET: {
            return {
                ...state,
                masterPelayananLaboratoriumGet: {
                    ...state.masterPelayananLaboratoriumGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case MASTER_PELAYANAN_LABORATORIUM_GET_SUCCESS: {
            return {
                ...state,
                masterPelayananLaboratoriumGet: {
                    ...state.masterPelayananLaboratoriumGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case MASTER_PELAYANAN_LABORATORIUM_GET_ERROR: {
            return {
                ...state,
                masterPelayananLaboratoriumGet: {
                    ...state.masterPelayananLaboratoriumGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_LABORATORIUM_GET: {
            return {
                ...state,
                comboLaboratoriumGet: {
                    ...state.comboLaboratoriumGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_LABORATORIUM_GET_SUCCESS: {
            return {
                ...state,
                comboLaboratoriumGet: {
                    ...state.comboLaboratoriumGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_LABORATORIUM_GET_ERROR: {
            return {
                ...state,
                comboLaboratoriumGet: {
                    ...state.comboLaboratoriumGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_NILAINORMAL_LABORATORIUM: {
            return {
                ...state,
                saveNilaiNormalLaboratorium: {
                    ...state.saveNilaiNormalLaboratorium,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_NILAINORMAL_LABORATORIUM_SUCCESS: {
            return {
                ...state,
                saveNilaiNormalLaboratorium: {
                    ...state.saveNilaiNormalLaboratorium,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_NILAINORMAL_LABORATORIUM_ERROR: {
            return {
                ...state,
                saveNilaiNormalLaboratorium: {
                    ...state.saveNilaiNormalLaboratorium,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_MASTER_KEL_UMUR_LABORATORIUM: {
            return {
                ...state,
                saveMasterKelUmurLaboratorium: {
                    ...state.saveMasterKelUmurLaboratorium,
                    loading: true,
                    error: null,
                }
            }
        }

        case SAVE_MASTER_KEL_UMUR_LABORATORIUM_SUCCESS: {
            return {
                ...state,
                saveMasterKelUmurLaboratorium: {
                    ...state.saveMasterKelUmurLaboratorium,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case SAVE_MASTER_KEL_UMUR_LABORATORIUM_ERROR: {
            return {
                ...state,
                saveMasterKelUmurLaboratorium: {
                    ...state.saveMasterKelUmurLaboratorium,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_DETAIL_KEL_UMUR_LABORATORIUM_GET: {
            return {
                ...state,
                listDetailKelUmurGet: {
                    ...state.listDetailKelUmurGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_DETAIL_KEL_UMUR_LABORATORIUM_GET_SUCCESS: {
            return {
                ...state,
                listDetailKelUmurGet: {
                    ...state.listDetailKelUmurGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_DETAIL_KEL_UMUR_LABORATORIUM_GET_ERROR: {
            return {
                ...state,
                listDetailKelUmurGet: {
                    ...state.listDetailKelUmurGet,
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
export default Laboratorium;