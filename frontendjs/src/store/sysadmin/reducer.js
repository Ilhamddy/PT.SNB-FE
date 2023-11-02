import {
    GET_TEMPAT_TIDUR,
    GET_TEMPAT_TIDUR_SUCCESS,
    GET_TEMPAT_TIDUR_ERROR,
    GET_UNIT_TEMPAT_TIDUR,
    GET_UNIT_TEMPAT_TIDUR_SUCCESS,
    GET_UNIT_TEMPAT_TIDUR_ERROR,
    GET_COMBO_TEMPAT_TIDUR,
    GET_COMBO_TEMPAT_TIDUR_SUCCESS,
    GET_COMBO_TEMPAT_TIDUR_ERROR,
    UPSERT_TEMPAT_TIDUR,
    UPSERT_TEMPAT_TIDUR_SUCCESS,
    UPSERT_TEMPAT_TIDUR_ERROR,
    GET_ALL_UNIT,
    GET_ALL_UNIT_SUCCESS,
    GET_ALL_UNIT_ERROR,
    GET_COMBO_DAFTAR_UNIT,
    GET_COMBO_DAFTAR_UNIT_SUCCESS,
    GET_COMBO_DAFTAR_UNIT_ERROR,
    UPSERT_UNIT,
    UPSERT_UNIT_SUCCESS,
    UPSERT_UNIT_ERROR,
    GET_ALL_KAMAR,
    GET_ALL_KAMAR_SUCCESS,
    GET_ALL_KAMAR_ERROR,
    GET_COMBO_DAFTAR_KAMAR,
    GET_COMBO_DAFTAR_KAMAR_SUCCESS,
    GET_COMBO_DAFTAR_KAMAR_ERROR,
    GET_COMBO_SYSADMIN,
    GET_COMBO_SYSADMIN_SUCCESS,
    GET_COMBO_SYSADMIN_ERROR,
    UPSERT_ROLES,
    UPSERT_ROLES_SUCCESS,
    UPSERT_ROLES_ERROR,
    UPSERT_KAMAR,
    UPSERT_KAMAR_SUCCESS,
    UPSERT_KAMAR_ERROR,
    GET_MAP_ROLE_PERMISSIONS,
    GET_MAP_ROLE_PERMISSIONS_SUCCESS,
    GET_MAP_ROLE_PERMISSIONS_ERROR,
    UPSERT_ROLE_PERMISSIONS, UPSERT_ROLE_PERMISSIONS_SUCCESS, UPSERT_ROLE_PERMISSIONS_ERROR,
    UPSERT_MENU_MODUL, UPSERT_MENU_MODUL_ERROR,UPSERT_MENU_MODUL_SUCCESS
} from "./actionType";

const INIT_STATE = {
    getTempatTidur: {
        data: [],
        loading: false,
        error: null,
    },
    getUnitTempatTidur: {
        data: [],
        loading: false,
        error: null,
    },
    getComboTempatTidur: {
        data: [],
        loading: false,
        error: null,
    },
    upsertTempatTidur: {
        data: [],
        loading: false,
        error: null,
    },
    getAllUnit: {
        data: [],
        loading: false,
        error: null,
    },
    getComboDaftarUnit: {
        data: [],
        loading: false,
        error: null,
    },
    upsertUnit: {
        data: [],
        loading: false,
        error: null,
    },
    getAllKamar: {
        data: [],
        loading: false,
        error: null,
    },
    getComboDaftarKamar: {
        data: [],
        loading: false,
        error: null,
    },
    getComboSysadmin: {
        data: [],
        loading: false,
        error: null,
    },
    upsertRoles: {
        data: [],
        loading: false,
        error: null,
    },
    upsertKamar: {
        data: [],
        loading: false,
        error: null,
    },
    getMapRolePermissions: {
        data: [],
        loading: false,
        error: null,
    },
    upsertRolePermissions: {
        data: [],
        loading: false,
        error: null,
    },
    upsertMenuModul: {
        data: [],
        loading: false,
        error: null,
    }
};

const Sysadmin = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_TEMPAT_TIDUR: {
            return {
                ...state,
                getTempatTidur: {
                    ...state.getTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_TEMPAT_TIDUR_SUCCESS: {
            return {
                ...state,
                getTempatTidur: {
                    ...state.getTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_TEMPAT_TIDUR_ERROR: {
            return {
                ...state,
                getTempatTidur: {
                    ...state.getTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_UNIT_TEMPAT_TIDUR: {
            return {
                ...state,
                getUnitTempatTidur: {
                    ...state.getUnitTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_UNIT_TEMPAT_TIDUR_SUCCESS: {
            return {
                ...state,
                getUnitTempatTidur: {
                    ...state.getUnitTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_UNIT_TEMPAT_TIDUR_ERROR: {
            return {
                ...state,
                getUnitTempatTidur: {
                    ...state.getUnitTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_COMBO_TEMPAT_TIDUR: {
            return {
                ...state,
                getComboTempatTidur: {
                    ...state.getComboTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_TEMPAT_TIDUR_SUCCESS: {
            return {
                ...state,
                getComboTempatTidur: {
                    ...state.getComboTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_COMBO_TEMPAT_TIDUR_ERROR: {
            return {
                ...state,
                getComboTempatTidur: {
                    ...state.getComboTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_TEMPAT_TIDUR: {
            return {
                ...state,
                upsertTempatTidur: {
                    ...state.upsertTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_TEMPAT_TIDUR_SUCCESS: {
            return {
                ...state,
                upsertTempatTidur: {
                    ...state.upsertTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_TEMPAT_TIDUR_ERROR: {
            return {
                ...state,
                upsertTempatTidur: {
                    ...state.upsertTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_ALL_UNIT: {
            return {
                ...state,
                getAllUnit: {
                    ...state.getAllUnit,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_ALL_UNIT_SUCCESS: {
            return {
                ...state,
                getAllUnit: {
                    ...state.getAllUnit,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_ALL_UNIT_ERROR: {
            return {
                ...state,
                getAllUnit: {
                    ...state.getAllUnit,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_COMBO_DAFTAR_UNIT: {
            return {
                ...state,
                getComboDaftarUnit: {
                    ...state.getComboDaftarUnit,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_DAFTAR_UNIT_SUCCESS: {
            return {
                ...state,
                getComboDaftarUnit: {
                    ...state.getComboDaftarUnit,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_COMBO_DAFTAR_UNIT_ERROR: {
            return {
                ...state,
                getComboDaftarUnit: {
                    ...state.getComboDaftarUnit,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_UNIT: {
            return {
                ...state,
                upsertUnit: {
                    ...state.upsertUnit,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_UNIT_SUCCESS: {
            return {
                ...state,
                upsertUnit: {
                    ...state.upsertUnit,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_UNIT_ERROR: {
            return {
                ...state,
                upsertUnit: {
                    ...state.upsertUnit,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_ALL_KAMAR: {
            return {
                ...state,
                getAllKamar: {
                    ...state.getAllKamar,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_ALL_KAMAR_SUCCESS: {
            return {
                ...state,
                getAllKamar: {
                    ...state.getAllKamar,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_ALL_KAMAR_ERROR: {
            return {
                ...state,
                getAllKamar: {
                    ...state.getAllKamar,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_COMBO_DAFTAR_KAMAR: {
            return {
                ...state,
                getComboDaftarKamar: {
                    ...state.getComboDaftarKamar,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_DAFTAR_KAMAR_SUCCESS: {
            return {
                ...state,
                getComboDaftarKamar: {
                    ...state.getComboDaftarKamar,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_COMBO_DAFTAR_KAMAR_ERROR: {
            return {
                ...state,
                getComboDaftarKamar: {
                    ...state.getComboDaftarKamar,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_COMBO_SYSADMIN: {
            return {
                ...state,
                getComboSysadmin: {
                    ...state.getComboSysadmin,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_SYSADMIN_SUCCESS: {
            return {
                ...state,
                getComboSysadmin: {
                    ...state.getComboSysadmin,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_COMBO_SYSADMIN_ERROR: {
            return {
                ...state,
                getComboSysadmin: {
                    ...state.getComboSysadmin,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_KAMAR: {
            return {
                ...state,
                upsertKamar: {
                    ...state.upsertKamar,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_KAMAR_SUCCESS: {
            return {
                ...state,
                upsertKamar: {
                    ...state.upsertKamar,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_KAMAR_ERROR: {
            return {
                ...state,
                upsertKamar: {
                    ...state.upsertKamar,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_ROLES: {
            return {
                ...state,
                upsertRoles: {
                    ...state.upsertRoles,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_ROLES_SUCCESS: {
            return {
                ...state,
                upsertRoles: {
                    ...state.upsertRoles,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_ROLES_ERROR: {
            return {
                ...state,
                upsertRoles: {
                    ...state.upsertRoles,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case GET_MAP_ROLE_PERMISSIONS: {
            return {
                ...state,
                getMapRolePermissions: {
                    ...state.getMapRolePermissions,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_MAP_ROLE_PERMISSIONS_SUCCESS: {
            return {
                ...state,
                getMapRolePermissions: {
                    ...state.getMapRolePermissions,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_MAP_ROLE_PERMISSIONS_ERROR: {
            return {
                ...state,
                getMapRolePermissions: {
                    ...state.getMapRolePermissions,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_ROLE_PERMISSIONS: {
            return {
                ...state,
                upsertRolePermissions: {
                    ...state.upsertRolePermissions,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_ROLE_PERMISSIONS_SUCCESS: {
            return {
                ...state,
                upsertRolePermissions: {
                    ...state.upsertRolePermissions,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_ROLE_PERMISSIONS_ERROR: {
            return {
                ...state,
                upsertRolePermissions: {
                    ...state.upsertRolePermissions,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPSERT_MENU_MODUL: {
            return {
                ...state,
                upsertMenuModul: {
                    ...state.upsertMenuModul,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_MENU_MODUL_SUCCESS: {
            return {
                ...state,
                upsertMenuModul: {
                    ...state.upsertMenuModul,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_MENU_MODUL_ERROR: {
            return {
                ...state,
                upsertMenuModul: {
                    ...state.upsertMenuModul,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        default: return { ...state };
    }
}

export default Sysadmin