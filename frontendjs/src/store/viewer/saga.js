import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceViewer from "../../services/service-viewer";
import { 
    GET_LOKET_SISA,
    PANGGIL_LOKET,
    GET_ALL_LOKET,
    GET_ALL_TERPANGGIL,
    PANGGIL_ULANG_ANTREAN,
    GET_JADWAL_DOKTER,
    GET_JADWAL_OPERASI,
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
    getJadwalDokterError,
    getJadwalOperasiSuccess,
    getJadwalOperasiError,
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

function* onGetJadwalDokter({payload: {queries, callback}}) {
    try{
        const response = yield call(serviceViewer.getJadwalDokter, queries);
        yield put(getJadwalDokterSuccess(response.data));
        callback && callback(response.data)
    } catch (error) {
        yield put(getJadwalDokterError(error));
    }
}

function* onGetJadwalOperasi({payload: {queries}}) {
    try{
        const response = yield call(serviceViewer.getJadwalOperasi, queries);
        yield put(getJadwalOperasiSuccess(response.data));
    } catch (error) {
        yield put(getJadwalOperasiError(error));
    }
}

// JANGAN HAPUS, CONTOH CANCEL
// function* onGetJadwalOperasi({payload: {queries}}) {
//     const controller = new AbortController();
//     try{
//         const request = serviceViewer.getJadwalOperasi
//         const response = yield call(serviceViewer.getJadwalOperasi, queries, {signal: controller.signal});
//         yield put(getJadwalOperasiSuccess(response.data));
//     } catch (error) {
//         yield put(getJadwalOperasiError(error));
//     } finally{
//         if(yield cancelled()){
//             controller.abort()
//         }
//     }
// }

// ini untuk ngecancel
// export function* watchGetJaadwalOperasi() {
//     yield takeEvery(GET_JADWAL_OPERASI, onGetJadwalOperasi);
// }

export default function* viewer() {
    yield all([
        takeEvery(GET_LOKET_SISA, onGetLoketSisa),
        takeEvery(PANGGIL_LOKET, onPanggilLoket),
        takeEvery(GET_ALL_LOKET, onGetAllLoket),
        takeEvery(GET_ALL_TERPANGGIL, onGetAllTerpanggil),
        takeEvery(PANGGIL_ULANG_ANTREAN, onPanggilUlangAntrean),
        takeEvery(GET_JADWAL_DOKTER, onGetJadwalDokter),
        takeEvery(GET_JADWAL_OPERASI, onGetJadwalOperasi)
    ])
}
