import { all, fork } from "redux-saga/effects";


import userPegawaiSaga from "./userpegawai/userpegawaiSaga";
import authSaga from "frontendjs/src/store/auth/login/saga";

export default function* rootSaga() {
  yield all([
    fork(userPegawaiSaga),
    fork(authSaga)
  ]);
}
