import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceFarmasi {

    getOrderResepQuery = async (queries) => {
        return await api.get(`/transaksi/farmasi/get-order-resep-query`, queries);
    }
    
    getOrderResepFromNorec = async (queries) => {
        return await api.get(`/transaksi/farmasi/get-order-resep-from-norec`, queries);
    }

    createOrUpdateVerifResep = async (body) => {
        return await api.create(`/transaksi/farmasi/create-or-update-verif-resep`, body);
    }

    createOrUpdatePenjualanBebas = async (body) => {
        return await api.create(`/transaksi/farmasi/create-or-update-penjualan-bebas`, body);
    }

    getPasienFromNoCm = async (queries) => {
        return await api.get(`/transaksi/farmasi/get-pasien-from-nocm`, queries);
    }

    getAllVerifResep = async (queries) => {
        return await api.get(`/transaksi/farmasi/get-verif-resep`, queries);
    }

    createOrUpdateRetur = async (body) => {
        return await api.create(`/transaksi/farmasi/create-or-update-retur`, body);
    }

    getAntreanFromDp = async (queries) => {
        return await api.get(`/transaksi/farmasi/get-antrean-from-dp`, queries);
    }

    createOrUpdateOrderPlusVerif = async (body) => {
        return await api.create(`/transaksi/farmasi/create-or-update-order-plus-verif`, body);
    }

    createAntreanFarmasi = async (body) => {
        return await api.create(`/transaksi/farmasi/create-antrean-farmasi`, body)
    }
}
