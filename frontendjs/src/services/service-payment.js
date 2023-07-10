import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServicePayment {

    getPelayananFromAntrean = async (norecap) => {
        return await api.get(`/transaksi/payment/pelayanan-from-antrean/${norecap}`);
    }

    createNotaVerif = async (body) => {
        return await api.create(`/transaksi/payment/create-nota-verif`, body);
    }

    getDaftarTagihanPasien = async (body) => {
        return await api.get(`/transaksi/payment/get-daftar-tagihan-pasien`);
    }

    getPelayananFromVerif = async (norecnota) => {
        return await api.get(`/transaksi/payment/pelayanan-from-verif/${norecnota}`);
    }
    
}