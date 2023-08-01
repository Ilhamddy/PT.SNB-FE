import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceGudang {
    saveObatGudang = async (body) => {
        return await api.create(`/transaksi/gudang/tambah-or-edit-produk`, body);
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

    getProdukKonversi = async (queries) => {
        return await api.get(`/transaksi/gudang/get-produk-konversi`, queries)
    }

    getKemasanKonversi = async (queries) => {
        return await api.get(`/transaksi/gudang/get-kemasan-konversi`, queries)
    }

    saveOrEditKemasan = async (body) => {
        return await api.create(`/transaksi/gudang/create-or-update-kemasan`, body)
    }

    getProdukMaster = async (queries) => {
        return await api.get(`/transaksi/gudang/get-produk`, queries)
    }

    getProdukEdit = async (queries) => {
        return await api.get(`/transaksi/gudang/get-produk-edit`, queries)
    }
}
