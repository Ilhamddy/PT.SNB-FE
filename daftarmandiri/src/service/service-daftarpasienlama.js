import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceDaftar {
    getPasienLama = async (queries) => {
        return await api.get(`/daftarmandiri/pasien-lama`, queries);
    }

    getComboDaftar = async (queries) => {
        return await api.get(`/daftarmandiri/daftar-pasien-lama/combo-daftar`, queries);
    }

    getDokter = async (queries) => {
        return await api.get(`/daftarmandiri/daftar-pasien-lama/dokter`, queries);
    }

    savePasienMandiri = async (data) => {
        return await api.create(`/daftarmandiri/daftar-pasien-lama/save-pasien-mandiri`, data)
    }
}
