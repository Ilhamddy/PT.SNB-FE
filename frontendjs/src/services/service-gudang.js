import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceGudang {
    saveObatGudang = async (body) => {
        return await api.create(`/transaksi/gudang/tambah-produk`, body);
    }

    getLainLain = async () => {
        return await api.get(`/transaksi/gudang/get-lain-lain`);
    }

    saveOrEditDetailProduk = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-detail-produk`, body)
    }

    saveOrEditSediaan = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-sediaan`, body)
    }

    saveOrEditSatuan = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-satuan`, body)
    }

    getKonversi = async () => {
        return await api.get(`/transaksi/gudang/get-konversi`, {search: "mencoba"})
    }

}
