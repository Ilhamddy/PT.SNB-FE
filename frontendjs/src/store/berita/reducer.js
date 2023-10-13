import { init } from "aos";
import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
    UPLOAD_BERITA,
    UPLOAD_BERITA_SUCCESS,
    UPLOAD_BERITA_ERROR,
    GET_LIST_BERITA,
    GET_LIST_BERITA_SUCCESS,
    GET_LIST_BERITA_ERROR,
    GET_BERITA_NOREC,
    GET_BERITA_NOREC_SUCCESS,
    GET_BERITA_NOREC_ERROR,
} from "./actionType";

const INIT_STATE = {
    uploadImage: {
        data: [],
        loading: false,
        error: null,
    },
    uploadBerita: {
        data: [],
        loading: false,
        error: null,
    },
    getListBerita: {
        data: [],
        loading: false,
        error: null,
    },
    getBeritaNorec: {
        data: [],
        loading: false,
        error: null,
    }
}

const Berita = (state= INIT_STATE,action)=>{
    switch (action.type) {
        
        case UPLOAD_IMAGE: {
            return {
                ...state,
                uploadImage: {
                    ...state.listCariPasienGet,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                uploadImage: {
                    ...state.listCariPasienGet,
                    data: action.payload.dataResp,
                    loading: false,
                    error: null,
                }
            }
        }

        case UPLOAD_IMAGE_ERROR: {
            return {
                ...state,
                uploadImage: {
                    ...state.listCariPasienGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPLOAD_BERITA: {
            return {
                ...state,
                uploadBerita: {
                    ...state.listCariPasienGet,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case UPLOAD_BERITA_SUCCESS: {
            return {
                ...state,
                uploadBerita: {
                    ...state.listCariPasienGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                }
            }
        }

        case UPLOAD_BERITA_ERROR: {
            return {
                ...state,
                uploadBerita: {
                    ...state.listCariPasienGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_LIST_BERITA: {
            return {
                ...state,
                getListBerita: {
                    ...state.listCariPasienGet,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LIST_BERITA_SUCCESS: {
            return {
                ...state,
                getListBerita: {
                    ...state.listCariPasienGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                }
            }
        }

        case GET_LIST_BERITA_ERROR: {
            return {
                ...state,
                getListBerita: {
                    ...state.listCariPasienGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_BERITA_NOREC: {
            return {
                ...state,
                getBeritaNorec: {
                    ...state.listCariPasienGet,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_BERITA_NOREC_SUCCESS: {
            return {
                ...state,
                getBeritaNorec: {
                    ...state.listCariPasienGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                }
            }
        }

        case GET_BERITA_NOREC_ERROR: {
            return {
                ...state,
                getBeritaNorec: {
                    ...state.listCariPasienGet,
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
export default Berita;
