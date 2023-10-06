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

    batalRegis = async () => {
        return await api.post(`/daftarmandiri/user-pasien/batal-regis`);
    }
    
}
