import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceEmr {
    getHeaderEmr = async (param) => {
        return await api.get(`/transaksi/emr/emr-header?norecta=${param}`);
    }

    saveTTV = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-ttv", params);
    }

    getTtvList = async (param) => {
        return await api.get(`/transaksi/emr/getList-ttv?norecdp=${param}`);
    }

    editTTV = async (params) => {
        return await api.create("/transaksi/emr/edit-emr-pasien-ttv", params);
    }

    saveCPPT = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-cppt", params);
    }

    editCPPT = async (params) => {
        return await api.create("/transaksi/emr/edit-emr-pasien-cppt", params);
    }

    getCpptList = async (param) => {
        return await api.get(`/transaksi/emr/getList-cppt?norecdp=${param}`);
    }
}