import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceMaster from "../../services/service-master";
import { MASTER_GET,DESA_GET,KECAMATAN_GET,COMBO_REGISTRASI_GET } from "./actionType";
import { masterGetSuccess,masterGetError,desaGetSuccess,desaGetError,kecamatanGetSuccess,kecamatanGetError,
comboRegistrasiGetSuccess,comboRegistrasiGetError } from "./action";

const serviceMaster = new ServiceMaster();

function* onGetMaster() {
    try {
        const response = yield call(serviceMaster.getAllMaster);
        yield put(masterGetSuccess(response.data));
    } catch (error) {
        yield put(masterGetError(error));
    }
}

function* onGetDesa({payload: {desa}}) {
    try {
        const response = yield call(serviceMaster.getDesa,desa);
        yield put(desaGetSuccess(response.data));
    } catch (error) {
        yield put(desaGetError(error));
    }
}

function* onGetKecamatan() {
    try {
        const response = yield call(serviceMaster.getKecamatan);
        yield put(kecamatanGetSuccess(response.data));
    } catch (error) {
        yield put(kecamatanGetError(error));
    }
}

function* onGetComboRegistrasi() {
    try {
        const response = yield call(serviceMaster.getComboRegistrasi);
        yield put(comboRegistrasiGetSuccess(response.data));
    } catch (error) {
        yield put(comboRegistrasiGetError(error));
    }
}

export function* watchGetMaster() {
    yield takeEvery(MASTER_GET, onGetMaster);
}

export function* watchGetDesa() {
    yield takeEvery(DESA_GET, onGetDesa);
}

export function* watchGetKecamatan() {
    yield takeEvery(KECAMATAN_GET, onGetKecamatan);
}

export function* watchGetComboRegistrasi() {
    yield takeEvery(COMBO_REGISTRASI_GET, onGetComboRegistrasi);
}

function* masterSaga() {
    yield all([
        fork(watchGetMaster),
        fork(watchGetDesa),
        fork(watchGetKecamatan),
        fork(watchGetComboRegistrasi)
    ]);
}

export default masterSaga;