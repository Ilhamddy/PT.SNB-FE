import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceSatuSehat from "../../services/service-satusehat";
import { 
    GET_LIST_INSTALASI
 } from "./actionType";
 import { 
    getListInstalasiSuccess,getListInstalasiError
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

export default function* satuSehatSaga() {
    yield all([
        takeEvery(GET_LIST_INSTALASI, ongetListInstalasi),
    ]);
}