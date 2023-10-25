import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceTempatTidur from "../../services/service-tempattidur";
import { 
    GET_TEMPAT_TIDUR,
    GET_UNIT_TEMPAT_TIDUR,
    GET_COMBO_TEMPAT_TIDUR,
    UPSERT_TEMPAT_TIDUR
 } from "./actionType";
import { 
    getTempatTidurSuccess,
    getTempatTidurError,
    getUnitTempatTidurSuccess,
    getUnitTempatTidurError,
    getComboTempatTidurSuccess,
    getComboTempatTidurError,
    upsertTempatTidurSuccess,
    upsertTempatTidurError
} from "./action";
import { toast } from 'react-toastify';

const serviceTT = new ServiceTempatTidur();


function* onGetTempatTidur({payload: {queries}}) {
    try{
        const response = yield call(serviceTT.getTempatTidur, queries);
        yield put(getTempatTidurSuccess(response.data));
    } catch (error) {
        yield put(getTempatTidurError(error));
    }
}

function* onGetUnitTempatTidur({payload: {queries}}) {
    try{
        const response = yield call(serviceTT.getUnitTempatTidur, queries);
        yield put(getUnitTempatTidurSuccess(response.data));
    } catch (error) {
        yield put(getUnitTempatTidurError(error));
    }
}

function* onGetComboTempatTidur({payload: {queries}}) {
    try{
        const response = yield call(serviceTT.getComboTempatTidur, queries);
        yield put(getComboTempatTidurSuccess(response.data));
    } catch (error) {
        yield put(getComboTempatTidurError(error));
    }
}

function* onUpsertTempatTidur({payload: {data, callback}}) {
    try{
        const response = yield call(serviceTT.upsertTempatTidur, data);
        yield put(upsertTempatTidurSuccess(response.data));
        toast.success(response.message);
        callback && callback(response);
    } catch (error) {
        yield put(upsertTempatTidurError(error));
        toast.error(error.message);
    }
}

export default function* TempatTidurSaga() {
    yield takeEvery(GET_TEMPAT_TIDUR, onGetTempatTidur)
    yield takeEvery(GET_UNIT_TEMPAT_TIDUR, onGetUnitTempatTidur)
    yield takeEvery(GET_COMBO_TEMPAT_TIDUR, onGetComboTempatTidur)
    yield takeEvery(UPSERT_TEMPAT_TIDUR, onUpsertTempatTidur)
}
