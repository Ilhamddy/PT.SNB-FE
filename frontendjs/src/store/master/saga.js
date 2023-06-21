import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceMaster from "../../services/service-master";
import { MASTER_GET,DESA_GET,KECAMATAN_GET,COMBO_REGISTRASI_GET, COMBO_ASURANSI_GET } from "./actionType";
import { masterGetSuccess,masterGetError,desaGetSuccess,desaGetError,kecamatanGetSuccess,kecamatanGetError,
    comboRegistrasiGetSuccess,comboRegistrasiGetError, 
    comboAsuransiGet, 
    comboAsuransiGetSuccess, 
    comboAsuransiGetError
} from "./action";

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

function* onGetComboAsuransi() {
    try {
        const response = yield call(serviceMaster.getComboAsuransi);
        yield put(comboAsuransiGetSuccess(response.data));
    } catch (error) {
        yield put(comboAsuransiGetError(error));
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

export function* watchGetComboAsuransi() {
    yield takeEvery(COMBO_ASURANSI_GET, onGetComboAsuransi);
}

function* masterSaga() {
    yield all([
        fork(watchGetMaster),
        fork(watchGetDesa),
        fork(watchGetKecamatan),
        fork(watchGetComboRegistrasi),
        fork(watchGetComboAsuransi),
    ]);
}

export default masterSaga;