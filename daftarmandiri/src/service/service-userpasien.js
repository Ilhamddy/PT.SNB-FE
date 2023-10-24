import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceAuth {
    
    loginUser = async (body) => {
        return await api.create(`/auth/login-user-pasien`, body, false);
    }

    signUpUser = async (body) => {
        return await api.create(`/daftarmandiri/user-pasien/create-pasien`, body, false);
    }

    getRiwayatRegistrasi = async () => {
        return await api.get(`/daftarmandiri/user-pasien/riwayat-reservasi`);
    }

    batalRegis = async (data) => {
        return await api.create(`/daftarmandiri/user-pasien/batal-regis`, data);
    }

    getPasienEdit = async (queries) => {
        return await api.get(`/daftarmandiri/user-pasien/get-pasien-edit`, queries)
    }

    updatePasien = async (data) => {
        return await api.create(`/daftarmandiri/user-pasien/update-pasien`, data)
    }

    getPasienAkun = async (queries) => {
        return await api.get(`/daftarmandiri/user-pasien/get-pasien-akun`, queries)
    }

    getComboPenjamin = async () => {
        return await api.get(`/daftarmandiri/user-pasien/get-combo-penjamin`)
    }

    upsertPenjamin = async (data) => {
        return await api.create(`/daftarmandiri/user-pasien/upsert-penjamin`, data)
    }

    getPenjaminPasien = async () => {
        return await api.get(`/daftarmandiri/user-pasien/get-penjamin-pasien`)
    }

    getAntreanPemeriksaan = async () => {
        return await api.get(`/daftarmandiri/user-pasien/get-antrean-pemeriksaan`)
    }

    getRegistrasiNorec = async (queries) => {
        return await api.get(`/daftarmandiri/user-pasien/get-registrasi-norec`, queries)
    }
}
