import {
    GET_ORDER_RESEP_QUERY,
    GET_ORDER_RESEP_QUERY_ERROR,
    GET_ORDER_RESEP_QUERY_SUCCESS
} from "./actionType";

const INIT_STATE = {
    getOrderResepQuery: {
        data: [],
        loading: false,
        error: null,
    },
    
};

const Emr = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ORDER_RESEP_QUERY: {
            return {
                ...state,
                getOrderResepQuery: {
                    ...state.getOrderResepQuery,
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_ORDER_RESEP_QUERY_SUCCESS: {
            return {
                ...state,
                getOrderResepQuery: {
                    ...state.getOrderResepQuery,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_ORDER_RESEP_QUERY_ERROR: {
            return {
                ...state,
                getOrderResepQuery: {
                    ...state.getOrderResepQuery,
                    loading: false,
                    error: action.payload,
                },
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default Emr;