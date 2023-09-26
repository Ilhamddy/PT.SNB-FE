import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { 
    getAllMasterSuccess,
    getAllMasterError
} from "./action";
import * as uuid from 'uuid'

import {
    GET_ALL_MASTER,

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

export default function* watchMasterSaga() {
    yield takeEvery(GET_ALL_MASTER, onGetAllMaster);
}