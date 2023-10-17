import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceSDM {

    getDaftarPegawai = async (param) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-daftar-pegawai`,param);
    }
    getComboSDM = async (param) => {
        return await api.get(`/transaksi/sumber-daya-manusia/get-combo`,param);
    }

}