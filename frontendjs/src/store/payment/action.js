import { PELAYANAN_FROM_ANTREAN_GET,
    PELAYANAN_FROM_ANTREAN_GET_SUCCESS,
    PELAYANAN_FROM_ANTREAN_GET_ERROR,
    PELAYANAN_FROM_ANTREAN_GET_RESET,
    NOTA_VERIF_CREATE,
    NOTA_VERIF_CREATE_SUCCESS,
    NOTA_VERIF_CREATE_ERROR,
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
    BUKTI_BAYAR_CANCEL_RESET
} from "./actionType";

export const pelayananFromAntreanGet = (norecap) => {
    return {
        type: PELAYANAN_FROM_ANTREAN_GET,
        payload: {norecap}
    }
}

export const pelayananFromAntreanGetSuccess = (data) => {
    return {
        type: PELAYANAN_FROM_ANTREAN_GET_SUCCESS,
        payload: data
    }
}

export const pelayananFromAntreanGetError = (error) => {
    return {
        type: PELAYANAN_FROM_ANTREAN_GET_ERROR,
        payload: error
    }
}

export const pelayananFromAntreanGetReset = () => {
    return {
        type: PELAYANAN_FROM_ANTREAN_GET_RESET,
        payload: {}
    }
}

export const notaVerifCreate = (body, callback) => {
    return {
        type: NOTA_VERIF_CREATE,
        payload: {body, callback}
    }
}

export const notaVerifCreateSuccess = (data) => {
    return {
        type: NOTA_VERIF_CREATE_SUCCESS,
        payload: data
    }
}

export const notaVerifCreateError = (error) => {
    return {
        type: NOTA_VERIF_CREATE_ERROR,
        payload: error
    }
}

export const daftarTagihanPasienGet = (body, callback) => {
    return {
        type: DAFTAR_TAGIHAN_PASIEN_GET,
        payload: {body, callback}
    }
}

export const daftarTagihanPasienGetSuccess = (data) => {
    return {
        type: DAFTAR_TAGIHAN_PASIEN_GET_SUCCESS,
        payload: data
    }
}

export const daftarTagihanPasienGetError = (error) => {
    return {
        type: DAFTAR_TAGIHAN_PASIEN_GET_ERROR,
        payload: error
    }
}

export const daftarTagihanPasienGetReset = () => {
    return {
        type: DAFTAR_TAGIHAN_PASIEN_GET_RESET,
        payload: {}
    }
}

export const pelayananFromVerifGet = (norecnota) => {
    return {
        type: PELAYANAN_FROM_VERIF_GET,
        payload: {norecnota}
    }
}

export const pelayananFromVerifGetSuccess = (data) => {
    return {
        type: PELAYANAN_FROM_VERIF_GET_SUCCESS,
        payload: data
    }
}

export const pelayananFromVerifGetError = (error) => {
    return {
        type: PELAYANAN_FROM_VERIF_GET_ERROR,
        payload: error
    }
}

export const pelayananFromVerifGetReset = () => {
    return {
        type: PELAYANAN_FROM_VERIF_GET_RESET
    }
}

export const buktiBayarCreate = (body, callback) => {
    return {
        type: BUKTI_BAYAR_CREATE,
        payload: {body, callback}
    }
}

export const buktiBayarCreateSuccess = (data) => {
    return {
        type: BUKTI_BAYAR_CREATE_SUCCESS,
        payload: data
    }
}

export const buktiBayarCreateError = (error) => {
    return {
        type: BUKTI_BAYAR_CREATE_ERROR,
        payload: error
    }
}

export const buktiBayarCreateReset = () => {
    return {
        type: BUKTI_BAYAR_CREATE_RESET,
    }
}

export const verifNotaCancel = (norecnota, callback) => {
    return {
        type: VERIF_NOTA_CANCEL,
        payload: {norecnota, callback}
    }
}

export const verifNotaCancelSuccess = (data) => {
    return {
        type: VERIF_NOTA_CANCEL_SUCCESS,
        payload: data
    }
}

export const verifNotaCancelError = (error) => {
    return {
        type: VERIF_NOTA_CANCEL_ERROR,
        payload: error
    }
}

export const verifNotaCancelReset = () => {
    return {
        type: VERIF_NOTA_CANCEL_RESET,
    }
}

export const buktiBayarCancel = (norecnota, norecbayar, callback) => {
    return {
        type: BUKTI_BAYAR_CANCEL,
        payload: {norecnota, norecbayar, callback}
    }
}

export const buktiBayarCancelSuccess = (data) => {
    return {
        type: BUKTI_BAYAR_CANCEL_SUCCESS,
        payload: data
    }
}

export const buktiBayarCancelError = (error) => {
    return {
        type: BUKTI_BAYAR_CANCEL_ERROR,
        payload: error
    }
}

export const buktiBayarCancelReset = () => {
    return {
        type: BUKTI_BAYAR_CANCEL_RESET,
    }
}
