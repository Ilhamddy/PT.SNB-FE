import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceLaboratorium {
    getWidgetDetailJenisProdukLab = async (param) => {
        return await api.get(`/transaksi/laboratorium/list-detail-jenis-produklab?nama=${param}`);
    }

    saveOrderPelayanan = async (params) => {
        return await api.create("/transaksi/laboratorium/save-order-pelayanan", params);
    }

    getDaftarOrderLaboratorium = async (param) => {
        return await api.get(`/transaksi/laboratorium/getlist-histori-order?norecdp=${param}`);
    }
}