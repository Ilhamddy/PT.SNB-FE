import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceDistribusi from "../../services/service-distribusi";
// Task Redux States
import { 
    getStokBatchSuccess, 
    getStokBatchError, 
} from "./action";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    GET_STOK_BATCH
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


export function* watchGetStokBatch(){
    yield takeEvery(GET_STOK_BATCH, onGetStokBatch);
}

function* registrasiSaga() {
    yield all([
        fork(watchGetStokBatch)
    ]);
}

export default registrasiSaga