import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceSysadmin from "../../services/service-sysadmin";
import { 
    GET_TEMPAT_TIDUR,
    GET_UNIT_TEMPAT_TIDUR,
    GET_COMBO_TEMPAT_TIDUR,
    UPSERT_TEMPAT_TIDUR,
    GET_ALL_UNIT,
    GET_COMBO_DAFTAR_UNIT,
    UPSERT_UNIT,
    GET_ALL_KAMAR,
    GET_COMBO_DAFTAR_KAMAR,
    GET_COMBO_SYSADMIN
 } from "./actionType";
import { 
    getTempatTidurSuccess,
    getTempatTidurError,
    getUnitTempatTidurSuccess,
    getUnitTempatTidurError,
    getComboTempatTidurSuccess,
    getComboTempatTidurError,
    upsertTempatTidurSuccess,
    upsertTempatTidurError,
    getAllUnitSuccess,
    getAllUnitError,
    getComboDaftarUnitSuccess,
    getComboDaftarUnitError,
    upsertUnitSuccess,
    upsertUnitError,
    getAllKamarSuccess,
    getAllKamarError,
    getComboDaftarKamarSuccess,
    getComboDaftarKamarError,
    getComboSysadminSuccess,getComboSysadminError
} from "./action";
import { toast } from 'react-toastify';

const serviceSysadmin = new ServiceSysadmin();


function* onGetTempatTidur({payload: {queries}}) {
    try{
        const response = yield call(serviceSysadmin.getTempatTidur, queries);
        yield put(getTempatTidurSuccess(response.data));
    } catch (error) {
        yield put(getTempatTidurError(error));
    }
}

function* onGetUnitTempatTidur({payload: {queries}}) {
    try{
        const response = yield call(serviceSysadmin.getUnitTempatTidur, queries);
        yield put(getUnitTempatTidurSuccess(response.data));
    } catch (error) {
        yield put(getUnitTempatTidurError(error));
    }
}

function* onGetComboTempatTidur({payload: {queries}}) {
    try{
        const response = yield call(serviceSysadmin.getComboTempatTidur, queries);
        yield put(getComboTempatTidurSuccess(response.data));
    } catch (error) {
        yield put(getComboTempatTidurError(error));
    }
}

function* onUpsertTempatTidur({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSysadmin.upsertTempatTidur, data);
        yield put(upsertTempatTidurSuccess(response.data));
        toast.success(response.message);
        callback && callback(response);
    } catch (error) {
        yield put(upsertTempatTidurError(error));
        toast.error(error.message);
    }
}

function* onGetAllUnit({payload: {queries}}) {
    try{
        const response = yield call(serviceSysadmin.getAllUnit, queries);
        yield put(getAllUnitSuccess(response.data));
    } catch (error) {
        yield put(getAllUnitError(error));
    }
}

function* onGetComboDaftarUnit({payload: {queries}}) {
    try{
        const response = yield call(serviceSysadmin.getComboDaftarUnit, queries);
        yield put(getComboDaftarUnitSuccess(response.data));
    } catch (error) {
        yield put(getComboDaftarUnitError(error));
    }
}

function* onUpsertUnit({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSysadmin.upsertUnit, data);
        yield put(upsertUnitSuccess(response.data));
        toast.success(response.message);
        callback && callback(response);
    } catch (error) {
        yield put(upsertUnitError(error));
        toast.error(error.message);
    }
}

function* onGetAllKamar({payload: {queries}}) {
    try{
        const response = yield call(serviceSysadmin.getAllKamar, queries);
        yield put(getAllKamarSuccess(response.data));
    } catch (error) {
        yield put(getAllKamarError(error));
    }
}

function* onGetComboDaftarKamar({payload: {queries}}) {
    try{
        const response = yield call(serviceSysadmin.getComboDaftarKamar, queries);
        yield put(getComboDaftarKamarSuccess(response.data));
    } catch (error) {
        yield put(getComboDaftarKamarError(error));
    }
}

function* ongetComboSysadmin({payload: {queries}}) {
    try{
        const response = yield call(serviceSysadmin.getComboSysadmin, queries);
        yield put(getComboSysadminSuccess(response.data));
    } catch (error) {
        yield put(getComboSysadminError(error));
    }
}

export default function* SysadminSaga() {
    yield takeEvery(GET_TEMPAT_TIDUR, onGetTempatTidur)
    yield takeEvery(GET_UNIT_TEMPAT_TIDUR, onGetUnitTempatTidur)
    yield takeEvery(GET_COMBO_TEMPAT_TIDUR, onGetComboTempatTidur)
    yield takeEvery(UPSERT_TEMPAT_TIDUR, onUpsertTempatTidur)
    yield takeEvery(GET_ALL_UNIT, onGetAllUnit)
    yield takeEvery(GET_COMBO_DAFTAR_UNIT, onGetComboDaftarUnit)
    yield takeEvery(UPSERT_UNIT, onUpsertUnit)
    yield takeEvery(GET_ALL_KAMAR, onGetAllKamar)
    yield takeEvery(GET_COMBO_DAFTAR_KAMAR, onGetComboDaftarKamar)
    yield takeEvery(GET_COMBO_SYSADMIN, ongetComboSysadmin)
}
