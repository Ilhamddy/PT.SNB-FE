import { call, put, takeEvery, all, fork, take } from "redux-saga/effects";
import ServiceSatuSehat from "../../services/service-satusehat";
import { 
    GET_LIST_INSTALASI,
    UPSERT_MAP_CHILD,
    UPSERT_ORGANIZATION_INSTALASI, GET_LIST_UNIT,UPSERT_LOCATION_UNIT,
    GET_LIST_PRACTITIONER,UPSERT_PRACTITIONER, UPSERT_PATIENT,UPSERT_ENCOUNTER,
    UPSERT_CONDITION,UPSERT_ENCOUNTER_PULANG,UPSERT_OBSERVATION,
    GET_LIST_KAMAR,UPSERT_LOCATION_KAMAR,GET_LIST_TEMPATTIDUR,
    UPSERT_LOCATION_TEMPATTIDUR,UPSERT_PROCEDURE,UPSERT_ALERGI
 } from "./actionType";
 import { 
    getListInstalasiSuccess,getListInstalasiError,
    upsertOrganizationInstalasiSuccess,upsertOrganizationInstalasiError,
    getListUnitSuccess, getListUnitError,
    upsertLocationUnitSuccess,upsertLocationUnitError,
    getListPractitionerSuccess,getListPractitionerError,
    upsertPractitionerSuccess,upsertPractitionerError,
    upsertPatientSuccess, upsertPatientError,
    upsertEncounterSuccess,upsertEncounterError,
    upsertConditionSuccess,upsertConditionError,
    upsertEncounterPulangSuccess, upsertEncounterPulangError,
    upsertObservationSuccess,upsertObservationError,
    getListKamarSuccess, getListKamarError,
    upsertLocationKamarSuccess,upsertLocationKamarError,
    getListTempatTidurSuccess,getListTempatTidurError,
    upsertLocationTempatTidurSuccess,upsertLocationTempatTidurError,
    upsertProcedureSuccess,upsertProcedureError,
    upsertAlergiSuccess,upsertAlergiError
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

function* onupsertPatient({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertPatient, data);
        yield put(upsertPatientSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertPatientError(error));
        toast.error(error.msg || "Gagal");
    }
}

function* onupsertEncounter({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertEncounter, data);
        yield put(upsertEncounterSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertEncounterError(error));
        toast.error(error.msg || "Gagal");
    }
}

function* onupsertCondition({payload: {data, callback}}) {
    try{
        let response = null;
        if(data.status==='diagnosa'){
            response = yield call(serviceSatuSehat.upsertCondition, data);
        }else if(data.status==='keluhanutama'){
            response = yield call(serviceSatuSehat.upsertConditionV2, data);
        }
        yield put(upsertConditionSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertConditionError(error));
        toast.error(error.msg || "Gagal");
    }
}


function* onupsertEncounterPulang({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertEncounterPulang, data);
        yield put(upsertEncounterPulangSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertEncounterPulangError(error));
        toast.error(error.msg || "Gagal");
    }
}

function* onupsertObservation({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertObservation, data);
        yield put(upsertObservationSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertObservationError(error));
        toast.error(error.msg || "Gagal");
    }
}

function* ongetListKamar({payload: {queries}}) {
    try{
        const response = yield call(serviceSatuSehat.getListKamar, queries);
        yield put(getListKamarSuccess(response.data));
    } catch (error) {
        yield put(getListKamarError(error));
    }
}

function* onupsertLocationKamar({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertLocationKamar, data);
        yield put(upsertLocationKamarSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) { 
        yield put(upsertLocationKamarError(error));
        toast.error(error.msg || "Gagal");
    }
}

function* ongetListTempatTidur({payload: {queries}}) {
    try{
        const response = yield call(serviceSatuSehat.getListTempatTidur, queries);
        yield put(getListTempatTidurSuccess(response.data));
    } catch (error) {
        yield put(getListTempatTidurError(error));
    }
}

function* onupsertLocationTempatTidur({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertLocationTempatTidur, data);
        yield put(upsertLocationTempatTidurSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) { 
        yield put(upsertLocationTempatTidurError(error));
        toast.error(error.msg || "Gagal");
    }
}

function* onupsertProcedure({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertProcedure, data);
        yield put(upsertProcedureSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertProcedureError(error));
        toast.error(error.msg || "Gagal");
    }
}

function* onupsertAlergi({payload: {data, callback}}) {
    try{
        const response = yield call(serviceSatuSehat.upsertAlergi, data);
        yield put(upsertAlergiSuccess(response.data));
        toast.success(response.msg || "Sukses");
        callback && callback(response);
    } catch (error) {
        yield put(upsertAlergiError(error));
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
        takeEvery(UPSERT_PRACTITIONER,onupsertPractitioner),
        takeEvery(UPSERT_PATIENT,onupsertPatient),
        takeEvery(UPSERT_ENCOUNTER,onupsertEncounter),
        takeEvery(UPSERT_CONDITION,onupsertCondition),
        takeEvery(UPSERT_ENCOUNTER_PULANG,onupsertEncounterPulang),
        takeEvery(UPSERT_OBSERVATION,onupsertObservation),
        takeEvery(GET_LIST_KAMAR,ongetListKamar),
        takeEvery(UPSERT_LOCATION_KAMAR,onupsertLocationKamar),
        takeEvery(GET_LIST_TEMPATTIDUR,ongetListTempatTidur),
        takeEvery(UPSERT_LOCATION_TEMPATTIDUR,onupsertLocationTempatTidur),
        takeEvery(UPSERT_PROCEDURE,onupsertProcedure),
        takeEvery(UPSERT_ALERGI,onupsertAlergi)
    ]);
}