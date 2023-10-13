import {
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
    GET_COMBO_JADWAL,
    GET_COMBO_JADWAL_SUCCESS,
    GET_COMBO_JADWAL_ERROR,
    GET_BERITA_HOME,
    GET_BERITA_HOME_SUCCESS,
    GET_BERITA_HOME_ERROR,
    GET_BERITA_QUERY,
    GET_BERITA_QUERY_SUCCESS,
    GET_BERITA_QUERY_ERROR
} from "./actionType";

const INIT_STATE = {
    getJadwalDokter: {
        data: [],
        loading: false,
        error: null,
    },
    getComboJadwal: {
        data: [],
        loading: false,
        error: null,
    },
    getBeritaHome: {
        data: [],
        loading: false,
        error: null,
    },
    getBeritaQuery: {
        data: [],
        loading: false,
        error: null,
    },
}

const login = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_JADWAL_DOKTER: 
            return {
                ...state,
                getJadwalDokter: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
            
        case GET_JADWAL_DOKTER_SUCCESS:
            return {
                ...state,
                getJadwalDokter: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_JADWAL_DOKTER_ERROR:
            return {
                ...state,
                getJadwalDokter: {
                    ...state.loginUser,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        
        case GET_COMBO_JADWAL: 
            return {
                ...state,
                getComboJadwal: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_COMBO_JADWAL_SUCCESS:
            return {
                ...state,
                getComboJadwal: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        
        case GET_COMBO_JADWAL_ERROR:
            return {
                ...state,
                getComboJadwal: {
                    ...state.loginUser,
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_BERITA_HOME:
            return {
                ...state,
                getBeritaHome: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_BERITA_HOME_SUCCESS:
            return {
                ...state,
                getBeritaHome: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_BERITA_HOME_ERROR:
            return {
                ...state,
                getBeritaHome: {
                    ...state.loginUser,
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_BERITA_QUERY:
            return {
                ...state,
                getBeritaQuery: {
                    ...state.loginUser,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_BERITA_QUERY_SUCCESS:
            return {
                ...state,
                getBeritaQuery: {
                    ...state.loginUser,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_BERITA_QUERY_ERROR:
            return {
                ...state,
                getBeritaQuery: {
                    ...state.loginUser,
                    loading: false,
                    error: action.payload,
                },
            };

        default:
            return { ...state };
    }
};


export default login;