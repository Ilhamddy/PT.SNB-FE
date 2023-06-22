import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceRadiologi {

    saveOrderPelayanan = async (params) => {
        return await api.create("/transaksi/radiologi/save-order-pelayanan", params);
    }

    getDaftarOrderRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/getlist-histori-order?norecdp=${param}`);
    }
}