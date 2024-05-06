import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import ServiceGigi from "../../services/service-gigi";
import { 
    getAllGigi, 
    getAllGigiError, 
    getAllGigiSuccess,  
    getAllLegendGigi,
    getAllLegendGigiSuccess,
    getAllLegendGigiError
} from "./odontogramSlice";

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

function* onGetAllLegendGigi({payload: {queries}}) {
    try{
        const response = yield call(serviceGigi.getAllLegendGigi, queries);
        yield put(getAllLegendGigiSuccess(response.data));
    } catch (error) {
        yield put(getAllLegendGigiError(error));
    }
}

export function* watchOnGetAllLegendGigi() {
    yield takeEvery(getAllLegendGigi.type, onGetAllLegendGigi);
}



function* odontogramSaga(){
    yield all([
        fork(watchOnGetAllGigi),
        fork(watchOnGetAllLegendGigi)
    ])
}
export default odontogramSaga