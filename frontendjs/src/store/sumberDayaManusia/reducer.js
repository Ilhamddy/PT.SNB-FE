import {
    SDM_RESET_FORM,
    GET_DAFTAR_PEGAWAI, GET_DAFTAR_PEGAWAI_SUCCESS, GET_DAFTAR_PEGAWAI_ERROR,
    GET_COMBO_SDM, GET_COMBO_SDM_SUCCESS, GET_COMBO_SDM_ERROR,
    SAVE_BIODATA_PEGAWAI, SAVE_BIODATA_PEGAWAI_SUCCESS, SAVE_BIODATA_PEGAWAI_ERROR,
    GET_PEGAWAI_BYID, GET_PEGAWAI_BYID_SUCCESS, GET_PEGAWAI_BYID_ERROR,
    GET_USER_ROLE_BYID_PEGAWAI, GET_USER_ROLE_BYID_PEGAWAI_SUCCESS, GET_USER_ROLE_BYID_PEGAWAI_ERROR,
    SAVE_SIGNUP_USER_ROLE, SAVE_SIGNUP_USER_ROLE_SUCCESS, SAVE_SIGNUP_USER_ROLE_ERROR
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
    saveBiodataPegawai: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getPegawaiById: {
        data: [],
        loading: false,
        error: null,
    },
    getUserRoleById: {
        data: [],
        loading: false,
        error: null,
    },
    saveSignupUserRole:{
        newData: null,
        loading: false,
        error: null,
        success: false
    }
}

const sumberDayaManusia = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SDM_RESET_FORM: {
            return {
                ...state,
                getDaftarPegawai: {
                    ...INIT_STATE.getDaftarPegawai
                },
                getComboSDM: {
                    ...INIT_STATE.getComboSDM
                },
                saveBiodataPegawai: {
                    ...INIT_STATE.saveBiodataPegawai
                },
                getPegawaiById: {
                    ...INIT_STATE.getPegawaiById
                },
                getUserRoleById:{
                    ...INIT_STATE.getUserRoleById
                },
                saveSignupUserRole:{
                    ...INIT_STATE.saveSignupUserRole
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

        case SAVE_BIODATA_PEGAWAI: {
            return {
                ...state,
                saveBiodataPegawai: {
                    ...state.saveBiodataPegawai,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case SAVE_BIODATA_PEGAWAI_SUCCESS: {
            return {
                ...state,
                saveBiodataPegawai: {
                    ...state.saveBiodataPegawai,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case SAVE_BIODATA_PEGAWAI_ERROR: {
            return {
                ...state,
                saveBiodataPegawai: {
                    ...state.saveBiodataPegawai,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_PEGAWAI_BYID: {
            return {
                ...state,
                getPegawaiById: {
                    ...state.getPegawaiById,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_PEGAWAI_BYID_SUCCESS: {
            return {
                ...state,
                getPegawaiById: {
                    ...state.getPegawaiById,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_PEGAWAI_BYID_ERROR: {
            return {
                ...state,
                getPegawaiById: {
                    ...state.getPegawaiById,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_USER_ROLE_BYID_PEGAWAI: {
            return {
                ...state,
                getUserRoleById: {
                    ...state.getUserRoleById,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_USER_ROLE_BYID_PEGAWAI_SUCCESS: {
            return {
                ...state,
                getUserRoleById: {
                    ...state.getUserRoleById,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_USER_ROLE_BYID_PEGAWAI_ERROR: {
            return {
                ...state,
                getUserRoleById: {
                    ...state.getUserRoleById,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_SIGNUP_USER_ROLE: {
            return {
                ...state,
                saveSignupUserRole: {
                    ...state.saveSignupUserRole,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case SAVE_SIGNUP_USER_ROLE_SUCCESS: {
            return {
                ...state,
                saveSignupUserRole: {
                    ...state.saveSignupUserRole,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case SAVE_SIGNUP_USER_ROLE_ERROR: {
            return {
                ...state,
                saveSignupUserRole: {
                    ...state.saveSignupUserRole,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        default: {
            return { ...state };
        }
    }
}
export default sumberDayaManusia;