import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceKiosk from "../../services/services-kiosk";

import {
    GET_COMBO_KIOSK,
    GET_CARI_PASIEN_KIOSK
} from "./actionType";

import {
    getComboKioskSuccess, getComboKioskError,
    getCariPasienKioskSuccess, getCariPasienKioskError
} from "./action";

const serviceKiosk = new ServiceKiosk();

function* ongetComboKiosk({ payload: { queries } }) {
    try {
        const response = yield call(serviceKiosk.getComboKiosk, queries);
        yield put(getComboKioskSuccess(response.data));
    } catch (error) {
        yield put(getComboKioskError(error));
    }
}

export function* watchongetComboKiosk() {
    yield takeEvery(GET_COMBO_KIOSK, ongetComboKiosk);
}

function* ongetCariPasienKiosk({ payload: { queries } }) {
    try {
        const response = yield call(serviceKiosk.getCariPasienKiosk, queries);
        yield put(getCariPasienKioskSuccess(response.data));
    } catch (error) {
        yield put(getCariPasienKioskError(error));
    }
}

export function* watchongetCariPasienKiosk() {
    yield takeEvery(GET_CARI_PASIEN_KIOSK, ongetCariPasienKiosk);
}


function* kioskSaga() {
    yield all([
        fork(watchongetComboKiosk),
        fork(watchongetCariPasienKiosk)
    ]);
}

export default kioskSaga;