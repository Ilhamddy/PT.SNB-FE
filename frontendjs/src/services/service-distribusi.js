import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceDistribusi{
    getStokBatch = async (queries) => {
        return await api.get(`/transaksi/gudang/distribusi/get-stok-batch`, queries)
    }

    createOrUpdateOrderbarang = async (body) => {
        return await api.create(`/transaksi/gudang/distribusi/create-or-update-order-barang`, body)
    }

    getOrderBarang = async (queries) => {
        return await api.get(`/transaksi/gudang/distribusi/get-order-barang`, queries)
    }

    getOrderStokBatch = async (queries) => {
        return await api.get(`/transaksi/gudang/distribusi/get-order-stok-batch`, queries)
    }

    createOrUpdateKirimBarang = async (body) => {
        return await api.create(`/transaksi/gudang/distribusi/create-or-update-kirim-barang`, body)
    }
    
    verifyKirim = async (data) => {
        return await api.create(`/transaksi/gudang/distribusi/verify-kirim`, data)
    }

    tolakOrder = async (data) => {
        return await api.create(`/transaksi/gudang/distribusi/tolak-order`, data)
    }

    tolakKirim = async (data) => {
        return await api.create(`/transaksi/gudang/distribusi/tolak-kirim`, data)
    }
}