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
    updatePrintedError
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
        toast.error(error, { autoClose: 3000 });
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
        fork(watchonPriterUpdated)
    ]);
}

export default kendaliDokumenSaga;