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

    getListTagihanPrint = async (norecdp) => {
        return await api.get(`/transaksi/tindakan/list-tagihan-print`, {norecdp: norecdp});
    }

    getObatFromUnit = async (queries) => {
        return await api.get(`/transaksi/emr/get-obat-from-unit`, queries);
    }

    createOrUpdateResepOrder = async (data) => {
        return await api.create("/transaksi/emr/create-or-update-emr-resep-order", data);
    }

    getOrderResepFromDp = async (queries) => {
        return await api.get(`/transaksi/emr/get-order-resep-from-dp`, queries);
    }

    saveJenisPelayanan = async (params) => {
        return await api.create("/transaksi/emr/save-emr-jenis-pelayanan", params);
    }

    getHistoriJenisPelayanan = async (queries) => {
        return await api.get(`/transaksi/emr/get-histori-jenis-pelayanan`, queries);
    }

    saveEmerTriageIgd = async (params) => {
        return await api.create("/transaksi/emr/save-emr-triage-igd", params);
    }

    getComboTriageIgd = async (queries) => {
        return await api.get(`/transaksi/emr/get-combo-triage-igd`, queries);
    }

    getHistoriTriagiByNorec = async (queries) => {
        return await api.get(`/transaksi/emr/get-histori-triage-bynorec`, queries);
    }

    saveOrderOperasi = async (params) => {
        return await api.create("/transaksi/operasi/save-order-operasi", params);
    }

    getHistoriOrderOperasi = async (queries) => {
        return await api.get(`/transaksi/operasi/get-histori-order-operasi`, queries);
    }

    savePelayananPasienTemp = async (params) => {
        return await api.create("/transaksi/tindakan/save-pelayanan-pasien-temp", params);
    }

    getListPelayananPasienTemp = async (queries) => {
        return await api.get(`/transaksi/tindakan/list-pelayanan-pasien-temp`, queries);
    }

    deletePelayananPasienTemp = async (params) => {
        return await api.create("/transaksi/tindakan/delete-pelayanan-pasien-temp", params);
    }

    getWidgetEfisiensiKlaim = async (queries) => {
        return await api.get(`/transaksi/tindakan/widget-efisiensi-klaim`, queries);
    }

    updateEstimasiKlaim = async (params) => {
        return await api.create("/transaksi/tindakan/update-estimasi-klaim", params);
    }

    comboAllTindakan = async (queries) => {
        return await api.get(`/transaksi/tindakan/all-list-produk`, queries);
    }
    saveEmrPasien = async (body) => {
        return await api.create("/transaksi/emr/upsert-assesmen-bayi-lahir", body)
    }
}