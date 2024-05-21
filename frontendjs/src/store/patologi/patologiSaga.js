import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceEmr from "../../services/service-emr";

import 'react-toastify/dist/ReactToastify.css';
import ServiceSatuSehat from "../../services/service-satusehat";
import {
    getComboTindakanPatologi, 
    getComboTindakanPatologiSuccess,
    getComboTindakanPatologiError,
    getHistoriUnit,
    getHistoriUnitSuccess,
    getHistoriUnitError,
    upsertOrderPelayananPatologi,
    upsertOrderPelayananPatologiSuccess,
    upsertOrderPelayananPatologiError,
    getHistoriPatologi,
    getHistoriPatologiSuccess,
    getHistoriPatologiError,
    getListOrderPatologi,
    getListOrderPatologiSuccess,
    getListOrderPatologiError,
    getIsiOrderPatologi,
    getIsiOrderPatologiSuccess,
    getIsiOrderPatologiError
} from "./patologiSlice";
import ServicePatologi from "../../services/service-patologi";
import { toast } from "react-toastify";


const serviceEmr = new ServiceEmr();
const serviceSatuSehat = new ServiceSatuSehat();
const servicePatologi = new ServicePatologi();

function* onGetComboPatologi({payload: {queries}}) {
    try{
        const response = yield call(serviceEmr.getComboTindakanV2, queries);
        yield put(getComboTindakanPatologiSuccess(response.data));
    } catch (error) {
        yield put(getComboTindakanPatologiError(error));
    }
}

export function* watchOnGetComboPatologi() {
    yield takeEvery(getComboTindakanPatologi.type, onGetComboPatologi);
}

function* onGetHistoriUnit({payload: {norecdp}}) {
    try{
        const response = yield call(serviceEmr.getComboHistoryUnit, norecdp);
        yield put(getHistoriUnitSuccess(response.data));
    } catch (error) {
        yield put(getHistoriUnitError(error));
    }
}

export function* watchOnGetHistoriUnit() {
    yield takeEvery(getHistoriUnit.type, onGetHistoriUnit);
}

function* onUpsertOrderPelayananPatologi({payload: {data, callback}}) {
    try{
        const response = yield call(servicePatologi.upsertOrderPelayananPatologi, data);
        yield put(upsertOrderPelayananPatologiSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.data.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(upsertOrderPelayananPatologiError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnUpsertOrderPelayananPatologi() {
    yield takeEvery(upsertOrderPelayananPatologi.type, onUpsertOrderPelayananPatologi);
}

function* onGetHistoriPatologi({payload: {queries}}) {
    try{
        const response = yield call(servicePatologi.getHistoriPatologi, queries);
        yield put(getHistoriPatologiSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(getHistoriPatologiError(error));
    }
}

export function* watchOnGetHistoriPatologi() {
    yield takeEvery(getHistoriPatologi.type, onGetHistoriPatologi);
}

function* onGetListOrderPatologi({payload: {queries}}) {
    try{
        const response = yield call(servicePatologi.getListOrderPatologi, queries);
        yield put(getListOrderPatologiSuccess(response.data));
    } catch (error) {
        yield put(getListOrderPatologiError(error));
    }
}

export function* watchOnGetListOrderPatologi() {
    yield takeEvery(getListOrderPatologi.type, onGetListOrderPatologi);
}

function* onGetIsiOrderPatologi({payload: {queries}}) {
    try{
        const response = yield call(servicePatologi.getIsiOrderPatologi, queries);
        const dataIndexed = {...response.data}
        dataIndexed.isiOrder = dataIndexed.isiOrder.map((d, index) => ({
            ...d,
            index: index
        }))
        yield put(getIsiOrderPatologiSuccess(dataIndexed));
    } catch (error) {
        yield put(getIsiOrderPatologiError(error));
    }
}

export function* watchOnGetIsiOrderPatologi() {
    yield takeEvery(getIsiOrderPatologi.type, onGetIsiOrderPatologi);
}


function* patologiSaga() {
    yield all([
        fork(watchOnGetComboPatologi),
        fork(watchOnGetHistoriUnit),
        fork(watchOnUpsertOrderPelayananPatologi),
        fork(watchOnGetHistoriPatologi),
        fork(watchOnGetListOrderPatologi),
        fork(watchOnGetIsiOrderPatologi)
    ]);
}

export default patologiSaga;
