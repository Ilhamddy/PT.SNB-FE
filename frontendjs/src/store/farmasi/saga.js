import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceFarmasi from "../../services/service-farmasi";

import {
    getOrderResepQuerySuccess,
    getOrderResepQueryError,
    getOrderResepFromNorecSuccess,
    getOrderResepFromNorecError,
    createOrUpdateVerifResepSuccess,
    createOrUpdateVerifResepError
} from "./action";

import {
    GET_ORDER_RESEP_QUERY,
    GET_ORDER_RESEP_FROM_NOREC,
    CREATE_OR_UPDATE_VERIF_RESEP
} from "./actionType";

import {
    
} from "./action";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serviceFarmasi = new ServiceFarmasi();

function* onGetOrderResepQuery({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getOrderResepQuery, queries);
        yield put(getOrderResepQuerySuccess(response.data));
    } catch (error) {
        yield put(getOrderResepQueryError(error));
    }
}

function* onGetOrderResepFromNorec({ payload: { queries } }) {
    try {
        const response = yield call(serviceFarmasi.getOrderResepFromNorec, queries);
        yield put(getOrderResepFromNorecSuccess(response.data));
    } catch (error) {
        yield put(getOrderResepFromNorecError(error));
    }
}

function* onCreateOrUpdateVerifResep({ payload: { body, callback } }) {
    try {
        const response = yield call(serviceFarmasi.createOrUpdateVerifResep, body);
        yield put(createOrUpdateVerifResepSuccess(response.data));
        toast.success("Sukses update verif resep", { autoClose: 3000 });
        callback && callback();
    } catch (error) {
        yield put(createOrUpdateVerifResepError(error));
        toast.error("Gagal update verif resep", { autoClose: 3000 });
    }
}

export function* watchGetOrderResepQuery() {
    yield takeEvery(GET_ORDER_RESEP_QUERY, onGetOrderResepQuery);
}

export function* watchGetOrderResepFromNorec() {
    yield takeEvery(GET_ORDER_RESEP_FROM_NOREC, onGetOrderResepFromNorec);
}

export function* watchCreateOrUpdateVerifResep() {
    yield takeEvery(CREATE_OR_UPDATE_VERIF_RESEP, onCreateOrUpdateVerifResep);
}

function* emrSaga() {
    yield all([
        fork(watchGetOrderResepQuery),
        fork(watchGetOrderResepFromNorec),
        fork(watchCreateOrUpdateVerifResep)
    ]);
}

export default emrSaga;
