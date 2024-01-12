import ServiceBPJS from "../../services/service-bpjs";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { getPesertaBPJS, getPesertaBPJSError, getPesertaBPJSSuccess } from "./bpjsSlice";


const serviceBPJS = new ServiceBPJS()

function* onGetPasienBPJS({payload: {queries}}) {
    try{
        const response = yield call(serviceBPJS.getPasienBPJS, queries);
        yield put(getPesertaBPJSSuccess(response.data));
    } catch (error) {
        yield put(getPesertaBPJSError(error));
    }
}


export function* watchGetPeserta() {
    yield takeEvery(getPesertaBPJS.type, onGetPasienBPJS);
}

function* bpjsSaga() {
    yield all([
        fork(watchGetPeserta),
    ]);
}

export default bpjsSaga;