import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceSDM from "../../services/service-sdm";

import {
    GET_DAFTAR_PEGAWAI,GET_COMBO_SDM, SAVE_BIODATA_PEGAWAI,
    GET_PEGAWAI_BYID, GET_USER_ROLE_BYID_PEGAWAI,SAVE_SIGNUP_USER_ROLE
} from "./actionType";

import {
    getDaftarPegawaiSuccess, getDaftarPegawaiError,
    getComboSDMSuccess, getComboSDMError,
    saveBiodataPegawaiSuccess, saveBiodataPegawaiError,
    getPegawaiByIdSuccess, getPegawaiByIdError,
    getUserRoleByIdSuccess, getUserRoleByIdError,
    saveSignupUserRoleSuccess, saveSignupUserRoleError
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

function* onsaveBiodataPegawai({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceSDM.saveBiodataPegawai, body);
        yield put(saveBiodataPegawaiSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
    } catch (error) {
        yield put(saveBiodataPegawaiError(error));
        toast.error("Gagal Simpan ", { autoClose: 3000 });
    }
}
export function* watchonsaveBiodataPegawai() {
    yield takeEvery(SAVE_BIODATA_PEGAWAI, onsaveBiodataPegawai);
}

function* ongetPegawaiById({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceSDM.getPegawaiById, queries);
        yield put(getPegawaiByIdSuccess(response.data));
    } catch (error) {
        yield put(getPegawaiByIdError(error));
        toast.error("Gagal Simpan ", { autoClose: 3000 });
    }
}
export function* watchongetPegawaiById() {
    yield takeEvery(GET_PEGAWAI_BYID, ongetPegawaiById);
}

function* ongetUserRoleById({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceSDM.getUserRoleById, queries);
        yield put(getUserRoleByIdSuccess(response.data));
    } catch (error) {
        yield put(getUserRoleByIdError(error));
        toast.error("Gagal Simpan ", { autoClose: 3000 });
    }
}
export function* watchongetUserRoleById() {
    yield takeEvery(GET_USER_ROLE_BYID_PEGAWAI, ongetUserRoleById);
}

function* onsaveSignupUserRole({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceSDM.saveSignupUserRole, body);
        yield put(saveSignupUserRoleSuccess(response.data));
        if (response.code === 200) {
            toast.success(response.msg, { autoClose: 3000 });
        } else {
            toast.error(response.msg, { autoClose: 3000 });
        }
        callback && callback();
    } catch (error) {
        console.log(error)
        yield put(saveSignupUserRoleError(error));
        toast.error("Gagal Simpan ", { autoClose: 3000 });
    }
}
export function* watchonsaveSignupUserRole() {
    yield takeEvery(SAVE_SIGNUP_USER_ROLE, onsaveSignupUserRole);
}

function* sumberDayaManusia() {
    yield all([
        fork(watchongetDaftarPegawai),
        fork(watchongetComboSDM),
        fork(watchonsaveBiodataPegawai),
        fork(watchongetPegawaiById),
        fork(watchongetUserRoleById),
        fork(watchonsaveSignupUserRole)
    ]);
}

export default sumberDayaManusia;