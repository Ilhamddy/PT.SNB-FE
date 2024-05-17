import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceDaftarPasien {
    baseUrl = "/transaksi/registrasi/daftar-pasien"

    getDaftarPasienRegistrasiCombo = async (queries) => {
        return await api.get(this.baseUrl + `/registrasi/combo`, queries);
    }
    
    getDaftarPasienRegistrasi = async (queries) => {
        return await api.get(this.baseUrl + `/registrasi`, queries);
    }
}
