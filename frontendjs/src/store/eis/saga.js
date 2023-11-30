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
    getStatusPegawaiError,
    getPegawaiPensiunSuccess,
    getPegawaiPensiunError,
    getDasborFarmasiSuccess,
    getDasborFarmasiError,
    getDasborPembayaranSuccess,
    getDasborPembayaranError,
    getDasborPetaSuccess,
    getDasborPetaError
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
    GET_STATUS_PEGAWAI,
    GET_PEGAWAI_PENSIUN,
    GET_DASBOR_FARMASI,
    GET_DASBOR_PEMBAYARAN,
    GET_DASBOR_PETA
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

function* onGetPegawaiPensiun({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getPegawaiPensiun, queries);
        yield put(getPegawaiPensiunSuccess(response.data));
    } catch (error) {
        yield put(getPegawaiPensiunError(error));
    }
}


function* onGetDasborFarmasi({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getDasborFarmasi, queries);
        yield put(getDasborFarmasiSuccess(response.data));
    } catch (error) {
        yield put(getDasborFarmasiError(error));
    }
}


function* onGetDasborPembayaran({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getDasborPembayaran, queries);
        yield put(getDasborPembayaranSuccess(response.data));
    } catch (error) {
        yield put(getDasborPembayaranError(error));
    }
}

function* onGetDasborPeta({payload: { queries }}) {
    try {
        let response = yield call(serviceEis.getDasborPeta, queries);
        yield put(getDasborPetaSuccess(response.data));
    } catch (error) {
        yield put(getDasborPetaError(error));
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
        takeEvery(GET_STATUS_PEGAWAI, onGetStatusPegawai),
        takeEvery(GET_PEGAWAI_PENSIUN, onGetPegawaiPensiun),
        takeEvery(GET_DASBOR_FARMASI, onGetDasborFarmasi),
        takeEvery(GET_DASBOR_PEMBAYARAN, onGetDasborPembayaran),
        takeEvery(GET_DASBOR_PETA, onGetDasborPeta),

    ]);
}

export default eisSaga