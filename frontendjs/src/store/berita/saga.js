import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceFiles from "../../services/service-files";
import ServiceAdminDaftarMandiri from "../../services/service-admindaftarmandiri";

import {
    UPLOAD_BERITA,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    GET_LIST_BERITA,
    GET_BERITA_NOREC
} from "./actionType";

import {
    uploadImageSuccess, 
    uploadImageError,
    uploadBeritaSuccess,
    uploadBeritaError,
    uploadBerita,
    getListBeritaSuccess,
    getListBeritaError,
    getBeritaNorecSuccess,
    getBeritaNorecError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceFiles = new ServiceFiles();
const serviceADM = new ServiceAdminDaftarMandiri();


function* onUploadImage({ payload: { dataImg, data } }) {
    try {
        const response = yield call(serviceFiles.uploadImage, dataImg);
        yield put(uploadImageSuccess(
            response.data, 
            data
        ));
    } catch (error) {
        console.error(error)
        yield put(uploadImageError(error));
    }
}

function* onUploadImageSuccess({payload: {dataSend, dataResp}}) {
    try{
        if(!dataResp.uri){
            throw new Error("Upload Image Gagal")
        }
        const dataFinal = {
            ...dataSend,
            imageuri: dataResp.uri
        }
        dataFinal.image && delete dataFinal.image
        // const delay = time => new Promise(resolve => setTimeout(resolve, time));
        // yield call(delay, 2000);
        yield put(uploadBerita(dataFinal));

    } catch (e) {
        console.error(e)
        toast.error("upload image gagal")
    }
}

function* onUploadBerita({payload: {data}}) {
    try {
        const response = yield call(serviceADM.uploadBerita, data);
        yield put(uploadBeritaSuccess(response.data));
        toast.success('Upload Berita Berhasil')

    } catch (error) {
        console.error(error)
        toast.error("upload berita gagal")
        yield put(uploadBeritaError(error));
    }
}

function* onGetListBerita() {
    try {
        const response = yield call(serviceADM.getBerita);
        yield put(getListBeritaSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(getListBeritaError(error));
    }
}

function* onGetBeritaNorec({payload: {queries}}) {
    try {
        const response = yield call(serviceADM.getBeritaNorec, queries);
        console.log(response.data)
        yield put(getBeritaNorecSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(getBeritaNorecError(error));
    }
}


export default function* beritaSaga() {
    yield takeEvery(UPLOAD_IMAGE, onUploadImage);
    yield takeEvery(UPLOAD_IMAGE_SUCCESS, onUploadImageSuccess);
    yield takeEvery(UPLOAD_BERITA, onUploadBerita)
    yield takeEvery(GET_LIST_BERITA, onGetListBerita)
    yield takeEvery(GET_BERITA_NOREC, onGetBeritaNorec)
}
