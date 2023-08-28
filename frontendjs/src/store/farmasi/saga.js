import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceFarmasi from "../../services/service-farmasi";

import {
    getOrderResepQuerySuccess,
    getOrderResepQueryError,
} from "./action";

import {
    GET_ORDER_RESEP_QUERY
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

export function* watchGetOrderResepQuery() {
    yield takeEvery(GET_ORDER_RESEP_QUERY, onGetOrderResepQuery);
}


function* emrSaga() {
    yield all([
        fork(watchGetOrderResepQuery),
    ]);
}

export default emrSaga;
