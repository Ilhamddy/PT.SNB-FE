import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
    UPLOAD_BERITA,
    UPLOAD_BERITA_SUCCESS,
    UPLOAD_BERITA_ERROR
} from "./actionType";

export const uploadImage = (dataImg, data) => ({
    type: UPLOAD_IMAGE,
    payload: {
        dataImg: dataImg,
        data: data
    }
});

export const uploadImageSuccess = (dataResp, dataSend) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: { dataResp, dataSend },
});

export const uploadImageError = (error) => ({
    type: UPLOAD_IMAGE_ERROR,
    payload: error,
});

export const uploadBerita = (data) => ({
    type: UPLOAD_BERITA,
    payload: {
        data: data
    }
})

export const uploadBeritaSuccess = (data) => ({
    type: UPLOAD_BERITA_SUCCESS,
    payload: { data: data },
})

export const uploadBeritaError = (error) => ({
    type: UPLOAD_BERITA_ERROR,
    payload: error,
})