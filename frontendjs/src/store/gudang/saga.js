import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceGudang from "../../services/service-gudang";
// Task Redux States
import { 
    lainLainGetError,
    lainLainGetSuccess,
    obatGudangSaveError, 
    obatGudangSaveSuccess, 
    detailProdukSaveOrUpdateError,
    detailProdukSaveOrUpdateSuccess,
    sediaanSaveOrUpdateError,
    sediaanSaveOrUpdateSuccess,
    satuanSaveOrUpdateError,
    satuanSaveOrUpdateSuccess,
    konversiQueryGetError,
    konversiQueryGetSuccess
} from "./action";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    LAIN_LAIN_GET, 
    OBAT_GUDANG_SAVE ,
    DETAIL_PRODUK_SAVE_OR_UPDATE,
    SEDIAAN_SAVE_OR_UPDATE,
    SATUAN_SAVE_OR_UPDATE,
    KONVERSI_QUERY_GET
} from "./actionType";

const serviceGudang = new ServiceGudang();

function* onSaveObatGudang({payload: { data }}) {
    try {
        let response = yield call(serviceGudang.saveObatGudang, data);
        yield put(obatGudangSaveSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 });
    } catch (error) {
        console.error(error);
        yield put(obatGudangSaveError(error));
        toast.error(error?.response.msg || "Gagal simpan gudang", { autoClose: 3000 });
    }
}

function* onGetLainLain(){
    try {
        let response = yield call(serviceGudang.getLainLain);
        yield put(lainLainGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(lainLainGetError(error));
    }
}

function* onDetailProdukSaveOrUpdate({payload: { data, callback }}){
    try {
        let response = yield call(serviceGudang.saveOrEditDetailProduk, data);
        yield put(detailProdukSaveOrUpdateSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 })
        callback();
    } catch (error) {
        console.error(error);
        yield put(detailProdukSaveOrUpdateError(error));
        toast.error(error?.response?.msg || "Gagal save or update detail produk", { autoClose: 3000 });

    }
}

function* onSediaanSaveOrUpdate({payload: { data, callback }}){
    try {
        let response = yield call(serviceGudang.saveOrEditSediaan, data);
        yield put(sediaanSaveOrUpdateSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 })
        callback();
    } catch (error) {
        console.error(error);
        yield put(sediaanSaveOrUpdateError(error));
        toast.error(error?.response?.msg || "Gagal save or update sediaan", { autoClose: 3000 });
    }
}

function* onKonversiQueryGet({payload: { queries }}){
    try {
        let response = yield call(serviceGudang.getKonversi, queries);
        yield put(konversiQueryGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(konversiQueryGetError(error));
    }
}


function* onSatuanSaveOrUpdate({payload: { data, callback }}){
    try {
        let response = yield call(serviceGudang.saveOrEditSatuan, data);
        yield put(satuanSaveOrUpdateSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 })
        
        callback();
    } catch (error) {
        console.error(error);
        yield put(satuanSaveOrUpdateError(error));
        toast.error(error?.response?.msg || "Gagal save or update satuan", { autoClose: 3000 });
    }
}

export function* watchSaveObatGudang() {
    yield takeEvery(OBAT_GUDANG_SAVE, onSaveObatGudang);
}

export function* watchGetLainLain(){
    yield takeEvery(LAIN_LAIN_GET, onGetLainLain);
}

export function* watchDetailProdukSaveOrUpdate(){
    yield takeEvery(DETAIL_PRODUK_SAVE_OR_UPDATE, onDetailProdukSaveOrUpdate);
}

export function* watchSediaanSaveOrUpdate(){
    yield takeEvery(SEDIAAN_SAVE_OR_UPDATE, onSediaanSaveOrUpdate);
}

export function* watchSatuanSaveOrUpdate(){
    yield takeEvery(SATUAN_SAVE_OR_UPDATE, onSatuanSaveOrUpdate);
}

export function* watchKonversiQueryGet(){
    yield takeEvery(KONVERSI_QUERY_GET, onKonversiQueryGet);
}

function* registrasiSaga() {
    yield all([
        fork(watchSaveObatGudang),
        fork(watchGetLainLain),
        fork(watchDetailProdukSaveOrUpdate),
        fork(watchSediaanSaveOrUpdate),
        fork(watchSatuanSaveOrUpdate),
        fork(watchKonversiQueryGet)
    ]);
}

export default registrasiSaga
