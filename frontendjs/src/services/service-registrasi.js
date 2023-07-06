import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceRegistrasi {
    getAllPasien = async () => {
        return await api.get("/transaksi/registrasi/daftar-pasien-lama");
    }
    
    getAllPasienByOr = async (nocm) => {
        return await api.get(`/transaksi/registrasi/daftar-pasien-lama-or?&nocm=${nocm}`);
    }

    getPasien = async (id) => {
        return await api.get(`/transaksi/registrasi/pasien/${id}`);
    }

    getRegistrasiPasienNorec = async (norec) => {
        return await api.get(`/transaksi/registrasi/daftar-pasien-ruangan/${norec}`);
    }
    
    createPasienBaru = async (params) => {
        return await api.create("/transaksi/registrasi/pasien-baru", params);
    }

    updatePasien = async (params) => {
        return await api.put("/transaksi/registrasi/update-pasien", params);
    }

    saveRegistrasiDaftarPasien = async (params) => {
        return await api.create("/transaksi/registrasi/save-daftar-pasien", params);
    }

    getPasienByNoregistrasi = async (noregistrasi) => {
        return await api.get(`/transaksi/registrasi/pasien-noregistrasi/${noregistrasi}`);
    }

    getDaftarPasienRJ = async (param) => {
        return await api.get(`/transaksi/registrasi/daftar-pasien-rawat-jalan?&noregistrasi=${param}`);
    }

    getWidgetDaftarPasienRJ = async (param) => {
        return await api.get(`/transaksi/registrasi/widget-daftar-pasien-registrasi?&noregistrasi=${param}`);
    }

    getWidgetDaftarPasienRI = async (param) => {
        return await api.get(`/transaksi/registrasi/widget-daftar-pasien-registrasi-inap?&noregistrasi=${param}`);
    }

    getDaftarPasienRI = async (param) => {
        return await api.get(`/transaksi/registrasi/daftar-pasien-rawat-inap?&noregistrasi=${param}`);
    }

    getListBPJS = async (nobpjs) => {
        return await api.get(`/transaksi/bridging/bpjs/monitoring/HistoriPelayanan/NoKartu/${nobpjs}`);
    }

    saveRegistrasiPenjaminFK = async (params) => {
        return await api.create("/transaksi/registrasi/save-penjamin-fk", params);
    }

    getDaftarPasienPulang = async ([dateStart, dateEnd, instalasi, unit, search]) => {
        return await api.get(`/transaksi/registrasi/list-daftar-pasien-ruangan?` 
            + (dateStart ? `dateStart=${dateStart}&` : ``)
            + (dateEnd ? `dateEnd=${dateEnd}&` : ``)
            + (instalasi ? `instalasi=${instalasi}&` : ``)
            + (unit ? `&unit=${unit}&` : ``)
            + (search ? `&search=${search}` : ``)
        );
    }

    saveDaftarPasienPulang = async (data) => {
        return await api.create(`/transaksi/registrasi/update-registrasi-pulang`, data)
    }

    getListFaskes = async ([qfaskes, faskesType]) => {
        return await api.get(`transaksi/bridging/bpjs/faskes?`
            + (qfaskes ? `&qfaskes=${qfaskes}` : ``)
            + (faskesType ? `&faskesType=${faskesType}` : ``)
        );
    }
}