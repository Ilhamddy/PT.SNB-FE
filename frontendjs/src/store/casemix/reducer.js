import { init } from "aos";
import {
    CASEMIX_RESET_FORM,
    LIST_CARI_PASIEN_GET,
    LIST_CARI_PASIEN_GET_SUCCESS,
    LIST_CARI_PASIEN_GET_ERROR,
    LIST_DAFTAR_PASIEN_GET,
    LIST_DAFTAR_PASIEN_GET_SUCCESS,
    LIST_DAFTAR_PASIEN_GET_ERROR,
    LIST_TARIF_PASIEN_GET,
    LIST_TARIF_PASIEN_GET_SUCCESS,
    LIST_TARIF_PASIEN_GET_ERROR,
    LISTDIAGNOSAX_GET,
    LISTDIAGNOSAX_GET_SUCCESS,
    LISTDIAGNOSAX_GET_ERROR,
    LISTDIAGNOSAIX_GET,
    LISTDIAGNOSAIX_GET_SUCCESS,
    LISTDIAGNOSAIX_GET_ERROR,
    BRIDGING_INACBG_SAVE,
    BRIDGING_INACBG_SAVE_SUCCESS,
    BRIDGING_INACBG_SAVE_ERROR,
    TARIF_KLAIM_SAVE,
    TARIF_KLAIM_SAVE_SUCCESS,
    TARIF_KLAIM_SAVE_ERROR,
    LIST_CMGOPTIONS_GET,
    LIST_CMGOPTIONS_GET_SUCCESS,
    LIST_CMGOPTIONS_GET_ERROR,
    STATUS_KLAIM_SAVE,
    STATUS_KLAIM_SAVE_SUCCESS,
    STATUS_KLAIM_SAVE_ERROR,
    TARIF_CMGOPTIONS_SAVE,
    TARIF_CMGOPTIONS_SAVE_SUCCESS,
    TARIF_CMGOPTIONS_SAVE_ERROR
} from "./actionType";

const INIT_STATE = {
    listCariPasienGet: {
        data: [],
        loading: false,
        error: null,
    },
    listDaftarPasienGet: {
        data: [],
        loading: false,
        error: null,
    },
    listTarifPasienGet: {
        data: [],
        loading: false,
        error: null,
    },
    listDiagnosaxGet: {
        data: [],
        loading: false,
        error: null,
    },
    listDiagnosaixGet: {
        data: [],
        loading: false,
        error: null,
    },
    bridgingInacbgSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    tarifKlaimSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    listCmgOptionsGet: {
        data: [],
        loading: false,
        error: null,
    },
    statusKlaimSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    tarifCmgOptionsSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
}

const Casemix = (state= INIT_STATE,action)=>{
    switch (action.type) {
        case CASEMIX_RESET_FORM: {
            return {
                ...state,
                listCariPasienGet:{
                    ...INIT_STATE.listCariPasienGet
                },
                listDaftarPasienGet:{
                    ...INIT_STATE.listDaftarPasienGet
                },
                listTarifPasienGet:{
                    ...INIT_STATE.listTarifPasienGet
                },
                listDiagnosaxGet:{
                    ...INIT_STATE.listDiagnosaxGet
                },
                listDiagnosaixGet:{
                    ...INIT_STATE.listDiagnosaixGet
                },
                bridgingInacbgSave:{
                    ...INIT_STATE.bridgingInacbgSave
                },
                tarifKlaimSave:{
                    ...INIT_STATE.tarifKlaimSave
                },
                listCmgOptionsGet:{
                    ...INIT_STATE.listCmgOptionsGet
                },
                statusKlaimSave:{
                    ...INIT_STATE.statusKlaimSave
                },
                tarifCmgOptionsSave:{
                    ...INIT_STATE.tarifCmgOptionsSave
                }
            }
        }

        case LIST_CARI_PASIEN_GET: {
            return {
                ...state,
                listCariPasienGet: {
                    ...state.listCariPasienGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_CARI_PASIEN_GET_SUCCESS: {
            return {
                ...state,
                listCariPasienGet: {
                    ...state.listCariPasienGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_CARI_PASIEN_GET_ERROR: {
            return {
                ...state,
                listCariPasienGet: {
                    ...state.listCariPasienGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_DAFTAR_PASIEN_GET: {
            return {
                ...state,
                listDaftarPasienGet: {
                    ...state.listDaftarPasienGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_DAFTAR_PASIEN_GET_SUCCESS: {
            return {
                ...state,
                listDaftarPasienGet: {
                    ...state.listDaftarPasienGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_DAFTAR_PASIEN_GET_ERROR: {
            return {
                ...state,
                listDaftarPasienGet: {
                    ...state.listDaftarPasienGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_TARIF_PASIEN_GET: {
            return {
                ...state,
                listTarifPasienGet: {
                    ...state.listTarifPasienGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_TARIF_PASIEN_GET_SUCCESS: {
            return {
                ...state,
                listTarifPasienGet: {
                    ...state.listTarifPasienGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_TARIF_PASIEN_GET_ERROR: {
            return {
                ...state,
                listTarifPasienGet: {
                    ...state.listTarifPasienGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LISTDIAGNOSAX_GET: {
            return {
                ...state,
                listDiagnosaxGet: {
                    ...state.listDiagnosaxGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LISTDIAGNOSAX_GET_SUCCESS: {
            return {
                ...state,
                listDiagnosaxGet: {
                    ...state.listDiagnosaxGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LISTDIAGNOSAX_GET_ERROR: {
            return {
                ...state,
                listDiagnosaxGet: {
                    ...state.listDiagnosaxGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LISTDIAGNOSAIX_GET: {
            return {
                ...state,
                listDiagnosaixGet: {
                    ...state.listDiagnosaixGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LISTDIAGNOSAIX_GET_SUCCESS: {
            return {
                ...state,
                listDiagnosaixGet: {
                    ...state.listDiagnosaixGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LISTDIAGNOSAIX_GET_ERROR: {
            return {
                ...state,
                listDiagnosaixGet: {
                    ...state.listDiagnosaixGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case BRIDGING_INACBG_SAVE: {
            return {
                ...state,
                bridgingInacbgSave: {
                    ...state.bridgingInacbgSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case BRIDGING_INACBG_SAVE_SUCCESS: {
            return {
                ...state,
                bridgingInacbgSave: {
                    ...state.bridgingInacbgSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case BRIDGING_INACBG_SAVE_ERROR: {
            return {
                ...state,
                bridgingInacbgSave: {
                    ...state.bridgingInacbgSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case TARIF_KLAIM_SAVE: {
            return {
                ...state,
                tarifKlaimSave: {
                    ...state.tarifKlaimSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case TARIF_KLAIM_SAVE_SUCCESS: {
            return {
                ...state,
                tarifKlaimSave: {
                    ...state.tarifKlaimSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case TARIF_KLAIM_SAVE_ERROR: {
            return {
                ...state,
                tarifKlaimSave: {
                    ...state.tarifKlaimSave,
                    loading: false,
                    error: action.error,
                }
            }
        }
        
        case LIST_CMGOPTIONS_GET: {
            return {
                ...state,
                listCmgOptionsGet: {
                    ...state.listCmgOptionsGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_CMGOPTIONS_GET_SUCCESS: {
            return {
                ...state,
                listCmgOptionsGet: {
                    ...state.listCmgOptionsGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_CMGOPTIONS_GET_ERROR: {
            return {
                ...state,
                listCmgOptionsGet: {
                    ...state.listCmgOptionsGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case STATUS_KLAIM_SAVE: {
            return {
                ...state,
                statusKlaimSave: {
                    ...state.statusKlaimSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case STATUS_KLAIM_SAVE_SUCCESS: {
            return {
                ...state,
                statusKlaimSave: {
                    ...state.statusKlaimSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case STATUS_KLAIM_SAVE_ERROR: {
            return {
                ...state,
                statusKlaimSave: {
                    ...state.statusKlaimSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case TARIF_CMGOPTIONS_SAVE: {
            return {
                ...state,
                tarifCmgOptionsSave: {
                    ...state.tarifCmgOptionsSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case TARIF_CMGOPTIONS_SAVE_SUCCESS: {
            return {
                ...state,
                tarifCmgOptionsSave: {
                    ...state.tarifCmgOptionsSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case TARIF_CMGOPTIONS_SAVE_ERROR: {
            return {
                ...state,
                tarifCmgOptionsSave: {
                    ...state.tarifCmgOptionsSave,
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
export default Casemix;
