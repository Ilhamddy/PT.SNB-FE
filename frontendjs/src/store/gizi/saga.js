import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { getMasterGizi,getMasterGiziError,getMasterGiziSuccess,
    getDaftarPasienRawatInap,getDaftarPasienRawatInapSuccess,getDaftarPasienRawatInapError } from './giziSlice';
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


function* giziSaga(){
    yield all([
        fork(watchgetMasterGizi),
        fork(watchgetDaftarPasienRawatInap)
    ])
}
export default giziSaga