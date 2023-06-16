import {
    EMR_RESET_FORM,
    EMR_HEADER_GET,
    EMR_HEADER_GET_SUCCESS,
    EMR_HEADER_GET_ERROR,
    EMR_TTV_SAVE,
    EMR_TTV_SAVE_SUCCESS,
    EMR_TTV_SAVE_ERROR,
    EMR_TTV_GET,
    EMR_TTV_GET_SUCCESS,
    EMR_TTV_GET_ERROR,
    EMR_SAVE,
    EMR_SAVE_SUCCESS,
    EMR_SAVE_ERROR,
    EMR_GET,
    EMR_GET_SUCCESS,
    EMR_GET_ERROR,
    EMR_COMBO_GET,
    EMR_COMBO_GET_SUCCESS,
    EMR_COMBO_GET_ERROR,
    EMR_DIAGNOSAX_GET,
    EMR_DIAGNOSAX_GET_SUCCESS,
    EMR_DIAGNOSAX_GET_ERROR,
    EMR_DIAGNOSAIX_GET,
    EMR_DIAGNOSAIX_GET_SUCCESS,
    EMR_DIAGNOSAIX_GET_ERROR,
    EMR_DIAGNOSAX_SAVE,
    EMR_DIAGNOSAX_SAVE_SUCCESS,
    EMR_DIAGNOSAX_SAVE_ERROR,
    EMR_DIAGNOSAIX_SAVE,
    EMR_DIAGNOSAIX_SAVE_SUCCESS,
    EMR_DIAGNOSAIX_SAVE_ERROR,
    EMR_LISTDIAGNOSAX_GET,
    EMR_LISTDIAGNOSAX_GET_SUCCESS,
    EMR_LISTDIAGNOSAX_GET_ERROR,
    EMR_LISTDIAGNOSAIX_GET,
    EMR_LISTDIAGNOSAIX_GET_SUCCESS,
    EMR_LISTDIAGNOSAIX_GET_ERROR,
    DELETE_DIAGNOSAX,
    DELETE_DIAGNOSAX_SUCCESS,
    DELETE_DIAGNOSAX_ERROR,
    DELETE_DIAGNOSAIX,
    DELETE_DIAGNOSAIX_SUCCESS,
    DELETE_DIAGNOSAIX_ERROR,
    KONSUL_SAVE,
    KONSUL_SAVE_SUCCESS,
    KONSUL_SAVE_ERROR,
    UPDATE_TASKID,
    UPDATE_TASKID_SUCCESS,
    UPDATE_TASKID_ERROR,
    UPDATE_STATUSPULANGRJ,
    UPDATE_STATUSPULANGRJ_SUCCESS,
    UPDATE_STATUSPULANGRJ_ERROR,
    COMBO_HISTORY_UNIT_GET,
    COMBO_HISTORY_UNIT_GET_SUCCESS,
    COMBO_HISTORY_UNIT_GET_ERROR,
    COMBO_TINDAKAN_GET,
    COMBO_TINDAKAN_GET_SUCCESS,
    COMBO_TINDAKAN_GET_ERROR,
    COMBO_JENIS_PELAKSANA_GET,
    COMBO_JENIS_PELAKSANA_GET_SUCCESS,
    COMBO_JENIS_PELAKSANA_GET_ERROR,
    COMBO_NAMA_PELAKSANA_GET,
    COMBO_NAMA_PELAKSANA_GET_SUCCESS,
    COMBO_NAMA_PELAKSANA_GET_ERROR,
    TINDAKAN_SAVE,
    TINDAKAN_SAVE_SUCCESS,
    TINDAKAN_SAVE_ERROR,
} from "./actionType";

const INIT_STATE = {
    emrHeaderGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrTtvSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    emrTtvGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    emrGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrComboGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrDiagnosaxGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrDiagnosaixGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrDiagnosaxSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    emrDiagnosaixSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    emrListDiagnosaxGet: {
        data: [],
        loading: false,
        error: null,
    },
    emrListDiagnosaixGet: {
        data: [],
        loading: false,
        error: null,
    },
    deleteDiagnosax: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    deleteDiagnosaix: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    konsulSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    updateTaskId: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    updateStatusPulangRJ: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    comboHistoryUnitGet: {
        data: [],
        loading: false,
        error: null,
    },
    comboTindakanGet: {
        data: [],
        loading: false,
        error: null,
    },
    comboJenisPelaksanaGet: {
        data: [],
        loading: false,
        error: null,
    },
    comboNamaPelaksanaGet: {
        data: [],
        loading: false,
        error: null,
    },
    tindakanSave:{
        newData: null,
        loading: false,
        error: null,
        success: false
    }
};

const Emr = (state = INIT_STATE, action) => {
    switch (action.type) {
        case EMR_RESET_FORM: {
            return {
                ...state,
                emrHeaderGet:{
                    ...INIT_STATE.emrHeaderGet,
                },
                emrTtvSave: {
                    ...INIT_STATE.emrTtvSave,
                },
                emrTtvGet:{
                    ...INIT_STATE.emrTtvGet,
                },
                emrSave:{
                    ...INIT_STATE.emrSave
                },
                emrGet:{
                    ...INIT_STATE.emrGet,
                },
                emrComboGet:{
                    ...INIT_STATE.emrComboGet,
                },
                emrDiagnosaxGet:{
                    ...INIT_STATE.emrDiagnosaxGet,
                },
                emrDiagnosaixGet:{
                    ...INIT_STATE.emrDiagnosaixGet,
                },
                emrDiagnosaxSave:{
                    ...INIT_STATE.emrDiagnosaxSave
                },
                emrDiagnosaixSave:{
                    ...INIT_STATE.emrDiagnosaixSave
                },
                emrListDiagnosaxGet:{
                    ...INIT_STATE.emrListDiagnosaxGet
                },
                emrListDiagnosaixGet:{
                    ...INIT_STATE.emrListDiagnosaixGet
                },
                deleteDiagnosax:{
                    ...INIT_STATE.deleteDiagnosax
                },
                deleteDiagnosaix:{
                    ...INIT_STATE.deleteDiagnosaix
                },
                konsulSave:{
                    ...INIT_STATE.konsulSave
                },
                updateTaskId:{
                    ...INIT_STATE.updateTaskId
                },
                updateStatusPulangRJ:{
                    ...INIT_STATE.updateStatusPulangRJ
                },
                comboHistoryUnitGet:{
                    ...INIT_STATE.comboHistoryUnitGet
                },
                comboTindakanGet:{
                    ...INIT_STATE.comboTindakanGet
                },
                comboJenisPelaksanaGet:{
                    ...INIT_STATE.comboJenisPelaksanaGet
                },
                comboNamaPelaksanaGet:{
                    ...INIT_STATE.comboNamaPelaksanaGet
                },
                tindakanSave:{
                    ...INIT_STATE.tindakanSave
                }
            }
        }

        case EMR_HEADER_GET: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_HEADER_GET_SUCCESS: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_HEADER_GET_ERROR: {
            return {
                ...state,
                emrHeaderGet: {
                    ...state.emrHeaderGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_TTV_SAVE: {
            return {
                ...state,
                emrTtvSave: {
                    ...state.emrTtvSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_TTV_SAVE_SUCCESS: {
            return {
                ...state,
                emrTtvSave: {
                    ...state.emrTtvSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_TTV_SAVE_ERROR: {
            return {
                ...state,
                emrTtvSave: {
                    ...state.emrTtvSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_TTV_GET: {
            return {
                ...state,
                emrTtvGet: {
                    ...state.emrTtvGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_TTV_GET_SUCCESS: {
            return {
                ...state,
                emrTtvGet: {
                    ...state.emrTtvGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_TTV_GET_ERROR: {
            return {
                ...state,
                emrTtvGet: {
                    ...state.emrTtvGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_SAVE: {
            return {
                ...state,
                emrSave: {
                    ...state.emrSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_SAVE_SUCCESS: {
            return {
                ...state,
                emrSave: {
                    ...state.emrSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_SAVE_ERROR: {
            return {
                ...state,
                emrSave: {
                    ...state.emrSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_GET: {
            return {
                ...state,
                emrGet: {
                    ...state.emrGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_GET_SUCCESS: {
            return {
                ...state,
                emrGet: {
                    ...state.emrGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_GET_ERROR: {
            return {
                ...state,
                emrGet: {
                    ...state.emrGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_COMBO_GET: {
            return {
                ...state,
                emrComboGet: {
                    ...state.emrComboGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_COMBO_GET_SUCCESS: {
            return {
                ...state,
                emrComboGet: {
                    ...state.emrComboGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_COMBO_GET_ERROR: {
            return {
                ...state,
                emrComboGet: {
                    ...state.emrComboGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_DIAGNOSAX_GET: {
            return {
                ...state,
                emrDiagnosaxGet: {
                    ...state.emrDiagnosaxGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_DIAGNOSAX_GET_SUCCESS: {
            return {
                ...state,
                emrDiagnosaxGet: {
                    ...state.emrDiagnosaxGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_DIAGNOSAX_GET_ERROR: {
            return {
                ...state,
                emrDiagnosaxGet: {
                    ...state.emrDiagnosaxGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_DIAGNOSAIX_GET: {
            return {
                ...state,
                emrDiagnosaixGet: {
                    ...state.emrDiagnosaixGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_DIAGNOSAIX_GET_SUCCESS: {
            return {
                ...state,
                emrDiagnosaixGet: {
                    ...state.emrDiagnosaixGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_DIAGNOSAIX_GET_ERROR: {
            return {
                ...state,
                emrDiagnosaixGet: {
                    ...state.emrDiagnosaixGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_DIAGNOSAX_SAVE: {
            return {
                ...state,
                emrDiagnosaxSave: {
                    ...state.emrDiagnosaxSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_DIAGNOSAX_SAVE_SUCCESS: {
            return {
                ...state,
                emrDiagnosaxSave: {
                    ...state.emrDiagnosaxSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_DIAGNOSAX_SAVE_ERROR: {
            return {
                ...state,
                emrDiagnosaxSave: {
                    ...state.emrDiagnosaxSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_DIAGNOSAIX_SAVE: {
            return {
                ...state,
                emrDiagnosaixSave: {
                    ...state.emrDiagnosaixSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_DIAGNOSAIX_SAVE_SUCCESS: {
            return {
                ...state,
                emrDiagnosaixSave: {
                    ...state.emrDiagnosaixSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_DIAGNOSAIX_SAVE_ERROR: {
            return {
                ...state,
                emrDiagnosaixSave: {
                    ...state.emrDiagnosaixSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_LISTDIAGNOSAX_GET: {
            return {
                ...state,
                emrListDiagnosaxGet: {
                    ...state.emrListDiagnosaxGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_LISTDIAGNOSAX_GET_SUCCESS: {
            return {
                ...state,
                emrListDiagnosaxGet: {
                    ...state.emrListDiagnosaxGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_LISTDIAGNOSAX_GET_ERROR: {
            return {
                ...state,
                emrListDiagnosaxGet: {
                    ...state.emrListDiagnosaxGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_LISTDIAGNOSAIX_GET: {
            return {
                ...state,
                emrListDiagnosaixGet: {
                    ...state.emrListDiagnosaixGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_LISTDIAGNOSAIX_GET_SUCCESS: {
            return {
                ...state,
                emrListDiagnosaixGet: {
                    ...state.emrListDiagnosaixGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case EMR_LISTDIAGNOSAIX_GET_ERROR: {
            return {
                ...state,
                emrListDiagnosaixGet: {
                    ...state.emrListDiagnosaixGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DELETE_DIAGNOSAX: {
            return {
                ...state,
                deleteDiagnosax: {
                    ...state.deleteDiagnosax,
                    loading: true,
                    error: null,
                }
            }
        }

        case DELETE_DIAGNOSAX_SUCCESS: {
            return {
                ...state,
                deleteDiagnosax: {
                    ...state.deleteDiagnosax,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case DELETE_DIAGNOSAX_ERROR: {
            return {
                ...state,
                deleteDiagnosax: {
                    ...state.deleteDiagnosax,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DELETE_DIAGNOSAIX: {
            return {
                ...state,
                deleteDiagnosaix: {
                    ...state.deleteDiagnosaix,
                    loading: true,
                    error: null,
                }
            }
        }

        case DELETE_DIAGNOSAIX_SUCCESS: {
            return {
                ...state,
                deleteDiagnosaix: {
                    ...state.deleteDiagnosaix,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case DELETE_DIAGNOSAIX_ERROR: {
            return {
                ...state,
                deleteDiagnosaix: {
                    ...state.deleteDiagnosaix,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case KONSUL_SAVE: {
            return {
                ...state,
                konsulSave: {
                    ...state.konsulSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case KONSUL_SAVE_SUCCESS: {
            return {
                ...state,
                konsulSave: {
                    ...state.konsulSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case KONSUL_SAVE_ERROR: {
            return {
                ...state,
                konsulSave: {
                    ...state.konsulSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPDATE_TASKID: {
            return {
                ...state,
                updateTaskId: {
                    ...state.updateTaskId,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPDATE_TASKID_SUCCESS: {
            return {
                ...state,
                updateTaskId: {
                    ...state.updateTaskId,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case UPDATE_TASKID_ERROR: {
            return {
                ...state,
                updateTaskId: {
                    ...state.updateTaskId,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPDATE_STATUSPULANGRJ: {
            return {
                ...state,
                updateStatusPulangRJ: {
                    ...state.updateStatusPulangRJ,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPDATE_STATUSPULANGRJ_SUCCESS: {
            return {
                ...state,
                updateStatusPulangRJ: {
                    ...state.updateStatusPulangRJ,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case UPDATE_STATUSPULANGRJ_ERROR: {
            return {
                ...state,
                updateStatusPulangRJ: {
                    ...state.updateStatusPulangRJ,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_HISTORY_UNIT_GET: {
            return {
                ...state,
                comboHistoryUnitGet: {
                    ...state.comboHistoryUnitGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_HISTORY_UNIT_GET_SUCCESS: {
            return {
                ...state,
                comboHistoryUnitGet: {
                    ...state.comboHistoryUnitGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_HISTORY_UNIT_GET_ERROR: {
            return {
                ...state,
                comboHistoryUnitGet: {
                    ...state.comboHistoryUnitGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_TINDAKAN_GET: {
            return {
                ...state,
                comboTindakanGet: {
                    ...state.comboTindakanGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_TINDAKAN_GET_SUCCESS: {
            return {
                ...state,
                comboTindakanGet: {
                    ...state.comboTindakanGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_TINDAKAN_GET_ERROR: {
            return {
                ...state,
                comboTindakanGet: {
                    ...state.comboTindakanGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_JENIS_PELAKSANA_GET: {
            return {
                ...state,
                comboJenisPelaksanaGet: {
                    ...state.comboJenisPelaksanaGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_JENIS_PELAKSANA_GET_SUCCESS: {
            return {
                ...state,
                comboJenisPelaksanaGet: {
                    ...state.comboJenisPelaksanaGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_JENIS_PELAKSANA_GET_ERROR: {
            return {
                ...state,
                comboJenisPelaksanaGet: {
                    ...state.comboJenisPelaksanaGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case COMBO_NAMA_PELAKSANA_GET: {
            return {
                ...state,
                comboNamaPelaksanaGet: {
                    ...state.comboNamaPelaksanaGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_NAMA_PELAKSANA_GET_SUCCESS: {
            return {
                ...state,
                comboNamaPelaksanaGet: {
                    ...state.comboNamaPelaksanaGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_NAMA_PELAKSANA_GET_ERROR: {
            return {
                ...state,
                comboNamaPelaksanaGet: {
                    ...state.comboNamaPelaksanaGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case TINDAKAN_SAVE: {
            return {
                ...state,
                tindakanSave: {
                    ...state.tindakanSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case TINDAKAN_SAVE_SUCCESS: {
            return {
                ...state,
                tindakanSave: {
                    ...state.tindakanSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case TINDAKAN_SAVE_ERROR: {
            return {
                ...state,
                tindakanSave: {
                    ...state.tindakanSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        default: {
            return { ...state };
        }
    }
};

export default Emr;