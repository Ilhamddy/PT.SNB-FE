import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import ServiceGigi from "../../services/service-gigi";
import { getAllGigi, getAllGigiError, getAllGigiSuccess } from "./odontogramSlice";

const serviceGigi = new ServiceGigi()

function* onGetAllGigi({payload: {queries}}) {
    try{
        const response = yield call(serviceGigi.getAllGigi, queries);
        yield put(getAllGigiSuccess(response.data));
    } catch (error) {
        yield put(getAllGigiError(error));
    }
}

export function* watchOnGetAllGigi() {
    yield takeEvery(getAllGigi.type, onGetAllGigi);
}


function* odontogramSaga(){
    yield all([
        fork(watchOnGetAllGigi)
    ])
}
export default odontogramSaga