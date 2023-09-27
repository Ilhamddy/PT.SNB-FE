import { 
    GET_ALL_MASTER,
    GET_ALL_MASTER_SUCCESS,
    GET_ALL_MASTER_ERROR,
    GET_DESA_KELURAHAN,
    GET_DESA_KELURAHAN_SUCCESS,
    GET_DESA_KELURAHAN_ERROR
} from "./actionType";

export const getAllMaster = (data) => {
    return {
        type: GET_ALL_MASTER,
        payload: {data}
    }
}

export const getAllMasterSuccess = (data) => {
    return {
        type: GET_ALL_MASTER_SUCCESS,
        payload: data
    }
}

export const getAllMasterError = (error) => {
    return {
        type: GET_ALL_MASTER_ERROR,
        payload: error
    }
}

export const getDesaKelurahan = (params) => {
    return {
        type: GET_DESA_KELURAHAN,
        payload: {params}
    }
}

export const getDesaKelurahanSuccess = (data) => {
    return {
        type: GET_DESA_KELURAHAN_SUCCESS,
        payload: data
    }
}

export const getDesaKelurahanError = (error) => {
    return {
        type: GET_DESA_KELURAHAN_ERROR,
        payload: error
    }
}