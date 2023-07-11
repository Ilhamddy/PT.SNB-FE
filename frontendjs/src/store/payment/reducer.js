import {
    PELAYANAN_FROM_ANTREAN_GET,
    PELAYANAN_FROM_ANTREAN_GET_SUCCESS,
    PELAYANAN_FROM_ANTREAN_GET_ERROR,
    PELAYANAN_FROM_ANTREAN_GET_RESET,
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
} from "./actionType";

const INIT_STATE = {
    pelayananFromNoAntrianGet: {
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
}

const payment = (state = INIT_STATE, action) => {
    switch (action.type) {
        case PELAYANAN_FROM_ANTREAN_GET:
            return {
                ...state,
                pelayananFromNoAntrianGet: {
                    ...state.pelayananFromNoAntrianGet,
                    data: [],
                    loading: true,
                    error: null,
                },
            };
        case PELAYANAN_FROM_ANTREAN_GET_SUCCESS:
            return {
                ...state,
                pelayananFromNoAntrianGet: {
                    ...state.pelayananFromNoAntrianGet,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case PELAYANAN_FROM_ANTREAN_GET_ERROR:
            return {
                ...state,
                pelayananFromNoAntrianGet: {
                    ...state.pelayananFromNoAntrianGet,
                    data: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case PELAYANAN_FROM_ANTREAN_GET_RESET:
            return {
                ...state,
                pelayananFromNoAntrianGet: {
                    ...state.pelayananFromNoAntrianGet,
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
            
        default:
            return { ...state };
    }
};
  

export default payment;