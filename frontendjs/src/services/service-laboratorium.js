import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceLaboratorium {
    getWidgetDetailJenisProdukLab = async (param) => {
        return await api.get(`/transaksi/laboratorium/list-detail-jenis-produklab?nama=${param}`);
    }

    saveOrderPelayanan = async (params) => {
        return await api.create("/transaksi/laboratorium/save-order-pelayanan", params);
    }

    getDaftarOrderLaboratorium = async (param) => {
        return await api.get(`/transaksi/laboratorium/getlist-histori-order?norecdp=${param}`);
    }

    getWidgetDaftarOrderLaboratorium = async (param) => {
        return await api.get(`/transaksi/laboratorium/widget-daftar-order-laboratorium?noregistrasi=${param}`);
    }

    getListDaftarOrderLaboratorium = async (param) => {
        return await api.get(`/transaksi/laboratorium/list-daftar-order-laboratorium?noregistrasi=${param}`);
    }

    getListOrderLaboratoriumByNorec = async (param) => {
        return await api.get(`/transaksi/laboratorium/list-order-by-norecorder?norec=${param}`);
    }

    updateTglRencanaLaboratorium = async (params) => {
        return await api.put("/transaksi/laboratorium/update-tglrencana-laboratorium", params);
    }

    saveVerifikasiLaboratoriumUser = async (params) => {
        return await api.put("/transaksi/laboratorium/save-verifikasi-laboratorium", params);
    }
    
    getListDaftarPasienLaboratorium = async (param) => {
        return await api.get(`/transaksi/laboratorium/list-daftar-pasien-laboratorium?noregistrasi=${param}`);
    }

    getListTransaksiPelayananLaboratorium = async (param) => {
        return await api.get(`/transaksi/laboratorium/list-transaksi-pelayanan-laboratorium?norecdp=${param}`);
    }

    getMasterPelayananLaboratorium = async (param) => {
        return await api.get(`/transaksi/laboratorium/master-layanan-laboratorium?param=${param}`);
    }

    getcomboLaboratorium = async (param) => {
        return await api.get(`/transaksi/laboratorium/combo-laboratorium`);
    }
}