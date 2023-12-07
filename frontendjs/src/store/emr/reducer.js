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
    COMBO_TINDAKAN_RADIOLOGI_GET,
    COMBO_TINDAKAN_RADIOLOGI_GET_SUCCESS,
    COMBO_TINDAKAN_RADIOLOGI_GET_ERROR,
    COMBO_JENIS_PELAKSANA_GET,
    COMBO_JENIS_PELAKSANA_GET_SUCCESS,
    COMBO_JENIS_PELAKSANA_GET_ERROR,
    COMBO_NAMA_PELAKSANA_GET,
    COMBO_NAMA_PELAKSANA_GET_SUCCESS,
    COMBO_NAMA_PELAKSANA_GET_ERROR,
    TINDAKAN_SAVE,
    TINDAKAN_SAVE_SUCCESS,
    TINDAKAN_SAVE_ERROR,
    LIST_TAGIHAN,
    LIST_TAGIHAN_SUCCESS,
    LIST_TAGIHAN_ERROR,
    LIST_TAGIHAN_PRINT,
    LIST_TAGIHAN_PRINT_SUCCESS,
    LIST_TAGIHAN_PRINT_ERROR,
    GET_OBAT_FROM_UNIT,
    GET_OBAT_FROM_UNIT_SUCCESS,
    GET_OBAT_FROM_UNIT_ERROR,
    CREATE_OR_UPDATE_RESEP_ORDER,
    CREATE_OR_UPDATE_RESEP_ORDER_SUCCESS,
    CREATE_OR_UPDATE_RESEP_ORDER_ERROR,
    GET_ORDER_RESEP_FROM_DP,
    GET_ORDER_RESEP_FROM_DP_SUCCESS,
    GET_ORDER_RESEP_FROM_DP_ERROR,
    EMR_JENIS_PELAYANAN_SAVE,
    EMR_JENIS_PELAYANAN_SAVE_SUCCESS,
    EMR_JENIS_PELAYANAN_SAVE_ERROR,
    GET_HISTORI_JENIS_PELAYANAN,
    GET_HISTORI_JENIS_PELAYANAN_SUCCESS,
    GET_HISTORI_JENIS_PELAYANAN_ERROR,
    SAVE_EMR_TRIAGE_IGD,
    SAVE_EMR_TRIAGE_IGD_SUCCESS,
    SAVE_EMR_TRIAGE_IGD_ERROR,
    GET_COMBO_TRIAGE_IGD,
    GET_COMBO_TRIAGE_IGD_SUCCESS,
    GET_COMBO_TRIAGE_IGD_ERROR,
    GET_HISTORI_TRIAGE_BYNOREC,
    GET_HISTORI_TRIAGE_BYNOREC_SUCCESS,
    GET_HISTORI_TRIAGE_BYNOREC_ERROR,
    SAVE_ORDER_OPERASI,
    SAVE_ORDER_OPERASI_SUCCESS,
    SAVE_ORDER_OPERASI_ERROR,
    GET_HISTORI_ORDER_OPERASI,
    GET_HISTORI_ORDER_OPERASI_SUCCESS,
    GET_HISTORI_ORDER_OPERASI_ERROR,
    SAVE_PELAYANAN_PASIEN_TEMP,
    SAVE_PELAYANAN_PASIEN_TEMP_SUCCESS,
    SAVE_PELAYANAN_PASIEN_TEMP_ERROR,
    GET_LIST_PELAYANAN_PASIEN_TEMP,
    GET_LIST_PELAYANAN_PASIEN_TEMP_SUCCESS,
    GET_LIST_PELAYANAN_PASIEN_TEMP_ERROR,
    DELETE_PELAYANAN_PASIEN_TEMP,
    DELETE_PELAYANAN_PASIEN_TEMP_SUCCESS,
    DELETE_PELAYANAN_PASIEN_TEMP_ERROR,
    GET_WIDGET_EFISIENSI_KLAIM,
    GET_WIDGET_EFISIENSI_KLAIM_SUCCESS,
    GET_WIDGET_EFISIENSI_KLAIM_ERROR,
    UPDATE_ESTIMASI_KLAIM,
    UPDATE_ESTIMASI_KLAIM_SUCCESS,
    UPDATE_ESTIMASI_KLAIM_ERROR,
    COMBO_ALL_TINDAKAN_GET, COMBO_ALL_TINDAKAN_GET_SUCCESS, COMBO_ALL_TINDAKAN_GET_ERROR,
    SAVE_EMR_PASIEN,SAVE_EMR_PASIEN_SUCCESS,SAVE_EMR_PASIEN_ERROR,
    GET_ASESMENBAYILAHIR_BYNOREC_SUCCESS,GET_ASESMENBAYILAHIR_BYNOREC_ERROR, GET_ASESMENBAYILAHIR_BYNOREC,
    GET_COMBO_ASESMENBAYILAHIR,GET_COMBO_ASESMENBAYILAHIR_SUCCESS,GET_COMBO_ASESMENBAYILAHIR_ERROR,
    GET_HISTORY_ASESMENBAYILAHIR, GET_HISTORY_ASESMENBAYILAHIR_SUCCESS,GET_HISTORY_ASESMENBAYILAHIR_ERROR,
    GET_ANTREAN_PEMERIKSAAN_OBAT,
    GET_ANTREAN_PEMERIKSAAN_OBAT_SUCCESS,
    GET_ANTREAN_PEMERIKSAAN_OBAT_ERROR,
    DELETE_ORDER_RESEP,
    DELETE_ORDER_RESEP_SUCCESS,
    DELETE_ORDER_RESEP_ERROR
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
    comboTindakanRadiologiGet: {
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
    tindakanSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    listTagihanGet: {
        data: [],
        loading: false,
        error: null,
    },
    listTagihanPrintGet: {
        data: [],
        loading: false,
        error: null,
    },
    getObatFromUnit: {
        data: [],
        loading: false,
        error: null,
    },
    createOrUpdateResepOrder: {
        data: [],
        loading: false,
        error: null,
    },
    getOrderResepFromDP: {
        data: [],
        loading: false,
        error: null,
    },
    emrJenisPelayananSave: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getHistoriJenisPelayanan: {
        data: [],
        loading: false,
        error: null,
    },
    saveEmrTriageIgd: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getGetComboTriageIgd: {
        data: [],
        loading: false,
        error: null,
    },
    getHistoriTriagiByNorec: {
        data: [],
        loading: false,
        error: null,
    },
    saveOrderOperasi: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getHistoriOrderOperasi: {
        data: [],
        loading: false,
        error: null,
    },
    savePelayananPasienTemp: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getListPelayananPasienTemp: {
        data: [],
        loading: false,
        error: null,
    },
    deletePelayananPasienTemp: {
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getWidgetEfisiensiKlaim: {
        data: [],
        loading: false,
        error: null,
    },
    updateEstimasiKlaim:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    comboAllTindakan: {
        data: [],
        loading: false,
        error: null,
    },
    saveEmrPasien:{
        data: [],
        loading: false,
        error: null,
    },
    getAsesmenBayiLahirByNorec:{
        data: [],
        loading: false,
        error: null,
    },
    getComboAsesmenBayiLahir:{
        data: [],
        loading: false,
        error: null,
    },
    getHistoryAsesmenBayiLahir:{
        data: [],
        loading: false,
        error: null,
    },
    getAntreanPemeriksaanObat:{
        data: [],
        loading: false,
        error: null,
    },
    deleteOrderResep: { 
        data: [],
        loading: false,
        error: null,
    }
};

const Emr = (state = INIT_STATE, action) => {
    switch (action.type) {
        case EMR_RESET_FORM: {
            return {
                ...state,
                emrHeaderGet: {
                    ...INIT_STATE.emrHeaderGet,
                },
                emrTtvSave: {
                    ...INIT_STATE.emrTtvSave,
                },
                emrTtvGet: {
                    ...INIT_STATE.emrTtvGet,
                },
                emrSave: {
                    ...INIT_STATE.emrSave
                },
                emrGet: {
                    ...INIT_STATE.emrGet,
                },
                emrComboGet: {
                    ...INIT_STATE.emrComboGet,
                },
                emrDiagnosaxGet: {
                    ...INIT_STATE.emrDiagnosaxGet,
                },
                emrDiagnosaixGet: {
                    ...INIT_STATE.emrDiagnosaixGet,
                },
                emrDiagnosaxSave: {
                    ...INIT_STATE.emrDiagnosaxSave
                },
                emrDiagnosaixSave: {
                    ...INIT_STATE.emrDiagnosaixSave
                },
                emrListDiagnosaxGet: {
                    ...INIT_STATE.emrListDiagnosaxGet
                },
                emrListDiagnosaixGet: {
                    ...INIT_STATE.emrListDiagnosaixGet
                },
                deleteDiagnosax: {
                    ...INIT_STATE.deleteDiagnosax
                },
                deleteDiagnosaix: {
                    ...INIT_STATE.deleteDiagnosaix
                },
                konsulSave: {
                    ...INIT_STATE.konsulSave
                },
                updateTaskId: {
                    ...INIT_STATE.updateTaskId
                },
                updateStatusPulangRJ: {
                    ...INIT_STATE.updateStatusPulangRJ
                },
                comboHistoryUnitGet: {
                    ...INIT_STATE.comboHistoryUnitGet
                },
                comboTindakanGet: {
                    ...INIT_STATE.comboTindakanGet
                },
                comboJenisPelaksanaGet: {
                    ...INIT_STATE.comboJenisPelaksanaGet
                },
                comboNamaPelaksanaGet: {
                    ...INIT_STATE.comboNamaPelaksanaGet
                },
                tindakanSave: {
                    ...INIT_STATE.tindakanSave
                },
                listTagihanGet: {
                    ...INIT_STATE.listTagihanGet
                },
                comboTindakanRadiologiGet: {
                    ...INIT_STATE.comboTindakanRadiologiGet
                },
                emrJenisPelayananSave: {
                    ...INIT_STATE.emrJenisPelayananSave
                },
                getHistoriJenisPelayanan: {
                    ...INIT_STATE.getHistoriJenisPelayanan
                },
                saveEmrTriageIgd: {
                    ...INIT_STATE.saveEmrTriageIgd
                },
                getGetComboTriageIgd: {
                    ...INIT_STATE.getGetComboTriageIgd
                },
                getHistoriTriagiByNorec: {
                    ...INIT_STATE.getHistoriTriagiByNorec
                },
                saveOrderOperasi: {
                    ...INIT_STATE.saveOrderOperasi
                },
                getHistoriOrderOperasi:{
                    ...INIT_STATE.getHistoriOrderOperasi
                },
                savePelayananPasienTemp:{
                    ...INIT_STATE.savePelayananPasienTemp
                },
                getListPelayananPasienTemp:{
                    ...INIT_STATE.getListPelayananPasienTemp
                },
                deletePelayananPasienTemp:{
                    ...INIT_STATE.deletePelayananPasienTemp
                },
                getWidgetEfisiensiKlaim:{
                    ...INIT_STATE.getWidgetEfisiensiKlaim
                },
                updateEstimasiKlaim:{
                    ...INIT_STATE.updateEstimasiKlaim
                },
                comboAllTindakan:{
                    ...INIT_STATE.comboAllTindakan
                },
                saveEmrPasien:{
                    ...INIT_STATE.saveEmrPasien
                },
                getAsesmenBayiLahirByNorec:{
                    ...INIT_STATE.getAsesmenBayiLahirByNorec
                },
                getComboAsesmenBayiLahir:{
                    ...INIT_STATE.getComboAsesmenBayiLahir
                },
                getHistoryAsesmenBayiLahir:{
                    ...INIT_STATE.getHistoryAsesmenBayiLahir
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

        case COMBO_TINDAKAN_RADIOLOGI_GET: {
            return {
                ...state,
                comboTindakanRadiologiGet: {
                    ...state.comboTindakanRadiologiGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_TINDAKAN_RADIOLOGI_GET_SUCCESS: {
            return {
                ...state,
                comboTindakanRadiologiGet: {
                    ...state.comboTindakanRadiologiGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_TINDAKAN_RADIOLOGI_GET_ERROR: {
            return {
                ...state,
                comboTindakanRadiologiGet: {
                    ...state.comboTindakanRadiologiGet,
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

        case LIST_TAGIHAN: {
            return {
                ...state,
                listTagihanGet: {
                    ...state.listTagihanGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_TAGIHAN_SUCCESS: {
            return {
                ...state,
                listTagihanGet: {
                    ...state.listTagihanGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_TAGIHAN_ERROR: {
            return {
                ...state,
                listTagihanGet: {
                    ...state.listTagihanGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case LIST_TAGIHAN_PRINT: {
            return {
                ...state,
                listTagihanPrintGet: {
                    ...state.listTagihanPrintGet,
                    loading: true,
                    error: null,
                }
            }
        }

        case LIST_TAGIHAN_PRINT_SUCCESS: {
            return {
                ...state,
                listTagihanPrintGet: {
                    ...state.listTagihanPrintGet,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case LIST_TAGIHAN_PRINT_ERROR: {
            return {
                ...state,
                listTagihanPrintGet: {
                    ...state.listTagihanPrintGet,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_OBAT_FROM_UNIT: {
            return {
                ...state,
                getObatFromUnit: {
                    ...state.getObatFromUnit,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_OBAT_FROM_UNIT_SUCCESS: {
            return {
                ...state,
                getObatFromUnit: {
                    ...state.getObatFromUnit,
                    data: action.payload,
                    error: null,
                    loading: false,
                }
            }
        }

        case GET_OBAT_FROM_UNIT_ERROR: {
            return {
                ...state,
                getObatFromUnit: {
                    ...state.getObatFromUnit,
                    data: [],
                    loading: false,
                    error: action.error,
                }
            }
        }

        case CREATE_OR_UPDATE_RESEP_ORDER: {
            return {
                ...state,
                createOrUpdateResepOrder: {
                    ...state.createOrUpdateResepOrder,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case CREATE_OR_UPDATE_RESEP_ORDER_SUCCESS: {
            return {
                ...state,
                createOrUpdateResepOrder: {
                    ...state.createOrUpdateResepOrder,
                    data: action.payload,
                    error: null,
                    loading: false,
                }
            }
        }

        case CREATE_OR_UPDATE_RESEP_ORDER_ERROR: {
            return {
                ...state,
                createOrUpdateResepOrder: {
                    ...state.createOrUpdateResepOrder,
                    data: [],
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_ORDER_RESEP_FROM_DP: {
            return {
                ...state,
                getOrderResepFromDP: {
                    ...state.getOrderResepFromDP,
                    data: [],
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_ORDER_RESEP_FROM_DP_SUCCESS: {
            return {
                ...state,
                getOrderResepFromDP: {
                    ...state.getOrderResepFromDP,
                    data: action.payload,
                    error: null,
                    loading: false,
                }
            }
        }

        case GET_ORDER_RESEP_FROM_DP_ERROR: {
            return {
                ...state,
                getOrderResepFromDP: {
                    ...state.getOrderResepFromDP,
                    data: [],
                    loading: false,
                    error: action.error,
                }
            }
        }

        case EMR_JENIS_PELAYANAN_SAVE: {
            return {
                ...state,
                emrJenisPelayananSave: {
                    ...state.emrJenisPelayananSave,
                    loading: true,
                    error: null,
                }
            }
        }

        case EMR_JENIS_PELAYANAN_SAVE_SUCCESS: {
            return {
                ...state,
                emrJenisPelayananSave: {
                    ...state.emrJenisPelayananSave,
                    newData: action.payload,
                    loading: false,
                    success: true,
                }
            }
        }

        case EMR_JENIS_PELAYANAN_SAVE_ERROR: {
            return {
                ...state,
                emrJenisPelayananSave: {
                    ...state.emrJenisPelayananSave,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_HISTORI_JENIS_PELAYANAN: {
            return {
                ...state,
                getHistoriJenisPelayanan: {
                    ...state.getHistoriJenisPelayanan,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_HISTORI_JENIS_PELAYANAN_SUCCESS: {
            return {
                ...state,
                getHistoriJenisPelayanan: {
                    ...state.getHistoriJenisPelayanan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_HISTORI_JENIS_PELAYANAN_ERROR: {
            return {
                ...state,
                getHistoriJenisPelayanan: {
                    ...state.getHistoriJenisPelayanan,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_EMR_TRIAGE_IGD: {
            return {
                ...state,
                saveEmrTriageIgd: {
                    ...state.saveEmrTriageIgd,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case SAVE_EMR_TRIAGE_IGD_SUCCESS: {
            return {
                ...state,
                saveEmrTriageIgd: {
                    ...state.saveEmrTriageIgd,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case SAVE_EMR_TRIAGE_IGD_ERROR: {
            return {
                ...state,
                saveEmrTriageIgd: {
                    ...state.saveEmrTriageIgd,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_COMBO_TRIAGE_IGD: {
            return {
                ...state,
                getGetComboTriageIgd: {
                    ...state.getGetComboTriageIgd,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_TRIAGE_IGD_SUCCESS: {
            return {
                ...state,
                getGetComboTriageIgd: {
                    ...state.getGetComboTriageIgd,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_COMBO_TRIAGE_IGD_ERROR: {
            return {
                ...state,
                getGetComboTriageIgd: {
                    ...state.getGetComboTriageIgd,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case GET_HISTORI_TRIAGE_BYNOREC: {
            return {
                ...state,
                getHistoriTriagiByNorec: {
                    ...state.getHistoriTriagiByNorec,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_HISTORI_TRIAGE_BYNOREC_SUCCESS: {
            return {
                ...state,
                getHistoriTriagiByNorec: {
                    ...state.getHistoriTriagiByNorec,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_HISTORI_TRIAGE_BYNOREC_ERROR: {
            return {
                ...state,
                getHistoriTriagiByNorec: {
                    ...state.getHistoriTriagiByNorec,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_ORDER_OPERASI: {
            return {
                ...state,
                saveOrderOperasi: {
                    ...state.saveOrderOperasi,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case SAVE_ORDER_OPERASI_SUCCESS: {
            return {
                ...state,
                saveOrderOperasi: {
                    ...state.saveOrderOperasi,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case SAVE_ORDER_OPERASI_ERROR: {
            return {
                ...state,
                saveOrderOperasi: {
                    ...state.saveOrderOperasi,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_HISTORI_ORDER_OPERASI: {
            return {
                ...state,
                getHistoriOrderOperasi: {
                    ...state.getHistoriOrderOperasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_HISTORI_ORDER_OPERASI_SUCCESS: {
            return {
                ...state,
                getHistoriOrderOperasi: {
                    ...state.getHistoriOrderOperasi,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_HISTORI_ORDER_OPERASI_ERROR: {
            return {
                ...state,
                getHistoriOrderOperasi: {
                    ...state.getHistoriOrderOperasi,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_PELAYANAN_PASIEN_TEMP: {
            return {
                ...state,
                savePelayananPasienTemp: {
                    ...state.savePelayananPasienTemp,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case SAVE_PELAYANAN_PASIEN_TEMP_SUCCESS: {
            return {
                ...state,
                savePelayananPasienTemp: {
                    ...state.savePelayananPasienTemp,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case SAVE_PELAYANAN_PASIEN_TEMP_ERROR: {
            return {
                ...state,
                savePelayananPasienTemp: {
                    ...state.savePelayananPasienTemp,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_LIST_PELAYANAN_PASIEN_TEMP: {
            return {
                ...state,
                getListPelayananPasienTemp: {
                    ...state.getListPelayananPasienTemp,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_LIST_PELAYANAN_PASIEN_TEMP_SUCCESS: {
            return {
                ...state,
                getListPelayananPasienTemp: {
                    ...state.getListPelayananPasienTemp,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_LIST_PELAYANAN_PASIEN_TEMP_ERROR: {
            return {
                ...state,
                getListPelayananPasienTemp: {
                    ...state.getListPelayananPasienTemp,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case DELETE_PELAYANAN_PASIEN_TEMP: {
            return {
                ...state,
                deletePelayananPasienTemp: {
                    ...state.deletePelayananPasienTemp,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case DELETE_PELAYANAN_PASIEN_TEMP_SUCCESS: {
            return {
                ...state,
                deletePelayananPasienTemp: {
                    ...state.deletePelayananPasienTemp,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case DELETE_PELAYANAN_PASIEN_TEMP_ERROR: {
            return {
                ...state,
                deletePelayananPasienTemp: {
                    ...state.deletePelayananPasienTemp,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_WIDGET_EFISIENSI_KLAIM: {
            return {
                ...state,
                getWidgetEfisiensiKlaim: {
                    ...state.getWidgetEfisiensiKlaim,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_WIDGET_EFISIENSI_KLAIM_SUCCESS: {
            return {
                ...state,
                getWidgetEfisiensiKlaim: {
                    ...state.getWidgetEfisiensiKlaim,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case GET_WIDGET_EFISIENSI_KLAIM_ERROR: {
            return {
                ...state,
                getWidgetEfisiensiKlaim: {
                    ...state.getWidgetEfisiensiKlaim,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case UPDATE_ESTIMASI_KLAIM: {
            return {
                ...state,
                updateEstimasiKlaim: {
                    ...state.updateEstimasiKlaim,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case UPDATE_ESTIMASI_KLAIM_SUCCESS: {
            return {
                ...state,
                updateEstimasiKlaim: {
                    ...state.updateEstimasiKlaim,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case UPDATE_ESTIMASI_KLAIM_ERROR: {
            return {
                ...state,
                updateEstimasiKlaim: {
                    ...state.updateEstimasiKlaim,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case COMBO_ALL_TINDAKAN_GET: {
            return {
                ...state,
                comboAllTindakan: {
                    ...state.comboAllTindakan,
                    loading: true,
                    error: null,
                }
            }
        }

        case COMBO_ALL_TINDAKAN_GET_SUCCESS: {
            return {
                ...state,
                comboAllTindakan: {
                    ...state.comboAllTindakan,
                    data: action.payload,
                    loading: false,
                }
            }
        }

        case COMBO_ALL_TINDAKAN_GET_ERROR: {
            return {
                ...state,
                comboAllTindakan: {
                    ...state.comboAllTindakan,
                    loading: false,
                    error: action.error,
                }
            }
        }

        case SAVE_EMR_PASIEN: {
            return {
                ...state,
                saveEmrPasien: {
                    ...state.saveEmrPasien,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case SAVE_EMR_PASIEN_SUCCESS: {
            return {
                ...state,
                saveEmrPasien: {
                    ...state.saveEmrPasien,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case SAVE_EMR_PASIEN_ERROR: {
            return {
                ...state,
                saveEmrPasien: {
                    ...state.saveEmrPasien,
                    loading: false,
                    error: action.payload,
                },
            };
        }

        case GET_ASESMENBAYILAHIR_BYNOREC: {
            return {
                ...state,
                getAsesmenBayiLahirByNorec: {
                    ...state.getAsesmenBayiLahirByNorec,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_ASESMENBAYILAHIR_BYNOREC_SUCCESS: {
            return {
                ...state,
                getAsesmenBayiLahirByNorec: {
                    ...state.getAsesmenBayiLahirByNorec,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_ASESMENBAYILAHIR_BYNOREC_ERROR: {
            return {
                ...state,
                getAsesmenBayiLahirByNorec: {
                    ...state.getAsesmenBayiLahirByNorec,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case GET_COMBO_ASESMENBAYILAHIR: {
            return {
                ...state,
                getComboAsesmenBayiLahir: {
                    ...state.getComboAsesmenBayiLahir,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_ASESMENBAYILAHIR_SUCCESS: {
            return {
                ...state,
                getComboAsesmenBayiLahir: {
                    ...state.getComboAsesmenBayiLahir,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_COMBO_ASESMENBAYILAHIR_ERROR: {
            return {
                ...state,
                getComboAsesmenBayiLahir: {
                    ...state.getComboAsesmenBayiLahir,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case GET_HISTORY_ASESMENBAYILAHIR: {
            return {
                ...state,
                getHistoryAsesmenBayiLahir: {
                    ...state.getHistoryAsesmenBayiLahir,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_HISTORY_ASESMENBAYILAHIR_SUCCESS: {
            return {
                ...state,
                getHistoryAsesmenBayiLahir: {
                    ...state.getHistoryAsesmenBayiLahir,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_HISTORY_ASESMENBAYILAHIR_ERROR: {
            return {
                ...state,
                getHistoryAsesmenBayiLahir: {
                    ...state.getHistoryAsesmenBayiLahir,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case GET_ANTREAN_PEMERIKSAAN_OBAT: {
            return {
                ...state,
                getAntreanPemeriksaanObat: {
                    ...state.getAntreanPemeriksaanObat,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_ANTREAN_PEMERIKSAAN_OBAT_SUCCESS: {
            return {
                ...state,
                getAntreanPemeriksaanObat: {
                    ...state.getAntreanPemeriksaanObat,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_ANTREAN_PEMERIKSAAN_OBAT_ERROR: {
            return {
                ...state,
                getAntreanPemeriksaanObat: {
                    ...state.getAntreanPemeriksaanObat,
                    loading: true,
                    error: action.payload,
                }
            }
        }

        case DELETE_ORDER_RESEP: {
            return {
                ...state,
                deleteOrderResep: {
                    ...state.deleteOrderResep,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case DELETE_ORDER_RESEP_SUCCESS: {
            return {
                ...state,
                deleteOrderResep: {
                    ...state.deleteOrderResep,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case DELETE_ORDER_RESEP_ERROR: {
            return {
                ...state,
                deleteOrderResep: {
                    ...state.deleteOrderResep,
                    loading: false,
                    error: action.payload,
                },
            };
        }


        default: {
            return { ...state };
        }
    }
};

export default Emr;