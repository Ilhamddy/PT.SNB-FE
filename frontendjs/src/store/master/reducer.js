import {
    MASTER_GET,
    MASTER_GET_SUCCESS,
    MASTER_GET_ERROR
} from "./actionType";

const INIT_STATE = {
    masterGet: {
        data: [],
        loading: false,
        error: null,
    },
};

const Master = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MASTER_GET: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case MASTER_GET_SUCCESS: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case MASTER_GET_ERROR: {
            return {
                ...state,
                masterGet: {
                    ...state.masterGet,
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

export default Master;