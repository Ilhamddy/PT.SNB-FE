import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceMaster {

    getJadwalDokter = async (queries) => {
        return await api.get(`/daftarmandiri/jadwal-dokter`, queries);
    }

    getComboJadwal = async (queries) => {
        return await api.get(`/daftarmandiri/combo-jadwal`, queries);
    }

    getBeritaHome = async () => {
        return await api.get(`/daftarmandiri/berita-home`);
    }

    getBerita = async (queries) => {
        return await api.get(`/daftarmandiri/berita`, queries);
    }

    getCaptcha = async (queries) => {
        return await api.get(`/daftarmandiri/get-captcha`, queries)
    }
}
