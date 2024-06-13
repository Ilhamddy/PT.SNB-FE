import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  RESET_LOGIN_FLAG,
  SET_ACTIVATION_KEY,
  TEST_ENCRYPTION,
  TEST_ENCRYPTION_SUCCESS
} from "./actionTypes";

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  };
};

export const resetLoginFlag = () => {
  return {
    type: RESET_LOGIN_FLAG,
  }
}

export const setActivationKey = (activationKey) => {
  return {
    type: SET_ACTIVATION_KEY,
    payload: {
      activationKey: activationKey
    }
  }
}

export const testEncryption = (data, callback) => {
  return {
    type: TEST_ENCRYPTION,
    payload: {
      data: data,
      callback: callback
    }
  }
}

export const testEncryptionSuccess = (data) => {
  return {
    type: TEST_ENCRYPTION_SUCCESS,
    payload: {
      data: data
    }
  }
}

export const testEncryptionError = (error) => {
  return {
    type: TEST_ENCRYPTION_SUCCESS,
    payload: error
  }
}