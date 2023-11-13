import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceRekammedis {

    getDaftarDokumenRekammedis = async (param) => {
        return await api.get(`/transaksi/rekammedis/list-daftar-dokumen-rekammedis?&noregistrasi=${param}`);
    }

    getWidgetDaftarDokumenRekammedis = async (param) => {
        return await api.get(`/transaksi/rekammedis/widget-list-daftar-dokumen-rekammedis?&noregistrasi=${param}`);
    }

    saveDokumenRekammedis = async (params) => {
        return await api.create("/transaksi/rekammedis/save-dokumen-rekammedis", params);
    }

    getComboLaporanRekammedis = async (param) => {
        return await api.get(`/transaksi/rekammedis/get-combo-laporan-rekammedis`);
    }

    getListPasienDaftar = async (param) => {
        return await api.get(`/transaksi/rekammedis/get-list-pasien-daftar?&search=${param}`);
    }

    getListPasienBatal = async (param) => {
        return await api.get(`/transaksi/rekammedis/get-list-pasien-batal?&search=${param}`);
    }

    getListPasienKunjungan = async (param) => {
        return await api.get(`/transaksi/rekammedis/get-list-pasien-kunjungan?&search=${param}`);
    }

    getLaporanRL3_1 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-3-1`, queries);
    }

    getLaporanRL3_2 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-3-2`, queries);
    }

    getDetailJenisProduk = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-detail-jenis-produk`, queries);
    }

    getLayananJenis = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-layanan-jenis`, queries);
    }

    createOrUpdateMapRL = async (data) => {
        return await api.create(`/transaksi/rekammedis/create-or-update-map-rl`, data);
    }

    getMasterRLFromInduk = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-master-rl-from-induk`, queries);
    }

    getLayananFromMasterRL = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-layanan-from-master-rl`, queries);
    }

    deleteMapRL = async (params) => {
        return await api.delete(`/transaksi/rekammedis/delete-map-rl`, params);
    }

    updatePrinted = async (body) => {
        return await api.create(`/transaksi/rekammedis/update-printed`, body);
    }

    getLaporanRl_3_3 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-3-3`, queries);
    }
    getLaporanRl_3_6 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-3-6`, queries);
    }
    getLaporanRl_3_14 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-3-14`, queries);
    }
    getLaporanRl_3_15 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-3-15`, queries);
    }
    getLaporanRl_3_11 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-3-11`, queries);
    }
    getLaporanRl_3_10 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-3-10`, queries);
    }
    getLaporanRl_5_1 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-5-1`, queries);
    }
    getLaporanRl_5_2 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-5-2`, queries);
    }
    getLaporanRl_5_3 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-5-3`, queries);
    }
    getLaporanRl_5_4 = async (queries) => {
        return await api.get(`/transaksi/rekammedis/get-laporan-rl-5-4`, queries);
    }
}