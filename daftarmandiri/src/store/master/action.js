import { 
    GET_ALL_MASTER,
    GET_ALL_MASTER_SUCCESS,
    GET_ALL_MASTER_ERROR,
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
