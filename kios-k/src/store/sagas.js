import { all, fork } from "redux-saga/effects";

import kioskSaga from "./kiosk/saga";

export default function* rootSaga() {
    yield all([
        fork(kioskSaga)
    ])
}