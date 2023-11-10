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
    getPoliklinikTerbanyakError
} from "./action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    GET_PASIEN_RJ,
    GET_PASIEN_IGD,
    GET_PASIEN_RANAP,
    GET_COUNT_CARA_BAYAR,
    GET_POLIKLINIK_TERBANYAK
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

function* eisSaga() {
    yield all([
        takeEvery(GET_PASIEN_RJ, onGetStokBatch),
        takeEvery(GET_PASIEN_IGD, onGetPasienIGD),
        takeEvery(GET_PASIEN_RANAP, onGetPasienRanap),
        takeEvery(GET_COUNT_CARA_BAYAR, onGetCountCaraBayar),
        takeEvery(GET_POLIKLINIK_TERBANYAK, onGetPoliklinikTerbanyak)
    ]);
}

export default eisSaga