import { all, fork } from "redux-saga/effects";


import LoginSaga from "./login/saga";
import MasterSaga from "./master/saga";

export default function* rootSaga() {
  yield all([
    fork(LoginSaga),
    fork(MasterSaga)
  ]);
}
