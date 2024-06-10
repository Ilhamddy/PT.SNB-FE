import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceNotifikasi from '../../services/service-notifikasi';
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {getListNotifikasi,getListNotifikasiError,getListNotifikasiSuccess,
    updateStatusBaca,updateStatusBacaSuccess,updateStatusBacaError
} from "./notifikasiSlice"

const serviceNotifikasi = new ServiceNotifikasi()

function* ongetListNotifikasi({payload: {queries}}) {
    try{
        const response = yield call(serviceNotifikasi.getListNotifikasi, queries);
        yield put(getListNotifikasiSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getListNotifikasiError(error));
    }
}

export function* watchgetListNotifikasi() {
    yield takeEvery(getListNotifikasi.type, ongetListNotifikasi);
}

function* onupdateStatusBaca({payload: {data, callback}}) {
    try{
        const response = yield call(serviceNotifikasi.updateStatusBaca, data);
        yield put(updateStatusBacaSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(updateStatusBacaError(error));
        console.error(error);
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnupdateStatusBaca() {
    yield takeEvery(updateStatusBaca.type, onupdateStatusBaca);
}


function* notifikasiSaga(){
    yield all([
        fork(watchgetListNotifikasi),
        fork(watchOnupdateStatusBaca)
    ])
}

export default notifikasiSaga