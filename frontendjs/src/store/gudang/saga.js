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
    konversiProdukQueryGetError,
    konversiProdukQueryGetSuccess,
    konversiKemasanQueryGetError,
    konversiKemasanQueryGetSuccess,
    kemasanSaveOrUpdateError,
    kemasanSaveOrUpdateSuccess,
    produkMasterGetError,
    produkMasterGetSuccess,
    produkEditGetError,
    produkEditGetSuccess,
    kemasanFromProdukGetError,
    kemasanFromProdukGetSuccess,
    penerimaanSaveOrUpdateError,
    penerimaanSaveOrUpdateSuccess,
    penerimaanQueryGetError,
    penerimaanQueryGetSuccess,
    penerimaanListQueryGetSuccess,
    penerimaanListQueryGetError,
    kartuStokQueryGetSuccess,
    kartuStokQueryGetError,
    getStokUnitGudangSuccess,
    getStokUnitGudangError,
    createOrUpdateStokOpnameSuccess,
    createOrUpdateStokOpnameError,
    getStokOpnameSuccess,
    getStokOpnameError,
    getStokOpnameDetailSuccess,
    getStokOpnameDetailError,
    updateStokOpnameDetailsSuccess,
    updateStokOpnameDetailsError
} from "./action";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    LAIN_LAIN_GET, 
    OBAT_GUDANG_SAVE ,
    DETAIL_PRODUK_SAVE_OR_UPDATE,
    SEDIAAN_SAVE_OR_UPDATE,
    SATUAN_SAVE_OR_UPDATE,
    KONVERSI_PRODUK_QUERY_GET,
    KONVERSI_KEMASAN_QUERY_GET,
    KEMASAN_SAVE_OR_UPDATE,
    PRODUK_MASTER_GET,
    PRODUK_EDIT_GET,
    KEMASAN_FROM_PRODUK_GET,
    PENERIMAAN_SAVE_OR_UPDATE,
    PENERIMAAN_QUERY_GET,
    PENERIMAAN_LIST_QUERY_GET,
    KARTU_STOK_QUERY_GET,
    GET_STOK_UNIT_GUDANG,
    CREATE_OR_UPDATE_STOK_OPNAME,
    GET_STOK_OPNAME,
    GET_STOK_OPNAME_DETAIL,
    UPDATE_STOK_OPNAME_DETAILS
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

function* onKonversiProdukQueryGet({payload: { queries }}){
    try {
        let response = yield call(serviceGudang.getProdukKonversi, queries);
        yield put(konversiProdukQueryGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(konversiProdukQueryGetError(error));
    }
}

function* onKonversiKemasanQueryGet({payload: { queries }}){
    try {
        let response = yield call(serviceGudang.getKemasanKonversi, queries);
        yield put(konversiKemasanQueryGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(konversiKemasanQueryGetError(error));
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

function* onSaveOrUpdateKemasan({payload: { data, callback }}){
    try {
        let response = yield call(serviceGudang.saveOrEditKemasan, data);
        yield put(kemasanSaveOrUpdateSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 })
        callback();
    } catch (error) {
        console.error(error);
        yield put(kemasanSaveOrUpdateError(error));
    }
}

function* onProdukMasterGet({payload: { queries }}){
    try {
        let response = yield call(serviceGudang.getProdukMaster, queries);
        yield put(produkMasterGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(produkMasterGetError(error));
    }
}

function* onProdukEditGet({payload: {queries}}){
    try {
        let response = yield call(serviceGudang.getProdukEdit, queries);
        yield put(produkEditGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(produkEditGetError(error));
    }
}

function* onKemasanFromProdukGet({payload: {queries, callback}}){
    try {
        let response = yield call(serviceGudang.getKemasanFromProduk, queries);
        callback && callback(response.data)
        yield put(kemasanFromProdukGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(kemasanFromProdukGetError(error));
    }
}

function* onPenerimaanSaveOrUpdate({payload: {data, callback}}){
    try {
        let response = yield call(serviceGudang.saveOrEditPenerimaan, data);
        yield put(penerimaanSaveOrUpdateSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 })
        callback && 
            callback(response.data?.createdOrUpdatedPenerimaan?.norec || "");
    } catch (error) {
        console.error(error);
        yield put(penerimaanSaveOrUpdateError(error));
        toast.error(error?.response?.msg || "Gagal save or update penerimaan", { autoClose: 3000 });
    }
}

function* onPenerimaanQueryGet({payload: {queries}}){
    try {
        let response = yield call(serviceGudang.getPenerimaan, queries);
        yield put(penerimaanQueryGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(penerimaanQueryGetError(error));
    }
}

function* onPenerimaanListQueryGet({payload: {queries}}){
    try {
        let response = yield call(serviceGudang.getListPenerimaan, queries);
        yield put(penerimaanListQueryGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(penerimaanListQueryGetError(error));
    }
}

function* onKartuStokQueryGet({payload: {queries}}){
    try {
        let response = yield call(serviceGudang.getKartuStok, queries);
        yield put(kartuStokQueryGetSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(kartuStokQueryGetError(error));
    }
}

function* onGetStokUnitGudang({payload: {queries}}){
    try {
        let response = yield call(serviceGudang.getStokUnit, queries);
        yield put(getStokUnitGudangSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getStokUnitGudangError(error));
    }
}

function* onCreateOrUpdateStokOpname({payload: {data, callback}}){
    try {
        let response = yield call(serviceGudang.createOrUpdateStokOpname, data);
        yield put(createOrUpdateStokOpnameSuccess(response.data));
        toast.success(response.msg, { autoClose: 3000 })
        callback &&
            callback(response.data || null);
    } catch (error) {
        console.error(error);
        yield put(createOrUpdateStokOpnameError(error));
        toast.error(error?.response?.msg || "Gagal save or update stok opname", { autoClose: 3000 });
    }
}

function* onGetStokOpname({payload: {queries}}){
    try {
        let response = yield call(serviceGudang.getStokOpname, queries);
        yield put(getStokOpnameSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getStokOpnameError(error));
    }
}

function* onGetStokOpnameDetail({payload: {queries}}){
    try {
        let response = yield call(serviceGudang.getStokOpnameDetail, queries);
        yield put(getStokOpnameDetailSuccess(response.data));
    } catch (error) {
        console.error(error);
        yield put(getStokOpnameDetailError(error));
    }
}

function* onUpdateStokOpnameDetails({payload: {data, callback}}){
    try {
        let response = yield call(serviceGudang.updateStokOpnameDetails, data);
        yield put(updateStokOpnameDetailsSuccess(response.data));
        data?.issimpan && toast.success(response.msg, { autoClose: 3000 })
        callback &&
            callback(response.data || null);
    } catch (error) {
        console.error(error);
        yield put(updateStokOpnameDetailsError(error));
        toast.error(error?.response?.msg || "Gagal update stok opname", { autoClose: 3000 });
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

export function* watchProdukKonversiQueryGet(){
    yield takeEvery(KONVERSI_PRODUK_QUERY_GET, onKonversiProdukQueryGet);
}

export function* watchKemasanKonversiQueryGet(){
    yield takeEvery(KONVERSI_KEMASAN_QUERY_GET, onKonversiKemasanQueryGet);
}

export function* watchSaveOrUpdateKemasan(){
    yield takeEvery(KEMASAN_SAVE_OR_UPDATE, onSaveOrUpdateKemasan);
}

export function* watchProdukMasterGet(){
    yield takeEvery(PRODUK_MASTER_GET, onProdukMasterGet);
}

export function* watchProdukEditGet(){
    yield takeEvery(PRODUK_EDIT_GET, onProdukEditGet);
}

export function* watchKemasanFromProdukGet(){
    yield takeEvery(KEMASAN_FROM_PRODUK_GET, onKemasanFromProdukGet);
}

export function* watchPenerimaanSaveOrUpdate(){
    yield takeEvery(PENERIMAAN_SAVE_OR_UPDATE, onPenerimaanSaveOrUpdate);
}

export function* watchPenerimaanQueryGet(){
    yield takeEvery(PENERIMAAN_QUERY_GET, onPenerimaanQueryGet);
}

export function* watchPenerimaanListQueryGet(){
    yield takeEvery(PENERIMAAN_LIST_QUERY_GET, onPenerimaanListQueryGet);
}

export function* watchKartuStokQueryGet(){
    yield takeEvery(KARTU_STOK_QUERY_GET, onKartuStokQueryGet);
}

export function* watchGetStokUnitGudang(){
    yield takeEvery(GET_STOK_UNIT_GUDANG, onGetStokUnitGudang);
}

export function* watchCreateOrUpdateStokOpname(){
    yield takeEvery(CREATE_OR_UPDATE_STOK_OPNAME, onCreateOrUpdateStokOpname);
}

export function* watchGetStokOpname(){
    yield takeEvery(GET_STOK_OPNAME, onGetStokOpname);
}

export function* watchGetStokOpnameDetail(){
    yield takeEvery(GET_STOK_OPNAME_DETAIL, onGetStokOpnameDetail);
}

export function* watchUpdateStokOpnameDetails(){
    yield takeEvery(UPDATE_STOK_OPNAME_DETAILS, onUpdateStokOpnameDetails);
}

function* registrasiSaga() {
    yield all([
        fork(watchSaveObatGudang),
        fork(watchGetLainLain),
        fork(watchDetailProdukSaveOrUpdate),
        fork(watchSediaanSaveOrUpdate),
        fork(watchSatuanSaveOrUpdate),
        fork(watchProdukKonversiQueryGet),
        fork(watchKemasanKonversiQueryGet),
        fork(watchSaveOrUpdateKemasan),
        fork(watchProdukMasterGet),
        fork(watchProdukEditGet),
        fork(watchKemasanFromProdukGet),
        fork(watchPenerimaanSaveOrUpdate),
        fork(watchPenerimaanQueryGet),
        fork(watchPenerimaanListQueryGet),
        fork(watchKartuStokQueryGet),
        fork(watchGetStokUnitGudang),
        fork(watchCreateOrUpdateStokOpname),
        fork(watchGetStokOpname),
        fork(watchGetStokOpnameDetail),
        fork(watchUpdateStokOpnameDetails)
    ]);
}

export default registrasiSaga
