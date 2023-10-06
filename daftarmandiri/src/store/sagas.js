import { all, fork } from "redux-saga/effects";


import LoginSaga from "./userpasien/saga";
import MasterSaga from "./master/saga";
import HomeSaga from "./home/saga"
import DaftarPasienLama from "./daftarpasienlama/saga"

export default function* rootSaga() {
  yield all([
    fork(LoginSaga),
    fork(MasterSaga),
    fork(HomeSaga),
    fork(DaftarPasienLama),
  ]);
}
