import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceFiles from "../../services/service-files";

import {
    UPLOAD_IMAGE
} from "./actionType";

import {
    uploadImageSuccess, 
    uploadImageError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceFiles = new ServiceFiles();

function* onUploadImage({ payload: { data } }) {
    try {
        console.log("masuk")
        const response = yield call(serviceFiles.uploadImage, data);
        yield put(uploadImageSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(uploadImageError(error));
    }
}



export default function* beritaSaga() {
    yield takeEvery(UPLOAD_IMAGE, onUploadImage);
}
