import {
    GET_LIST_INSTALASI,GET_LIST_INSTALASI_SUCCESS,GET_LIST_INSTALASI_ERROR,
    UPSERT_ORGANIZATION_INSTALASI,UPSERT_ORGANIZATION_INSTALASI_SUCCESS,UPSERT_ORGANIZATION_INSTALASI_ERROR
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

        default: return { ...state };
    }
}

export default SatuSehat