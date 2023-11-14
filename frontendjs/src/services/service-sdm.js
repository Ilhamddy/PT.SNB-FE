import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceSDM {

    getDaftarPegawai = async (param) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-daftar-pegawai`,param);
    }
    getComboSDM = async (param) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-combo`,param);
    }
    saveBiodataPegawai = async (params) => {
        return await api.create("/transaksi/sumber-daya-manusia/save-biodata-pasien", params);
    }
    getPegawaiById = async (param) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-pegawai-byid`,param);
    }
    getUserRoleById = async (param) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-user-role-byid`,param);
    }
    saveSignupUserRole = async (params) => {
        return await api.create("/auth/signup", params);
    }
    getComboJadwal = async (param) => {
        return await api.get(`/transaksi/sumber-daya-manusia/combo-jadwal`, param)
    }
    getJadwalDokter = async (queries) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-jadwal-dokter`, queries)
    }
    upsertJadwal = async (params) => {
        return await api.create(`/transaksi/sumber-daya-manusia/upsert-jadwal`, params)
    }
    updateUserRole = async (params) => {
        return await api.create(`/transaksi/sumber-daya-manusia/update-user-role`, params)
    }
    updateResetPassword = async (params) => {
        return await api.create(`/transaksi/sumber-daya-manusia/update-reset-password`, params)
    }
    
    getLiburPegawai = async (queries) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-libur-pegawai`, queries)
    }

    getComboCuti = async (queries) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-combo-cuti`, queries)
    }

    upsertCuti = async (data) => {
        return await api.create(`/transaksi/sumber-daya-manusia/upsert-cuti`, data)
    }
}