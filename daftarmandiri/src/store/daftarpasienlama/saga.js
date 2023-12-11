import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    getJadwalDokterDaftarSuccess,
    getJadwalDokterDaftarError,
    getPasienLamaSuccess,
    getPasienLamaError,
    getDokterPasienSuccess,
    getDokterPasienError,
    getComboDaftarSuccess,
    getComboDaftarError,
    savePasienMandiriSuccess,
    savePasienMandiriError
} from "./action";
import * as uuid from 'uuid'

import {
    GET_JADWAL_DOKTER,
    GET_PASIEN_LAMA,
    GET_DOKTER_PASIEN,
    GET_COMBO_DAFTAR,
    SAVE_PASIEN_MANDIRI
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

function* onSavePasienMandiri({payload: {data, callback}}) {
    try{
        const response = yield call(serviceDaftar.savePasienMandiri, data);
        yield put(savePasienMandiriSuccess(response.data));
        toast.success(response.msg || "Sukses menyimpan data pasien mandiri")
        callback && callback()
    } catch (error) {
        yield put(savePasienMandiriError(error));
        toast.error(error.response?.msg || "Gagal menyimpan data pasien mandiri")
    }
}


export default function* watchLoginUser() {
    yield all([
        takeEvery(GET_JADWAL_DOKTER, onGetJadwalDokter),
        takeEvery(GET_PASIEN_LAMA, onGetPasienLama),
        takeEvery(GET_DOKTER_PASIEN, onGetDokterPasien),
        takeEvery(GET_COMBO_DAFTAR, onGetComboDaftar),
        takeEvery(SAVE_PASIEN_MANDIRI, onSavePasienMandiri)
    ])
}