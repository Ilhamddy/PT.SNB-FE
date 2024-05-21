import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceRadiologi {

    saveOrderPelayanan = async (params) => {
        return await api.create("/transaksi/radiologi/save-order-pelayanan", params);
    }

    getDaftarOrderRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/getlist-histori-order?norecdp=${param}`);
    }

    getWidgetDaftarOrderRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/widget-daftar-order-radiologi`, param);
    }

    getListDaftarOrderRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/list-daftar-order-radiologi`, param);
    }

    getListOrderByNorec = async (param) => {
        
        return await api.get(`/transaksi/radiologi/list-order-by-norecorder`, param);
    }

    getListKamarRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/list-kamar-radiologi`);
    }

    updateTglRencanaRadiologi = async (params) => {
        return await api.put("/transaksi/radiologi/update-tglrencana-radiologi", params);
    }

    saveVerifikasiRadiologiUser = async (params) => {
        return await api.put("/transaksi/radiologi/save-verifikasi-radiologi", params);
    }

    deleteOrderPelayananService = async (params) => {
        return await api.put("/transaksi/radiologi/delete-order-pelayanan", params);
    }

    deleteDetailOrderPelayananService = async (params) => {
        return await api.put("/transaksi/radiologi/delete-detail-order-pelayanan", params);
    }

    getListDaftarPasienRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/list-daftar-pasien-radiologi`, param);
    }

    getListTransaksiPelayananRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/list-transaksi-pelayanan-radiologi`);
    }

    getListComboRadiologi = async (param) => {
        return await api.get(`/transaksi/radiologi/list-combo-radiologi`);
    }

    saveHasilExpertise = async (params) => {
        return await api.create("/transaksi/radiologi/save-hasil-expertise", params);
    }
}