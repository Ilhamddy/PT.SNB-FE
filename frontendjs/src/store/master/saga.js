import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceMaster from "../../services/service-master";
import { MASTER_GET,DESA_GET,KECAMATAN_GET,COMBO_REGISTRASI_GET, COMBO_ASURANSI_GET, 
    PROVINSI_GET_BPJS, 
    KABUPATEN_GET_BPJS, 
    KECAMATAN_GET_BPJS,
    COMBO_PAYMENT_GET,
    COMBO_SETTING_PRODUK_GET,
    COMBO_PENERIMAAN_BARANG_GET,
    COMBO_DISTRIBUSI_ORDER_GET,
    GET_COMBO_STOK_OPNAME,
    GET_COMBO_RESEP,
    GET_COMBO_VERIF_RESEP,
    GET_COMBO_PENJUALAN_BEBAS,
    GET_COMBO_RETUR_OBAT,
 } from "./actionType";
import { masterGetSuccess,
    masterGetError,
    desaGetSuccess,
    desaGetError,
    kecamatanGetSuccess,
    kecamatanGetError,
    comboRegistrasiGetSuccess,
    comboRegistrasiGetError, 
    comboAsuransiGet, 
    comboAsuransiGetSuccess, 
    comboAsuransiGetError,
    provinsiGetBpjs,
    provinsiGetBpjsSuccess,
    provinsiGetBpjsError,
    kabupatenGetBpjs,
    kabupatenGetBpjsSuccess,
    kabupatenGetBpjsError,
    kecamatanGetBpjs,
    kecamatanGetBpjsSuccess,
    kecamatanGetBpjsError,
    comboPulangGetSuccess,
    comboPulangGetError,
    comboPaymentGetSuccess,
    comboPaymentGetError,
    comboSettingProdukGetSuccess,
    comboSettingProdukGetError,
    comboPenerimaanBarangGetSuccess,
    comboPenerimaanBarangGetError,
    comboDistribusiOrderGetSuccess,
    comboDistribusiOrderGetError,
    getComboStokOpnameSuccess,
    getComboStokOpnameError,
    getComboResepSuccess,
    getComboResepError,
    getComboVerifResepSuccess,
    getComboVerifResepError,
    getComboPenjualanBebasSuccess,
    getComboPenjualanBebasError,
    getComboReturObatSuccess,
    getComboReturObatError,
} from "./action";

const serviceMaster = new ServiceMaster();

function* onGetMaster() {
    try {
        const response = yield call(serviceMaster.getAllMaster);
        yield put(masterGetSuccess(response.data));
    } catch (error) {
        yield put(masterGetError(error));
    }
}

function* onGetDesa({payload: {desa}}) {
    try {
        const response = yield call(serviceMaster.getDesa,desa);
        yield put(desaGetSuccess(response.data));
    } catch (error) {
        yield put(desaGetError(error));
    }
}

function* onGetKecamatan() {
    try {
        const response = yield call(serviceMaster.getKecamatan);
        yield put(kecamatanGetSuccess(response.data));
    } catch (error) {
        yield put(kecamatanGetError(error));
    }
}

function* onGetComboRegistrasi() {
    try {
        const response = yield call(serviceMaster.getComboRegistrasi);
        yield put(comboRegistrasiGetSuccess(response.data));
    } catch (error) {
        yield put(comboRegistrasiGetError(error));
    }
}

function* onGetComboAsuransi() {
    try {
        const response = yield call(serviceMaster.getComboAsuransi);
        yield put(comboAsuransiGetSuccess(response.data));
    } catch (error) {
        yield put(comboAsuransiGetError(error));
    }
}

function* onGetProvinsiBpjs(){
    try{
        const response = yield call(serviceMaster.getProvinsiBpjs);
        yield put(provinsiGetBpjsSuccess(response.data));
    } catch(err){
        yield put(provinsiGetBpjsError(err));
    }
}

function* onGetKabupatenBpjs({payload: {provinsi}}){
    try{
        const response = yield call(serviceMaster.getKabupatenBpjs,provinsi);
        yield put(kabupatenGetBpjsSuccess(response.data));
    } catch(err){
        yield put(kabupatenGetBpjsError(err));
    }
}

function* onGetKecamatanBpjs({payload: {kabupaten}}){
    try{
        const response = yield call(serviceMaster.getKecamatanBpjs,kabupaten);
        yield put(kecamatanGetBpjsSuccess(response.data));
    } catch(err){
        yield put(kecamatanGetBpjsError(err));
    }
}


function* onGetComboPulang() {
    try {
        const response = yield call(serviceMaster.getComboPulang);
        yield put(comboPulangGetSuccess(response.data));
    } catch (error) {
        yield put(comboPulangGetError(error));
    }
}

function* onGetComboPayment() {
    try {
        const response = yield call(serviceMaster.getComboPayment);
        yield put(comboPaymentGetSuccess(response.data));
    } catch (error) {
        yield put(comboPaymentGetError(error));
    }
}

function* onGetComboSettingProduk() {
    try {
        const response = yield call(serviceMaster.getComboSettingProduk);
        yield put(comboSettingProdukGetSuccess(response.data));
    } catch (error) {
        console.error(error)
        yield put(comboSettingProdukGetError(error));
    }
}

function* onGetComboPenerimaanBarang(){
    try {
        const response = yield call(serviceMaster.getComboPenerimaanBarang);
        yield put(comboPenerimaanBarangGetSuccess(response.data));
    } catch(error){
        yield put(comboPenerimaanBarangGetError(error));
    }
}


function* onComboDistributionOrderGet(){
    try {
        const response = yield call(serviceMaster.getComboDistributionOrder);
        yield put(comboDistribusiOrderGetSuccess(response.data));
    } catch(error){
        yield put(comboDistribusiOrderGetError(error));
    }
}

function* onGetComboStokOpname(){
    try {
        const response = yield call(serviceMaster.getComboStokOpname);
        yield put(getComboStokOpnameSuccess(response.data));
    } catch(error){
        yield put(getComboStokOpnameError(error));
    }
}

function* onGetComboResep(){
    try {
        const response = yield call(serviceMaster.getComboResep);
        yield put(getComboResepSuccess(response.data));
    } catch(error){
        yield put(getComboResepError(error));
    }
}

function* onGetComboVerifResep(){
    try {
        const response = yield call(serviceMaster.getComboVerifResep);
        yield put(getComboVerifResepSuccess(response.data));
    } catch(error){
        yield put(getComboVerifResepError(error));
    }
}

function* onGetComboPenjualanBebas(){
    try {
        const response = yield call(serviceMaster.getComboPenjualanBebas);
        yield put(getComboPenjualanBebasSuccess(response.data));
    } catch(error){
        yield put(getComboPenjualanBebasError(error));
    }
}

function* onGetComboReturObat(){
    try {
        const response = yield call(serviceMaster.getComboReturObat);
        yield put(getComboReturObatSuccess(response.data));
    } catch(error){
        yield put(getComboReturObatError(error));
    }
}

export function* watchGetMaster() {
    yield takeEvery(MASTER_GET, onGetMaster);
}

export function* watchGetDesa() {
    yield takeEvery(DESA_GET, onGetDesa);
}

export function* watchGetKecamatan() {
    yield takeEvery(KECAMATAN_GET, onGetKecamatan);
}

export function* watchGetComboRegistrasi() {
    yield takeEvery(COMBO_REGISTRASI_GET, onGetComboRegistrasi);
}

export function* watchGetComboAsuransi() {
    yield takeEvery(COMBO_ASURANSI_GET, onGetComboAsuransi);
}

export function* watchGetProvinsiBpjs(){
    yield takeEvery(PROVINSI_GET_BPJS, onGetProvinsiBpjs);
}

export function* watchGetKabupatenBpjs(){
    yield takeEvery(KABUPATEN_GET_BPJS,onGetKabupatenBpjs);
}

export function* watchGetKecamatanBpjs(){
    yield takeEvery(KECAMATAN_GET_BPJS,onGetKecamatanBpjs);
}

export function* watchGetComboPulang() {
    yield takeEvery(COMBO_REGISTRASI_GET, onGetComboPulang);
}

export function* watchGetComboPayment() {
    yield takeEvery(COMBO_PAYMENT_GET, onGetComboPayment);
}

export function* watchGetComboSettingProduk() {
    yield takeEvery(COMBO_SETTING_PRODUK_GET, onGetComboSettingProduk);
}

export function* watchGetComboPenerimaanBarang(){
    yield takeEvery(COMBO_PENERIMAAN_BARANG_GET, onGetComboPenerimaanBarang);
}

export function* watchGetComboDistributionOrder(){
    yield takeEvery(COMBO_DISTRIBUSI_ORDER_GET, onComboDistributionOrderGet);
}

export function* watchGetComboStokOpname(){
    yield takeEvery(GET_COMBO_STOK_OPNAME, onGetComboStokOpname);
}

export function* watchGetComboResep(){
    yield takeEvery(GET_COMBO_RESEP, onGetComboResep);
}

export function* watchGetComboVerifResep(){
    yield takeEvery(GET_COMBO_VERIF_RESEP, onGetComboVerifResep);
}

export function* watchGetComboPenjualanBebas(){
    yield takeEvery(GET_COMBO_PENJUALAN_BEBAS, onGetComboPenjualanBebas);
}

export function* watchGetComboReturObat(){
    yield takeEvery(GET_COMBO_RETUR_OBAT, onGetComboReturObat);
}

function* masterSaga() {
    yield all([
        fork(watchGetMaster),
        fork(watchGetDesa),
        fork(watchGetKecamatan),
        fork(watchGetComboRegistrasi),
        fork(watchGetComboAsuransi),
        fork(watchGetProvinsiBpjs),
        fork(watchGetKabupatenBpjs),
        fork(watchGetKecamatanBpjs),
        fork(watchGetComboPulang),
        fork(watchGetComboPayment),
        fork(watchGetComboSettingProduk),
        fork(watchGetComboPenerimaanBarang),
        fork(watchGetComboDistributionOrder),
        fork(watchGetComboStokOpname),
        fork(watchGetComboResep),
        fork(watchGetComboVerifResep),
        fork(watchGetComboPenjualanBebas),
        fork(watchGetComboReturObat),
    ]);
}

export default masterSaga;