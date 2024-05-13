import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceGigi {
    
    getAllGigi = async (queries) => {
        return await api.get(`/transaksi/gigi/get-all-gigi`, queries);
    }

    getAllLegendGigi = async (queries) => {
        return await api.get(`/transaksi/gigi/get-all-legend-gigi`, queries)
    }

    upsertOdontogram = async (body) => {
        return await api.create(`/transaksi/gigi/odontogram`, body)
    }

    getOdontogram = async (queries) => {
        return await api.get(`/transaksi/gigi/odontogram`, queries)
    }

    getComboOdontogram = async (queries) => {
        return await api.get(`/transaksi/gigi/combo/odontogram`, queries)
    }
}
