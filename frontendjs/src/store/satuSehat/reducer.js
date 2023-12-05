import {
    GET_LIST_INSTALASI,GET_LIST_INSTALASI_SUCCESS,GET_LIST_INSTALASI_ERROR,
    UPSERT_ORGANIZATION_INSTALASI,UPSERT_ORGANIZATION_INSTALASI_SUCCESS,UPSERT_ORGANIZATION_INSTALASI_ERROR,
    GET_LIST_UNIT,GET_LIST_UNIT_SUCCESS,GET_LIST_UNIT_ERROR,
    UPSERT_LOCATION_UNIT,UPSERT_LOCATION_UNIT_SUCCESS,UPSERT_LOCATION_UNIT_ERROR
} from "./actionType";

const INIT_STATE = {
    getListInstalasi: {
        data: [],
        loading: false,
        error: null,
    },
    upsertOrganizationInstalasi:{
        data: [],
        loading: false,
        error: null,
    },
    getListUnit:{
        data: [],
        loading: false,
        error: null,
    },
    upsertLocationUnit:{
        data: [],
        loading: false,
        error: null,
    }
};

const SatuSehat = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_INSTALASI: {
            return {
                ...state,
                getListInstalasi: {
                    ...state.getListInstalasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LIST_INSTALASI_SUCCESS: {
            return {
                ...state,
                getListInstalasi: {
                    ...state.getListInstalasi,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_LIST_INSTALASI_ERROR: {
            return {
                ...state,
                getListInstalasi: {
                    ...state.getListInstalasi,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_ORGANIZATION_INSTALASI: {
            return {
                ...state,
                upsertOrganizationInstalasi: {
                    ...state.upsertOrganizationInstalasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_ORGANIZATION_INSTALASI_SUCCESS: {
            return {
                ...state,
                upsertOrganizationInstalasi: {
                    ...state.upsertOrganizationInstalasi,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_ORGANIZATION_INSTALASI_ERROR: {
            return {
                ...state,
                upsertOrganizationInstalasi: {
                    ...state.upsertOrganizationInstalasi,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case GET_LIST_UNIT: {
            return {
                ...state,
                getListUnit: {
                    ...state.getListUnit,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LIST_UNIT_SUCCESS: {
            return {
                ...state,
                getListUnit: {
                    ...state.getListUnit,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_LIST_UNIT_ERROR: {
            return {
                ...state,
                getListUnit: {
                    ...state.getListUnit,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_LOCATION_UNIT: {
            return {
                ...state,
                upsertLocationUnit: {
                    ...state.upsertLocationUnit,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_LOCATION_UNIT_SUCCESS: {
            return {
                ...state,
                upsertLocationUnit: {
                    ...state.upsertLocationUnit,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_LOCATION_UNIT_ERROR: {
            return {
                ...state,
                upsertLocationUnit: {
                    ...state.upsertLocationUnit,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        default: return { ...state };
    }
}

export default SatuSehat