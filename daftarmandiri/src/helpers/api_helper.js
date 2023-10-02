import axios from "axios";
import { api } from "../config";
// import crypto from "crypto-browserify"
import { decrypt, encrypt } from "./encrypt";

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const token = JSON.parse(localStorage.getItem("authUserMandiri")) 
  ? JSON.parse(localStorage.getItem("authUserMandiri"))?.accessToken : null;
if (token)
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // console.log(error.response.status)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      case 403:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    error.message = message;
    return Promise.reject(error);
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
  get = async (url, queries, axiosConfig) => {
    let response;
    let paramKeys = [];

    if (queries && Object.keys(queries).length > 0) {
      Object.keys(queries).map(key => {
        paramKeys.push(key + '=' + (queries[key] || ''));
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      console.log(queryString)

      response = await axios.get(`${url}?${queryString}`, {
        headers: {
          "X-Client-Url": window.location.href,
          ...(axiosConfig?.headers || {})
        },
        ...(axiosConfig || {})
      });
    } else {
      response = await axios.get(`${url}`, {
        headers: {
          "X-Client-Url": window.location.href,
          ...(axiosConfig?.headers || {})
        },
        ...(axiosConfig || {})
      });
    }

    // dari backend
    if(response.isencrypt){
      response = decrypt(response.dataenc).data
    }

    return response;
  };


  /**
   * 
   * @param {*} url 
   * @param {*} data 
   * @param {boolean} encryptSend if true, and there are authentication, encrypt the data default to true
   * @param {*} axiosConfig 
   * @returns 
   */
  create = async (url, data, encryptSend = true, axiosConfig) => {
    let newData = data;
    if(encryptSend){
      newData = encrypt(data)
    }
    let response = await axios.post(url, data, {
      headers: {
        "X-Client-Url": window.location.href,
        ...(axiosConfig?.headers || {})
      },
      ...(axiosConfig || {})
    });
    

    if(response.isencrypt){
      response = decrypt(response.dataenc).data
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
  delete = (url, params, config) => {
    // remove trailing slash
    let newUrl = url.replace(/\/$/, "");
    if (params) {
      params.forEach(() => {
        newUrl += '/' + params
      })
    }
    return axios.delete(newUrl, { ...config });
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