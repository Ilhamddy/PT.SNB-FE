import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceEmr {
    getHeaderEmr = async (param) => {
        return await api.get(`/transaksi/emr/emr-header?norecta=${param}`);
    }

    saveTTV = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-ttv", params);
    }

    getTtvList = async (param) => {
        return await api.get(`/transaksi/emr/getList-ttv?norecdp=${param}`);
    }

    editTTV = async (params) => {
        return await api.create("/transaksi/emr/edit-emr-pasien-ttv", params);
    }

    saveCPPT = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-cppt", params);
    }

    editCPPT = async (params) => {
        return await api.create("/transaksi/emr/edit-emr-pasien-cppt", params);
    }

    getCpptList = async (param) => {
        return await api.get(`/transaksi/emr/getList-cppt?norecdp=${param}`);
    }

    getComboEmr = async (param) => {
        return await api.get(`/transaksi/emr/getList-diagnosa-combo`);
    }

    getDiagnosa10 = async (param) => {
        return await api.get(`/transaksi/emr/getList-diagnosa-sepuluh?namadiagnosa=${param}`);
    }

    getDiagnosa9 = async (param) => {
        return await api.get(`/transaksi/emr/getList-diagnosa-sembilan?namadiagnosa=${param}`);
    }

    saveDiagnosa = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-diagnosa", params);
    }

    getListDiagnosa10 = async (param) => {
        return await api.get(`/transaksi/emr/getList-diagnosax-pasien?norecdp=${param}`);
    }
    
    saveDiagnosaix = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-diagnosaix", params);
    }

    getListDiagnosa9 = async (param) => {
        return await api.get(`/transaksi/emr/getList-diagnosaix-pasien?norecdp=${param}`);
    }

    deleteDiagnosax = async (params) => {
        return await api.delete(`/transaksi/emr/delete-emr-pasien-diagnosax/${params}`);
    }

    deleteDiagnosaix = async (params) => {
        return await api.delete(`/transaksi/emr/delete-emr-pasien-diagnosaix/${params}`);
    }

    saveKonsul = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-konsul", params);
    }

    updateTaskId = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-updatetaskid", params);
    }

    updateStatusPulangRJ = async (params) => {
        return await api.create("/transaksi/emr/save-emr-pasien-updatestatuspulangrj", params);
    }

    getComboHistoryUnit = async (param) => {
        return await api.get(`/transaksi/tindakan/list-antreanpemeriksaan/${param}`);
    }
    getComboTindakan = async (param) => {
        return await api.get(`/transaksi/tindakan/list-produk-tokelas-tounit?objectkelasfk=${param}`);
    }

    getComboJenisPelaksana = async (param) => {
        return await api.get(`/transaksi/tindakan/list-jenis-pelaksana${param}`);
    }

    getComboNamaPelaksana = async (param) => {
        return await api.get(`/transaksi/tindakan/list-nama-pelaksana${param}`);
    }

    saveTindakan = async (params) => {
        return await api.create("/transaksi/tindakan/save-tindakan-pasien", params);
    }

    getListTagihan = async (param) => {
        return await api.get(`/transaksi/tindakan/list-tagihan?norecdp=${param}`);
    }
}