import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

export default class ServiceViewer {
    getLoketSisa = async () => {
        return await api.get("/transaksi/viewer/get-loket-sisa");
    }

    panggilLoket = async (data) => {
        return await api.create("/transaksi/viewer/panggil-loket", data);
    }
    
    getAllLoket = async () => {
        return await api.get("/transaksi/viewer/get-all-loket");
    }
}