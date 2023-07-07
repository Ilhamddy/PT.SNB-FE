import {
    PELAYANAN_FROM_ANTREAN_GET,
    PELAYANAN_FROM_ANTREAN_GET_SUCCESS,
    PELAYANAN_FROM_ANTREAN_GET_ERROR,
    PELAYANAN_FROM_ANTREAN_GET_RESET,
    NOTA_VERIF_CREATE,
    NOTA_VERIF_CREATE_SUCCESS,
    NOTA_VERIF_CREATE_ERROR,
    NOTA_VERIF_CREATE_RESET
} from "./actionType";

const INIT_STATE = {
    pelayananFromNoAntrianGet: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    notaVerifCreate: {
        data: [],
        loading: false,
        success: false,
        error: null,
    }
}

const payment = (state = INIT_STATE, action) => {
    switch (action.type) {
        case PELAYANAN_FROM_ANTREAN_GET:
            return {
                ...state,
                pelayananFromNoAntrianGet: {
                    ...state.pelayananFromNoAntrianGet,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        case PELAYANAN_FROM_ANTREAN_GET_SUCCESS:
            return {
                ...state,
                pelayananFromNoAntrianGet: {
                    ...state.pelayananFromNoAntrianGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case PELAYANAN_FROM_ANTREAN_GET_ERROR:
            return {
                ...state,
                pelayananFromNoAntrianGet: {
                    ...state.pelayananFromNoAntrianGet,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case PELAYANAN_FROM_ANTREAN_GET_RESET:
            return {
                ...state,
                pelayananFromNoAntrianGet: {
                    ...state.pelayananFromNoAntrianGet,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };
        case NOTA_VERIF_CREATE:
            return {
                ...state,
                notaVerifCreate: {
                    ...state.notaVerifCreate,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        case NOTA_VERIF_CREATE_SUCCESS:
            return {
                ...state,
                notaVerifCreate: {
                    ...state.notaVerifCreate,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case NOTA_VERIF_CREATE_ERROR:
            return {
                ...state,
                notaVerifCreate: {
                    ...state.notaVerifCreate,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case NOTA_VERIF_CREATE_RESET:
            return {
                ...state,
                notaVerifCreate: {
                    ...state.notaVerifCreate,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };
            
        default:
            return { ...state };
    }
};
  

export default payment;