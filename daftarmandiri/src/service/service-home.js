import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceMaster {

    getJadwalDokter = async (params) => {
        return await api.get(`/daftarmandiri/jadwal-dokter`, params);
    }

    getComboJadwal = async (params) => {
        return await api.get(`/daftarmandiri/combo-jadwal`, params);
    }
}
