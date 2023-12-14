import {
    GET_LIST_INSTALASI,GET_LIST_INSTALASI_SUCCESS,GET_LIST_INSTALASI_ERROR,
    UPSERT_ORGANIZATION_INSTALASI,UPSERT_ORGANIZATION_INSTALASI_SUCCESS,UPSERT_ORGANIZATION_INSTALASI_ERROR,
    GET_LIST_UNIT,GET_LIST_UNIT_SUCCESS,GET_LIST_UNIT_ERROR,
    UPSERT_LOCATION_UNIT,UPSERT_LOCATION_UNIT_SUCCESS,UPSERT_LOCATION_UNIT_ERROR,
    GET_LIST_PRACTITIONER, GET_LIST_PRACTITIONER_SUCCESS,GET_LIST_PRACTITIONER_ERROR,
    UPSERT_PRACTITIONER,UPSERT_PRACTITIONER_ERROR,UPSERT_PRACTITIONER_SUCCESS,
    UPSERT_PATIENT,UPSERT_PATIENT_SUCCESS,UPSERT_PATIENT_ERROR,
    UPSERT_ENCOUNTER,UPSERT_ENCOUNTER_SUCCESS,UPSERT_ENCOUNTER_ERROR,
    UPSERT_CONDITION,UPSERT_CONDITION_SUCCESS,UPSERT_CONDITION_ERROR,
    UPSERT_ENCOUNTER_PULANG,UPSERT_ENCOUNTER_PULANG_ERROR,UPSERT_ENCOUNTER_PULANG_SUCCESS,
    UPSERT_OBSERVATION,UPSERT_OBSERVATION_SUCCESS,UPSERT_OBSERVATION_ERROR,
    GET_LIST_KAMAR,GET_LIST_KAMAR_SUCCESS,GET_LIST_KAMAR_ERROR,
    UPSERT_LOCATION_KAMAR,UPSERT_LOCATION_KAMAR_SUCCESS,UPSERT_LOCATION_KAMAR_ERROR,
    GET_LIST_TEMPATTIDUR,GET_LIST_TEMPATTIDUR_SUCCESS,GET_LIST_TEMPATTIDUR_ERROR,
    UPSERT_LOCATION_TEMPATTIDUR,UPSERT_LOCATION_TEMPATTIDUR_SUCCESS,UPSERT_LOCATION_TEMPATTIDUR_ERROR
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
    },
    getListPractitioner:{
        data: [],
        loading: false,
        error: null,
    },
    upsertPractitioner:{
        data: [],
        loading: false,
        error: null,
    },
    upsertPatient:{
        data: [],
        loading: false,
        error: null,
    },
    upsertEncounter:{
        data: [],
        loading: false,
        error: null,
    },
    upsertCondition:{
        data: [],
        loading: false,
        error: null,
    },
    upsertEncounterPulang:{
        data: [],
        loading: false,
        error: null,
    },
    upsertObservation:{
        data: [],
        loading: false,
        error: null,
    },
    getListKamar:{
        data: [],
        loading: false,
        error: null,
    },
    upsertLocationKamar:{
        data: [],
        loading: false,
        error: null,
    },
    getListTempatTidur:{
        data: [],
        loading: false,
        error: null,
    },
    upsertLocationTempatTidur:{
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

        case GET_LIST_PRACTITIONER: {
            return {
                ...state,
                getListPractitioner: {
                    ...state.getListPractitioner,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LIST_PRACTITIONER_SUCCESS: {
            return {
                ...state,
                getListPractitioner: {
                    ...state.getListPractitioner,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_LIST_PRACTITIONER_ERROR: {
            return {
                ...state,
                getListPractitioner: {
                    ...state.getListPractitioner,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_PRACTITIONER: {
            return {
                ...state,
                upsertPractitioner: {
                    ...state.upsertPractitioner,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_PRACTITIONER_SUCCESS: {
            return {
                ...state,
                upsertPractitioner: {
                    ...state.upsertPractitioner,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_PRACTITIONER_ERROR: {
            return {
                ...state,
                upsertPractitioner: {
                    ...state.upsertPractitioner,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPSERT_PATIENT: {
            return {
                ...state,
                upsertPatient: {
                    ...state.upsertPatient,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_PATIENT_SUCCESS: {
            return {
                ...state,
                upsertPatient: {
                    ...state.upsertPatient,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_PATIENT_ERROR: {
            return {
                ...state,
                upsertPatient: {
                    ...state.upsertPatient,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPSERT_ENCOUNTER: {
            return {
                ...state,
                upsertEncounter: {
                    ...state.upsertEncounter,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_ENCOUNTER_SUCCESS: {
            return {
                ...state,
                upsertEncounter: {
                    ...state.upsertEncounter,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_ENCOUNTER_ERROR: {
            return {
                ...state,
                upsertEncounter: {
                    ...state.upsertEncounter,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPSERT_CONDITION: {
            return {
                ...state,
                upsertCondition: {
                    ...state.upsertCondition,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_CONDITION_SUCCESS: {
            return {
                ...state,
                upsertCondition: {
                    ...state.upsertCondition,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_CONDITION_ERROR: {
            return {
                ...state,
                upsertCondition: {
                    ...state.upsertCondition,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPSERT_ENCOUNTER_PULANG: {
            return {
                ...state,
                upsertEncounterPulang: {
                    ...state.upsertEncounterPulang,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_ENCOUNTER_PULANG_SUCCESS: {
            return {
                ...state,
                upsertEncounterPulang: {
                    ...state.upsertEncounterPulang,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_ENCOUNTER_PULANG_ERROR: {
            return {
                ...state,
                upsertEncounterPulang: {
                    ...state.upsertEncounterPulang,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case UPSERT_OBSERVATION: {
            return {
                ...state,
                upsertObservation: {
                    ...state.upsertObservation,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_OBSERVATION_SUCCESS: {
            return {
                ...state,
                upsertObservation: {
                    ...state.upsertObservation,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_OBSERVATION_ERROR: {
            return {
                ...state,
                upsertObservation: {
                    ...state.upsertObservation,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case GET_LIST_KAMAR: {
            return {
                ...state,
                getListKamar: {
                    ...state.getListKamar,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LIST_KAMAR_SUCCESS: {
            return {
                ...state,
                getListKamar: {
                    ...state.getListKamar,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_LIST_KAMAR_ERROR: {
            return {
                ...state,
                getListKamar: {
                    ...state.getListKamar,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_LOCATION_KAMAR: {
            return {
                ...state,
                upsertLocationKamar: {
                    ...state.upsertLocationKamar,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_LOCATION_KAMAR_SUCCESS: {
            return {
                ...state,
                upsertLocationKamar: {
                    ...state.upsertLocationKamar,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_LOCATION_KAMAR_ERROR: {
            return {
                ...state,
                upsertLocationKamar: {
                    ...state.upsertLocationKamar,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case GET_LIST_TEMPATTIDUR: {
            return {
                ...state,
                getListTempatTidur: {
                    ...state.getListTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LIST_TEMPATTIDUR_SUCCESS: {
            return {
                ...state,
                getListTempatTidur: {
                    ...state.getListTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_LIST_TEMPATTIDUR_ERROR: {
            return {
                ...state,
                getListTempatTidur: {
                    ...state.getListTempatTidur,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_LOCATION_TEMPATTIDUR: {
            return {
                ...state,
                upsertLocationTempatTidur: {
                    ...state.upsertLocationTempatTidur,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_LOCATION_TEMPATTIDUR_SUCCESS: {
            return {
                ...state,
                upsertLocationTempatTidur: {
                    ...state.upsertLocationTempatTidur,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_LOCATION_TEMPATTIDUR_ERROR: {
            return {
                ...state,
                upsertLocationTempatTidur: {
                    ...state.upsertLocationTempatTidur,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        default: return { ...state };
    }
}

export default SatuSehat