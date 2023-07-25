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
            
        default:
            return { ...state };
    }
};
  

export default payment;