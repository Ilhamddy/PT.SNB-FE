import {
    GET_PASIEN_RJ,
    GET_PASIEN_RJ_SUCCESS,
    GET_PASIEN_RJ_ERROR,
    GET_PASIEN_IGD,
    GET_PASIEN_IGD_SUCCESS,
    GET_PASIEN_IGD_ERROR,
    GET_PASIEN_RANAP,
    GET_PASIEN_RANAP_SUCCESS,
    GET_PASIEN_RANAP_ERROR,
    GET_COUNT_CARA_BAYAR,
    GET_COUNT_CARA_BAYAR_SUCCESS,
    GET_COUNT_CARA_BAYAR_ERROR,
    GET_POLIKLINIK_TERBANYAK,
    GET_POLIKLINIK_TERBANYAK_SUCCESS,
    GET_POLIKLINIK_TERBANYAK_ERROR,
    GET_COUNT_UNIT,
    GET_COUNT_UNIT_SUCCESS,
    GET_COUNT_UNIT_ERROR,
    GET_STATUS_PEGAWAI,
    GET_STATUS_PEGAWAI_SUCCESS,
    GET_STATUS_PEGAWAI_ERROR,
    GET_PEGAWAI_PENSIUN,
    GET_PEGAWAI_PENSIUN_SUCCESS,
    GET_PEGAWAI_PENSIUN_ERROR,
    GET_DASBOR_FARMASI,
    GET_DASBOR_FARMASI_SUCCESS,
    GET_DASBOR_FARMASI_ERROR,
    GET_DASBOR_PEMBAYARAN,
    GET_DASBOR_PEMBAYARAN_SUCCESS,
    GET_DASBOR_PEMBAYARAN_ERROR,
    SET_PASIEN_RAJAL,
    RESET_PASIEN_RAJAL,
    SET_PASIEN_GADAR,
    RESET_PASIEN_GADAR,
    SET_PASIEN_RANAP,
    RESET_PASIEN_RANAP,
    SET_WIDGET_UTAMA,
    RESET_WIDGET_UTAMA,
    SET_PASIEN_BAYAR,
    RESET_PASIEN_BAYAR,
    SET_PASIEN_POLIKLINIK,
    RESET_PASIEN_POLIKLINIK,
    SET_STATUS_PEGAWAI,
    RESET_STATUS_PEGAWAI,
    SET_PEMBAYARAN,
    RESET_PEMBAYARAN,
    SET_PEMESANAN,
    RESET_PEMESANAN,
    SET_PENERIMAAN,
    RESET_PENERIMAAN,
    SET_RETUR,
    RESET_RETUR
} from "./actionType";
  
const INIT_STATE = {
    getPasienRJ: {
        data: [],
        loading: false,
        error: null
    },
    getPasienIGD: {
        data: [],
        loading: false,
        error: null
    },
    getPasienRanap: {
        data: [],
        loading: false,
        error: null
    },
    getCountCaraBayar: {
        data: [],
        loading: false,
        error: null
    },
    getPoliklinikTerbanyak: {
        data: [],
        loading: false,
        error: null
    },
    getCountUnit: {
        data: [],
        loading: false,
        error: null
    },
    getStatusPegawai: {
        data: [],
        loading: false,
        error: null
    },
    getPegawaiPensiun: {
        data: [],
        loading: false,
        error: null
    },
    getDasborFarmasi: {
        data: [],
        loading: false,
        error: null
    },
    tabelPasien: {
        widgetutama: {
            name: "",
            data: null,
        },
        pasienRajal: {
            name: "",
            data: null,
        },
        pasienGadar: {
            name: "",
            data: null
        },
        pasienRanap: {
            name: "",
            data: null
        },
        pasienBayar: {
            name: "",
            data: null
        },
        pasienPoliklinik: {
            name: "",
            data: null
        },
        statusPegawai: {
            name: "",
            data: null
        },
        pembayaran: {
            name: "",
            data: null
        },
        pemesanan: {
            name: "",
            data: null
        },
        penerimaan: {
            name: "",
            data: null
        },
        retur: {
            name: "",
            data: null
        },
    },
    getDasborPembayaran: {
        data: [],
        loading: false,
        error: null
    }
};
  
const Eis = (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case GET_PASIEN_RJ: {
            return {
                ...state,
                getPasienRJ: {
                    ...state.getPasienRJ,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_PASIEN_RJ_SUCCESS: {
            return {
                ...state,
                getPasienRJ: {
                    ...state.getPasienRJ,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_PASIEN_RJ_ERROR: {
            return {
                ...state,
                getPasienRJ: {
                    ...state.getPasienRJ,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_PASIEN_IGD: {
            return {
                ...state,
                getPasienIGD: {
                    ...state.getPasienIGD,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_PASIEN_IGD_SUCCESS: {
            return {
                ...state,
                getPasienIGD: {
                    ...state.getPasienIGD,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_PASIEN_IGD_ERROR: {
            return {
                ...state,
                getPasienIGD: {
                    ...state.getPasienIGD,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        
        case GET_PASIEN_RANAP: {
            return {
                ...state,
                getPasienRanap: {
                    ...state.getPasienRanap,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_PASIEN_RANAP_SUCCESS: {
            return {
                ...state,
                getPasienRanap: {
                    ...state.getPasienRanap,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_PASIEN_RANAP_ERROR: {
            return {
                ...state,
                getPasienRanap: {
                    ...state.getPasienRanap,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_COUNT_CARA_BAYAR: {
            return {
                ...state,
                getCountCaraBayar: {
                    ...state.getCountCaraBayar,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_COUNT_CARA_BAYAR_SUCCESS: {
            return {
                ...state,
                getCountCaraBayar: {
                    ...state.getCountCaraBayar,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_COUNT_CARA_BAYAR_ERROR: {
            return {
                ...state,
                getCountCaraBayar: {
                    ...state.getCountCaraBayar,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_POLIKLINIK_TERBANYAK: {
            return {
                ...state,
                getPoliklinikTerbanyak: {
                    ...state.getPoliklinikTerbanyak,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_POLIKLINIK_TERBANYAK_SUCCESS: {
            return {
                ...state,
                getPoliklinikTerbanyak: {
                    ...state.getPoliklinikTerbanyak,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_POLIKLINIK_TERBANYAK_ERROR: {
            return {
                ...state,
                getPoliklinikTerbanyak: {
                    ...state.getPoliklinikTerbanyak,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_COUNT_UNIT: {
            return {
                ...state,
                getCountUnit: {
                    ...state.getCountUnit,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_COUNT_UNIT_SUCCESS: {
            return {
                ...state,
                getCountUnit: {
                    ...state.getCountUnit,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_COUNT_UNIT_ERROR: {
            return {
                ...state,
                getCountUnit: {
                    ...state.getCountUnit,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_STATUS_PEGAWAI: {
            return {
                ...state,
                getStatusPegawai: {
                    ...state.getStatusPegawai,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_STATUS_PEGAWAI_SUCCESS: {
            return {
                ...state,
                getStatusPegawai: {
                    ...state.getStatusPegawai,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_STATUS_PEGAWAI_ERROR: {
            return {
                ...state,
                getStatusPegawai: {
                    ...state.getStatusPegawai,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_PEGAWAI_PENSIUN: {
            return {
                ...state,
                getPegawaiPensiun: {
                    ...state.getPegawaiPensiun,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_PEGAWAI_PENSIUN_SUCCESS: {
            return {
                ...state,
                getPegawaiPensiun: {
                    ...state.getPegawaiPensiun,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_PEGAWAI_PENSIUN_ERROR: {
            return {
                ...state,
                getPegawaiPensiun: {
                    ...state.getPegawaiPensiun,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_DASBOR_FARMASI: {
            return {
                ...state,
                getDasborFarmasi: {
                    ...state.getDasborFarmasi,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_DASBOR_FARMASI_SUCCESS: {
            return {
                ...state,
                getDasborFarmasi: {
                    ...state.getDasborFarmasi,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_DASBOR_FARMASI_ERROR: {
            return {
                ...state,
                getDasborFarmasi: {
                    ...state.getDasborFarmasi,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case GET_DASBOR_PEMBAYARAN: {
            return {
                ...state,
                getDasborPembayaran: {
                    ...state.getDasborPembayaran,
                    loading: true,
                    data: [],
                    error: null
                }
            }
        }

        case GET_DASBOR_PEMBAYARAN_SUCCESS: {
            return {
                ...state,
                getDasborPembayaran: {
                    ...state.getDasborPembayaran,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        }

        case GET_DASBOR_PEMBAYARAN_ERROR: {
            return {
                ...state,
                getDasborPembayaran: {
                    ...state.getDasborPembayaran,
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
        }

        case SET_WIDGET_UTAMA: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    widgetutama: action.payload
                }
            }
        }

        case RESET_WIDGET_UTAMA: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    widgetutama: INIT_STATE.tabelPasien.widgetutama
                }
            }
        }

        case SET_PASIEN_RAJAL: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienRajal: action.payload
                }
            }
        }

        case RESET_PASIEN_RAJAL: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienRajal: INIT_STATE.tabelPasien.pasienRajal
                }
            }
        }

        case SET_PASIEN_GADAR: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienGadar: action.payload
                }
            }
        }

        case RESET_PASIEN_GADAR: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienGadar: INIT_STATE.tabelPasien.pasienGadar
                }
            }
        }

        case SET_PASIEN_RANAP: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienRanap: action.payload
                }
            }
        }

        case RESET_PASIEN_RANAP: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienRanap: INIT_STATE.tabelPasien.pasienRanap
                }
            }
        }

        case SET_PASIEN_BAYAR: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienBayar: action.payload
                }
            }
        }

        case RESET_PASIEN_BAYAR: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienBayar: INIT_STATE.tabelPasien.pasienBayar
                }
            }
        }

        case SET_PASIEN_POLIKLINIK: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienPoliklinik: action.payload
                }
            }
        }

        case RESET_PASIEN_POLIKLINIK: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pasienPoliklinik: INIT_STATE.tabelPasien.pasienPoliklinik
                }
            }
        }

        case SET_STATUS_PEGAWAI: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    statusPegawai: action.payload
                }
            }
        }

        case RESET_STATUS_PEGAWAI: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    statusPegawai: INIT_STATE.tabelPasien.statusPegawai
                }
            }
        }

        case SET_PEMBAYARAN: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pembayaran: action.payload
                }
            }
        }

        case RESET_PEMBAYARAN: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pembayaran: INIT_STATE.tabelPasien.pembayaran
                }
            }
        }

        case SET_PEMESANAN: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pemesanan: action.payload
                }
            }
        }

        case RESET_PEMESANAN: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    pemesanan: INIT_STATE.tabelPasien.pemesanan
                }
            }
        }

        case SET_PENERIMAAN: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    penerimaan: action.payload
                }
            }
        }

        case RESET_PENERIMAAN: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    penerimaan: INIT_STATE.tabelPasien.penerimaan
                }
            }
        }

        case SET_RETUR: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    retur: action.payload
                }
            }
        }

        case RESET_RETUR: {
            return {
                ...state,
                tabelPasien: {
                    ...state.tabelPasien,
                    retur: INIT_STATE.tabelPasien.retur
                }
            }
        }

        default: {
            return { ...state };
        }
    }
}

export default Eis;