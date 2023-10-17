import {
    SDM_RESET_FORM,
    GET_DAFTAR_PEGAWAI, GET_DAFTAR_PEGAWAI_SUCCESS, GET_DAFTAR_PEGAWAI_ERROR,
    GET_COMBO_SDM,GET_COMBO_SDM_SUCCESS,GET_COMBO_SDM_ERROR
} from "./actionType";

const INIT_STATE = {
    getDaftarPegawai: {
        data: [],
        loading: false,
        error: null,
    },
    getComboSDM: {
        data: [],
        loading: false,
        error: null,
    },
}

const sumberDayaManusia = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SDM_RESET_FORM: {
            return {
                ...state,
                getDaftarPegawai:{
                    ...INIT_STATE.getDaftarPegawai
                },
                getComboSDM:{
                    ...INIT_STATE.getComboSDM
                }
            }
        }

        case GET_DAFTAR_PEGAWAI: {
            return {
                ...state,
                getDaftarPegawai: {
                    ...state.getDaftarPegawai,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_DAFTAR_PEGAWAI_SUCCESS: {
            return {
                ...state,
                getDaftarPegawai: {
                    ...state.getDaftarPegawai,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_DAFTAR_PEGAWAI_ERROR: {
            return {
                ...state,
                getDaftarPegawai: {
                    ...state.getDaftarPegawai,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_COMBO_SDM: {
            return {
                ...state,
                getComboSDM: {
                    ...state.getComboSDM,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_SDM_SUCCESS: {
            return {
                ...state,
                getComboSDM: {
                    ...state.getComboSDM,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_SDM_ERROR: {
            return {
                ...state,
                getComboSDM: {
                    ...state.getComboSDM,
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
export default sumberDayaManusia;