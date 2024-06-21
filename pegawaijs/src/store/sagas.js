import { all, fork } from "redux-saga/effects";


import absenSaga from "./absen/absenSaga";
import authSaga from "frontendjs/src/store/auth/login/saga";

export default function* rootSaga() {
  yield all([
    fork(absenSaga),
    fork(authSaga)
  ]);
}
