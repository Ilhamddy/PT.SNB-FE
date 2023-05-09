import {
    GET_REGISTRASI_LIST,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_REGISTRASI_SUCCESS,
    ADD_REGISTRASI_FAIL,
    UPDATE_REGISTRASI_SUCCESS,
    UPDATE_REGISTRASI_FAIL,
    DELETE_REGISTRASI_SUCCESS,
    DELETE_REGISTRASI_FAIL,
} from "./actionType";

const INIT_STATE = {
    registrasiList: [],
};

const Registrasi = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_REGISTRASI_LIST:
                    return {
                        ...state,
                        REGISTRASIList: action.payload.data,
                        isRegistrasiCreated: false,
                        isRegistrasiSuccess: true
                    };

                default:
                    return { ...state };
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_REGISTRASI_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                        isRegistrasiCreated: false,
                        isRegistrasiSuccess: true
                    };

                default:
                    return { ...state };
            }

        case GET_REGISTRASI_LIST: {
            return {
                ...state,
                isRegistrasiCreated: false
            };
        }

        case ADD_REGISTRASI_SUCCESS:
            return {
                ...state,
                isRegistrasiCreated: true,
                REGISTRASIList: [...state.REGISTRASIList, action.payload.data],
                isRegistrasiAdd: true,
                isRegistrasiAddFail: false,
            };

        case ADD_REGISTRASI_FAIL:
            return {
                ...state,
                error: action.payload,
                isRegistrasiAdd: false,
                isRegistrasiAddFail: true,
            };

        case UPDATE_REGISTRASI_SUCCESS:
            return {
                ...state,
                REGISTRASIList: state.REGISTRASIList.map(registrasi =>
                    registrasi._id.toString() === action.payload.data._id.toString()
                        ? { ...registrasi, ...action.payload.data }
                        : registrasi
                ),
                isRegistrasiUpdate: true,
                isRegistrasiUpdateFail: false
            };

        case UPDATE_REGISTRASI_FAIL:
            return {
                ...state,
                error: action.payload,
                isRegistrasiUpdate: false,
                isRegistrasiUpdateFail: true
            };

        case DELETE_REGISTRASI_SUCCESS:
            return {
                ...state,
                REGISTRASIList: state.REGISTRASIList.filter(
                    registrasi => registrasi._id.toString() !== action.payload.registrasi.toString()
                ),
                isRegistrasiDelete: true,
                isRegistrasiDeleteFail: false
            };

        case DELETE_REGISTRASI_FAIL:
            return {
                ...state,
                error: action.payload,
                isRegistrasiDelete: false,
                isRegistrasiDeleteFail: true
            };

        default:
            return { ...state };
    }
};

export default Registrasi;