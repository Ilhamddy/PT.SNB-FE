import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { getMasterGizi,getMasterGiziError,getMasterGiziSuccess,
    getDaftarPasienRawatInap,getDaftarPasienRawatInapSuccess,getDaftarPasienRawatInapError,
    upsertOrderGizi,upsertOrderGiziError,upsertOrderGiziSuccess,
    getDaftarOrderGizi,getDaftarOrderGiziSuccess,getDaftarOrderGiziError,
    deleteOrderGizi,deleteOrderGiziSuccess,deleteOrderGiziError,
    upsertVerifikasiOrderGizi,upsertVerifikasiOrderGiziSuccess,upsertVerifikasiOrderGiziError,
    getDaftarKirimGizi,getDaftarKirimGiziSuccess,getDaftarKirimGiziError,
    upsertKirimCetakLabel,upsertKirimCetakLabelSuccess,upsertKirimCetakLabelError } from './giziSlice';
import ServiceGizi from '../../services/service-gizi';

const serviceGizi = new ServiceGizi()

function* ongetMasterGizi({payload: {queries}}) {
    try{
        const response = yield call(serviceGizi.getMasterGizi, queries);
        yield put(getMasterGiziSuccess(response.data));
    } catch (error) {
        yield put(getMasterGiziError(error));
    }
}

export function* watchgetMasterGizi() {
    yield takeEvery(getMasterGizi.type, ongetMasterGizi);
}

function* ongetDaftarPasienRawatInap({payload: {queries}}) {
    try{
        const response = yield call(serviceGizi.getDaftarPasienRawatInap, queries);
        yield put(getDaftarPasienRawatInapSuccess(response.data));
    } catch (error) {
        yield put(getDaftarPasienRawatInapError(error));
    }
}

export function* watchgetDaftarPasienRawatInap() {
    yield takeEvery(getDaftarPasienRawatInap.type, ongetDaftarPasienRawatInap);
}

function* onupsertOrderGizi({payload: {data, callback}}) {
    try{
        const response = yield call(serviceGizi.upsertOrderGizi, data);
        yield put(upsertOrderGiziSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(upsertOrderGiziError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnupsertOrderGizi() {
    yield takeEvery(upsertOrderGizi.type, onupsertOrderGizi);
}

function* ongetDaftarOrderGizi({payload: {queries}}) {
    try{
        const response = yield call(serviceGizi.getDaftarOrderGizi, queries);
        yield put(getDaftarOrderGiziSuccess(response.data));
    } catch (error) {
        yield put(getDaftarOrderGiziError(error));
    }
}

export function* watchOngetDaftarOrderGizi() {
    yield takeEvery(getDaftarOrderGizi.type, ongetDaftarOrderGizi);
}

function* ondeleteOrderGizi({payload: {data, callback}}) {
    try{
        const response = yield call(serviceGizi.deleteOrderGizi, data);
        yield put(deleteOrderGiziSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(deleteOrderGiziError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOndeleteOrderGizi() {
    yield takeEvery(deleteOrderGizi.type, ondeleteOrderGizi);
}

function* onupsertVerifikasiOrderGizi({payload: {data, callback}}) {
    try{
        const response = yield call(serviceGizi.upsertVerifikasiOrderGizi, data);
        yield put(upsertVerifikasiOrderGiziSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(upsertVerifikasiOrderGiziError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnupsertVerifikasiOrderGizi() {
    yield takeEvery(upsertVerifikasiOrderGizi.type, onupsertVerifikasiOrderGizi);
}

function* ongetDaftarKirimGizi({payload: {queries}}) {
    try{
        const response = yield call(serviceGizi.getDaftarKirimGizi, queries);
        yield put(getDaftarKirimGiziSuccess(response.data));
    } catch (error) {
        yield put(getDaftarKirimGiziError(error));
    }
}

export function* watchOngetDaftarKirimGizi() {
    yield takeEvery(getDaftarKirimGizi.type, ongetDaftarKirimGizi);
}

function* onupsertKirimCetakLabel({payload: {data, callback}}) {
    try{
        console.log('masukkkk')
        const response = yield call(serviceGizi.upsertKirimCetakLabel, data);
        yield put(upsertKirimCetakLabelSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(upsertKirimCetakLabelError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnupsertKirimCetakLabel() {
    yield takeEvery(upsertKirimCetakLabel.type, onupsertKirimCetakLabel);
}


function* giziSaga(){
    yield all([
        fork(watchgetMasterGizi),
        fork(watchgetDaftarPasienRawatInap),
        fork(watchOnupsertOrderGizi),
        fork(watchOngetDaftarOrderGizi),
        fork(watchOndeleteOrderGizi),
        fork(watchOnupsertVerifikasiOrderGizi),
        fork(watchOngetDaftarKirimGizi),
        fork(watchOnupsertKirimCetakLabel)
    ])
}
export default giziSaga