import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceMDL from "../../services/service-masterdatalayanan.js";

import {
    GET_COMBO_TAMBAH_LAYANAN,
    UPSERT_LAYANAN,
    GET_LAYANAN
} from "./actionType";

import {
    getComboTambahLayananSuccess,
    getComboTambahLayananError,
    upsertLayananSuccess,
    upsertLayananError,
    getLayananSuccess,
    getLayananError
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
        toast.success(response.data.msg || "Sukses")
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

function* MasterDataLayananSaga() {
    yield all([
        takeEvery(GET_COMBO_TAMBAH_LAYANAN, ongetComboTambahLayanan),
        takeEvery(UPSERT_LAYANAN, onUpsertLayanan),
        takeEvery(GET_LAYANAN, onGetLayanan)

    ]);
}

export default MasterDataLayananSaga;