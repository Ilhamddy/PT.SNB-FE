import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceFarmasi {

    getOrderResepQuery = async (queries) => {
        return await api.get(`/transaksi/farmasi/get-order-resep-query`, queries);
    }
    
}
