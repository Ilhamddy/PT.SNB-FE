import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
} from "./actionType";

export const uploadImage = (data) => ({
    type: UPLOAD_IMAGE,
    payload: {
        data: data
    }
});

export const uploadImageSuccess = (data) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: { data: data },
});

export const uploadImageError = (error) => ({
    type: UPLOAD_IMAGE_ERROR,
    payload: error,
});