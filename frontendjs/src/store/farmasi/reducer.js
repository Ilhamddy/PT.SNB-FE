import {
    GET_ORDER_RESEP_QUERY,
    GET_ORDER_RESEP_QUERY_ERROR,
    GET_ORDER_RESEP_QUERY_SUCCESS,
    GET_ORDER_RESEP_FROM_NOREC,
    GET_ORDER_RESEP_FROM_NOREC_ERROR,
    GET_ORDER_RESEP_FROM_NOREC_SUCCESS,
    CREATE_OR_UPDATE_VERIF_RESEP,
    CREATE_OR_UPDATE_VERIF_RESEP_SUCCESS,
    CREATE_OR_UPDATE_VERIF_RESEP_ERROR
} from "./actionType";

const INIT_STATE = {
    getOrderResepQuery: {
        data: [],
        loading: false,
        error: null,
    },
    getOrderResepFromNorec: {
        data: [],
        loading: false,
        error: null,
    },
    createOrUpdateVerifResep: {
        data: [],
        loading: false,
        error: null,
    },
    
};

const Farmasi = (state = INIT_STATE, action) => {
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

        case GET_ORDER_RESEP_FROM_NOREC: {
            return {
                ...state,
                getOrderResepFromNorec: {
                    ...state.getOrderResepFromNorec,
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_ORDER_RESEP_FROM_NOREC_SUCCESS: {
            return {
                ...state,
                getOrderResepFromNorec: {
                    ...state.getOrderResepFromNorec,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case GET_ORDER_RESEP_FROM_NOREC_ERROR: {
            return {
                ...state,
                getOrderResepFromNorec: {
                    ...state.getOrderResepFromNorec,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_VERIF_RESEP: {
            return {
                ...state,
                createOrUpdateVerifResep: {
                    ...state.createOrUpdateVerifResep,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case CREATE_OR_UPDATE_VERIF_RESEP_SUCCESS: {
            return {
                ...state,
                createOrUpdateVerifResep: {
                    ...state.createOrUpdateVerifResep,
                    loading: false,
                    data: action.payload,
                },
            };
        }

        case CREATE_OR_UPDATE_VERIF_RESEP_ERROR: {
            return {
                ...state,
                createOrUpdateVerifResep: {
                    ...state.createOrUpdateVerifResep,
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

export default Farmasi;