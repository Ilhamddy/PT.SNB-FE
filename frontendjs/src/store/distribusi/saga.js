import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceDistribusi from "../../services/service-distribusi";
// Task Redux States
import { 
    getStokBatchSuccess, 
    getStokBatchError, 
    createOrUpdateOrderbarangSuccess,
    createOrUpdateOrderbarangError,
    getOrderBarangSuccess,
    getOrderBarangError
} from "./action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    GET_STOK_BATCH,
    CREATE_OR_UPDATE_ORDER_BARANG,
    GET_ORDER_BARANG
} from "./actionType";

const serviceGudang = new ServiceDistribusi();

function* onGetStokBatch({payload: { queries }}) {
    try {
        let response = yield call(serviceGudang.getStokBatch, queries);
        yield put(getStokBatchSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getStokBatchError(error));
    }
}

function* onCreateOrUpdateOrderbarang({payload: { body }}) {
    try {
        let response = yield call(serviceGudang.createOrUpdateOrderbarang, body);
        yield put(createOrUpdateOrderbarangSuccess(response.data));
        toast.success(response.data.msg);
    }catch(error){
        console.error(error);
        yield put(createOrUpdateOrderbarangError(error));
        toast.error(error?.response?.msg);
    }
}

function* onGetOrderBarang({payload: { queries }}) {
    try {
        let response = yield call(serviceGudang.getOrderBarang, queries);
        yield put(getOrderBarangSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getOrderBarangError(error));
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

function* registrasiSaga() {
    yield all([
        fork(watchGetStokBatch),
        fork(watchCreateOrUpdateOrderbarang),
        fork(watchGetOrderBarang)
    ]);
}

export default registrasiSaga