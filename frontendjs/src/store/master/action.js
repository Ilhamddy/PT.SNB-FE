import {
    MASTER_GET,
    MASTER_GET_SUCCESS,
    MASTER_GET_ERROR
} from "./actionType";

export const masterGet = () => ({
    type: MASTER_GET,
});

export const masterGetSuccess = (data) => ({
    type: MASTER_GET_SUCCESS,
    payload: data,
});

export const masterGetError = (error) => ({
    type: MASTER_GET_ERROR,
    payload: error,
});