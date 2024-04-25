import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceBPJS from "../../services/service-bpjs";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { 
    getDetailJenisProdukBankDarah,getDetailJenisProdukBankDarahSuccess,getDetailJenisProdukBankDarahError,
    postOrderPelayananBankDarah,postOrderPelayananBankDarahSuccess,postOrderPelayananBankDarahError,
    getRiwayatOrderBankDarah,getRiwayatOrderBankDarahSuccess,getRiwayatOrderBankDarahError,
    getWidgetDaftarOrderBankDarah,getWidgetDaftarOrderBankDarahSuccess,getWidgetDaftarOrderBankDarahError,
    getDaftarOrderBankDarah,getDaftarOrderBankDarahSuccess,getDaftarOrderBankDarahError,
    getListOrderByNorecOrder,getListOrderByNorecOrderSuccess,getListOrderByNorecOrderError,
    postTglRencanaBankDarah,postTglRencanaBankDarahSuccess,postTglRencanaBankDarahError,
    postVerifikasiOrderBankDarah,postVerifikasiOrderBankDarahSuccess,postVerifikasiOrderBankDarahError,
    postDeleteDetailOrder,postDeleteDetailOrderSuccess,postDeleteDetailOrderError,
    getDaftarPasienBankDarah,getDaftarPasienBankDarahSuccess,getDaftarPasienBankDarahError
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

function* ongetWidgetDaftarOrderBankDarah({payload: {queries}}) {
    try{
        const response = yield call(serviceBankDarah.getWidgetDaftarOrderBankDarah, queries);
        yield put(getWidgetDaftarOrderBankDarahSuccess(response.data));
    } catch (error) {
        yield put(getWidgetDaftarOrderBankDarahError(error));
    }
}

export function* watchgetWidgetDaftarOrderBankDarah() {
    yield takeEvery(getWidgetDaftarOrderBankDarah.type, ongetWidgetDaftarOrderBankDarah);
}

function* ongetDaftarOrderBankDarah({payload: {queries}}) {
    try{
        const response = yield call(serviceBankDarah.getDaftarOrderBankDarah, queries);
        yield put(getDaftarOrderBankDarahSuccess(response.data));
    } catch (error) {
        yield put(getDaftarOrderBankDarahError(error));
    }
}

export function* watchgetDaftarOrderBankDarah() {
    yield takeEvery(getDaftarOrderBankDarah.type, ongetDaftarOrderBankDarah);
}

function* ongetListOrderByNorecOrder({payload: {queries}}) {
    try{
        const response = yield call(serviceBankDarah.getListOrderByNorecOrder, queries);
        yield put(getListOrderByNorecOrderSuccess(response.data));
    } catch (error) {
        yield put(getListOrderByNorecOrderError(error));
    }
}

export function* watchgetListOrderByNorecOrder() {
    yield takeEvery(getListOrderByNorecOrder.type, ongetListOrderByNorecOrder);
}

function* onpostTglRencanaBankDarah({payload: {data, callback}}) {
    try{
        const response = yield call(serviceBankDarah.postTglRencanaBankDarah, data);
        yield put(postTglRencanaBankDarahSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(postTglRencanaBankDarahError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnpostTglRencanaBankDarah() {
    yield takeEvery(postTglRencanaBankDarah.type, onpostTglRencanaBankDarah);
}

function* onpostVerifikasiOrderBankDarah({payload: {data, callback}}) {
    try{
        console.log(data)
        const response = yield call(serviceBankDarah.postVerifikasiOrderBankDarah, data);
        yield put(postVerifikasiOrderBankDarahSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(postVerifikasiOrderBankDarahError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnpostVerifikasiOrderBankDarah() {
    yield takeEvery(postVerifikasiOrderBankDarah.type, onpostVerifikasiOrderBankDarah);
}

function* onpostDeleteDetailOrder({payload: {data, callback}}) {
    try{
        const response = yield call(serviceBankDarah.postDeleteDetailOrder, data);
        yield put(postDeleteDetailOrderSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(postDeleteDetailOrderError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnpostDeleteDetailOrder() {
    yield takeEvery(postDeleteDetailOrder.type, onpostDeleteDetailOrder);
}

function* ongetDaftarPasienBankDarah({payload: {queries}}) {
    try{
        const response = yield call(serviceBankDarah.getDaftarPasienBankDarah, queries);
        yield put(getDaftarPasienBankDarahSuccess(response.data));
    } catch (error) {
        yield put(getDaftarPasienBankDarahError(error));
    }
}

export function* watchgetDaftarPasienBankDarah() {
    yield takeEvery(getDaftarPasienBankDarah.type, ongetDaftarPasienBankDarah);
}



function* bankDarahSaga(){
    yield all([
        fork(watcongetDetailJenisProdukBankDarah),
        fork(watchOnpostOrderPelayananBankDarah),
        fork(watchgetRiwayatOrderBankDarah),
        fork(watchgetWidgetDaftarOrderBankDarah),
        fork(watchgetDaftarOrderBankDarah),
        fork(watchgetListOrderByNorecOrder),
        fork(watchOnpostTglRencanaBankDarah),
        fork(watchOnpostVerifikasiOrderBankDarah),
        fork(watchOnpostDeleteDetailOrder),
        fork(watchgetDaftarPasienBankDarah)
    ])
}
export default bankDarahSaga