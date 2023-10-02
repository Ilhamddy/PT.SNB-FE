import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    getJadwalDokterSuccess,
    getJadwalDokterError,
    getComboJadwalSuccess,
    getComboJadwalError
} from "./action";
import * as uuid from 'uuid'

import {
    GET_JADWAL_DOKTER,
    GET_COMBO_JADWAL
} from "./actionType";

import ServiceHome from "../../service/service-home";
import { toast } from "react-toastify";

const serviceHome = new ServiceHome();

function* onGetJadwalDokter({payload: {queries}}) {
    try {
        const response = yield call(serviceHome.getJadwalDokter, queries);
        yield put(getJadwalDokterSuccess(response.data));
    } catch (error) {
        yield put(getJadwalDokterError(error));
    }
}

function* onGetComboJadwal({payload: {queries}}) {
    try {
        const response = yield call(serviceHome.getComboJadwal, queries);
        yield put(getComboJadwalSuccess(response.data));
    } catch (error) {
        yield put(getComboJadwalError(error));
    }
}

export default function* watchLoginUser() {
    yield takeEvery(GET_JADWAL_DOKTER, onGetJadwalDokter);
    yield takeEvery(GET_COMBO_JADWAL, onGetComboJadwal);
}