import {
    GET_LOG, 
    GET_LOG_ERROR, 
    GET_LOG_SUCCESS,
} from "./actionType";

export const getLog = (queries) => ({
    type: GET_LOG,
    payload: {
        queries
    }
});

export const getLogSuccess = (data) => ({
    type: GET_LOG_SUCCESS,
    payload: { data },
});

export const getLogError = (error) => ({
    type: GET_LOG_ERROR,
    payload: error,
});
