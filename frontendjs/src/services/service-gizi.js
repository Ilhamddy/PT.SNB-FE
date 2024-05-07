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
    deleteOrderGizi = async (queries) => {
        return await api.create(`${baseurl}/delete-order-gizi`, queries);
    }
    upsertVerifikasiOrderGizi = async (queries) => {
        return await api.create(`${baseurl}/verifikasi-order-gizi`, queries);
    }
    getDaftarKirimGizi = async (queries) => {
        return await api.get(`${baseurl}/list-daftar-kirim-gizi`, queries);
    }
    upsertKirimCetakLabel = async (queries) => {
        return await api.create(`${baseurl}/cetak-label-kirim-order-gizi`, queries);
    }
}