import dotenv from "dotenv"
import axios from "axios";


dotenv.config();

const initConfigHT = {}

export const apiBE = {
    API_FR_URL: process.env.APP_FR_URL,
}


class ApiFR {
    api = axios.create({
        baseURL: apiBE.API_FR_URL
    })
    get = async (url, queries, axiosConfig, htConfig = { ...initConfigHT }) => {
        let response
        let paramKeys = []
        if (queries && Object.keys(queries).length > 0) {
            Object.keys(queries).map((key) => {
                if (queries[key] !== undefined)
                    paramKeys.push(key + '=' + queries[key])
                return paramKeys
            })
    
            const queryString =
                paramKeys && paramKeys.length ? paramKeys.join('&') : ''
            response = await this.api.get(`${url}?${queryString}`, {
                headers: {
                    ...(axiosConfig?.headers || {}),
                },
                ...(axiosConfig || {}),
            })
        } else {
            response = await this.api.get(`${url}`, {
                headers: {
                    ...(axiosConfig?.headers || {}),
                },
                ...(axiosConfig || {}),
            })
        }
        return response
    };
      /**
       *
       * @param {string} url
       * @param {*} data
       * @param {import("axios").AxiosRequestConfig} axiosConfig
       * @param {typeof initConfigHT} htConfig
       * @returns
       */
    post = async (url, data, axiosConfig, htConfig = { ...initConfigHT }) => {
        let response = await this.api.post(url, data, {
            headers: {
                ...(axiosConfig?.headers || {}),
            },
            ...(axiosConfig || {}),
        })
        return response
    };
    /**
     * Updates data
     */
    patch = (url, data) => {
        return this.api.patch(url, data);
    };

    put = (url, data) => {
        return this.api.put(url, data);
    };
    delete = async (url, params, config) => {
        let newUrl = url.replace(/\/$/, '')
        if (params) {
            params.forEach(() => {
            newUrl += '/' + params
            })
        }
        let response = await this.api.delete(newUrl, { ...config })
        return response
    };
}

export const apiFR = new ApiFR()