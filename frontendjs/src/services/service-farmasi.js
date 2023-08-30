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
}
