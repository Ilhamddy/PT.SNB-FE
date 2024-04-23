import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceBPJS from "../../services/service-bpjs";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    getDetailJenisProdukBankDarah,getDetailJenisProdukBankDarahSuccess,getDetailJenisProdukBankDarahError,
    postOrderPelayananBankDarah,postOrderPelayananBankDarahSuccess,postOrderPelayananBankDarahError,
    getRiwayatOrderBankDarah,getRiwayatOrderBankDarahSuccess,getRiwayatOrderBankDarahError
} from "./bankDarahSlice";
import ServiceBankDarah from '../../services/service-bankDarah';

const serviceBankDarah = new ServiceBankDarah()

function* ongetDetailJenisProdukBankDarah({payload: {queries, callback}}) {
    try{
        const response = yield call(serviceBankDarah.getDetailJenisProdukBankDarah, queries);
        yield put(getDetailJenisProdukBankDarahSuccess(response.data));
        callback && callback()
    } catch (error) {
        yield put(getDetailJenisProdukBankDarahError(error));
    }
}

export function* watcongetDetailJenisProdukBankDarah() {
    yield takeEvery(getDetailJenisProdukBankDarah.type, ongetDetailJenisProdukBankDarah);
}

function* onpostOrderPelayananBankDarah({payload: {data, callback}}) {
    try{
        const response = yield call(serviceBankDarah.postOrderPelayananBankDarah, data);
        yield put(postOrderPelayananBankDarahSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(postOrderPelayananBankDarahError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnpostOrderPelayananBankDarah() {
    yield takeEvery(postOrderPelayananBankDarah.type, onpostOrderPelayananBankDarah);
}


function* ongetRiwayatOrderBankDarah({payload: {queries}}) {
    try{
        const response = yield call(serviceBankDarah.getRiwayatOrderBankDarah, queries);
        yield put(getRiwayatOrderBankDarahSuccess(response.data));
    } catch (error) {
        yield put(getRiwayatOrderBankDarahError(error));
    }
}

export function* watchgetRiwayatOrderBankDarah() {
    yield takeEvery(getRiwayatOrderBankDarah.type, ongetRiwayatOrderBankDarah);
}


function* bankDarahSaga(){
    yield all([
        fork(watcongetDetailJenisProdukBankDarah),
        fork(watchOnpostOrderPelayananBankDarah),
        fork(watchgetRiwayatOrderBankDarah)
    ])
}
export default bankDarahSaga