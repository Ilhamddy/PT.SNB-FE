import axios from "axios";
import { api } from "../config";
import { CANCEL } from 'redux-saga'
import { decryptSimrs, encryptSimrs } from "../utils/encrypt";
import { ToastContainer, toast } from 'react-toastify'


const initConfigHT = {
  isActivation: true,
  newActivation: null,
}
// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const token = JSON.parse(localStorage.getItem("authUser")) ? JSON.parse(localStorage.getItem("authUser"))?.accessToken : null;
if (token)
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    let message
    let activationCode = localStorage.getItem('activationKey')
    switch (error.response?.status) {
        case 500:
            message = 'Internal Server Error'
            break
        case 401:
            if (
                error?.response?.data?.data === 'ERROR_DECRYPT' ||
                error?.response?.data?.data === 'ERROR_ENCRYPT'
            ) {
                toast.error(error.response?.data?.msg || 'Error')
                localStorage.removeItem('activationKey')
            }
            setTimeout(() => {
                window.location = '/logout'
            }, 3000)
            message = 'Invalid credentials'
            break
        case 404:
            message =
                'Sorry! the data you are looking for could not be found'
            break
        case 403:
            setTimeout(() => {
                window.location = '/logout'
            }, 3000)
            message =
                'Sorry! the data you are looking for could not be found'
            break
        default:
            message = error.message || error
    }
    let newResponseresponse = error?.response?.data
    if (newResponseresponse?._isencrypt) {
        newResponseresponse = decryptSimrs(
            newResponseresponse?._dataencrypt,
            activationCode
        )
    }
    error.response.data = newResponseresponse
    error.message = message
    return Promise.reject(error)
}
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  get = async (url, queries, axiosConfig, configHT = { ...initConfigHT }) => {
    let response
    let paramKeys = []
    let activationCode = localStorage.getItem('activationKey')
    if (!activationCode && configHT.isActivation)
        throw new Error('Kode aktivasi tidak ada')

    if (queries && Object.keys(queries).length > 0) {
        Object.keys(queries).map((key) => {
            if (queries[key] !== undefined)
                paramKeys.push(key + '=' + queries[key])
            return paramKeys
        })

        const queryString =
            paramKeys && paramKeys.length ? paramKeys.join('&') : ''
        response = await axios.get(`${url}?${queryString}`, {
            headers: {
                'X-Client-Url': window.location.href,
                ...(axiosConfig?.headers || {}),
            },
            ...(axiosConfig || {}),
        })
    } else {
        response = await axios.get(`${url}`, {
            headers: {
                'X-Client-Url': window.location.href,
                ...(axiosConfig?.headers || {}),
            },
            ...(axiosConfig || {}),
        })
    }
    if (response?._isencrypt) {
        response = decryptSimrs(response._dataencrypt, activationCode)
    }

    return response
  };
  /**
   *
   * @param {string} url
   * @param {*} data
   * @param {import("axios").AxiosRequestConfig} axiosConfig
   * @param {*} configHT
   * @returns
   */
  create = async (url, data, axiosConfig, configHT = { ...initConfigHT }) => {
    let activationCode = configHT.newActivation
      ? configHT.newActivation
      : localStorage.getItem('activationKey')
    if (!activationCode) throw new Error('Kode aktivasi tidak ada')
    let newData = data || { datadummy: 'datadummy' }
    if (
        typeof newData === 'object' &&
        newData !== null &&
        Object.keys(newData) === 0
    ) {
        newData = { datadummy: 'datadummy' }
    }
    const dataEnc = encryptSimrs(newData, activationCode)
    let response = await axios.post(url, dataEnc, {
        headers: {
            'X-Client-Url': window.location.href,
            ...(axiosConfig?.headers || {}),
        },
        ...(axiosConfig || {}),
    })
    if (response?._isencrypt) {
        response = decryptSimrs(response._dataencrypt, activationCode)
    }
    return response
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  put = (url, data) => {
    return axios.put(url, data);
  };
  delete = async (url, params, config) => {
    // remove trailing slash
    let newUrl = url.replace(/\/$/, '')
    let activationCode = localStorage.getItem('activationKey')
    if (params) {
      params.forEach(() => {
        newUrl += '/' + params
      })
    }
    let response = await axios.delete(newUrl, { ...config })
    if (response?._isencrypt) {
      response = decryptSimrs(response._dataencrypt, activationCode)
    }
    return response
  };
}
const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };