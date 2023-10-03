import { all, fork } from "redux-saga/effects";


import LoginSaga from "./login/saga";
import MasterSaga from "./master/saga";
import HomeSaga from "./home/saga"
import DaftarPasienLama from "./daftarPasienLama/saga"

export default function* rootSaga() {
  yield all([
    fork(LoginSaga),
    fork(MasterSaga),
    fork(HomeSaga),
    fork(DaftarPasienLama),
  ]);
}
