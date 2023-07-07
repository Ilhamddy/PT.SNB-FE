import { PELAYANAN_FROM_ANTREAN_GET,
    PELAYANAN_FROM_ANTREAN_GET_SUCCESS,
    PELAYANAN_FROM_ANTREAN_GET_ERROR,
    PELAYANAN_FROM_ANTREAN_GET_RESET,
    NOTA_VERIF_CREATE,
    NOTA_VERIF_CREATE_SUCCESS,
    NOTA_VERIF_CREATE_ERROR
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


