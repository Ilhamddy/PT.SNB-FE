import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Task Redux States
import {
    GET_REGISTRASI_LIST,
    ADD_NEW_REGISTRASI,
    DELETE_REGISTRASI,
    UPDATE_REGISTRASI,
} from "./actionType";
import {
    RegistrasiApiResponseSuccess, RegistrasiApiResponseError,
    addRegistrasiSuccess,
    addRegistrasiFail,
    updateRegistrasiSuccess,
    updateRegistrasiFail,
    deleteRegistrasiSuccess,
    deleteRegistrasiFail,
} from "./action";

//Include Both Helper File with needed methods
import {
    getRegistrasiList as getRegistrasiListApi,
    addNewRegistrasi,
    updateRegistrasi,
    deleteRegistrasi,
}
    from "../../helpers/fakebackend_helper";

function* getRegistrasiList() {
    try {
        const response = yield call(getRegistrasiListApi);
        yield put(RegistrasiApiResponseSuccess(GET_REGISTRASI_LIST, response.data));
    } catch (error) {
        yield put(RegistrasiApiResponseError(GET_REGISTRASI_LIST, error));
    }
}

function* onAddNewRegistrasi({ payload: registrasi }) {
    try {
        const response = yield call(addNewRegistrasi, registrasi);
        yield put(addRegistrasiSuccess(response));
        toast.success("Registrasi Added Successfully", { autoClose: 3000 });
    } catch (error) {
        yield put(addRegistrasiFail(error));
        toast.error("Registrasi Added Failed", { autoClose: 3000 });
    }
}

function* onDeleteRegistrasi({ payload: registrasi }) {
    try {
        const response = yield call(deleteRegistrasi, registrasi);
        yield put(deleteRegistrasiSuccess({ registrasi, ...response }));
        toast.success("Registrasi Delete Successfully", { autoClose: 3000 });
    } catch (error) {
        yield put(deleteRegistrasiFail(error));
        toast.error("Registrasi Delete Failed", { autoClose: 3000 });
    }
}

function* onUpdateRegistrasi({ payload: registrasi }) {
    try {
        const response = yield call(updateRegistrasi, registrasi);
        yield put(updateRegistrasiSuccess(response));
        toast.success("Registrasi Updated Successfully", { autoClose: 3000 });
    } catch (error) {
        yield put(updateRegistrasiFail(error));
        toast.error("Registrasi Updated Failed", { autoClose: 3000 });
    }
}

export function* watchGetRegistrasiList() {
    yield takeEvery(GET_REGISTRASI_LIST, getRegistrasiList);
}

export function* watchAddNewRegistrasi() {
    yield takeEvery(ADD_NEW_REGISTRASI, onAddNewRegistrasi);
}

export function* watchUpdateRegistrasi() {
    yield takeEvery(UPDATE_REGISTRASI, onUpdateRegistrasi);
}

export function* watchDeleteRegistrasi() {
    yield takeEvery(DELETE_REGISTRASI, onDeleteRegistrasi);
}

function* registrasiSaga() {
    yield all([
        fork(watchGetRegistrasiList),
        fork(watchAddNewRegistrasi),
        fork(watchUpdateRegistrasi),
        fork(watchDeleteRegistrasi)
    ]
    );
}

export default registrasiSaga;
