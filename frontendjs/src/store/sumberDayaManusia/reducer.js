import {
    SDM_RESET_FORM,
    GET_DAFTAR_PEGAWAI, GET_DAFTAR_PEGAWAI_SUCCESS, GET_DAFTAR_PEGAWAI_ERROR,
    GET_COMBO_SDM, GET_COMBO_SDM_SUCCESS, GET_COMBO_SDM_ERROR,
    SAVE_BIODATA_PEGAWAI, SAVE_BIODATA_PEGAWAI_SUCCESS, SAVE_BIODATA_PEGAWAI_ERROR,
    GET_PEGAWAI_BYID, GET_PEGAWAI_BYID_SUCCESS, GET_PEGAWAI_BYID_ERROR,
    GET_USER_ROLE_BYID_PEGAWAI, GET_USER_ROLE_BYID_PEGAWAI_SUCCESS, GET_USER_ROLE_BYID_PEGAWAI_ERROR,
    SAVE_SIGNUP_USER_ROLE, SAVE_SIGNUP_USER_ROLE_SUCCESS, SAVE_SIGNUP_USER_ROLE_ERROR,
    GET_COMBO_JADWAL,
    GET_COMBO_JADWAL_SUCCESS,
    GET_COMBO_JADWAL_ERROR,
    GET_JADWAL_DOKTER_SDM,
    GET_JADWAL_DOKTER_SDM_SUCCESS,
    GET_JADWAL_DOKTER_SDM_ERROR, 
    UPSERT_JADWAL,
    UPSERT_JADWAL_SUCCESS,
    UPSERT_JADWAL_ERROR,
    UPDATE_RESET_PASSWORD,
    UPDATE_RESET_PASSWORD_SUCCESS,
    UPDATE_RESET_PASSWORD_ERROR,
    GET_LIBUR_PEGAWAI,
    GET_LIBUR_PEGAWAI_SUCCESS,
    GET_LIBUR_PEGAWAI_ERROR,
    GET_COMBO_CUTI,
    GET_COMBO_CUTI_SUCCESS,
    GET_COMBO_CUTI_ERROR,
    UPSERT_CUTI,
    UPSERT_CUTI_SUCCESS,
    UPSERT_CUTI_ERROR,
    BATAL_CUTI,
    BATAL_CUTI_SUCCESS,
    BATAL_CUTI_ERROR,
    GET_PEGAWAI_INPUT,
    GET_PEGAWAI_INPUT_SUCCESS,
    GET_PEGAWAI_INPUT_ERROR,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_ERROR
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
    getComboJadwal: {
        data: [],
        loading: false,
        error: null,
    },
    saveSignupUserRole:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getJadwalDokterSDM: {
        data: [],
        loading: false,
        error: null,
    },
    upsertJadwal:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    updateResetPassword:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getLiburPegawai: {
        data: [],
        loading: false,
        error: null,
    },
    getComboCuti: {
        data: [],
        loading: false,
        error: null,
    },
    upsertCuti: {
        data: [],
        loading: false,
        error: null,
    },
    batalCuti: {
        data: [],
        loading: false,
        error: null,
    },
    getPegawaiInput: {
        data: [],
        loading: false,
        error: null,
    },
    updatePassword: {
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
                },
                getComboJadwal: {
                    ...INIT_STATE.getComboJadwal
                },
                getJadwalDokterSDM: {
                    ...INIT_STATE.getJadwalDokterSDM
                },
                upsertJadwal:{
                    ...INIT_STATE.upsertJadwal
                },
                updateResetPassword:{
                    ...INIT_STATE.updateResetPassword
                },
                getLiburPegawai: {
                    ...INIT_STATE.getLiburPegawai
                },
                getPegawaiInput: {
                    ...INIT_STATE.getPegawaiInput
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

        case GET_COMBO_JADWAL: {
            return {
                ...state,
                getComboJadwal: {
                    ...state.getComboJadwal,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_JADWAL_SUCCESS: {
            return {
                ...state,
                getComboJadwal: {
                    ...state.getComboJadwal,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_JADWAL_ERROR: {
            return {
                ...state,
                getComboJadwal: {
                    ...state.getComboJadwal,
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

        case GET_JADWAL_DOKTER_SDM: {
            return {
                ...state,
                getJadwalDokterSDM: {
                    ...state.getJadwalDokterSDM,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_JADWAL_DOKTER_SDM_SUCCESS: {
            return {
                ...state,
                getJadwalDokterSDM: {
                    ...state.getJadwalDokterSDM,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_JADWAL_DOKTER_SDM_ERROR: {
            return {
                ...state,
                getJadwalDokterSDM: {
                    ...state.getJadwalDokterSDM,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPSERT_JADWAL: {
            return {
                ...state,
                upsertJadwal: {
                    ...state.upsertJadwal,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case UPSERT_JADWAL_SUCCESS: {
            return {
                ...state,
                upsertJadwal: {
                    ...state.upsertJadwal,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case UPSERT_JADWAL_ERROR: {
            return {
                ...state,
                upsertJadwal: {
                    ...state.upsertJadwal,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case UPDATE_RESET_PASSWORD: {
            return {
                ...state,
                updateResetPassword: {
                    ...state.updateResetPassword,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case UPDATE_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                updateResetPassword: {
                    ...state.updateResetPassword,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case UPDATE_RESET_PASSWORD_ERROR: {
            return {
                ...state,
                updateResetPassword: {
                    ...state.updateResetPassword,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_LIBUR_PEGAWAI: {
            return {
                ...state,
                getLiburPegawai: {
                    ...state.getLiburPegawai,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_LIBUR_PEGAWAI_SUCCESS: {
            return {
                ...state,
                getLiburPegawai: {
                    ...state.getLiburPegawai,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case GET_LIBUR_PEGAWAI_ERROR: {
            return {
                ...state,
                getLiburPegawai: {
                    ...state.getLiburPegawai,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_COMBO_CUTI: {
            return {
                ...state,
                getComboCuti: {
                    ...state.getComboCuti,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_COMBO_CUTI_SUCCESS: {
            return {
                ...state,
                getComboCuti: {
                    ...state.getComboCuti,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case GET_COMBO_CUTI_ERROR: {
            return {
                ...state,
                getComboCuti: {
                    ...state.getComboCuti,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case UPSERT_CUTI: {
            return {
                ...state,
                upsertCuti: {
                    ...state.upsertCuti,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case UPSERT_CUTI_SUCCESS: {
            return {
                ...state,
                upsertCuti: {
                    ...state.upsertCuti,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case UPSERT_CUTI_ERROR: {
            return {
                ...state,
                upsertCuti: {
                    ...state.upsertCuti,
                    loading: false,
                    error: action.payload,
                },
            };
        }
        
        case BATAL_CUTI: {
            return {
                ...state,
                batalCuti: {
                    ...state.batalCuti,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case BATAL_CUTI_SUCCESS: {
            return {
                ...state,
                batalCuti: {
                    ...state.batalCuti,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case BATAL_CUTI_ERROR: {
            return {
                ...state,
                batalCuti: {
                    ...state.batalCuti,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_PEGAWAI_INPUT: {
            return {
                ...state,
                getPegawaiInput: {
                    ...state.getPegawaiInput,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case GET_PEGAWAI_INPUT_SUCCESS: {
            return {
                ...state,
                getPegawaiInput: {
                    ...state.getPegawaiInput,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case GET_PEGAWAI_INPUT_ERROR: {
            return {
                ...state,
                getPegawaiInput: {
                    ...state.getPegawaiInput,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case UPDATE_PASSWORD: {
            return {
                ...state,
                updatePassword: {
                    ...state.updatePassword,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case UPDATE_PASSWORD_SUCCESS: {
            return {
                ...state,
                updatePassword: {
                    ...state.updatePassword,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case UPDATE_PASSWORD_ERROR: {
            return {
                ...state,
                updatePassword: {
                    ...state.updatePassword,
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