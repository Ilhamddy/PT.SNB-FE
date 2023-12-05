import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceSatuSehat from "../../services/service-satusehat";
import { 
    GET_LIST_INSTALASI,
    UPSERT_MAP_CHILD,
    UPSERT_ORGANIZATION_INSTALASI, GET_LIST_UNIT,UPSERT_LOCATION_UNIT,
    GET_LIST_PRACTITIONER,UPSERT_PRACTITIONER
 } from "./actionType";
 import { 
    getListInstalasiSuccess,getListInstalasiError,
    upsertOrganizationInstalasiSuccess,upsertOrganizationInstalasiError,
    getListUnitSuccess, getListUnitError,
    upsertLocationUnitSuccess,upsertLocationUnitError,
    getListPractitionerSuccess,getListPractitionerError,
    upsertPractitionerSuccess,upsertPractitionerError
} from "./action";
import { toast } from 'react-toastify';

const serviceSatuSehat = new ServiceSatuSehat();

function* ongetListInstalasi({payload: {queries}}) {
    try{
        const response = yield call(serviceSatuSehat.getListInstalasi, queries);
        yield put(getListInstalasiSuccess(response.data));
    } catch (error) {
        yield put(getListInstalasiError(error));
    }
}

function* ongetListUnit({payload: {queries}}) {
    try{
        const response = yield call(serviceSatuSehat.getListUnit, queries);
        yield put(getListUnitSuccess(response.data));
    } catch (error) {
        yield put(getListUnitError(error));
    }
}

function* onupsertOrganizationInstalasi({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertOrganizationInstalasi, data);
        yield put(upsertOrganizationInstalasiSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertOrganizationInstalasiError(error));
        toast.error(error.msg || "Gagal");
    }
}

function* onupsertLocationUnit({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertLocationUnit, data);
        yield put(upsertLocationUnitSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertLocationUnitError(error));
        toast.error(error.msg || "Gagal");
    }
}


function* ongetListPractitioner({payload: {queries}}) {
    try{
        const response = yield call(serviceSatuSehat.getListPractitioner, queries);
        yield put(getListPractitionerSuccess(response.data));
    } catch (error) {
        yield put(getListPractitionerError(error));
    }
}

function* onupsertPractitioner({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertPractitioner, data);
        yield put(upsertPractitionerSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertPractitionerError(error));
        toast.error(error.msg || "Gagal");
    }
}

export default function* satuSehatSaga() {
    yield all([
        takeEvery(GET_LIST_INSTALASI, ongetListInstalasi),
        takeEvery(UPSERT_ORGANIZATION_INSTALASI,onupsertOrganizationInstalasi),
        takeEvery(GET_LIST_UNIT,ongetListUnit),
        takeEvery(UPSERT_LOCATION_UNIT,onupsertLocationUnit),
        takeEvery(GET_LIST_PRACTITIONER,ongetListPractitioner),
        takeEvery(UPSERT_PRACTITIONER,onupsertPractitioner)
    ]);
}