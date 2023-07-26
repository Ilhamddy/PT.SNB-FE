import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceGudang {
    saveObatGudang = async (body) => {
        return await api.create(`/transaksi/gudang/tambah-produk`, body);
    }

    getLainLain = async () => {
        return await api.get(`/transaksi/gudang/get-lain-lain`);
    }

}
