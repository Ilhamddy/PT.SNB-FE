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
