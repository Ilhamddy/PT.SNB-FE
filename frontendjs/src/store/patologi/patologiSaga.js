import { call, put, takeEvery, all, fork, takeLatest, cancelled } from "redux-saga/effects";
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
    getIsiOrderPatologiError,
    getWidgetOrderPatologi,
    getWidgetOrderPatologiSuccess,
    getWidgetOrderPatologiError,
    updateTanggalRencanaPatologi,
    updateTanggalRencanaPatologiSuccess,
    updateTanggalRencanaPatologiError,
    getDaftarPasienPatologi,
    getDaftarPasienPatologiSuccess,
    getDaftarPasienPatologiError,
    verifikasiPatologi,
    verifikasiPatologiSuccess,
    verifikasiPatologiError,
    tolakOrderPatologi,
    tolakOrderPatologiSuccess,
    tolakOrderPatologiError,
    getTransaksiPelayananPatologiByNorecDp,
    getTransaksiPelayananPatologiByNorecDpSuccess,
    getTransaksiPelayananPatologiByNorecDpError,
    getComboPatologiModal,
    getComboPatologiModalSuccess,
    getComboPatologiModalError
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
        toast.success(response.msg || "Sukses", { autoClose: 3000} )
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
        console.error(error)
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

function* onGetWidgetOrderPatologi({payload: {queries}}) {
    try{
        const response = yield call(servicePatologi.getWidgetOrderPatologi, queries);
        yield put(getWidgetOrderPatologiSuccess(response.data));
    } catch (error) {
        yield put(getWidgetOrderPatologiError(error));
    } 
}

export function* watchOnGetWidgetOrderPatologi() {
    yield takeLatest(getWidgetOrderPatologi.type, onGetWidgetOrderPatologi);
}

function* onUpdateTanggalRencanaPatologi({payload: {data, callback}}) {
    try{
        const response = yield call(servicePatologi.updateTanggalRencanaPatologi, data);
        yield put(updateTanggalRencanaPatologiSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(updateTanggalRencanaPatologiError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnUpdateTanggalRencanaPatologi() {
    yield takeEvery(updateTanggalRencanaPatologi.type, onUpdateTanggalRencanaPatologi);
}

function* onGetDaftarPasienPatologi({payload: {queries}}) {
    try{
        const response = yield call(servicePatologi.getDaftarPasienPatologi, queries);
        yield put(getDaftarPasienPatologiSuccess(response.data));
    } catch (error) {
        yield put(getDaftarPasienPatologiError(error));
    }
}

export function* watchOnGetDaftarPasienPatologi() {
    yield takeEvery(getDaftarPasienPatologi.type, onGetDaftarPasienPatologi);
}

function* onVerifikasiPatologi({payload: {data, callback}}) {
    try{
        const response = yield call(servicePatologi.verifikasiPatologi, data);
        yield put(verifikasiPatologiSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(verifikasiPatologiError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnVerifikasiPatologi() {
    yield takeEvery(verifikasiPatologi.type, onVerifikasiPatologi);
}

function* onTolakOrderPatologi({payload: {data, callback}}) {
    try{
        const response = yield call(servicePatologi.tolakOrderPatologi, data);
        yield put(tolakOrderPatologiSuccess(response.data));
        callback && callback(response.data)
        toast.success(response.msg || "Sukses", { autoClose: 3000} )
    } catch (error) {
        yield put(tolakOrderPatologiError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchOnTolakOrderPatologi() {
    yield takeEvery(tolakOrderPatologi.type, onTolakOrderPatologi);
}

function* onGetTransaksiPelayananPatologiByNorecDp({payload: {queries}}) {
    try{
        const response = yield call(servicePatologi.getTransaksiPelayananPatologiByNorecDp, queries);
        yield put(getTransaksiPelayananPatologiByNorecDpSuccess(response.data));
    } catch (error) {
        yield put(getTransaksiPelayananPatologiByNorecDpError(error));
    }
}

export function* watchOnGetTransaksiPelayananPatologiByNorecDp() {
    yield takeEvery(getTransaksiPelayananPatologiByNorecDp.type, onGetTransaksiPelayananPatologiByNorecDp);
}

function* onGetComboPatologiModal({payload: {queries}}) {
    try{
        const response = yield call(servicePatologi.getComboPatologiModal, queries);
        yield put(getComboPatologiModalSuccess(response.data));
    } catch (error) {
        yield put(getComboPatologiModalError(error));
    }
}

export function* watchOnGetComboPatologiModal() {
    yield takeEvery(getComboPatologiModal.type, onGetComboPatologiModal);
}

function* patologiSaga() {
    yield all([
        fork(watchOnGetComboPatologi),
        fork(watchOnGetHistoriUnit),
        fork(watchOnUpsertOrderPelayananPatologi),
        fork(watchOnGetHistoriPatologi),
        fork(watchOnGetListOrderPatologi),
        fork(watchOnGetIsiOrderPatologi),
        fork(watchOnGetWidgetOrderPatologi),
        fork(watchOnUpdateTanggalRencanaPatologi),
        fork(watchOnGetDaftarPasienPatologi),
        fork(watchOnVerifikasiPatologi),
        fork(watchOnTolakOrderPatologi),
        fork(watchOnGetTransaksiPelayananPatologiByNorecDp),
        fork(watchOnGetComboPatologiModal)
    ]);
}

export default patologiSaga;
