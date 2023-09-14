import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import ServiceKiosk from "../../services/services-kiosk";

import {
    GET_COMBO_KIOSK
} from "./actionType";

import { getComboKioskSuccess, getComboKioskError } from "./action";

const serviceKiosk = new ServiceKiosk();

function* ongetComboKiosk({ payload: { queries } }) {
    try {
        console.log('masukkkk')
        const response = yield call(serviceKiosk.getComboKiosk, queries);
        yield put(getComboKioskSuccess(response.data));
    } catch (error) {
        yield put(getComboKioskError(error));
    }
}

export function* watchongetComboKiosk() {
    yield takeEvery(GET_COMBO_KIOSK, ongetComboKiosk);
}


function* kioskSaga() {
    yield all([
        fork(watchongetComboKiosk),
       
    ]);
}

export default kioskSaga;