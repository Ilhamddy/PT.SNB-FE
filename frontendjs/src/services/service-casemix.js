import { APIClient } from "../helpers/api_helper";

const api = new APIClient();
export default class ServiceCasemix {
    getListCariPasien = async (param) => {
        return await api.get(`/transaksi/casemix/list-pasien?nocm=${param}`);
    }

    getListDaftarPasien = async (param) => {
        return await api.get(`/transaksi/casemix/list-daftar-pasien?nocm=${param}`);
    }
}