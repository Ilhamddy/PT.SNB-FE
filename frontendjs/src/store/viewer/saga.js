import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceViewer from "../../services/service-viewer";
import { 
    GET_LOKET_SISA,
    PANGGIL_LOKET
 } from "./actionType";
import { 
    getLoketSisaSuccess,
    getLoketSisaError,
    panggilLoketSuccess,
    panggilLoketError
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
        console.log(data)
        const response = yield call(serviceViewer.panggilLoket, data);
        callback && callback()
        yield put(panggilLoketSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(panggilLoketError(error));
    }
}

export function* watchGetLoketSisa(){
    yield takeEvery(GET_LOKET_SISA, onGetLoketSisa);
}

export function* watchPanggilLoket(){
    yield takeEvery(PANGGIL_LOKET, onPanggilLoket);
}

function* viewer() {
    yield all([
        fork(watchGetLoketSisa),
        fork(watchPanggilLoket)
    ]);
  }
  
export default viewer;