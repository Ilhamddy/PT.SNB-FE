import {
    GET_JADWAL_DOKTER,
    GET_JADWAL_DOKTER_SUCCESS,
    GET_JADWAL_DOKTER_ERROR,
} from "./actionType";

const INIT_STATE = {
    getJadwalDokter: {
        data: [],
        loading: false,
        error: null,
    },
}

const daftarPasienLama = (state = INIT_STATE, action) => {
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

        
        default:
            return { ...state };
    }
};


export default daftarPasienLama;