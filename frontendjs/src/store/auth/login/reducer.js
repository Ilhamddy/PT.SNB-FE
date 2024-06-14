import { getLoggedinUser } from "../../../helpers/api_helper";
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  RESET_LOGIN_FLAG,
  SET_ACTIVATION_KEY,
  TEST_ENCRYPTION,
  TEST_ENCRYPTION_SUCCESS,
  TEST_ENCRYPTION_ERROR
} from "./actionTypes";

const initialState = {
  errorMsg: "",
  user: getLoggedinUser(),
  loading: false,
  error: false,
  activationKey: null
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        loading: false,
        error: false,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, isUserLogout: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, user: null, isUserLogout: true };
      break;
    case API_ERROR:
      state = {
        ...state,
        errorMsg: action.payload.data,
        loading: true,
        error: true,
        isUserLogout: false,
      };
      break;
    case RESET_LOGIN_FLAG:
      state = {
        ...state,
        errorMsg: null,
        loading: false,
        error: false,
      };
      break;
    case SET_ACTIVATION_KEY:
      state = {
        ...state,
        activationKey: action.payload.activationKey
      }
      break;
    case TEST_ENCRYPTION:
      state = {
        ...state,
        testEncryption: {
          ...state.testEncryption,
          data: null,
          loading: true,
          error: null
        }
      }
      break;
    case TEST_ENCRYPTION_SUCCESS:
      state = {
        ...state,
        testEncryption: {
          ...state.testEncryption,
          data: action.payload.data,
          loading: false
        }
      }
      break
    case TEST_ENCRYPTION_ERROR:
      state = {
        ...state,
        testEncryption: {
          ...state.testEncryption,
          loading: false,
          error: action.payload
        }
      }
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
