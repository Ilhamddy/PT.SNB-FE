import { init } from "aos";
import {
    CASEMIX_RESET_FORM,
    LIST_CARI_PASIEN_GET,
    LIST_CARI_PASIEN_GET_SUCCESS,
    LIST_CARI_PASIEN_GET_ERROR,
    LIST_DAFTAR_PASIEN_GET,
    LIST_DAFTAR_PASIEN_GET_SUCCESS,
    LIST_DAFTAR_PASIEN_GET_ERROR
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

        default: {
            return { ...state };
        }
    }
}
export default Casemix;
