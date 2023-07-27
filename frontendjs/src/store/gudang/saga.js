import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceGudang from "../../services/service-gudang";
// Task Redux States
import { 
    lainLainGetError,
    lainLainGetSuccess,
    obatGudangSaveError, 
    obatGudangSaveSuccess, 
    detailProdukSaveOrUpdateError,
    detailProdukSaveOrUpdateSuccess
} from "./action";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    LAIN_LAIN_GET, 
    OBAT_GUDANG_SAVE ,
    DETAIL_PRODUK_SAVE_OR_UPDATE
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

function* onDetailProdukSaveOrUpdate({payload: { data }}){
    try {
        let response = yield call(serviceGudang.saveOrEditDetailProduk, data);
        yield put(detailProdukSaveOrUpdateSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 })
    } catch (error) {
        console.error(error);
        yield put(detailProdukSaveOrUpdateError(error));
        toast.error(error?.response.msg || "Gagal save or update detail produk", { autoClose: 3000 });

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

function* registrasiSaga() {
    yield all([
        fork(watchSaveObatGudang),
        fork(watchGetLainLain),
        fork(watchDetailProdukSaveOrUpdate)
    ]);
}

export default registrasiSaga
