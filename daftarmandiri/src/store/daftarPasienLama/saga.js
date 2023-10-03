import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    getJadwalDokterDaftarSuccess,
    getJadwalDokterDaftarError,
} from "./action";
import * as uuid from 'uuid'

import {
    GET_JADWAL_DOKTER,
} from "./actionType";

import ServiceHome from "../../service/service-home";
import { toast } from "react-toastify";
import ServiceDaftar from "../../service/service-daftar";

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


export default function* watchLoginUser() {
    yield takeEvery(GET_JADWAL_DOKTER, onGetJadwalDokter);
}