import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    getJadwalDokterDaftarSuccess,
    getJadwalDokterDaftarError,
    getPasienLamaSuccess,
    getPasienLamaError,
    getDokterPasienSuccess,
    getDokterPasienError,
    getComboDaftarSuccess,
    getComboDaftarError
} from "./action";
import * as uuid from 'uuid'

import {
    GET_JADWAL_DOKTER,
    GET_PASIEN_LAMA,
    GET_DOKTER_PASIEN,
    GET_COMBO_DAFTAR
} from "./actionType";

import ServiceHome from "../../service/service-home";
import { toast } from "react-toastify";
import ServiceDaftar from "../../service/service-daftarpasienlama";

const serviceHome = new ServiceHome();
const serviceDaftar = new ServiceDaftar();

function* onGetJadwalDokter({payload: {queries}}) {
    try {
        const response = yield call(serviceHome.getJadwalDokter, queries);
        yield put(getJadwalDokterDaftarSuccess(response.data));
    } catch (error) {
        yield put(getJadwalDokterDaftarError(error));
    }
};

function* onGetPasienLama({payload: {queries}}) {
    try {
        const response = yield call(serviceDaftar.getPasienLama, queries);
        yield put(getPasienLamaSuccess(response.data));
    } catch (error) {
        yield put(getPasienLamaError(error));
    }
}

function* onGetDokterPasien({payload: {queries}}) {
    try {
        const response = yield call(serviceDaftar.getDokter, queries);
        yield put(getDokterPasienSuccess(response.data));
    } catch (error) {
        yield put(getDokterPasienError(error));
    }
}

function* onGetComboDaftar({payload: {queries}}) {
    try {
        const response = yield call(serviceDaftar.getComboDaftar, queries);
        yield put(getComboDaftarSuccess(response.data));
    } catch (error) {
        yield put(getComboDaftarError(error));
    }
}


export default function* watchLoginUser() {
    yield takeEvery(GET_JADWAL_DOKTER, onGetJadwalDokter);
    yield takeEvery(GET_PASIEN_LAMA, onGetPasienLama);
    yield takeEvery(GET_DOKTER_PASIEN, onGetDokterPasien);
    yield takeEvery(GET_COMBO_DAFTAR, onGetComboDaftar);
}