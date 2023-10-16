import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceViewer from "../../services/service-viewer";
import { 
    GET_LOKET_SISA,
    PANGGIL_LOKET,
    GET_ALL_LOKET,
    GET_ALL_TERPANGGIL,
    PANGGIL_ULANG_ANTREAN,
    GET_JADWAL_DOKTER
 } from "./actionType";
import { 
    getLoketSisaSuccess,
    getLoketSisaError,
    panggilLoketSuccess,
    panggilLoketError,
    getAllLoketSuccess,
    getAllLoketError,
    getAllTerpanggilSuccess,
    getAllTerpanggilError,
    panggilUlangAntrianSuccess,
    panggilUlangAntrianError,
    getJadwalDokterSuccess,
    getJadwalDokterError
} from "./action";
import { toast } from 'react-toastify';

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
        toast.error(error?.response?.data?.msg || "Error", {autoClose: 3000})
    }
}

function* onGetAllLoket({payload: {callback}}) {
    try {
        const response = yield call(serviceViewer.getAllLoket);
        yield put(getAllLoketSuccess(response.data));
        callback && callback(response.data);
    } catch (error) {
        yield put(getAllLoketError(error));
    }
}

function* onGetAllTerpanggil({payload: {queries}}) {
    try {
        const response = yield call(serviceViewer.getAllTerpanggil, queries);
        yield put(getAllTerpanggilSuccess(response.data));
    } catch (error) {
        yield put(getAllTerpanggilError(error));
    }
}

function* onPanggilUlangAntrean({payload: {data, callback}}) {
    try {
        const response = yield call(serviceViewer.panggilUlangAntrian, data);
        yield put(panggilUlangAntrianSuccess(response.data));
        callback && callback(response.data);
        toast.success("Sukses", {autoClose: 3000})
    } catch (error) {
        yield put(panggilUlangAntrianError(error));
        toast.error("Gagal", {autoClose: 3000})
    }
}

function* onGetJadwalDokter({payload: {queries}}) {
    try{
        const response = yield call(serviceViewer.getJadwalDokter, queries);
        yield put(getJadwalDokterSuccess(response.data));
    } catch (error) {
        yield put(getJadwalDokterError(error));
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

export function* watchGetAllTerpanggil(){
    yield takeEvery(GET_ALL_TERPANGGIL, onGetAllTerpanggil);
}

export function* watchPanggilUlangAntrian(){
    yield takeEvery(PANGGIL_ULANG_ANTREAN, onPanggilUlangAntrean);
}

export function* watchGetJadwalDokter(){
    yield takeEvery(GET_JADWAL_DOKTER, onGetJadwalDokter);
}

function* viewer() {
    yield all([
        fork(watchGetLoketSisa),
        fork(watchPanggilLoket),
        fork(watchGetAllLoket),
        fork(watchGetAllTerpanggil),
        fork(watchPanggilUlangAntrian),
        fork(watchGetJadwalDokter)
    ]);
  }
  
export default viewer;