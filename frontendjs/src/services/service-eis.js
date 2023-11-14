import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceEis{
    getPasienRJ = async (queries) => {
        return await api.get(`/transaksi/eis/get-pasien-rj`, queries)
    }

    getPasienIGD = async (queries) => {
        return await api.get(`/transaksi/eis/get-pasien-igd`, queries)
    }

    getPasienRanap = async (queries) => {
        return await api.get(`/transaksi/eis/get-pasien-ranap`, queries)
    }
    
    getCountCaraBayar = async (queries) => {
        return await api.get(`/transaksi/eis/get-count-cara-bayar`, queries)
    }

    getPoliklinikTerbanyak = async (queries) => {
        return await api.get(`/transaksi/eis/get-poliklinik-terbanyak`, queries)
    }

    getCountUnit = async (queries) => {
        return await api.get(`/transaksi/eis/get-count-unit`, queries)
    }

    getStatusPegawai = async (queries) => {
        return await api.get(`/transaksi/eis/get-status-pegawai`, queries)
    }

    getPegawaiPensiun = async (queries) => {
        return await api.get(`/transaksi/eis/get-pegawai-pensiun`, queries)
    }

    getDasborFarmasi = async (queries) => {
        return await api.get(`/transaksi/eis/get-dasbor-farmasi`, queries)
    }
}