import { init } from "aos";
import {
    GET_LOG,
    GET_LOG_SUCCESS,
    GET_LOG_ERROR,
} from "./actionType";

const INIT_STATE = {
    getLog: {
        data: [],
        loading: false,
        error: null,
    },
}

const Berita = (state= INIT_STATE,action)=>{
    switch (action.type) {
        
        case GET_LOG: {
            return {
                ...state,
                getLog: {
                    ...state.getLog,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LOG_SUCCESS: {
            return {
                ...state,
                getLog: {
                    ...state.getLog,
                    data: action.payload.data,
                    loading: false,
                    error: null,
                }
            }
        }

        case GET_LOG_ERROR: {
            return {
                ...state,
                getLog: {
                    ...state.getLog,
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
