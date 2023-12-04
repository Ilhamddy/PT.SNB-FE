import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceSatuSehat from "../../services/service-satusehat";
import { 
    GET_LIST_INSTALASI,
    UPSERT_MAP_CHILD,
    UPSERT_ORGANIZATION_INSTALASI
 } from "./actionType";
 import { 
    getListInstalasiSuccess,getListInstalasiError,
    upsertOrganizationInstalasiSuccess,upsertOrganizationInstalasiError
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

export default function* satuSehatSaga() {
    yield all([
        takeEvery(GET_LIST_INSTALASI, ongetListInstalasi),
        takeEvery(UPSERT_ORGANIZATION_INSTALASI,onupsertOrganizationInstalasi)
    ]);
}