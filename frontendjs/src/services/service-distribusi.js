import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceDistribusi{
    getStokBatch = async (queries) => {
        return await api.get(`/transaksi/gudang/distribusi/get-stok-batch`, queries)
    }

    createOrUpdateOrderbarang = async (body) => {
        return await api.create(`/transaksi/gudang/distribusi/create-or-update-order-barang`, body)
    }
}