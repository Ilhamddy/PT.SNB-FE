import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceDistribusi from "../../services/service-distribusi";
// Task Redux States
import { 
    getStokBatchSuccess, 
    getStokBatchError, 
    createOrUpdateOrderbarangSuccess,
    createOrUpdateOrderbarangError,
    getOrderBarangSuccess,
    getOrderBarangError,
    getOrderStokBatchSuccess,
    getOrderStokBatchError,
    createOrUpdateKirimBarangSuccess,
    createOrUpdateKirimBarangError
} from "./action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    GET_STOK_BATCH,
    CREATE_OR_UPDATE_ORDER_BARANG,
    GET_ORDER_BARANG,
    GET_ORDER_STOK_BATCH,
    CREATE_OR_UPDATE_KIRIM_BARANG
} from "./actionType";

const serviceDistribusi = new ServiceDistribusi();

function* onGetStokBatch({payload: { queries }}) {
    try {
        let response = yield call(serviceDistribusi.getStokBatch, queries);
        yield put(getStokBatchSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getStokBatchError(error));
    }
}

function* onCreateOrUpdateOrderbarang({payload: { body }}) {
    try {
        let response = yield call(serviceDistribusi.createOrUpdateOrderbarang, body);
        yield put(createOrUpdateOrderbarangSuccess(response.data));
        toast.success(response.msg,  { autoClose: 3000 });
    }catch(error){
        console.error(error);
        yield put(createOrUpdateOrderbarangError(error));
        toast.error(error?.response?.msg);
    }
}

function* onGetOrderBarang({payload: { queries }}) {
    try {
        let response = yield call(serviceDistribusi.getOrderBarang, queries);
        yield put(getOrderBarangSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getOrderBarangError(error));
    }
}

function* onGetOrderStokBatch({payload: { queries }}) {
    try {
        let response = yield call(serviceDistribusi.getOrderStokBatch, queries);
        yield put(getOrderStokBatchSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getOrderStokBatchError(error));
    }
}

function* onCreateOrUpdateKirimBarang({payload: { body }}) {
    try {
        let response = yield call(serviceDistribusi.createOrUpdateKirimBarang, body);
        yield put(createOrUpdateKirimBarangSuccess(response.data));
        toast.success(response.msg,  { autoClose: 3000 });
    }catch(error){
        yield put(createOrUpdateKirimBarangError(error));
        console.error(error);
        toast.error(error);
    }
}


export function* watchGetStokBatch(){
    yield takeEvery(GET_STOK_BATCH, onGetStokBatch);
}

export function* watchCreateOrUpdateOrderbarang(){
    yield takeEvery(CREATE_OR_UPDATE_ORDER_BARANG, onCreateOrUpdateOrderbarang);
}

export function* watchGetOrderBarang(){
    yield takeEvery(GET_ORDER_BARANG, onGetOrderBarang);
}

export function* watchGetOrderStokBatch(){
    yield takeEvery(GET_ORDER_STOK_BATCH, onGetOrderStokBatch);
}

export function* watchCreateOrUpdateKirimBarang(){
    yield takeEvery(CREATE_OR_UPDATE_KIRIM_BARANG, onCreateOrUpdateKirimBarang);
}

function* registrasiSaga() {
    yield all([
        fork(watchGetStokBatch),
        fork(watchCreateOrUpdateOrderbarang),
        fork(watchGetOrderBarang),
        fork(watchGetOrderStokBatch),
        fork(watchCreateOrUpdateKirimBarang)
    ]);
}

export default registrasiSaga