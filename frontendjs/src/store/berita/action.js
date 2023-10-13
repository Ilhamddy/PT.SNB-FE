import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
    UPLOAD_BERITA,
    UPLOAD_BERITA_SUCCESS,
    UPLOAD_BERITA_ERROR,
    GET_LIST_BERITA,
    GET_LIST_BERITA_SUCCESS,
    GET_LIST_BERITA_ERROR,
    GET_BERITA_NOREC,
    GET_BERITA_NOREC_SUCCESS,
    GET_BERITA_NOREC_ERROR
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

export const getListBerita = () => ({
    type: GET_LIST_BERITA,
})

export const getListBeritaSuccess = (data) => ({
    type: GET_LIST_BERITA_SUCCESS,
    payload: { data: data },
})

export const getListBeritaError = (error) => ({
    type: GET_LIST_BERITA_ERROR,
    payload: error,
})

export const getBeritaNorec = (queries) => ({
    type: GET_BERITA_NOREC,
    payload: { queries: queries },
})

export const getBeritaNorecSuccess = (data) => ({
    type: GET_BERITA_NOREC_SUCCESS,
    payload: { data: data },
})

export const getBeritaNorecError = (error) => ({
    type: GET_BERITA_NOREC_ERROR,
    payload: error,
})