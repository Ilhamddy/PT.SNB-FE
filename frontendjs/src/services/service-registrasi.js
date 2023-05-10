import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceRegistrasi {
    createPasienBaru = async (params) => {
        return await api.create("/transaksi/registrasi/pasien-baru", params);
    }

    updatePasien = async (params) => {
       return await api.create("/transaksi/registrasi/update-pasien", params);
    }
}