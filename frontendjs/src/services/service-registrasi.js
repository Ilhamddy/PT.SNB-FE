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
}