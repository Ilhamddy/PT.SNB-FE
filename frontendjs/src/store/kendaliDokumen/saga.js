import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceRekammedis from "../../services/service-rekammedis";

import {
    DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET,
    SAVE_DOKUMEN_REKAMMEDIS,
    COMBO_LAPORAN_REKAMMEDIS_GET,
    LIST_LAPORAN_PASIEN_DAFTAR_GET,
    LIST_LAPORAN_PASIEN_BATAL_GET,
    LIST_LAPORAN_PASIEN_KUNJUNGAN_GET,
    LAPORAN_RL_3_1_GET,
    LAPORAN_RL_3_2_GET,
    GET_DETAIL_JENIS_PRODUK,
    GET_LAYANAN_JENIS,
    CREATE_OR_UPDATE_MAP_RL,
    GET_MASTER_RL_FROM_INDUK,
    GET_LAYANAN_FROM_MASTER_RL,
    DELETE_MAP_RL,
    UPDATE_PRINTED,
    LAPORAN_RL_1_2_GET,LAPORAN_RL_1_3_GET,LAPORAN_RL_2_GET,
    LAPORAN_RL_3_3_GET,LAPORAN_RL_3_4_GET,
    LAPORAN_RL_3_6_GET,LAPORAN_RL_3_7_GET,LAPORAN_RL_3_8_GET,
    LAPORAN_RL_3_9_GET,LAPORAN_RL_3_14_GET,
    LAPORAN_RL_3_15_GET,LAPORAN_RL_3_11_GET,LAPORAN_RL_3_10_GET,
    LAPORAN_RL_5_1_GET,LAPORAN_RL_5_2_GET, LAPORAN_RL_5_3_GET,
    LAPORAN_RL_5_4_GET
} from "./actionType";

import {
    daftarDokumenRekammedisGetSuccess, daftarDokumenRekammedisGetError,
    widgetdaftarDokumenRekammedisGetSuccess, widgetdaftarDokumenRekammedisGetError,
    saveDokumenRekammedisSuccess, saveDokumenRekammedisError,
    comboLaporanRekammedisGetSuccess, comboLaporanRekammedisGetError,
    listLaporanPasienDaftarGetSuccess, listLaporanPasienDaftarGetError,
    listLaporanPasienBatalGetSuccess, listLaporanPasienBatalGetError,
    listLaporanPasienKunjunganGetSuccess, listLaporanPasienKunjunganGetError,
    laporanRL_3_1_GetSuccess, laporanRL_3_1_GetError,
    laporanRL_3_2_GetSuccess, laporanRL_3_2_GetError,
    getDetailJenisProdukSuccess,
    getDetailJenisProdukError,
    getLayananJenisSuccess,
    getLayananJenisError,
    createOrUpdateMapRLSuccess,
    createOrUpdateMapRLError,
    getMasterRLFromIndukSuccess,
    getMasterRLFromIndukError,
    getLayananFromMasterRLSuccess,
    getLayananFromMasterRLError,
    deleteMapRLSuccess,
    deleteMapRLError,
    updatePrintedSuccess,
    updatePrintedError,
    getLaporanRl_1_2Success,getLaporanRl_1_2Error,
    getLaporanRl_1_3Success,getLaporanRl_1_3Error,
    getLaporanRl_2Success,getLaporanRl_2Error,
    getLaporanRl_3_3Success,getLaporanRl_3_3Error,
    getLaporanRl_3_4Success,getLaporanRl_3_4Error,
    getLaporanRl_3_6Success,getLaporanRl_3_6Error,
    getLaporanRl_3_7Success,getLaporanRl_3_7Error,
    getLaporanRl_3_8Success,getLaporanRl_3_8Error,
    getLaporanRl_3_9Success,getLaporanRl_3_9Error,
    getLaporanRl_3_14Success,getLaporanRl_3_14Error,
    getLaporanRl_3_15Success,getLaporanRl_3_15Error,
    getLaporanRl_3_11Success,getLaporanRl_3_11Error,
    getLaporanRl_3_10Success,getLaporanRl_3_10Error,
    getLaporanRl_5_1Success,getLaporanRl_5_1Error,
    getLaporanRl_5_2Success,getLaporanRl_5_2Error,
    getLaporanRl_5_3Success,getLaporanRl_5_3Error,
    getLaporanRl_5_4Success,getLaporanRl_5_4Error
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceRekammedis = new ServiceRekammedis();

function* onDaftarDokumenRekammedis({ payload: { param } }) {
    try {
        const response = yield call(serviceRekammedis.getDaftarDokumenRekammedis, param);
        yield put(daftarDokumenRekammedisGetSuccess(response.data));
    } catch (error) {
        yield put(daftarDokumenRekammedisGetError(error));
    }
}


export function* watchonDaftarDokumenRekammedis() {
    yield takeEvery(DAFTAR_DOKUMEN_REKAMMEDIS_GET, onDaftarDokumenRekammedis);
}

function* onWidgetDaftarDokumenRekammedis({ payload: { param } }) {
    try {
        const response = yield call(serviceRekammedis.getWidgetDaftarDokumenRekammedis, param);
        yield put(widgetdaftarDokumenRekammedisGetSuccess(response.data));
    } catch (error) {
        yield put(widgetdaftarDokumenRekammedisGetError(error));
    }
}


export function* watchonWidgetDaftarDokumenRekammedis() {
    yield takeEvery(WIDGET_DAFTAR_DOKUMEN_REKAMMEDIS_GET, onWidgetDaftarDokumenRekammedis);
}

function* onsaveDokumenRekammedis({ payload: { data, history } }) {
    try {
        let response = null;
        if (data.norec !== '') {
            response = yield call(serviceRekammedis.saveDokumenRekammedis, data);
        } else {
            response = yield call(serviceRekammedis.saveDokumenRekammedis, data);
        }



        yield put(saveDokumenRekammedisSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        // history("/registrasi/pasien-lama")
    } catch (error) {
        yield put(saveDokumenRekammedisError(error));
        toast.error(error?.response?.data?.msg || "Error", { autoClose: 3000 });
    }
}

export function* watchonsaveDokumenRekammedis() {
    yield takeEvery(SAVE_DOKUMEN_REKAMMEDIS, onsaveDokumenRekammedis);
}

function* oncomboLaporanRekammedisGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRekammedis.getComboLaporanRekammedis, param);
        yield put(comboLaporanRekammedisGetSuccess(response.data));
    } catch (error) {
        yield put(comboLaporanRekammedisGetError(error));
    }
}

export function* watchoncomboLaporanRekammedisGet() {
    yield takeEvery(COMBO_LAPORAN_REKAMMEDIS_GET, oncomboLaporanRekammedisGet);
}

function* onlistLaporanPasienDaftarGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRekammedis.getListPasienDaftar, param);
        yield put(listLaporanPasienDaftarGetSuccess(response.data));
    } catch (error) {
        yield put(listLaporanPasienDaftarGetError(error));
    }
}

export function* watchonlistLaporanPasienDaftarGet() {
    yield takeEvery(LIST_LAPORAN_PASIEN_DAFTAR_GET, onlistLaporanPasienDaftarGet);
}

function* onlistLaporanPasienBatalGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRekammedis.getListPasienBatal, param);
        yield put(listLaporanPasienBatalGetSuccess(response.data));
    } catch (error) {
        yield put(listLaporanPasienBatalGetError(error));
    }
}

export function* watchonlistLaporanPasienBatalGet() {
    yield takeEvery(LIST_LAPORAN_PASIEN_BATAL_GET, onlistLaporanPasienBatalGet);
}

function* onlistLaporanPasienKunjunganGet({ payload: { param } }) {
    try {
        const response = yield call(serviceRekammedis.getListPasienKunjungan, param);
        yield put(listLaporanPasienKunjunganGetSuccess(response.data));
    } catch (error) {
        yield put(listLaporanPasienKunjunganGetError(error));
    }
}

export function* watchonlistLaporanPasienKunjunganGet() {
    yield takeEvery(LIST_LAPORAN_PASIEN_KUNJUNGAN_GET, onlistLaporanPasienKunjunganGet);
}

function* onlaporanRL_1_2_Get({ payload: { queries } }) {
    try {
        const response = yield call(serviceRekammedis.getLaporanRl_1_2, queries);
        yield put(getLaporanRl_1_2Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_1_2Error(error));
    }
}

export function* watchonlaporanRL_1_2_Get() {
    yield takeEvery(LAPORAN_RL_1_2_GET, onlaporanRL_1_2_Get);
}

function* onlaporanRL_1_3_Get({ payload: { queries } }) {
    try {
        const response = yield call(serviceRekammedis.getLaporanRl_1_3, queries);
        yield put(getLaporanRl_1_3Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_1_3Error(error));
    }
}

export function* watchonlaporanRL_1_3_Get() {
    yield takeEvery(LAPORAN_RL_1_3_GET, onlaporanRL_1_3_Get);
}

function* onlaporanRL_2_Get({ payload: { queries } }) {
    try {
        const response = yield call(serviceRekammedis.getLaporanRl_2, queries);
        yield put(getLaporanRl_2Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_2Error(error));
    }
}

export function* watchonlaporanRL_2_Get() {
    yield takeEvery(LAPORAN_RL_2_GET, onlaporanRL_2_Get);
}

function* onlaporanRL_3_1_Get({ payload: { queries } }) {
    try {
        const response = yield call(serviceRekammedis.getLaporanRL3_1, queries);
        yield put(laporanRL_3_1_GetSuccess(response.data));
    } catch (error) {
        yield put(laporanRL_3_1_GetError(error));
    }
}

export function* watchonlaporanRL_3_1_Get() {
    yield takeEvery(LAPORAN_RL_3_1_GET, onlaporanRL_3_1_Get);
}

function* onlaporanRL_3_2_Get({ payload: { queries } }) {
    try {
        const response = yield call(serviceRekammedis.getLaporanRL3_2, queries);
        yield put(laporanRL_3_2_GetSuccess(response.data));
    } catch (error) {
        yield put(laporanRL_3_2_GetError(error));
    }
}

export function* watchonlaporanRL_3_2_Get() {
    yield takeEvery(LAPORAN_RL_3_2_GET, onlaporanRL_3_2_Get);
}

function* onGetDetailJenisProduk({ payload: { queries }}) {
    try{
        const response = yield call(serviceRekammedis.getDetailJenisProduk, queries);
        yield put(getDetailJenisProdukSuccess(response.data));
    } catch(error) {
        yield put(getDetailJenisProdukError(error));
    }
}

export function* watchonGetDetailJenisProduk() {
    yield takeEvery(GET_DETAIL_JENIS_PRODUK, onGetDetailJenisProduk);
}

function* onGetLayananJenis({ payload: { queries }}) {
    try{
        const response = yield call(serviceRekammedis.getLayananJenis, queries);
        yield put(getLayananJenisSuccess(response.data));
    } catch (error) {
        yield put(getLayananJenisError(error));
    }
}

export function* watchonGetLayananJenis() {
    yield takeEvery(GET_LAYANAN_JENIS, onGetLayananJenis);
}

function* onCreateOrUpdateMapRL({ payload: { data, callback }}) {
    try{
        const response = yield call(serviceRekammedis.createOrUpdateMapRL, data);
        yield put(createOrUpdateMapRLSuccess(response.data));
        callback && callback(response);
        toast.success("Sukses", {autoClose: 3000})
    } catch (error) {
        yield put(createOrUpdateMapRLError(error));
        toast.error("Error", {autoClose: 3000})
    }
}

export function* watchonCreateOrUpdateMapRL() {
    yield takeEvery(CREATE_OR_UPDATE_MAP_RL, onCreateOrUpdateMapRL);
}

function* onGetMasterRLFromInduk({ payload: { queries }}) {
    try{
        const response = yield call(serviceRekammedis.getMasterRLFromInduk, queries);
        yield put(getMasterRLFromIndukSuccess(response.data));
    } catch (error) {
        yield put(getMasterRLFromIndukError(error));
    }
}

export function* watchonGetMasterRLFromInduk() {
    yield takeEvery(GET_MASTER_RL_FROM_INDUK, onGetMasterRLFromInduk);
}

function* onGetLayananFromMasterRL({ payload: { queries }}) {
    try{
        const response = yield call(serviceRekammedis.getLayananFromMasterRL, queries);
        yield put(getLayananFromMasterRLSuccess(response.data));
    } catch (error) {
        yield put(getLayananFromMasterRLError(error));
    }
}

export function* watchonGetLayananFromMasterRL() {
    yield takeEvery(GET_LAYANAN_FROM_MASTER_RL, onGetLayananFromMasterRL);
}

function* onDeleteMapRL({ payload: { params, callback }}) {
    try{
        const response = yield call(serviceRekammedis.deleteMapRL, params);
        yield put(deleteMapRLSuccess(response.data));
        callback && callback(response);
        toast.success("Sukses", {autoClose: 3000})
    } catch (error) {
        yield put(deleteMapRLError(error));
        toast.error("Error", {autoClose: 3000})
    }
}

export function* watchonDeleteMapRL() {
    yield takeEvery(DELETE_MAP_RL, onDeleteMapRL);
}

function* onUpdatePrinted({ payload: {data}}) {
    try{
        const response = yield call(serviceRekammedis.updatePrinted, data);
        yield put(updatePrintedSuccess(response.data));
        toast.success("Sukses", {autoClose: 3000})
    }catch(error){
        yield put(updatePrintedError(error));
        toast.error("Error", {autoClose: 3000})
    }
}

export function* watchonPriterUpdated(){
    yield takeEvery(UPDATE_PRINTED, onUpdatePrinted)
}

function* ongetLaporanRl_3_3({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_3, queries);
        yield put(getLaporanRl_3_3Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_3Error(error));
    }
}

export function* watchongetLaporanRl_3_3(){
    yield takeEvery(LAPORAN_RL_3_3_GET, ongetLaporanRl_3_3)
}

function* ongetLaporanRl_3_4({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_4, queries);
        yield put(getLaporanRl_3_4Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_4Error(error));
    }
}

export function* watchongetLaporanRl_3_4(){
    yield takeEvery(LAPORAN_RL_3_4_GET, ongetLaporanRl_3_4)
}

function* ongetLaporanRl_3_6({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_6, queries);
        yield put(getLaporanRl_3_6Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_6Error(error));
    }
}

export function* watchongetLaporanRl_3_6(){
    yield takeEvery(LAPORAN_RL_3_6_GET, ongetLaporanRl_3_6)
}

function* ongetLaporanRl_3_7({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_7, queries);
        yield put(getLaporanRl_3_7Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_7Error(error));
    }
}

export function* watchongetLaporanRl_3_7(){
    yield takeEvery(LAPORAN_RL_3_7_GET, ongetLaporanRl_3_7)
}

function* ongetLaporanRl_3_8({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_8, queries);
        yield put(getLaporanRl_3_8Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_8Error(error));
    }
}

export function* watchongetLaporanRl_3_8(){
    yield takeEvery(LAPORAN_RL_3_8_GET, ongetLaporanRl_3_8)
}

function* ongetLaporanRl_3_9({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_9, queries);
        yield put(getLaporanRl_3_9Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_9Error(error));
    }
}

export function* watchongetLaporanRl_3_9(){
    yield takeEvery(LAPORAN_RL_3_9_GET, ongetLaporanRl_3_9)
}

function* ongetLaporanRl_3_14({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_14, queries);
        yield put(getLaporanRl_3_14Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_14Error(error));
    }
}

export function* watchongetLaporanRl_3_14(){
    yield takeEvery(LAPORAN_RL_3_14_GET, ongetLaporanRl_3_14)
}

function* ongetLaporanRl_3_15({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_15, queries);
        yield put(getLaporanRl_3_15Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_15Error(error));
    }
}

export function* watchongetLaporanRl_3_15(){
    yield takeEvery(LAPORAN_RL_3_15_GET, ongetLaporanRl_3_15)
}

function* ongetLaporanRl_3_11({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_11, queries);
        yield put(getLaporanRl_3_11Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_11Error(error));
    }
}

export function* watchongetLaporanRl_3_11(){
    yield takeEvery(LAPORAN_RL_3_11_GET, ongetLaporanRl_3_11)
}

function* ongetLaporanRl_3_10({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_3_10, queries);
        yield put(getLaporanRl_3_10Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_3_10Error(error));
    }
}

export function* watchongetLaporanRl_3_10(){
    yield takeEvery(LAPORAN_RL_3_10_GET, ongetLaporanRl_3_10)
}

function* ongetLaporanRl_5_1({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_5_1, queries);
        yield put(getLaporanRl_5_1Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_5_1Error(error));
    }
}

export function* watchongetLaporanRl_5_1(){
    yield takeEvery(LAPORAN_RL_5_1_GET, ongetLaporanRl_5_1)
}

function* ongetLaporanRl_5_2({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_5_2, queries);
        yield put(getLaporanRl_5_2Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_5_2Error(error));
    }
}

export function* watchongetLaporanRl_5_2(){
    yield takeEvery(LAPORAN_RL_5_2_GET, ongetLaporanRl_5_2)
}

function* ongetLaporanRl_5_3({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_5_3, queries);
        yield put(getLaporanRl_5_3Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_5_3Error(error));
    }
}

export function* watchongetLaporanRl_5_3(){
    yield takeEvery(LAPORAN_RL_5_3_GET, ongetLaporanRl_5_3)
}

function* ongetLaporanRl_5_4({payload: {queries}}) {
    try{
        const response = yield call(serviceRekammedis.getLaporanRl_5_4, queries);
        yield put(getLaporanRl_5_4Success(response.data));
    } catch (error) {
        yield put(getLaporanRl_5_4Error(error));
    }
}

export function* watchongetLaporanRl_5_4(){
    yield takeEvery(LAPORAN_RL_5_4_GET, ongetLaporanRl_5_4)
}

function* kendaliDokumenSaga() {
    yield all([
        fork(watchonDaftarDokumenRekammedis),
        fork(watchonWidgetDaftarDokumenRekammedis),
        fork(watchonsaveDokumenRekammedis),
        fork(watchoncomboLaporanRekammedisGet),
        fork(watchonlistLaporanPasienDaftarGet),
        fork(watchonlistLaporanPasienBatalGet),
        fork(watchonlistLaporanPasienKunjunganGet),
        fork(watchonlaporanRL_3_1_Get),
        fork(watchonlaporanRL_3_2_Get),
        fork(watchonGetDetailJenisProduk),
        fork(watchonGetLayananJenis),
        fork(watchonCreateOrUpdateMapRL),
        fork(watchonGetMasterRLFromInduk),
        fork(watchonGetLayananFromMasterRL),
        fork(watchonDeleteMapRL),
        fork(watchonPriterUpdated),
        fork(watchonlaporanRL_1_2_Get),
        fork(watchonlaporanRL_1_3_Get),
        fork(watchonlaporanRL_2_Get),
        fork(watchongetLaporanRl_3_3),
        fork(watchongetLaporanRl_3_4),
        fork(watchongetLaporanRl_3_6),
        fork(watchongetLaporanRl_3_7),
        fork(watchongetLaporanRl_3_8),
        fork(watchongetLaporanRl_3_9),
        fork(watchongetLaporanRl_3_14),
        fork(watchongetLaporanRl_3_15),
        fork(watchongetLaporanRl_3_11),
        fork(watchongetLaporanRl_3_10),
        fork(watchongetLaporanRl_5_1),
        fork(watchongetLaporanRl_5_2),
        fork(watchongetLaporanRl_5_3),
        fork(watchongetLaporanRl_5_4)
    ]);
}

export default kendaliDokumenSaga;