import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    getAllMasterSuccess,
    getAllMasterError,
    getDesaKelurahanSuccess,
    getDesaKelurahanError
} from "./action";
import * as uuid from 'uuid'

import {
    GET_ALL_MASTER, 
    GET_DESA_KELURAHAN,

} from "./actionType";

import ServiceAuth from "../../service/service-auth";
import { toast } from "react-toastify";
import { setAuthorization } from "../../helpers/api_helper";
import ServiceMaster from "../../service/service-master";

const serviceMaster = new ServiceMaster();

function* onGetAllMaster({payload: {data}}) {
    try {
        const response = yield call(serviceMaster.getAllMaster, data);
        yield put(getAllMasterSuccess(response));
    } catch (error) {
        yield put(getAllMasterError(error));
    }
}

function* onGetDesaKelurahan({payload: {params}}) {
    try {
        console.log(params)
        const response = yield call(serviceMaster.getDesaKelurahan, params);
        yield put(getDesaKelurahanSuccess(response));
    } catch (error) {
        yield put(getDesaKelurahanError(error));
    }
}

export default function* watchMasterSaga() {
    yield takeEvery(GET_ALL_MASTER, onGetAllMaster);
    yield takeEvery(GET_DESA_KELURAHAN, onGetDesaKelurahan)
}