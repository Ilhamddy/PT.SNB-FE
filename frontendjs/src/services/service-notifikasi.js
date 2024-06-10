import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceNotifikasi {
    getListNotifikasi = async (queries) => {
        return await api.get(`/transaksi/notifikasi/get-list-notifikasi`, queries)
    }
    updateStatusBaca = async (data) => {
        return await api.create("/transaksi/notifikasi/update-status-baca", data)
    }
}