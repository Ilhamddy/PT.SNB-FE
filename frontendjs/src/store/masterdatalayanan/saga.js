import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceMDL from "../../services/service-masterdatalayanan.js";

import {
    GET_COMBO_TAMBAH_LAYANAN,
    UPSERT_LAYANAN,
    GET_LAYANAN,
    GET_COMBO_MAP_RUANG_PELAYANAN,
    GET_MAP_UNIT_TO_PRODUK,
    GET_LAYANAN_MAPPING,
    SAVE_OR_DELETE_MAPPING,
    GET_LAIN_LAIN,
    UPSERT_JENIS_PRODUK,
    UPSERT_DETAIL_JENIS_PRODUK,
    GET_MASTER_TARIF_LAYANAN,
    SET_VARIABEL_BPJS,
    UPDATE_STATUS_LAYANAN
} from "./actionType";

import {
    getComboTambahLayananSuccess,
    getComboTambahLayananError,
    upsertLayananSuccess,
    upsertLayananError,
    getLayananSuccess,
    getLayananError,
    getComboMapRuangPelayananSuccess,
    getComboMapRuangPelayananError,
    getMapUnitToProdukSuccess,
    getMapUnitToProdukError,
    getLayananMappingSuccess,
    getLayananMappingError,
    saveOrDeleteMappingSuccess,
    saveOrDeleteMappingError,
    getLainLainSuccess,
    getLainLainError,
    upsertJenisProdukSuccess,
    upsertJenisProdukError,
    upsertDetailJenisProdukSuccess,
    upsertDetailJenisProdukError,
    getMasterTarifLayananSuccess,
    getMasterTarifLayananError,
    setVariabelBPJSSuccess,
    setVariabelBPJSError,
    updateStatusLayananSuccess,updateStatusLayananError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceMDL = new ServiceMDL();

function* ongetComboTambahLayanan({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceMDL.getComboTambahLayanan, queries);
        yield put(getComboTambahLayananSuccess(response.data));
    } catch (error) {
        yield put(getComboTambahLayananError(error));
    }
}

function* onUpsertLayanan({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceMDL.upsertLayanan, data);
        yield put(upsertLayananSuccess(response.data));
        toast.success(response.msg || "Sukses")
        callback && callback(response.data)
    } catch (error) {
        yield put(upsertLayananError(error));
        toast.error(error.response?.data?.msg || "Error")

    }
}

function* onGetLayanan({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceMDL.getLayanan, queries);
        yield put(getLayananSuccess(response.data));
    } catch (error) {
        yield put(getLayananError(error));
    }
}

function* onGetComboMapRuangPelayanan({ payload: { queries }}) {
    try {
        let response = null;
        response = yield call(serviceMDL.getComboMapRuangPelayanan, queries);
        yield put(getComboMapRuangPelayananSuccess(response.data));
    } catch (error) {
        yield put(getComboMapRuangPelayananError(error));
    }
}


function* onGetMapUnitToProduk({ payload: { queries }}) {
    try {
        let response = null;
        response = yield call(serviceMDL.getMapUnitToProduk, queries);
        yield put(getMapUnitToProdukSuccess(response.data));
    } catch (error) {
        yield put(getMapUnitToProdukError(error));
    }
}


function* onGetLayananMapping({ payload: { queries }}) {
    try {
        let response = null;
        response = yield call(serviceMDL.getLayananMapping, queries);
        yield put(getLayananMappingSuccess(response.data));
    } catch (error) {
        yield put(getLayananMappingError(error));
    }
}

function* onSaveOrDeleteMapping({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceMDL.saveOrDeleteMapping, data);
        yield put(saveOrDeleteMappingSuccess(response.data));
        toast.success(response.msg || "Sukses")
        callback && callback(response.data)
    } catch (error) {
        yield put(saveOrDeleteMappingError(error));
        toast.error(error.response?.data?.msg || "Error")
    }
}


function* onGetLainLain({ payload: { queries }}) {
    try {
        let response = null;
        response = yield call(serviceMDL.getLainLain, queries);
        yield put(getLainLainSuccess(response.data));
    } catch (error) {
        yield put(getLainLainError(error));
    }
}

function* onUpsertJenisProduk({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceMDL.upsertJenisProduk, data);
        yield put(upsertJenisProdukSuccess(response.data));
        toast.success(response.msg || "Sukses")
        callback && callback(response.data)
    } catch (error) {
        yield put(upsertJenisProdukError(error));
        toast.error(error.response?.data?.msg || error?.message || "Error")
    }
}

function* onUpsertDetailJenisProduk({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceMDL.upsertDetailJenisProduk, data);
        yield put(upsertDetailJenisProdukSuccess(response.data));
        toast.success(response.msg || "Sukses")
        callback && callback(response.data)
    } catch (error) {
        yield put(upsertDetailJenisProdukError(error));
        toast.error(error.response?.data?.msg || "Error")
    }
}

function* ongetMasterTarifLayanan({payload: {queries}}) {
    try{
        const response = yield call(serviceMDL.getMasterTarifLayanan, queries);
        yield put(getMasterTarifLayananSuccess(response.data));
    } catch (error) {
        yield put(getMasterTarifLayananError(error));
    }
}

function* onSetVariabelBPJS({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceMDL.setVariabelBPJS, data);
        yield put(setVariabelBPJSSuccess(response.data));
        toast.success(response.msg || "Sukses")
        callback && callback(response.data)
    } catch (error) {
        yield put(setVariabelBPJSError(error));
        toast.error(error.response?.data?.msg || "Error")
    }
}

function* onupdateStatusLayanan({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceMDL.updateStatusLayanan, data);
        yield put(updateStatusLayananSuccess(response.data));
        toast.success(response.msg || "Sukses")
        callback && callback(response.data)
    } catch (error) {
        yield put(updateStatusLayananError(error));
        toast.error(error.response?.data?.msg || "Error")
    }
}

function* MasterDataLayananSaga() {
    yield all([
        takeEvery(GET_COMBO_TAMBAH_LAYANAN, ongetComboTambahLayanan),
        takeEvery(UPSERT_LAYANAN, onUpsertLayanan),
        takeEvery(GET_LAYANAN, onGetLayanan),
        takeEvery(GET_COMBO_MAP_RUANG_PELAYANAN, onGetComboMapRuangPelayanan),
        takeEvery(GET_MAP_UNIT_TO_PRODUK, onGetMapUnitToProduk),
        takeEvery(GET_LAYANAN_MAPPING, onGetLayananMapping),
        takeEvery(SAVE_OR_DELETE_MAPPING, onSaveOrDeleteMapping),
        takeEvery(GET_LAIN_LAIN, onGetLainLain),
        takeEvery(UPSERT_JENIS_PRODUK, onUpsertJenisProduk),
        takeEvery(UPSERT_DETAIL_JENIS_PRODUK, onUpsertDetailJenisProduk),
        takeEvery(GET_MASTER_TARIF_LAYANAN, ongetMasterTarifLayanan),
        takeEvery(SET_VARIABEL_BPJS, onSetVariabelBPJS),
        takeEvery(UPDATE_STATUS_LAYANAN,onupdateStatusLayanan)

    ]);
}

export default MasterDataLayananSaga;