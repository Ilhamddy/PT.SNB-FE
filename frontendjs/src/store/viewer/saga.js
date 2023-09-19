import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceViewer from "../../services/service-viewer";
import { 
    GET_LOKET_SISA,
    PANGGIL_LOKET,
    GET_ALL_LOKET
 } from "./actionType";
import { 
    getLoketSisaSuccess,
    getLoketSisaError,
    panggilLoketSuccess,
    panggilLoketError,
    getAllLoketSuccess,
    getAllLoketError
} from "./action";

const serviceViewer = new ServiceViewer();

function* onGetLoketSisa() {
    try {
        const response = yield call(serviceViewer.getLoketSisa);
        yield put(getLoketSisaSuccess(response.data));
    } catch (error) {
        yield put(getLoketSisaError(error));
    }
}

function* onPanggilLoket({payload: { data, callback }}) {
    try {
        const response = yield call(serviceViewer.panggilLoket, data);
        callback && callback()
        yield put(panggilLoketSuccess(response.data));
    } catch (error) {
        yield put(panggilLoketError(error));
    }
}

function* onGetAllLoket() {
    try {
        const response = yield call(serviceViewer.getAllLoket);
        yield put(getAllLoketSuccess(response.data));
    } catch (error) {
        yield put(getAllLoketError(error));
    }
}

export function* watchGetLoketSisa(){
    yield takeEvery(GET_LOKET_SISA, onGetLoketSisa);
}

export function* watchPanggilLoket(){
    yield takeEvery(PANGGIL_LOKET, onPanggilLoket);
}

export function* watchGetAllLoket(){
    yield takeEvery(GET_ALL_LOKET, onGetAllLoket);
}

function* viewer() {
    yield all([
        fork(watchGetLoketSisa),
        fork(watchPanggilLoket),
        fork(watchGetAllLoket)
    ]);
  }
  
export default viewer;