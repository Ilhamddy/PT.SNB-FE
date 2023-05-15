import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceMaster from "../../services/service-master";
import { MASTER_GET,MASTER_GET_SUCCESS,MASTER_GET_ERROR } from "./actionType";
import { masterGetSuccess,masterGetError } from "./action";

const serviceMaster = new ServiceMaster();

function* onGetMaster() {
    try {
        const response = yield call(serviceMaster.getAllMaster);
        yield put(masterGetSuccess(response.data));
    } catch (error) {
        yield put(masterGetError(error));
    }
}

export function* watchGetMaster() {
    yield takeEvery(MASTER_GET, onGetMaster);
}

function* masterSaga() {
    yield all([
        fork(watchGetMaster)
    ]);
}

export default masterSaga;