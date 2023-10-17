import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceSDM from "../../services/service-sdm";

import {
    GET_DAFTAR_PEGAWAI,GET_COMBO_SDM
} from "./actionType";

import {
    getDaftarPegawaiSuccess, getDaftarPegawaiError,
    getComboSDMSuccess, getComboSDMError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceSDM = new ServiceSDM();

function* ongetDaftarPegawai({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceSDM.getDaftarPegawai, queries);
        yield put(getDaftarPegawaiSuccess(response.data));
    } catch (error) {
        yield put(getDaftarPegawaiError(error));
    }
}

export function* watchongetDaftarPegawai() {
    yield takeEvery(GET_DAFTAR_PEGAWAI, ongetDaftarPegawai);
}

function* ongetComboSDM({ payload: {queries}  }) {
    try {
        let response = null;
        response = yield call(serviceSDM.getComboSDM, queries);
        yield put(getComboSDMSuccess(response.data));
    } catch (error) {
        yield put(getComboSDMError(error));
    }
}

export function* watchongetComboSDM() {
    yield takeEvery(GET_COMBO_SDM, ongetComboSDM);
}

function* sumberDayaManusia() {
    yield all([
        fork(watchongetDaftarPegawai),
        fork(watchongetComboSDM)
    ]);
}

export default sumberDayaManusia;