import { APIClient } from "../helpers/api_helper";

const api = new APIClient();
const baseurl =`/transaksi/gizi`
export default class ServiceGizi {
    getMasterGizi = async (queries) => {
        return await api.get(`${baseurl}/list-master-gizi`, queries);
    }
    getDaftarPasienRawatInap = async (queries) => {
        return await api.get(`${baseurl}/list-daftar-pasien-rawat-inap`, queries);
    }
    upsertOrderGizi = async (body) => {
        return await api.create(`${baseurl}/upsert-order-gizi`, body);
    }
    getDaftarOrderGizi = async (queries) => {
        return await api.get(`${baseurl}/list-daftar-order-gizi`, queries);
    }
}