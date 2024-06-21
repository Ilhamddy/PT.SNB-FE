import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN, TEST_ENCRYPTION } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess, setActivationKey, testEncryption, testEncryptionError, testEncryptionSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  testEncryptionApi,
} from "../../../helpers/fakebackend_helper";
import { ToastContainer, toast } from 'react-toastify'


import {setAuthorization} from "../../../helpers/api_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    console.log("masuk")
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
      if (response) {
        yield put(loginSuccess(response));
        history('/dashboard')
      } else {
        yield put(apiError(response));
      }
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      if (response) {
        yield put(loginSuccess(response));
        history('/dashboard')
      } else {
        yield put(apiError(response));
      }
    } else if (process.env.REACT_APP_API_URL) {
      const response = yield call(postFakeLogin, {
        username: user.first_name,
        password: user.password,
      });
      if (response.status === "success") {
        yield put(loginSuccess(response));
        history('/dashboard')
        localStorage.setItem("authUser", JSON.stringify(response));
        setAuthorization(JSON.parse(localStorage.getItem("authUser"))?.accessToken || null);
      } else {
        yield put(apiError(response));
      }
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    localStorage.removeItem("authUser");
    // localStorage.removeItem("authUserModul");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(LOGOUT_USER, response));
    } else {
      yield put(logoutUserSuccess(LOGOUT_USER, true));
    }
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      );
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history('/dashboard')
  } catch (error) {
    yield put(apiError(error));
  }
}

function* onTestEncryption({ payload: { data, callback } }) {
  try {
    const response = yield call(testEncryptionApi, data);
    yield put(testEncryptionSuccess(response.data))
    yield put(setActivationKey(data.activationKey))
    localStorage.setItem('activationKey', data.activationKey)
    callback && callback()
  } catch (error) {
    localStorage.removeItem('activationKey');
    yield put(testEncryptionError(error));
    toast.error(error.response?.data?.msg || "Error")
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(TEST_ENCRYPTION, onTestEncryption)
}

export default authSaga;
