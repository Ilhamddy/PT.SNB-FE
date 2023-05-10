import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

class ServiceRegistrasi {
    createPasienBaru = async (params) => {
        try {
            const result = await api.create("/transaksi/registrasi/pasien-baru", params);
            return result.data;
        } catch (e) {
            console.error(e);
        }
    }

    updatePasien = async (params) => {
        try {
            const result = await api.create("/transaksi/registrasi/update-pasien", params);
            return result.data;
        } catch (e) {
            console.error(e);
        }
    }
}