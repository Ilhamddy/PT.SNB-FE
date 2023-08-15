import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceDistribusi{
    getStokBatch = async (queries) => {
        return await api.get(`/transaksi/gudang/distribusi/get-stok-batch`, queries)
    }
}