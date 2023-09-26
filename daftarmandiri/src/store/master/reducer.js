import {
    GET_ALL_MASTER,
    GET_ALL_MASTER_SUCCESS,
    GET_ALL_MASTER_ERROR,
} from "./actionType";

const INIT_STATE = {
    getAllMaster: {
        data: [],
        loading: false,
        error: null,
    },
}

const login = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_MASTER: 
            return {
                ...state,
                getAllMaster: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
            
        case GET_ALL_MASTER_SUCCESS:
            return {
                ...state,
                getAllMaster: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_ALL_MASTER_ERROR:
            return {
                ...state,
                getAllMaster: {
                    ...state.loginUser,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        default:
            return { ...state };
    }
};


export default login;