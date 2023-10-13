import { init } from "aos";
import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
    UPLOAD_BERITA,
    UPLOAD_BERITA_SUCCESS,
    UPLOAD_BERITA_ERROR
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

        default: {
            return { ...state };
        }
    }
}
export default Berita;
