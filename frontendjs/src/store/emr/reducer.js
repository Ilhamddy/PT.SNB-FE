import {
    EMR_RESET_FORM,
    EMR_HEADER_GET,
    EMR_HEADER_GET_SUCCESS,
    EMR_HEADER_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    emrHeaderGet: {
        data: [],
        loading: false,
        error: null,
    },
};

const Emr = (state = INIT_STATE, action) => {
    switch (action.type) {
        case EMR_RESET_FORM: {
            return {
                ...state,
                emrHeaderGet:{
                    ...INIT_STATE.emrHeaderGet,
                },
            }
        }

        case EMR_HEADER_GET: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_HEADER_GET_SUCCESS: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_HEADER_GET_ERROR: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    loading: false,
                    error: action.error,
                }
            }
        }


        default: {
            return { ...state };
        }
    }
};

export default Emr;