import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceSDM from "../../services/service-sdm";

import {
    GET_DAFTAR_PEGAWAI, GET_COMBO_SDM, SAVE_BIODATA_PEGAWAI,
    GET_PEGAWAI_BYID, GET_USER_ROLE_BYID_PEGAWAI, SAVE_SIGNUP_USER_ROLE,
    GET_COMBO_JADWAL,
    GET_JADWAL_DOKTER_SDM,
    UPSERT_JADWAL,UPDATE_RESET_PASSWORD,
    GET_LIBUR_PEGAWAI,
    GET_COMBO_CUTI,
    UPSERT_CUTI,
    BATAL_CUTI
} from "./actionType";

import {
    getDaftarPegawaiSuccess, getDaftarPegawaiError,
    getComboSDMSuccess, getComboSDMError,
    saveBiodataPegawaiSuccess, saveBiodataPegawaiError,
    getPegawaiByIdSuccess, getPegawaiByIdError,
    getUserRoleByIdSuccess, getUserRoleByIdError,
    saveSignupUserRoleSuccess, saveSignupUserRoleError,
    getComboJadwalSuccess,
    getComboJadwalError,
    getJadwalDokterSDMSuccess,
    getJadwalDokterSDMError,
    upsertJadwalSuccess,
    upsertJadwalError,
    updateResetPasswordSuccess, 
    updateResetPasswordError,
    getLiburPegawaiSuccess,
    getLiburPegawaiError,
    getComboCutiSuccess,
    getComboCutiError,
    upsertCutiSuccess,
    upsertCutiError,
    batalCutiSuccess,
    batalCutiError
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceSDM = new ServiceSDM();

function* ongetDaftarPegawai({ payload: { queries } }) {
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

function* ongetComboSDM({ payload: { queries } }) {
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
        let response = null
        if (body.idUser === '') {
            response = yield call(serviceSDM.saveSignupUserRole, body);
        } else {
            response = yield call(serviceSDM.updateUserRole, body);
        }

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

function* onGetComboJadawal({ payload: { queries } }) {
    try {
        const response = yield call(serviceSDM.getComboJadwal, queries);
        yield put(getComboJadwalSuccess(response.data || null));
    } catch (error) {
        yield put(getComboJadwalError(error));
    }
}

export function* watchonGetComboJadwal() {
    yield takeEvery(GET_COMBO_JADWAL, onGetComboJadawal);
}

function* onGetJadwalDokterSDM({ payload: { queries } }) {
    try {
        const response = yield call(serviceSDM.getJadwalDokter, queries);
        yield put(getJadwalDokterSDMSuccess(response.data || null));
    } catch (error) {
        yield put(getJadwalDokterSDMError(error));
    }
}

export function* watchonGetJadwalDokterSDM() {
    yield takeEvery(GET_JADWAL_DOKTER_SDM, onGetJadwalDokterSDM);
}

function* onUpsertJadwal({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceSDM.upsertJadwal, body);
        yield put(upsertJadwalSuccess(response.data || null));
        toast.success(response.msg, { autoClose: 3000 });
        // console.log(callback)
        callback && callback();
    } catch (error) {
        yield put(upsertJadwalError(error));
    }
}

export function* watchonUpsertJadwal() {
    yield takeEvery(UPSERT_JADWAL, onUpsertJadwal);
}

function* onupdateResetPassword({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceSDM.updateResetPassword, body);
        yield put(updateResetPasswordSuccess(response.data || null));
        toast.success(response.msg, { autoClose: 3000 });
        console.log(callback)
        callback && callback();
    } catch (error) {
        yield put(updateResetPasswordError(error));
    }
}

export function* watchonupdateResetPassword() {
    yield takeEvery(UPDATE_RESET_PASSWORD, onupdateResetPassword);
}

function* onGetLiburPegawai({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceSDM.getLiburPegawai, queries);
        yield put(getLiburPegawaiSuccess(response.data));
    } catch (error) {
        yield put(getLiburPegawaiError(error));
    }
}

export function* watchonGetLiburPegawai(){
    yield takeEvery(GET_LIBUR_PEGAWAI, onGetLiburPegawai)
}

function* onGetComboCuti({ payload: { queries } }) {
    try {
        let response = null;
        response = yield call(serviceSDM.getComboCuti, queries);
        yield put(getComboCutiSuccess(response.data));
    } catch (error) {
        yield put(getComboCutiError(error));
    }
}

export function* watchonGetComboCuti(){
    yield takeEvery(GET_COMBO_CUTI, onGetComboCuti)
}

function* onUpsertCuti({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceSDM.upsertCuti, data);
        yield put(getComboCutiSuccess(response.data));
        callback && callback()
        toast.success(response.msg || "Sukses", {autoClose: 3000})
    } catch (error) {
        yield put(getComboCutiError(error));
        toast.success(error.response?.msg || "Error", {autoClose: 3000})
    }
}

export function* watchonUpsertCuti(){
    yield takeEvery(UPSERT_CUTI, onUpsertCuti)
}


function* onBatalCuti({ payload: { data, callback } }) {
    try {
        let response = null;
        response = yield call(serviceSDM.batalCuti, data);
        yield put(batalCutiSuccess(response.data));
        callback && callback()
        toast.success(response.msg || "Sukses", {autoClose: 3000})
    } catch (error) {
        yield put(batalCutiError(error));
        toast.success(error.response?.msg || "Error", {autoClose: 3000})
    }
}

export function* wathconBatalCuti(){
    yield takeEvery(BATAL_CUTI, onBatalCuti)
}


function* sumberDayaManusia() {
    yield all([
        fork(watchongetDaftarPegawai),
        fork(watchongetComboSDM),
        fork(watchonsaveBiodataPegawai),
        fork(watchongetPegawaiById),
        fork(watchongetUserRoleById),
        fork(watchonsaveSignupUserRole),
        fork(watchonGetComboJadwal),
        fork(watchonGetJadwalDokterSDM),
        fork(watchonUpsertJadwal),
        fork(watchonupdateResetPassword),
        fork(watchonGetLiburPegawai),
        fork(watchonGetComboCuti),
        fork(watchonUpsertCuti),
        fork(wathconBatalCuti)
    ]);
}

export default sumberDayaManusia;