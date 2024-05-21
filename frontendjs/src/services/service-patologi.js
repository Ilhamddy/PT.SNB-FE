import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServicePatologi {
    upsertOrderPelayananPatologi = async (body) => {
        return await api.create(`/transaksi/patologi/order-pelayanan`, body);
    }

    getHistoriPatologi = async (queries) => {
        return await api.get(`/transaksi/patologi/histori`, queries)
    }

    getListOrderPatologi = async (queries) => {
        return await api.get(`/transaksi/patologi/order`, queries)
    }

    getIsiOrderPatologi = async (queries) => {
        return await api.get(`/transaksi/patologi/isi-order`, queries)
    }

    getWidgetOrderPatologi = async (queries) => {
        return await api.get(`/transaksi/patologi/widget-order`, queries)
    }
}