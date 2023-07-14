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
    LISTDIAGNOSAIX_GET_ERROR
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

        default: {
            return { ...state };
        }
    }
}
export default Casemix;
