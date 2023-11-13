import { call, put, takeEvery, all, fork } from "redux-saga/effects";
// Task Redux States
import { 
    getPasienRJSuccess, 
    getPasienRJError, 
    getPasienIGDSuccess,
    getPasienIGDError,
    getPasienRanapSuccess,
    getPasienRanapError,
    getCountCaraBayarSuccess,
    getCountCaraBayarError,
    getPoliklinikTerbanyakSuccess,
    getPoliklinikTerbanyakError,
    getCountUnitSuccess,
    getCountUnitError,
    getStatusPegawaiSuccess,
    getStatusPegawaiError
} from "./action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    GET_PASIEN_RJ,
    GET_PASIEN_IGD,
    GET_PASIEN_RANAP,
    GET_COUNT_CARA_BAYAR,
    GET_POLIKLINIK_TERBANYAK,
    GET_COUNT_UNIT,
    GET_STATUS_PEGAWAI
} from "./actionType";
import ServiceEis from "../../services/service-eis";

const serviceEis = new ServiceEis();

function* onGetStokBatch({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getPasienRJ, queries);
        yield put(getPasienRJSuccess(response.data));
    } catch (error) {
        yield put(getPasienRJError(error));
    }
}

function* onGetPasienIGD({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getPasienIGD, queries);
        yield put(getPasienIGDSuccess(response.data));
    } catch (error) {
        yield put(getPasienIGDError(error));
    }
}

function* onGetPasienRanap({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getPasienRanap, queries);
        yield put(getPasienRanapSuccess(response.data));
    } catch (error) {
        yield put(getPasienRanapError(error));
    }
}

function* onGetCountCaraBayar({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getCountCaraBayar, queries);
        yield put(getCountCaraBayarSuccess(response.data));
    } catch (error) {
        yield put(getCountCaraBayarError(error));
    }
}

function* onGetPoliklinikTerbanyak({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getPoliklinikTerbanyak, queries);
        yield put(getPoliklinikTerbanyakSuccess(response.data));
    } catch (error) {
        yield put(getPoliklinikTerbanyakError(error));
    }
}

function* onGetCountUnit({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getCountUnit, queries);
        yield put(getCountUnitSuccess(response.data));
    } catch (error) {
        yield put(getCountUnitError(error));
    }
}

function* onGetStatusPegawai({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getStatusPegawai, queries);
        yield put(getStatusPegawaiSuccess(response.data));
    } catch (error) {
        yield put(getStatusPegawaiError(error));
    }
}

function* eisSaga() {
    yield all([
        takeEvery(GET_PASIEN_RJ, onGetStokBatch),
        takeEvery(GET_PASIEN_IGD, onGetPasienIGD),
        takeEvery(GET_PASIEN_RANAP, onGetPasienRanap),
        takeEvery(GET_COUNT_CARA_BAYAR, onGetCountCaraBayar),
        takeEvery(GET_POLIKLINIK_TERBANYAK, onGetPoliklinikTerbanyak),
        takeEvery(GET_COUNT_UNIT, onGetCountUnit),
        takeEvery(GET_STATUS_PEGAWAI, onGetStatusPegawai)
    ]);
}

export default eisSaga