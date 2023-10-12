import { init } from "aos";
import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
} from "./actionType";

const INIT_STATE = {
    uploadImage: {
        data: [],
        loading: false,
        error: null,
    },
}

const Berita = (state= INIT_STATE,action)=>{
    switch (action.type) {
        

        case UPLOAD_IMAGE: {
            return {
                ...state,
                listCariPasienGet: {
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
                listCariPasienGet: {
                    ...state.listCariPasienGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                }
            }
        }

        case UPLOAD_IMAGE_ERROR: {
            return {
                ...state,
                listCariPasienGet: {
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
