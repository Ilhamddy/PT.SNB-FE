import {
    PELAYANAN_FROM_DP_GET,
    PELAYANAN_FROM_DP_GET_SUCCESS,
    PELAYANAN_FROM_DP_GET_ERROR,
    PELAYANAN_FROM_DP_GET_RESET,
    NOTA_VERIF_CREATE,
    NOTA_VERIF_CREATE_SUCCESS,
    NOTA_VERIF_CREATE_ERROR,
    NOTA_VERIF_CREATE_RESET,
    DAFTAR_TAGIHAN_PASIEN_GET,
    DAFTAR_TAGIHAN_PASIEN_GET_SUCCESS,
    DAFTAR_TAGIHAN_PASIEN_GET_ERROR,
    DAFTAR_TAGIHAN_PASIEN_GET_RESET,
    PELAYANAN_FROM_VERIF_GET,
    PELAYANAN_FROM_VERIF_GET_SUCCESS,
    PELAYANAN_FROM_VERIF_GET_ERROR,
    PELAYANAN_FROM_VERIF_GET_RESET,
    BUKTI_BAYAR_CREATE,
    BUKTI_BAYAR_CREATE_SUCCESS,
    BUKTI_BAYAR_CREATE_ERROR,
    BUKTI_BAYAR_CREATE_RESET,
    VERIF_NOTA_CANCEL,
    VERIF_NOTA_CANCEL_SUCCESS,
    VERIF_NOTA_CANCEL_ERROR,
    VERIF_NOTA_CANCEL_RESET,
    BUKTI_BAYAR_CANCEL,
    BUKTI_BAYAR_CANCEL_SUCCESS,
    BUKTI_BAYAR_CANCEL_ERROR,
    BUKTI_BAYAR_CANCEL_RESET,
    DAFTAR_PIUTANG_PASIEN_GET,
    DAFTAR_PIUTANG_PASIEN_GET_SUCCESS,
    DAFTAR_PIUTANG_PASIEN_GET_ERROR,
    DAFTAR_PIUTANG_PASIEN_GET_RESET,
    PAYMENT_PIUTANG_PASIEN_GET,
    PAYMENT_PIUTANG_PASIEN_GET_SUCCESS,
    PAYMENT_PIUTANG_PASIEN_GET_ERROR,
    PAYMENT_PIUTANG_PASIEN_GET_RESET,
    LAPORAN_PENDAPATAN_KASIR_GET,
    LAPORAN_PENDAPATAN_KASIR_GET_SUCCESS,
    LAPORAN_PENDAPATAN_KASIR_GET_ERROR,
    LAPORAN_PENDAPATAN_KASIR_GET_RESET,
    GET_PIUTANG_AFTER_DATE,
    GET_PIUTANG_AFTER_DATE_SUCCESS,
    GET_PIUTANG_AFTER_DATE_ERROR,
    GET_DAFTAR_VERIFIKASI_REMUNERASI, 
    GET_DAFTAR_VERIFIKASI_REMUNERASI_SUCCESS, 
    GET_DAFTAR_VERIFIKASI_REMUNERASI_ERROR,
    UPSERT_VERIFIKASI_REMUNERASI,
    UPSERT_VERIFIKASI_REMUNERASI_SUCCESS,
    UPSERT_VERIFIKASI_REMUNERASI_ERROR,
    UPSERT_VERIFIKASI_REMUNERASI_RESET,
    GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI,
    GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI_SUCCESS,
    GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI_ERROR,
    GET_COMBO_SETOR,
    GET_COMBO_SETOR_SUCCESS,
    GET_COMBO_SETOR_ERROR,
    GET_PEMBAYARAN_SETOR,
    GET_PEMBAYARAN_SETOR_SUCCESS,
    GET_PEMBAYARAN_SETOR_ERROR,
    UPSERT_SETORAN,
    UPSERT_SETORAN_SUCCESS,
    UPSERT_SETORAN_ERROR
} from "./actionType";

const INIT_STATE = {
    pelayananFromDPGet: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    notaVerifCreate: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    daftarTagihanPasienGet: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    pelayananFromVerifGet: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    buktiBayarCreate: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    verifNotaCancel: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    buktiBayarCancel: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    daftarPiutangPasienGet: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    paymentPiutangPasienGet: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    laporanPendapatanKasirGet: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    getPiutangAfterDate: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    getDaftarVerifikasiRemunerasi: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    updateResetPassword:{
        newData: null,
        loading: false,
        error: null,
        success: false
    },
    getDaftarSudahVerifikasiRemunerasi: {
        data: [],
        loading: false,
        success: false,
        error: null,
    },
    getComboSetor: {
        data: [],
        loading: false,
        error: null,
    },
    getPembayaranSetor: {
        data: [],
        loading: false,
        error: null,
    },
    upsertSetoran: {
        data: [],
        loading: false,
        error: null,
    }
}

const payment = (state = INIT_STATE, action) => {
    switch (action.type) {
        case PELAYANAN_FROM_DP_GET:
            return {
                ...state,
                pelayananFromDPGet: {
                    ...state.pelayananFromDPGet,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        case PELAYANAN_FROM_DP_GET_SUCCESS:
            return {
                ...state,
                pelayananFromDPGet: {
                    ...state.pelayananFromDPGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case PELAYANAN_FROM_DP_GET_ERROR:
            return {
                ...state,
                pelayananFromDPGet: {
                    ...state.pelayananFromDPGet,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case PELAYANAN_FROM_DP_GET_RESET:
            return {
                ...state,
                pelayananFromDPGet: {
                    ...state.pelayananFromDPGet,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };
        case NOTA_VERIF_CREATE:
            return {
                ...state,
                notaVerifCreate: {
                    ...state.notaVerifCreate,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        case NOTA_VERIF_CREATE_SUCCESS:
            return {
                ...state,
                notaVerifCreate: {
                    ...state.notaVerifCreate,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case NOTA_VERIF_CREATE_ERROR:
            return {
                ...state,
                notaVerifCreate: {
                    ...state.notaVerifCreate,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case NOTA_VERIF_CREATE_RESET:
            return {
                ...state,
                notaVerifCreate: {
                    ...state.notaVerifCreate,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };
        case DAFTAR_TAGIHAN_PASIEN_GET:
            return {
                ...state,
                daftarTagihanPasienGet: {
                    ...state.daftarTagihanPasienGet,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        case DAFTAR_TAGIHAN_PASIEN_GET_SUCCESS:
            return {
                ...state,
                daftarTagihanPasienGet: {
                    ...state.daftarTagihanPasienGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case DAFTAR_TAGIHAN_PASIEN_GET_ERROR:
            return {
                ...state,
                daftarTagihanPasienGet: {
                    ...state.daftarTagihanPasienGet,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case DAFTAR_TAGIHAN_PASIEN_GET_RESET:
            return {
                ...state,
                daftarTagihanPasienGet: {
                    ...state.daftarTagihanPasienGet,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };
        case PELAYANAN_FROM_VERIF_GET:
            return {
                ...state,
                pelayananFromVerifGet: {
                    ...state.pelayananFromVerifGet,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        case PELAYANAN_FROM_VERIF_GET_SUCCESS:
            return {
                ...state,
                pelayananFromVerifGet: {
                    ...state.pelayananFromVerifGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case PELAYANAN_FROM_VERIF_GET_ERROR:
            return {
                ...state,
                pelayananFromVerifGet: {
                    ...state.pelayananFromVerifGet,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case PELAYANAN_FROM_VERIF_GET_RESET:
            return {
                ...state,
                pelayananFromVerifGet: {
                    ...state.pelayananFromVerifGet,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };
        case BUKTI_BAYAR_CREATE:
            return {
                ...state,
                buktiBayarCreate: {
                    ...state.buktiBayarCreate,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case BUKTI_BAYAR_CREATE_SUCCESS:
            return {
                ...state,
                buktiBayarCreate: {
                    ...state.buktiBayarCreate,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case BUKTI_BAYAR_CREATE_ERROR:
            return {
                ...state,
                buktiBayarCreate: {
                    ...state.buktiBayarCreate,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case BUKTI_BAYAR_CREATE_RESET:
            return {
                ...state,
                buktiBayarCreate: {
                    ...state.buktiBayarCreate,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };

        case VERIF_NOTA_CANCEL:
            return {
                ...state,
                verifNotaCancel: {
                    ...state.verifNotaCancel,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case VERIF_NOTA_CANCEL_SUCCESS:
            return {
                ...state,
                verifNotaCancel: {
                    ...state.verifNotaCancel,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case VERIF_NOTA_CANCEL_ERROR:
            return {
                ...state,
                verifNotaCancel: {
                    ...state.verifNotaCancel,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case VERIF_NOTA_CANCEL_RESET:
            return {
                ...state,
                verifNotaCancel: {
                    ...state.verifNotaCancel,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };

        case BUKTI_BAYAR_CANCEL:
            return {
                ...state,
                buktiBayarCancel: {
                    ...state.buktiBayarCancel,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case BUKTI_BAYAR_CANCEL_SUCCESS:
            return {
                ...state,
                buktiBayarCancel: {
                    ...state.buktiBayarCancel,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case BUKTI_BAYAR_CANCEL_ERROR:
            return {
                ...state,
                buktiBayarCancel: {
                    ...state.buktiBayarCancel,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case BUKTI_BAYAR_CANCEL_RESET:
            return {
                ...state,
                buktiBayarCancel: {
                    ...state.buktiBayarCancel,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };

        case DAFTAR_PIUTANG_PASIEN_GET:
            return {
                ...state,
                daftarPiutangPasienGet: {
                    ...state.daftarPiutangPasienGet,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        case DAFTAR_PIUTANG_PASIEN_GET_SUCCESS:
            return {
                ...state,
                daftarPiutangPasienGet: {
                    ...state.daftarPiutangPasienGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case DAFTAR_PIUTANG_PASIEN_GET_ERROR:
            return {
                ...state,
                daftarPiutangPasienGet: {
                    ...state.daftarPiutangPasienGet,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case DAFTAR_PIUTANG_PASIEN_GET_RESET:
            return {
                ...state,
                daftarPiutangPasienGet: {
                    ...state.daftarPiutangPasienGet,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };

        case PAYMENT_PIUTANG_PASIEN_GET:
            return {
                ...state,
                paymentPiutangPasienGet: {
                    ...state.paymentPiutangPasienGet,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case PAYMENT_PIUTANG_PASIEN_GET_SUCCESS:
            return {
                ...state,
                paymentPiutangPasienGet: {
                    ...state.paymentPiutangPasienGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case PAYMENT_PIUTANG_PASIEN_GET_ERROR:
            return {
                ...state,
                paymentPiutangPasienGet: {
                    ...state.paymentPiutangPasienGet,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case PAYMENT_PIUTANG_PASIEN_GET_RESET:
            return {
                ...state,
                paymentPiutangPasienGet: {
                    ...state.paymentPiutangPasienGet,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };

        case LAPORAN_PENDAPATAN_KASIR_GET:
            return {
                ...state,
                laporanPendapatanKasirGet: {
                    ...state.laporanPendapatanKasirGet,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case LAPORAN_PENDAPATAN_KASIR_GET_SUCCESS:
            return {
                ...state,
                laporanPendapatanKasirGet: {
                    ...state.laporanPendapatanKasirGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case LAPORAN_PENDAPATAN_KASIR_GET_ERROR:
            return {
                ...state,
                laporanPendapatanKasirGet: {
                    ...state.laporanPendapatanKasirGet,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };

        case LAPORAN_PENDAPATAN_KASIR_GET_RESET:
            return {
                ...state,
                laporanPendapatanKasirGet: {
                    ...state.laporanPendapatanKasirGet,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };

        case GET_PIUTANG_AFTER_DATE:
            return {
                ...state,
                getPiutangAfterDate: {
                    ...state.getPiutangAfterDate,
                    data: [],
                    loading: true,
                    error: null,
                },
            };

        case GET_PIUTANG_AFTER_DATE_SUCCESS:
            return {
                ...state,
                getPiutangAfterDate: {
                    ...state.getPiutangAfterDate,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case GET_PIUTANG_AFTER_DATE_ERROR:
            return {
                ...state,
                getPiutangAfterDate: {
                    ...state.getPiutangAfterDate,
                    loading: false,
                    error: action.payload,
                },
            };

        case GET_DAFTAR_VERIFIKASI_REMUNERASI: {
            return {
                ...state,
                getDaftarVerifikasiRemunerasi: {
                    ...state.getDaftarVerifikasiRemunerasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_DAFTAR_VERIFIKASI_REMUNERASI_SUCCESS: {
            return {
                ...state,
                getDaftarVerifikasiRemunerasi: {
                    ...state.getDaftarVerifikasiRemunerasi,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_DAFTAR_VERIFIKASI_REMUNERASI_ERROR: {
            return {
                ...state,
                getDaftarVerifikasiRemunerasi: {
                    ...state.getDaftarVerifikasiRemunerasi,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_VERIFIKASI_REMUNERASI: {
            return {
                ...state,
                upsertVerifikasiRemunerasi: {
                    ...state.upsertVerifikasiRemunerasi,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        }

        case UPSERT_VERIFIKASI_REMUNERASI_SUCCESS: {
            return {
                ...state,
                upsertVerifikasiRemunerasi: {
                    ...state.upsertVerifikasiRemunerasi,
                    loading: false,
                    data: action.payload,
                    success: true,
                },
            };
        }

        case UPSERT_VERIFIKASI_REMUNERASI_ERROR: {
            return {
                ...state,
                upsertVerifikasiRemunerasi: {
                    ...state.upsertVerifikasiRemunerasi,
                    loading: false,
                    error: action.payload,
                },
            };
        }
        
        case UPSERT_VERIFIKASI_REMUNERASI_RESET:
            return {
                ...state,
                upsertVerifikasiRemunerasi: {
                    ...state.upsertVerifikasiRemunerasi,
                    data: [],
                    success: false,
                    loading: false,
                    error: null,
                },
            };

        case GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI: {
            return {
                ...state,
                getDaftarSudahVerifikasiRemunerasi: {
                    ...state.getDaftarSudahVerifikasiRemunerasi,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI_SUCCESS: {
            return {
                ...state,
                getDaftarSudahVerifikasiRemunerasi: {
                    ...state.getDaftarSudahVerifikasiRemunerasi,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_DAFTAR_SUDAH_VERIFIKASI_REMUNERASI_ERROR: {
            return {
                ...state,
                getDaftarSudahVerifikasiRemunerasi: {
                    ...state.getDaftarSudahVerifikasiRemunerasi,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case GET_COMBO_SETOR: {
            return {
                ...state,
                getComboSetor: {
                    ...state.getComboSetor,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_COMBO_SETOR_SUCCESS: {
            return {
                ...state,
                getComboSetor: {
                    ...state.getComboSetor,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_COMBO_SETOR_ERROR: {
            return {
                ...state,
                getComboSetor: {
                    ...state.getComboSetor,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        
        case GET_PEMBAYARAN_SETOR: {
            return {
                ...state,
                getPembayaranSetor: {
                    ...state.getPembayaranSetor,
                    loading: true,
                    error: null,
                }
            }
        }

        case GET_PEMBAYARAN_SETOR_SUCCESS: {
            return {
                ...state,
                getPembayaranSetor: {
                    ...state.getPembayaranSetor,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case GET_PEMBAYARAN_SETOR_ERROR: {
            return {
                ...state,
                getPembayaranSetor: {
                    ...state.getPembayaranSetor,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        case UPSERT_SETORAN: {
            return {
                ...state,
                upsertSetoran: {
                    ...state.upsertSetoran,
                    loading: true,
                    error: null,
                }
            }
        }

        case UPSERT_SETORAN_SUCCESS: {
            return {
                ...state,
                upsertSetoran: {
                    ...state.upsertSetoran,
                    loading: false,
                    data: action.payload,
                }
            }
        }

        case UPSERT_SETORAN_ERROR: {
            return {
                ...state,
                upsertSetoran: {
                    ...state.upsertSetoran,
                    loading: false,
                    error: action.payload,
                }
            }
        }

        

        default:
            return { ...state };
    }
};


export default payment;