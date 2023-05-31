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
}