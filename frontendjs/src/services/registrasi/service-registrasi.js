import { APIClient } from "../../helpers/api_helper";

const api = new APIClient();

export default class ServiceRegistrasi {
    baseUrl = "/transaksi/registrasi"
    getAllPasien = async () => {
        return await api.get(this.baseUrl + "/daftar-pasien-lama");
    }
    
    getAllPasienByOr = async (queries) => {
        return await api.get(this.baseUrl + `/daftar-pasien-lama-or`, queries);
    }

    getPasien = async (id) => {
        return await api.get(this.baseUrl + `/pasien/${id}`);
    }

    getRegistrasiPasienNorec = async (norec) => {
        return await api.get(this.baseUrl + `/daftar-pasien-ruangan/${norec}`);
    }
    
    createPasienBaru = async (params) => {
        return await api.create(this.baseUrl + "/pasien-baru", params);
    }

    updatePasien = async (params) => {
        return await api.put(this.baseUrl + "/update-pasien", params);
    }

    saveRegistrasiDaftarPasien = async (params) => {
        return await api.create(this.baseUrl + "/save-daftar-pasien", params);
    }

    getPasienByNoregistrasi = async (noregistrasi) => {
        return await api.get(this.baseUrl + `/pasien-noregistrasi/${noregistrasi}`);
    }

    getDaftarPasienRJ = async (param) => {
        return await api.get(this.baseUrl + `/daftar-pasien-rawat-jalan?&noregistrasi=${param}`);
    }

    getWidgetDaftarPasienRJ = async (param) => {
        return await api.get(this.baseUrl + `/widget-daftar-pasien-registrasi-rj?&noregistrasi=${param}`);
    }

    getWidgetDaftarPasienRI = async (param) => {
        return await api.get(this.baseUrl + `/widget-daftar-pasien-registrasi-inap?&noregistrasi=${param}`);
    }

    getDaftarPasienRI = async (param) => {
        return await api.get(this.baseUrl + `/daftar-pasien-rawat-inap?&noregistrasi=${param}`);
    }

    getListBPJS = async (nobpjs) => {
        return await api.get(`/transaksi/bridging/bpjs/monitoring/HistoriPelayanan/NoKartu/${nobpjs}`);
    }

    saveRegistrasiPenjaminFK = async (params) => {
        return await api.create(this.baseUrl + "/save-penjamin-fk", params);
    }

    getDaftarPasienPulang = async ([dateStart, dateEnd, instalasi, unit, search]) => {
        return await api.get(this.baseUrl + `/list-daftar-pasien-ruangan?` 
            + (dateStart ? `dateStart=${dateStart}&` : ``)
            + (dateEnd ? `dateEnd=${dateEnd}&` : ``)
            + (instalasi ? `instalasi=${instalasi}&` : ``)
            + (unit ? `&unit=${unit}&` : ``)
            + (search ? `&search=${search}` : ``)
        );
    }

    saveDaftarPasienPulang = async (data) => {
        return await api.create(this.baseUrl + `/update-registrasi-pulang`, data)
    }

    getListFaskes = async ([qfaskes, faskesType]) => {
        return await api.get(`transaksi/bridging/bpjs/faskes?`
            + (qfaskes ? `&qfaskes=${qfaskes}` : ``)
            + (faskesType ? `&faskesType=${faskesType}` : ``)
        );
    }

    getDaftarPasienNorec = async (norec) => {
        return await api.get(this.baseUrl + `/daftar-pasien-ruangan/${norec}`);
    }

    getAntreanByNorec = async (norec) => {
        return await api.get(this.baseUrl + `/no-antrean/${norec}`);
    }

    getDaftarPasienRegistrasi = async (param) => {
        return await api.get(this.baseUrl + `/daftar-pasien-registrasi`, param);
    }

    getWidgetDaftarPasienRegistrasi = async (param) => {
        return await api.get(this.baseUrl + `/widget-daftar-pasien-registrasi`);
    }

    getPasienFormById = async (queries) => {
        return await api.get(this.baseUrl + `/get-pasien-form`, queries);
    }

    saveBatalRegistrasi = async (data) => {
        return await api.create(this.baseUrl + `/save-batal-registrasi`, data)
    }

    getListPasienMutasi = async (param) => {
        return await api.get(this.baseUrl + `/get-list-pasien-mutasi?&search=${param}`);
    }

    saveRegistrasiMutasi = async (data) => {
        return await api.create(this.baseUrl + `/save-registrasi-mutasi`, data)
    }

    getDaftarPasienFarmasi = async (param) => {
        return await api.get(this.baseUrl + `/get-daftar-pasien-farmasi`)
    }

    getDaftarPasienIGD = async (param) => {
        return await api.get(this.baseUrl + `/daftar-pasien-rawat-darurat`, param);
    }

    getwidgetDaftarPasienTriage = async (param) => {
        return await api.get(this.baseUrl + `/widget-pasien-triage`, param);
    }

    getDaftarPasienTriage = async (param) => {
        return await api.get(this.baseUrl + `/daftar-pasien-triage`, param);
    }

    getComboVerifikasiOnline = async () => {
        return await api.get(this.baseUrl + `/get-combo-verifikasi-online`)
    }

    getDaftarPasienOnline = async (queries) => {
        return await api.get(this.baseUrl + `/daftar-pasien-online`, queries)
    }
    getHistoryRegistrasi = async (queries) => {
        return await api.get(this.baseUrl + `/get-history-registrasi`, queries);
    }
    saveMergeNoRegistrasi = async (data) => {
        return await api.create(this.baseUrl + `/save-merge-noregistrasi`, data)
    }
    getNoRegistrasiPasien = async (queries) => {
        return await api.get(this.baseUrl + `/get-no-registrasi-pasien`, queries)
    }
    createPasienBaruBayi = async (params) => {
        return await api.create(this.baseUrl + "/pasien-baru-bayi", params);
    }
    
    updateNoRM = async (data) => {
        return await api.create(this.baseUrl + "/update-no-rm", data)
    }

    getComboPenunjangModal = async (queries) => {
        return await api.get(this.baseUrl + "/combo-penunjang-modal", queries)
    }
}